this.wc=this.wc||{},this.wc.blocks=this.wc.blocks||{},this.wc.blocks["product-tag"]=function(t){function e(e){for(var r,i,u=e[0],a=e[1],s=e[2],b=0,d=[];b<u.length;b++)i=u[b],Object.prototype.hasOwnProperty.call(o,i)&&o[i]&&d.push(o[i][0]),o[i]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r]);for(l&&l(e);d.length;)d.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var t,e=0;e<c.length;e++){for(var n=c[e],r=!0,u=1;u<n.length;u++){var a=n[u];0!==o[a]&&(r=!1)}r&&(c.splice(e--,1),t=i(i.s=n[0]))}return t}var r={},o={19:0},c=[];function i(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=r,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)i.d(n,r,function(e){return t[e]}.bind(null,r));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="";var u=window.webpackWcBlocksJsonp=window.webpackWcBlocksJsonp||[],a=u.push.bind(u);u.push=e,u=u.slice();for(var s=0;s<u.length;s++)e(u[s]);var l=a;return c.push([652,2,1,0]),n()}({0:function(t,e){!function(){t.exports=this.wp.element}()},1:function(t,e){!function(){t.exports=this.wp.i18n}()},10:function(t,e){!function(){t.exports=this.React}()},18:function(t,e,n){"use strict";n.d(e,"e",(function(){return o})),n.d(e,"r",(function(){return c})),n.d(e,"k",(function(){return i})),n.d(e,"m",(function(){return u})),n.d(e,"b",(function(){return a})),n.d(e,"l",(function(){return s})),n.d(e,"o",(function(){return l})),n.d(e,"d",(function(){return b})),n.d(e,"n",(function(){return d})),n.d(e,"c",(function(){return g})),n.d(e,"p",(function(){return p})),n.d(e,"i",(function(){return f})),n.d(e,"j",(function(){return h})),n.d(e,"f",(function(){return O})),n.d(e,"g",(function(){return j})),n.d(e,"h",(function(){return m})),n.d(e,"q",(function(){return w})),n.d(e,"a",(function(){return _})),n.d(e,"s",(function(){return v}));var r=n(4),o=Object(r.getSetting)("enableReviewRating",!0),c=Object(r.getSetting)("showAvatars",!0),i=Object(r.getSetting)("max_columns",6),u=Object(r.getSetting)("min_columns",1),a=Object(r.getSetting)("default_columns",3),s=Object(r.getSetting)("max_rows",6),l=Object(r.getSetting)("min_rows",1),b=Object(r.getSetting)("default_rows",2),d=Object(r.getSetting)("min_height",500),g=Object(r.getSetting)("default_height",500),p=Object(r.getSetting)("placeholderImgSrc",""),f=(Object(r.getSetting)("thumbnail_size",300),Object(r.getSetting)("isLargeCatalog")),h=Object(r.getSetting)("limitTags"),O=Object(r.getSetting)("hasProducts",!0),j=Object(r.getSetting)("hasTags",!0),m=Object(r.getSetting)("homeUrl",""),w=Object(r.getSetting)("productCount",0),_=Object(r.getSetting)("attributes",[]),v=Object(r.getSetting)("wcBlocksAssetUrl","")},20:function(t,e){!function(){t.exports=this.moment}()},21:function(t,e){!function(){t.exports=this.wp.compose}()},22:function(t,e){!function(){t.exports=this.wp.editor}()},23:function(t,e){!function(){t.exports=this.wp.blocks}()},29:function(t,e,n){"use strict";var r=n(7),o=n.n(r),c=n(9),i=n(8),u=n.n(i),a=n(5),s=n(18),l={root:"/wc/blocks",products:"".concat("/wc/blocks","/products"),categories:"".concat("/wc/blocks","/products/categories")};function b(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function d(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?b(Object(n),!0).forEach((function(e){o()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}n.d(e,"g",(function(){return g})),n.d(e,"d",(function(){return p})),n.d(e,"e",(function(){return f})),n.d(e,"c",(function(){return h})),n.d(e,"b",(function(){return O})),n.d(e,"f",(function(){return j})),n.d(e,"a",(function(){return m})),n.d(e,"h",(function(){return w}));var g=function(t){var e=t.selected,n=void 0===e?[]:e,r=t.search,o=void 0===r?"":r,i=t.queryArgs,b=function(t){var e=t.selected,n=void 0===e?[]:e,r=t.search,o=void 0===r?"":r,i=t.queryArgs,u=void 0===i?[]:i,a={per_page:s.i?100:-1,catalog_visibility:"any",status:"publish",search:o,orderby:"title",order:"asc"},b=[Object(c.addQueryArgs)(l.products,d({},a,{},u))];return s.i&&n.length&&b.push(Object(c.addQueryArgs)(l.products,{catalog_visibility:"any",status:"publish",include:n})),b}({selected:n,search:o,queryArgs:void 0===i?[]:i});return Promise.all(b.map((function(t){return u()({path:t})}))).then((function(t){return Object(a.uniqBy)(Object(a.flatten)(t),"id").map((function(t){return d({},t,{parent:0})}))})).catch((function(t){throw t}))},p=function(t){return u()({path:"".concat(l.products,"/").concat(t)})},f=function(t){var e=t.selected,n=function(t){var e=t.selected,n=void 0===e?[]:e,r=t.search,o=[Object(c.addQueryArgs)("".concat(l.products,"/tags"),{per_page:s.j?100:-1,orderby:s.j?"count":"name",order:s.j?"desc":"asc",search:r})];return s.j&&n.length&&o.push(Object(c.addQueryArgs)("".concat(l.products,"/tags"),{include:n})),o}({selected:void 0===e?[]:e,search:t.search});return Promise.all(n.map((function(t){return u()({path:t})}))).then((function(t){return Object(a.uniqBy)(Object(a.flatten)(t),"id")}))},h=function(t){return u()({path:"".concat(l.categories,"/").concat(t)})},O=function(t){return u()({path:Object(c.addQueryArgs)("".concat(l.products,"/categories"),d({per_page:-1},t))})},j=function(t){return u()({path:Object(c.addQueryArgs)("".concat(l.products,"/").concat(t,"/variations"),{per_page:-1})})},m=function(){return u()({path:Object(c.addQueryArgs)("".concat(l.products,"/attributes"),{per_page:-1})})},w=function(t){return u()({path:Object(c.addQueryArgs)("".concat(l.products,"/attributes/").concat(t,"/terms"),{per_page:-1})})}},3:function(t,e){!function(){t.exports=this.wp.components}()},37:function(t,e){!function(){t.exports=this.wp.keycodes}()},4:function(t,e){!function(){t.exports=this.wc.wcSettings}()},45:function(t,e,n){"use strict";var r=n(7),o=n.n(r),c=n(0),i=n(1),u=(n(2),n(3));function a(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?a(Object(n),!0).forEach((function(e){o()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}e.a=function(t){var e=t.onChange,n=t.settings,r=n.button,o=n.price,a=n.rating,l=n.title;return Object(c.createElement)(c.Fragment,null,Object(c.createElement)(u.ToggleControl,{label:Object(i.__)("Product title","woo-gutenberg-products-block"),help:l?Object(i.__)("Product title is visible.","woo-gutenberg-products-block"):Object(i.__)("Product title is hidden.","woo-gutenberg-products-block"),checked:l,onChange:function(){return e(s({},n,{title:!l}))}}),Object(c.createElement)(u.ToggleControl,{label:Object(i.__)("Product price","woo-gutenberg-products-block"),help:o?Object(i.__)("Product price is visible.","woo-gutenberg-products-block"):Object(i.__)("Product price is hidden.","woo-gutenberg-products-block"),checked:o,onChange:function(){return e(s({},n,{price:!o}))}}),Object(c.createElement)(u.ToggleControl,{label:Object(i.__)("Product rating","woo-gutenberg-products-block"),help:a?Object(i.__)("Product rating is visible.","woo-gutenberg-products-block"):Object(i.__)("Product rating is hidden.","woo-gutenberg-products-block"),checked:a,onChange:function(){return e(s({},n,{rating:!a}))}}),Object(c.createElement)(u.ToggleControl,{label:Object(i.__)("Add to Cart button","woo-gutenberg-products-block"),help:r?Object(i.__)("Add to Cart button is visible.","woo-gutenberg-products-block"):Object(i.__)("Add to Cart button is hidden.","woo-gutenberg-products-block"),checked:r,onChange:function(){return e(s({},n,{button:!r}))}}))}},46:function(t,e,n){"use strict";var r=n(0),o=n(1),c=n(5),i=(n(2),n(3)),u=n(18);e.a=function(t){var e=t.columns,n=t.rows,a=t.setAttributes,s=t.alignButtons;return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(i.RangeControl,{label:Object(o.__)("Columns","woo-gutenberg-products-block"),value:e,onChange:function(t){var e=Object(c.clamp)(t,u.m,u.k);a({columns:Object(c.isNaN)(e)?"":e})},min:u.m,max:u.k}),Object(r.createElement)(i.RangeControl,{label:Object(o.__)("Rows","woo-gutenberg-products-block"),value:n,onChange:function(t){var e=Object(c.clamp)(t,u.o,u.l);a({rows:Object(c.isNaN)(e)?"":e})},min:u.o,max:u.l}),Object(r.createElement)(i.ToggleControl,{label:Object(o.__)("Align Buttons","woo-gutenberg-products-block"),help:s?Object(o.__)("Buttons are aligned vertically.","woo-gutenberg-products-block"):Object(o.__)("Buttons follow content.","woo-gutenberg-products-block"),checked:s,onChange:function(){return a({alignButtons:!s})}}))}},5:function(t,e){!function(){t.exports=this.lodash}()},52:function(t,e){!function(){t.exports=this.ReactDOM}()},55:function(t,e){!function(){t.exports=this.wp.viewport}()},60:function(t,e){!function(){t.exports=this.wp.hooks}()},608:function(t,e,n){var r=n(609);"string"==typeof r&&(r=[[t.i,r,""]]);var o={insert:"head",singleton:!1};n(30)(r,o);r.locals&&(t.exports=r.locals)},609:function(t,e,n){},64:function(t,e){!function(){t.exports=this.wp.htmlEntities}()},65:function(t,e){!function(){t.exports=this.wp.date}()},652:function(t,e,n){"use strict";n.r(e);var r=n(0),o=n(1),c=n(23),i=n(18),u=n(3),a=function(t){var e=t.className;return Object(r.createElement)(u.Icon,{className:e,icon:Object(r.createElement)("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},Object(r.createElement)("path",{d:"M21.45,0H12.14L.75,11.4A2.55,2.55,0,0,0,.75,15L9,23.25a2.55,2.55,0,0,0,3.61,0L24,11.86V2.55A2.55,2.55,0,0,0,21.45,0Z"}),Object(r.createElement)("circle",{fill:"#fff",cx:"18.07",cy:"5.75",r:"2.47"}),Object(r.createElement)("path",{fill:"#fff",d:"M9.27,9.53c-.14-.53.19-.85.72-.72l3.17.82a1.83,1.83,0,0,1,1.21,1.21L15.19,14c.13.53-.19.86-.72.72l-3.17-.81a1.9,1.9,0,0,1-1.22-1.22Z"}),Object(r.createElement)("path",{fill:"#fff",d:"M14.14,15.71a.52.52,0,0,1,.26,1L12.09,19a1.94,1.94,0,0,1-1.68.46l-3.16-.81a.52.52,0,0,1-.26-1L9.3,15.36A1.93,1.93,0,0,1,11,14.9Z"}),Object(r.createElement)("path",{fill:"#fff",d:"M8.29,9.86a.52.52,0,0,0-1-.26L5,11.91a1.94,1.94,0,0,0-.46,1.68l.81,3.16a.52.52,0,0,0,1,.26L8.64,14.7A1.93,1.93,0,0,0,9.1,13Z"}))})},s=(n(608),n(7)),l=n.n(s),b=n(13),d=n.n(b),g=n(17),p=n.n(g),f=n(14),h=n.n(f),O=n(15),j=n.n(O),m=n(12),w=n.n(m),_=n(16),v=n.n(_),y=n(22),k=(n(2),n(45)),E=n(46),P=n(11),S=n.n(P),C=n(5),A=n(32),x=n(29),B=(n(610),function(t){function e(){var t;return d()(this,e),(t=h()(this,j()(e).apply(this,arguments))).state={list:[],loading:!0},t.renderItem=t.renderItem.bind(w()(t)),t.debouncedOnSearch=Object(C.debounce)(t.onSearch.bind(w()(t)),400),t}return v()(e,t),p()(e,[{key:"componentDidMount",value:function(){var t=this,e=this.props.selected;Object(x.e)({selected:e}).then((function(e){t.setState({list:e,loading:!1})})).catch((function(){t.setState({list:[],loading:!1})}))}},{key:"onSearch",value:function(t){var e=this,n=this.props.selected;this.setState({loading:!0}),Object(x.e)({selected:n,search:t}).then((function(t){e.setState({list:t,loading:!1})})).catch((function(){e.setState({list:[],loading:!1})}))}},{key:"renderItem",value:function(t){var e=t.item,n=t.search,c=t.depth,i=void 0===c?0:c,u=["woocommerce-product-tags__item"];n.length&&u.push("is-searching"),0===i&&0!==e.parent&&u.push("is-skip-level");var a=e.breadcrumbs.length?"".concat(e.breadcrumbs.join(", "),", ").concat(e.name):e.name;return Object(r.createElement)(A.b,S()({className:u.join(" ")},t,{showCount:!0,"aria-label":Object(o.sprintf)(Object(o._n)("%d product tagged as %s","%d products tagged as %s",e.count,"woo-gutenberg-products-block"),e.count,a)}))}},{key:"render",value:function(){var t=this.state,e=t.list,n=t.loading,c=this.props,a=c.onChange,s=c.onOperatorChange,l=c.operator,b=c.selected,d={clear:Object(o.__)("Clear all product tags","woo-gutenberg-products-block"),list:Object(o.__)("Product Tags","woo-gutenberg-products-block"),noItems:Object(o.__)("Your store doesn't have any product tags.","woo-gutenberg-products-block"),search:Object(o.__)("Search for product tags","woo-gutenberg-products-block"),selected:function(t){return Object(o.sprintf)(Object(o._n)("%d tag selected","%d tags selected",t,"woo-gutenberg-products-block"),t)},updated:Object(o.__)("Tag search results updated.","woo-gutenberg-products-block")};return Object(r.createElement)(r.Fragment,null,Object(r.createElement)(A.a,{className:"woocommerce-product-tags",list:e,isLoading:n,selected:b.map((function(t){return Object(C.find)(e,{id:t})})).filter(Boolean),onChange:a,onSearch:i.j?this.debouncedOnSearch:null,renderItem:this.renderItem,messages:d,isHierarchical:!0}),!!s&&Object(r.createElement)("div",{className:b.length<2?"screen-reader-text":""},Object(r.createElement)(u.SelectControl,{className:"woocommerce-product-tags__operator",label:Object(o.__)("Display products matching","woo-gutenberg-products-block"),help:Object(o.__)("Pick at least two tags to use this setting.","woo-gutenberg-products-block"),value:l,onChange:s,options:[{label:Object(o.__)("Any selected tags","woo-gutenberg-products-block"),value:"any"},{label:Object(o.__)("All selected tags","woo-gutenberg-products-block"),value:"all"}]})))}}]),e}(r.Component));B.defaultProps={operator:"any"};var T=B,D=n(69),N=n(97);function M(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function I(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?M(Object(n),!0).forEach((function(e){l()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):M(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var L=function(t){function e(){var t;return d()(this,e),(t=h()(this,j()(e).apply(this,arguments))).state={changedAttributes:{},isEditing:!1},t.startEditing=t.startEditing.bind(w()(t)),t.stopEditing=t.stopEditing.bind(w()(t)),t.setChangedAttributes=t.setChangedAttributes.bind(w()(t)),t.save=t.save.bind(w()(t)),t}return v()(e,t),p()(e,[{key:"componentDidMount",value:function(){this.props.attributes.tags.length||this.setState({isEditing:!0})}},{key:"startEditing",value:function(){this.setState({isEditing:!0,changedAttributes:{}})}},{key:"stopEditing",value:function(){this.setState({isEditing:!1,changedAttributes:{}})}},{key:"setChangedAttributes",value:function(t){this.setState((function(e){return{changedAttributes:I({},e.changedAttributes,{},t)}}))}},{key:"save",value:function(){var t=this.state.changedAttributes;(0,this.props.setAttributes)(t),this.stopEditing()}},{key:"getInspectorControls",value:function(){var t=this.props,e=t.attributes,n=t.setAttributes,c=this.state.isEditing,i=e.columns,a=e.tagOperator,s=e.contentVisibility,l=e.orderby,b=e.rows,d=e.alignButtons;return Object(r.createElement)(y.InspectorControls,{key:"inspector"},Object(r.createElement)(u.PanelBody,{title:Object(o.__)("Product Tag","woo-gutenberg-products-block"),initialOpen:!e.tags.length&&!c},Object(r.createElement)(T,{selected:e.tags,onChange:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],e=t.map((function(t){return t.id}));n({tags:e})},operator:a,onOperatorChange:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"any";return n({tagOperator:t})}})),Object(r.createElement)(u.PanelBody,{title:Object(o.__)("Layout","woo-gutenberg-products-block"),initialOpen:!0},Object(r.createElement)(E.a,{columns:i,rows:b,alignButtons:d,setAttributes:n})),Object(r.createElement)(u.PanelBody,{title:Object(o.__)("Content","woo-gutenberg-products-block"),initialOpen:!0},Object(r.createElement)(k.a,{settings:s,onChange:function(t){return n({contentVisibility:t})}})),Object(r.createElement)(u.PanelBody,{title:Object(o.__)("Order By","woo-gutenberg-products-block"),initialOpen:!1},Object(r.createElement)(D.a,{setAttributes:n,value:l})))}},{key:"renderEditMode",value:function(){var t=this,e=this.props,n=e.attributes,c=e.debouncedSpeak,i=I({},n,{},this.state.changedAttributes);return Object(r.createElement)(u.Placeholder,{icon:Object(r.createElement)(a,{className:"block-editor-block-icon"}),label:Object(o.__)("Products by Tag","woo-gutenberg-products-block"),className:"wc-block-products-grid wc-block-product-tag"},Object(o.__)("Display a grid of products from your selected tags.","woo-gutenberg-products-block"),Object(r.createElement)("div",{className:"wc-block-product-tag__selection"},Object(r.createElement)(T,{selected:i.tags,onChange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],n=e.map((function(t){return t.id}));t.setChangedAttributes({tags:n})},operator:i.tagOperator,onOperatorChange:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"any";return t.setChangedAttributes({tagOperator:e})}}),Object(r.createElement)(u.Button,{isDefault:!0,onClick:function(){t.save(),c(Object(o.__)("Showing Products by Tag block preview.","woo-gutenberg-products-block"))}},Object(o.__)("Done","woo-gutenberg-products-block")),Object(r.createElement)(u.Button,{className:"wc-block-product-tag__cancel-button",isTertiary:!0,onClick:function(){t.stopEditing(),c(Object(o.__)("Showing Products by Tag block preview.","woo-gutenberg-products-block"))}},Object(o.__)("Cancel","woo-gutenberg-products-block"))))}},{key:"renderViewMode",value:function(){var t=this.props,e=t.attributes,n=t.name,c=e.tags.length;return Object(r.createElement)(u.Disabled,null,c?Object(r.createElement)(y.ServerSideRender,{block:n,attributes:e}):Object(r.createElement)(u.Placeholder,{icon:Object(r.createElement)(a,{className:"block-editor-block-icon"}),label:Object(o.__)("Products by Tag","woo-gutenberg-products-block"),className:"wc-block-products-grid wc-block-product-tag"},Object(o.__)("This block displays products from selected tags. Select at least one tag to display its products.","woo-gutenberg-products-block")))}},{key:"render",value:function(){var t=this,e=this.state.isEditing;return this.props.attributes.isPreview?N.a:Object(r.createElement)(r.Fragment,null,i.g?Object(r.createElement)(r.Fragment,null,Object(r.createElement)(y.BlockControls,null,Object(r.createElement)(u.Toolbar,{controls:[{icon:"edit",title:Object(o.__)("Edit"),onClick:function(){return e?t.stopEditing():t.startEditing()},isActive:e}]})),this.getInspectorControls(),e?this.renderEditMode():this.renderViewMode()):Object(r.createElement)(u.Placeholder,{icon:Object(r.createElement)(a,{className:"block-editor-block-icon"}),label:Object(o.__)("Products by Tag","woo-gutenberg-products-block"),className:"wc-block-products-grid wc-block-product-tag"},Object(o.__)("This block displays products from selected tags. In order to preview this you'll first need to create a product and assign it some tags.","woo-gutenberg-products-block")))}}]),e}(r.Component),R=Object(u.withSpokenMessages)(L);Object(c.registerBlockType)("woocommerce/product-tag",{title:Object(o.__)("Products by Tag","woo-gutenberg-products-block"),icon:{src:Object(r.createElement)(a,null),foreground:"#96588a"},category:"woocommerce",keywords:[Object(o.__)("WooCommerce","woo-gutenberg-products-block")],description:Object(o.__)("Display a grid of products from your selected tags.","woo-gutenberg-products-block"),supports:{align:["wide","full"],html:!1},example:{attributes:{isPreview:!0}},attributes:{columns:{type:"number",default:i.b},rows:{type:"number",default:i.d},alignButtons:{type:"boolean",default:!1},contentVisibility:{type:"object",default:{title:!0,price:!0,rating:!0,button:!0}},tags:{type:"array",default:[]},tagOperator:{type:"string",default:"any"},orderby:{type:"string",default:"date"},isPreview:{type:"boolean",default:!1}},edit:function(t){return Object(r.createElement)(R,t)},save:function(){return null}})},68:function(t,e){!function(){t.exports=this.wp.dom}()},69:function(t,e,n){"use strict";var r=n(0),o=n(1),c=n(3);n(2);e.a=function(t){var e=t.value,n=t.setAttributes;return Object(r.createElement)(c.SelectControl,{label:Object(o.__)("Order products by","woo-gutenberg-products-block"),value:e,options:[{label:Object(o.__)("Newness - newest first","woo-gutenberg-products-block"),value:"date"},{label:Object(o.__)("Price - low to high","woo-gutenberg-products-block"),value:"price_asc"},{label:Object(o.__)("Price - high to low","woo-gutenberg-products-block"),value:"price_desc"},{label:Object(o.__)("Rating - highest first","woo-gutenberg-products-block"),value:"rating"},{label:Object(o.__)("Sales - most first","woo-gutenberg-products-block"),value:"popularity"},{label:Object(o.__)("Title - alphabetical","woo-gutenberg-products-block"),value:"title"},{label:Object(o.__)("Menu Order","woo-gutenberg-products-block"),value:"menu_order"}],onChange:function(t){return n({orderby:t})}})}},72:function(t,e){},75:function(t,e){},76:function(t,e){},77:function(t,e){},78:function(t,e){},8:function(t,e){!function(){t.exports=this.wp.apiFetch}()},9:function(t,e){!function(){t.exports=this.wp.url}()},97:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var r=n(0),o=n(18),c=Object(r.createElement)("img",{src:o.s+"img/grid.svg",alt:"Grid Preview",width:"230",height:"250",style:{width:"100%"}})}});
