                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                s.scrollwheel = parseInt(this._mapParams.mouse_wheel_zoom) ? true : false;
	}
	if(typeof(this._mapParams.map_type) !== 'undefined'
		&& typeof(google.maps.MapTypeId[ this._mapParams.map_type ]) !== 'undefined'
	) {
		this._mapParams.mapTypeId = google.maps.MapTypeId[ this._mapParams.map_type ];
	}
	if(typeof(this._mapParams.map_stylization_data) !== 'undefined'
		&& this._mapParams.map_stylization_data
	) {
		this._mapParams.styles = this._mapParams.map_stylization_data;
	}
	jQuery(document).trigger('gmapBeforeMapInit', this);
};
gmpGoogleMap.prototype.getParams = function(){
	return this._mapParams;
};
gmpGoogleMap.prototype.getParam = function(key){
	return this._mapParams[ key ];
};
gmpGoogleMap.prototype.setParam = function(key, value){
	this._mapParams[ key ] = value;
	return this;
};
gmpGoogleMap.prototype._afterInit = function() {
	if(typeof(this._mapParams.marker_clasterer) !== 'undefined' && this._mapParams.marker_clasterer) {
		this.enableClasterization(this._mapParams.marker_clasterer);
	}
	this.applyZoomType();
	if(typeof(this._mapParams.zoom_min) !== 'undefined' && typeof(this._mapParams.zoom_max) !== 'undefined') {
		this._setMinZoomLevel();
		this._setMaxZoomLevel();
		this._fixZoomLevel();
	}
	this.resizeMapByHeight();
	jQuery(window).bind('resize', jQuery.proxy(this.resizeMapByHeight, this));
	jQuery(window).bind('orientationchange', jQuery.proxy(this.resizeMapByHeight, this));
	jQuery(document).trigger('gmapAfterMapInit', this);
};
gmpGoogleMap.prototype._setMinZoomLevel = function() {
	var curZoom = this.getZoom();
	var minZoom = parseInt(this._mapParams.zoom_min) ? parseInt(this._mapParams.zoom_min) : null;
	this.getRawMapInstance().setOptions({minZoom: minZoom});
	if(curZoom < minZoom)
		this.getRawMapInstance().setOptions({zoom: minZoom});
};
gmpGoogleMap.prototype._setMaxZoomLevel = function() {
	var maxZoom = parseInt(this._mapParams.zoom_max) ? parseInt(this._mapParams.zoom_max) : null;
	this.getRawMapInstance().setOptions({maxZoom: maxZoom});
	if(this.getRawMapInstance().zoom > maxZoom)
		this.getRawMapInstance().setOptions({zoom: maxZoom});
};
gmpGoogleMap.prototype._fixZoomLevel = function() {
	var eventHandle = this._getEventListenerHandle('zoom_changed', 'zoomChanged');
	if(!eventHandle) {
		eventHandle = google.maps.event.addListener(this.getRawMapInstance(), 'zoom_changed', jQuery.proxy(function(){
			var minZoom = parseInt(this.getParam('zoom_min'))
			,	maxZoom = parseInt(this.getParam('zoom_max'));
			if (this.getZoom() < minZoom) {
				this.setZoom(minZoom);
				if(GMP_DATA.isAdmin && this._getEventListenerHandle('idle', 'enableClasterization'))
					google.maps.event.trigger(this.getRawMapInstance(), 'idle');
			}
			if (this.getZoom() > maxZoom) {
				this.setZoom(maxZoom);
				if(GMP_DATA.isAdmin && this._getEventListenerHandle('idle', 'enableClasterization'))
					google.maps.event.trigger(this.getRawMapInstance(), 'idle');
			}
		}, this));
		this._addEventListenerHandle('zoom_changed', 'zoomChanged', eventHandle);
	}
};
gmpGoogleMap.prototype.enableClasterization = function(clasterType, needTrigger) {
	needTrigger = needTrigger ? needTrigger : false;

	switch(clasterType) {
		case 'MarkerClusterer':	// Support only this one for now
			var self = this;

			self.setClastererMarkersGroupsStyles();

			var eventHandle = google.maps.event.addListenerOnce(self.getRawMapInstance(), 'idle', function(a, b, c){
				var clasterGridSize = self.getParam('marker_clasterer_grid_size')
				,	markerGroupsStyles = self.getClastererMarkersGroupsStyles();

				// Enable clasterization
				var allMapMarkers = self.getAllRawMarkers()
				,	allVisibleMapMarkers = []
				,	clasterer = self.getClasterer();

				for(var i = 0; i < allMapMarkers.length; i++) {
					if(allMapMarkers[i].getVisible() && !parseInt(allMapMarkers[i].params.clasterer_exclude)) {
						allVisibleMapMarkers.push(allMapMarkers[i]);
					}
				}
				if(clasterer){
					clasterer.clearMarkers();
					clasterer.addMarkers( allVisibleMapMarkers );
					clasterer.setStyles( markerGroupsStyles );

					self.setClastererGridSize(clasterGridSize);

					clasterer.resetViewport();
					clasterer.redraw();
				} else {
					clasterer = new MarkerClusterer(self.getRawMapInstance(), allVisibleMapMarkers, { styles: markerGroupsStyles });

					clasterer.setCalculator(self.customClastererCalculatorFunction( markerGroupsStyles ));
					self.setClasterer(clasterer);
					self.setClastererGridSize(clasterGridSize);

					clasterer = self.getClasterer();
				}
			});
			this._addEventListenerHandle('idle', 'enableClasterization', eventHandle);
			if(GMP_DATA.isAdmin || needTrigger) {
				google.maps.event.trigger(self.getRawMapInstance(), 'idle');
			}
			this._clastererEnabled = true;
			break;
	}
};
gmpGoogleMap.prototype.disableClasterization = function() {
	var eventHandle = this._getEventListenerHandle('idle', 'enableClasterization');
	if(eventHandle) {
		var clasterer = this.getClasterer();
		if(clasterer) {
			clasterer.clearMarkers();
			var markers = this.getAllRawMarkers();
			for(var i = 0; i < markers.length; i++) {
				markers[i].setMap( this.getRawMapInstance() );
			}
		}
		google.maps.event.removeListener( eventHandle );
		google.maps.event.trigger(this.getRawMapInstance(), 'idle');
		this._clastererEnabled = false;
	}
};
gmpGoogleMap.prototype.customClastererCalculatorFunction = function(markerGroupsStyles) {
	return function(markers, numStyles) {
		var styleIndex = 1, markersGroupsStyles = markerGroupsStyles, markersGroupsIds = {}, maxCount = 0, groupId = 0, curStyle = [];

		for (var i = 0; i < markers.length; i++) {
			if (markers[i].marker_group_id) {
				if (typeof(markersGroupsIds[markers[i].marker_group_id]) == 'undefined') {
					markersGroupsIds[markers[i].marker_group_id] = 1;
				} else {
					markersGroupsIds[markers[i].marker_group_id]++;
				}
			}
		}
		for (var currGroupId in markersGroupsIds) {
			if (markersGroupsIds[currGroupId] > maxCount) {
				maxCount = markersGroupsIds[currGroupId];
				groupId = currGroupId;
			}
		}
		curStyle = jQuery.grep(markersGroupsStyles, function (e, i) {
			if (e.marker_group_id == groupId) {
				return e;
			}
		});

		if (curStyle && curStyle[0])
			styleIndex = markersGroupsStyles.indexOf(curStyle[0]) + 1;

		return {
			text: markers.length,
			index: styleIndex
		};
	}
};
gmpGoogleMap.prototype.getClasterer = function() {
	if(this._clasterer) {
		return this._clasterer;
	}
	return false;
};
gmpGoogleMap.prototype.setClasterer = function(clasterer) {
	this._clasterer = clasterer;
};
gmpGoogleMap.prototype.setMapMarkersGroups = function(groups) {
	this.mapMarkersGroups = groups;
};
gmpGoogleMap.prototype.getMapMarkersGroups = function() {
	return this.mapMarkersGroups;
};
gmpGoogleMap.prototype.setClastererMarkersGroupsStyles = function() {
	var mapMarkersGroups = this.getMapMarkersGroups()
	,	markersGroupsStyles = this.getClastererMarkersGroupsStyles()
	,	defClasterIcon = GMP_DATA.modPath + 'gmap/img/m1.png'
	,	oldDefClasterIcon = 'https://google-maps-utility-library-v3.googlecode.com/svn/trunk/markerclusterer/images/m1.png'		// Prevent to use old default claster icon cdn icon because it is missing
	,	clasterIcon = this.getParam('marker_clasterer_icon')
	,	iconWidth = this.getParam('marker_clasterer_icon_width')
	,	iconHeight = this.getParam('marker_clasterer_icon_height');

	// Set claster base icon
	clasterIcon = clasterIcon && clasterIcon != oldDefClasterIcon ? clasterIcon : defClasterIcon;
	iconWidth = iconWidth ? iconWidth : 53;
	iconHeight = iconHeight ? iconHeight : 52;

	markersGroupsStyles.push({
		marker_group_id: 0
	,	url: clasterIcon
	,	width: iconWidth
	,	height: iconHeight
	});

	if(mapMarkersGroups) {
		for(var i = 0; i < mapMarkersGroups.length; i++) {
			var markerGroupId = mapMarkersGroups[i].id
			,	markerGroupClasterIcon = mapMarkersGroups[i].params.claster_icon
			,	markerGroupClasterIconWidth = mapMarkersGroups[i].params.claster_icon_width
			,	markerGroupClasterIconHeight = mapMarkersGroups[i].params.claster_icon_height;

			if(markerGroupClasterIcon && markerGroupClasterIcon != clasterIcon) {
				markersGroupsStyles.push({
					marker_group_id: markerGroupId
				,	url: markerGroupClasterIcon ? markerGroupClasterIcon : defClasterIcon
				,	width: markerGroupClasterIconWidth ? markerGroupClasterIconWidth : 53
				,	height: markerGroupClasterIconHeight ? markerGroupClasterIconHeight : 52
				});
			}
		}
	}
};
gmpGoogleMap.prototype.getClastererMarkersGroupsStyles = function() {
	return this._clastererMarkersGroupsStyles;
};
gmpGoogleMap.prototype.setClastererGridSize = function(size) {
	var clasterer = this.getClasterer();

	size = size && parseInt(size) ? parseInt(size) : null;

	if(clasterer && size) {
		clasterer.setGridSize(size);
	}
};
gmpGoogleMap.prototype.getClastererGridSize = function() {
	var clasterer = this.getClasterer()
		,	clusterGridSize = null;

	if(clasterer) {
		clusterGridSize =  clasterer.getGridSize();
	}
	return clusterGridSize;
};
/**
 * Should trigger after added or modified markers
 */
gmpGoogleMap.prototype.markersRefresh = function() {
	var clasterer = this.getClasterer();

	if(this._clastererEnabled && clasterer) {
		clasterer.clearMarkers();
		clasterer.addMarkers( this.getAllRawMarkers() );
	}
	jQuery(document).trigger('gmapAfterMarkersRefresh', this);
};
gmpGoogleMap.prototype._addEventListenerHandle = function(event, code, handle) {
	if(!this._eventListeners[ event ])
		this._eventListeners[ event ] = {};
	this._eventListeners[ event ][ code ] = handle;
};
gmpGoogleMap.prototype._getEventListenerHandle = function(event, code) {
	return this._eventListeners[ event ] && this._eventListeners[ event ][ code ]
		? this._eventListeners[ event ][ code ]
		: false;
};
gmpGoogleMap.prototype.getRawMapInstance = function() {
	return this._mapObj;
};
gmpGoogleMap.prototype.setCenter = function (lat, lng) {
	if(typeof lng == 'undefined'){
		this.getRawMapInstance().setCenter(lat);
	}else
		this.getRawMapInstance().setCenter(new google.maps.LatLng(lat, lng));
	return this;
};
gmpGoogleMap.prototype.getCenter = function () {
	return this.getRawMapInstance().getCenter();
};
gmpGoogleMap.prototype.setZoom = function (zoomLevel) {
	this.getRawMapInstance().setZoom(parseInt(zoomLevel));
};
gmpGoogleMap.prototype.getZoom = function () {
	return this.getRawMapInstance().getZoom();
};
gmpGoogleMap.prototype.getBounds = function () {
	return this.getRawMapInstance().getBounds();
};
gmpGoogleMap.prototype.fitBounds = function (bounds) {
	this.getRawMapInstance().fitBounds(bounds);
};
gmpGoogleMap.prototype.addMarker = function(params) {
	var newMarker = new gmpGoogleMarker(this, params);
	this._markers.push( newMarker );
	return newMarker;
};
gmpGoogleMap.prototype.addShape = function(params) {
	var newShape = new gmpGoogleShape(this, params);
	this._shapes.push( newShape );
	return newShape;
};
gmpGoogleMap.prototype.addHeatmap = function(params) {
	var heatmap = new gmpGoogleHeatmap(this, params);
	this._heatmap.push( heatmap );
	return heatmap;
};
gmpGoogleMap.prototype.getMarkerById = function(id) {
	if(this._markers && this._markers.length) {
		for(var i in this._markers) {
			if(this._markers[i].getId && this._markers[i].getId() == id)
				return this._markers[ i ];
		}
	}
	return false;
};
gmpGoogleMap.prototype.getShapeById = function(id) {
	if(this._shapes && this._shapes.length) {
		for(var i in this._shapes) {
			if(this._shapes[ i ].getId() == id)
				return this._shapes[ i ];
		}
	}
	return false;
};
gmpGoogleMap.prototype.getHeatmap = function() {
	if(this._heatmap && this._heatmap.length) {
		// There is only one heatmap layer on the map
		return this._heatmap[0];
	}
	return false;
};
gmpGoogleMap.prototype.removeMarker = function(id) {
	var marker = this.getMarkerById( id );
	if(marker) {
		marker.removeFromMap();
	}
};
gmpGoogleMap.prototype.removeShape = function(id) {
	var shape = this.getShapeById( id );

	if(shape) {
		shape.removeFromMap();
	}
};
gmpGoogleMap.prototype.getAllMarkers = function() {
	return this._markers;
};
gmpGoogleMap.prototype.getAllShapes = function() {
	return this._shapes;
};
/**
 * Retrive original Map marker objects (Marker objects from Google API)
 */
gmpGoogleMap.prototype.getAllRawMarkers = function() {
	var res = [];
	if(this._markers && this._markers.length) {
		for(var i = 0; i < this._markers.length; i++) {
			res.push( this._markers[i].getRawMarkerInstance() );
		}
	}
	return res;
};
gmpGoogleMap.prototype.setMarkersParams = function(markers) {
	if(this._markers && this._markers.length) {
		for(var i = 0; i < this._markers.length; i++) {
			for(var j = 0; j < markers.length; j++) {
				if(this._markers[i].getId() == markers[j].id) {
					this._markers[i].setMarkerParams( markers[j] );
					break;
				}
			}
		}
	}

};
gmpGoogleMap.prototype.get = function(key) {
	return this.getRawMapInstance().get( key );
};
// Set option for RAW MAP
gmpGoogleMap.prototype.set = function(key, value) {
	this.getRawMapInstance().set( key, value );
	return this;
};
gmpGoogleMap.prototype.clearMarkers = function() {
	if(this._markers && this._markers.length) {
		for(var i = 0; i < this._markers.length; i++) {
			this._markers[i].setMap( null );
		}
		this._markers = [];
	}
};
gmpGoogleMap.prototype.clearMarkersByParam = function(param) {
	if(this._markers && this._markers.length) {
		for(var i = 0; i < this._markers.length; i++) {
			if(this._markers[i].getMarkerParam(param)) {
				this._markers[i].setMap( null );
				this._markers.splice(i, 1);
				this.clearMarkersByParam(param);
				break;
			}
		}
	}
};
gmpGoogleMap.prototype.clearShapes = function() {
	if(this._shapes && this._shapes.length) {
		for(var i = 0; i < this._shapes.length; i++) {
			this._shapes[i].setMap( null );
		}
		this._shapes = [];
	}
};
gmpGoogleMap.prototype.getViewId = function() {
	return this._mapParams.view_id;
};
gmpGoogleMap.prototype.getViewHtmlId = function() {
	return this._mapParams.view_html_id;
};
gmpGoogleMap.prototype.getId = function() {
	return this._mapParams.id;
};
gmpGoogleMap.prototype.refresh = function() {
	return google.maps.event.trigger(this.getRawMapInstance(), 'resize');
};
gmpGoogleMap.prototype.refreshWithCenter = (function(lat, lng, zoom) {
	var res = google.maps.event.trigger(this.getRawMapInstance(), 'resize');
	if(zoom) {
		this.setZoom(zoom);
	} else {
		this.setZoom(this.getZoom());
	}
	if(lat && lng) {
		this.setCenter(lat, lng);
	} else {
		this.setCenter(this.getCenter().lat(), this.getCenter().lng());
	}
	return res;
});
gmpGoogleMap.prototype.fullRefresh = function() {
	this.refresh();
	this.checkMarkersParams(this._markers, false);
	this.setCenter( this._mapParams.center );
};
gmpGoogleMap.prototype.checkMarkersParams = function(markers, needToShow) {
	if(markers && markers.length) {
		for (var i = 0; i < markers.length; i++) {
			var markerParams = markers[i].getMarkerParam('params')
			,	showDescription = parseInt(markerParams.show_description);
			if(showDescription || needToShow) {
				markers[i].showInfoWnd( true, showDescription );
			}
		}
	}
};
gmpGoogleMap.prototype.resizeMapByHeight = function(e, elem, withoutAfter) {
	if(!GMP_DATA.isAdmin && parseInt(this.getParam('adapt_map_to_screen_height')) && this.getRawMapInstance().map_display_mode != 'popup') {
		var viewId = this.getParam('view_id')
		,	selectors = this.getParam('selectors')
		,	windowObj = jQuery(window)
		,	mapContainer = jQuery('#gmpMapDetailsContainer_' + viewId)
		,	mapContainerWrap = jQuery('#mapConElem_' + viewId)
		,	height;

		withoutAfter = withoutAfter ? withoutAfter : (mapContainerWrap.data('rmh-without-after') ? mapContainerWrap.data('rmh-without-after') : false);
		elem = elem ? elem : (mapContainerWrap.data('rmh-additional-elem') ? jQuery(mapContainerWrap.data('rmh-additional-elem')) : null);

		if(!selectors || (!selectors.content_before && !selectors.content_after)) {
			var mapContainerOffset = map
