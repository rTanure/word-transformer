import {
  __commonJS
} from "./chunk-LQ2VYIYD.js";

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/conventions.js
var require_conventions = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/conventions.js"(exports) {
    "use strict";
    function find(list, predicate, ac) {
      if (ac === void 0) {
        ac = Array.prototype;
      }
      if (list && typeof ac.find === "function") {
        return ac.find.call(list, predicate);
      }
      for (var i = 0; i < list.length; i++) {
        if (Object.prototype.hasOwnProperty.call(list, i)) {
          var item = list[i];
          if (predicate.call(void 0, item, i, list)) {
            return item;
          }
        }
      }
    }
    function freeze(object, oc) {
      if (oc === void 0) {
        oc = Object;
      }
      return oc && typeof oc.freeze === "function" ? oc.freeze(object) : object;
    }
    function assign(target, source) {
      if (target === null || typeof target !== "object") {
        throw new TypeError("target is not an object");
      }
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
      return target;
    }
    var MIME_TYPE = freeze({
      /**
       * `text/html`, the only mime type that triggers treating an XML document as HTML.
       *
       * @see DOMParser.SupportedType.isHTML
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
       */
      HTML: "text/html",
      /**
       * Helper method to check a mime type if it indicates an HTML document
       *
       * @param {string} [value]
       * @returns {boolean}
       *
       * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/HTML Wikipedia
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
       * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
      isHTML: function(value) {
        return value === MIME_TYPE.HTML;
      },
      /**
       * `application/xml`, the standard mime type for XML documents.
       *
       * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
       * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_APPLICATION: "application/xml",
      /**
       * `text/html`, an alias for `application/xml`.
       *
       * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
       * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
       * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
       */
      XML_TEXT: "text/xml",
      /**
       * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
       * but is parsed as an XML document.
       *
       * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
       * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
       */
      XML_XHTML_APPLICATION: "application/xhtml+xml",
      /**
       * `image/svg+xml`,
       *
       * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
       * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
       * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
       */
      XML_SVG_IMAGE: "image/svg+xml"
    });
    var NAMESPACE = freeze({
      /**
       * The XHTML namespace.
       *
       * @see http://www.w3.org/1999/xhtml
       */
      HTML: "http://www.w3.org/1999/xhtml",
      /**
       * Checks if `uri` equals `NAMESPACE.HTML`.
       *
       * @param {string} [uri]
       *
       * @see NAMESPACE.HTML
       */
      isHTML: function(uri) {
        return uri === NAMESPACE.HTML;
      },
      /**
       * The SVG namespace.
       *
       * @see http://www.w3.org/2000/svg
       */
      SVG: "http://www.w3.org/2000/svg",
      /**
       * The `xml:` namespace.
       *
       * @see http://www.w3.org/XML/1998/namespace
       */
      XML: "http://www.w3.org/XML/1998/namespace",
      /**
       * The `xmlns:` namespace
       *
       * @see https://www.w3.org/2000/xmlns/
       */
      XMLNS: "http://www.w3.org/2000/xmlns/"
    });
    exports.assign = assign;
    exports.find = find;
    exports.freeze = freeze;
    exports.MIME_TYPE = MIME_TYPE;
    exports.NAMESPACE = NAMESPACE;
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/dom.js
var require_dom = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/dom.js"(exports) {
    var conventions = require_conventions();
    var find = conventions.find;
    var NAMESPACE = conventions.NAMESPACE;
    function notEmptyString(input) {
      return input !== "";
    }
    function splitOnASCIIWhitespace(input) {
      return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : [];
    }
    function orderedSetReducer(current, element) {
      if (!current.hasOwnProperty(element)) {
        current[element] = true;
      }
      return current;
    }
    function toOrderedSet(input) {
      if (!input)
        return [];
      var list = splitOnASCIIWhitespace(input);
      return Object.keys(list.reduce(orderedSetReducer, {}));
    }
    function arrayIncludes(list) {
      return function(element) {
        return list && list.indexOf(element) !== -1;
      };
    }
    function copy(src, dest) {
      for (var p in src) {
        if (Object.prototype.hasOwnProperty.call(src, p)) {
          dest[p] = src[p];
        }
      }
    }
    function _extends(Class, Super) {
      var pt = Class.prototype;
      if (!(pt instanceof Super)) {
        let t2 = function() {
        };
        var t = t2;
        ;
        t2.prototype = Super.prototype;
        t2 = new t2();
        copy(pt, t2);
        Class.prototype = pt = t2;
      }
      if (pt.constructor != Class) {
        if (typeof Class != "function") {
          console.error("unknown Class:" + Class);
        }
        pt.constructor = Class;
      }
    }
    var NodeType = {};
    var ELEMENT_NODE = NodeType.ELEMENT_NODE = 1;
    var ATTRIBUTE_NODE = NodeType.ATTRIBUTE_NODE = 2;
    var TEXT_NODE = NodeType.TEXT_NODE = 3;
    var CDATA_SECTION_NODE = NodeType.CDATA_SECTION_NODE = 4;
    var ENTITY_REFERENCE_NODE = NodeType.ENTITY_REFERENCE_NODE = 5;
    var ENTITY_NODE = NodeType.ENTITY_NODE = 6;
    var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
    var COMMENT_NODE = NodeType.COMMENT_NODE = 8;
    var DOCUMENT_NODE = NodeType.DOCUMENT_NODE = 9;
    var DOCUMENT_TYPE_NODE = NodeType.DOCUMENT_TYPE_NODE = 10;
    var DOCUMENT_FRAGMENT_NODE = NodeType.DOCUMENT_FRAGMENT_NODE = 11;
    var NOTATION_NODE = NodeType.NOTATION_NODE = 12;
    var ExceptionCode = {};
    var ExceptionMessage = {};
    var INDEX_SIZE_ERR = ExceptionCode.INDEX_SIZE_ERR = (ExceptionMessage[1] = "Index size error", 1);
    var DOMSTRING_SIZE_ERR = ExceptionCode.DOMSTRING_SIZE_ERR = (ExceptionMessage[2] = "DOMString size error", 2);
    var HIERARCHY_REQUEST_ERR = ExceptionCode.HIERARCHY_REQUEST_ERR = (ExceptionMessage[3] = "Hierarchy request error", 3);
    var WRONG_DOCUMENT_ERR = ExceptionCode.WRONG_DOCUMENT_ERR = (ExceptionMessage[4] = "Wrong document", 4);
    var INVALID_CHARACTER_ERR = ExceptionCode.INVALID_CHARACTER_ERR = (ExceptionMessage[5] = "Invalid character", 5);
    var NO_DATA_ALLOWED_ERR = ExceptionCode.NO_DATA_ALLOWED_ERR = (ExceptionMessage[6] = "No data allowed", 6);
    var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = (ExceptionMessage[7] = "No modification allowed", 7);
    var NOT_FOUND_ERR = ExceptionCode.NOT_FOUND_ERR = (ExceptionMessage[8] = "Not found", 8);
    var NOT_SUPPORTED_ERR = ExceptionCode.NOT_SUPPORTED_ERR = (ExceptionMessage[9] = "Not supported", 9);
    var INUSE_ATTRIBUTE_ERR = ExceptionCode.INUSE_ATTRIBUTE_ERR = (ExceptionMessage[10] = "Attribute in use", 10);
    var INVALID_STATE_ERR = ExceptionCode.INVALID_STATE_ERR = (ExceptionMessage[11] = "Invalid state", 11);
    var SYNTAX_ERR = ExceptionCode.SYNTAX_ERR = (ExceptionMessage[12] = "Syntax error", 12);
    var INVALID_MODIFICATION_ERR = ExceptionCode.INVALID_MODIFICATION_ERR = (ExceptionMessage[13] = "Invalid modification", 13);
    var NAMESPACE_ERR = ExceptionCode.NAMESPACE_ERR = (ExceptionMessage[14] = "Invalid namespace", 14);
    var INVALID_ACCESS_ERR = ExceptionCode.INVALID_ACCESS_ERR = (ExceptionMessage[15] = "Invalid access", 15);
    function DOMException(code, message) {
      if (message instanceof Error) {
        var error = message;
      } else {
        error = this;
        Error.call(this, ExceptionMessage[code]);
        this.message = ExceptionMessage[code];
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, DOMException);
      }
      error.code = code;
      if (message)
        this.message = this.message + ": " + message;
      return error;
    }
    DOMException.prototype = Error.prototype;
    copy(ExceptionCode, DOMException);
    function NodeList() {
    }
    NodeList.prototype = {
      /**
       * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
       * @standard level1
       */
      length: 0,
      /**
       * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
       * @standard level1
       * @param index  unsigned long
       *   Index into the collection.
       * @return Node
       * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
       */
      item: function(index) {
        return index >= 0 && index < this.length ? this[index] : null;
      },
      toString: function(isHTML, nodeFilter) {
        for (var buf = [], i = 0; i < this.length; i++) {
          serializeToString(this[i], buf, isHTML, nodeFilter);
        }
        return buf.join("");
      },
      /**
       * @private
       * @param {function (Node):boolean} predicate
       * @returns {Node[]}
       */
      filter: function(predicate) {
        return Array.prototype.filter.call(this, predicate);
      },
      /**
       * @private
       * @param {Node} item
       * @returns {number}
       */
      indexOf: function(item) {
        return Array.prototype.indexOf.call(this, item);
      }
    };
    function LiveNodeList(node, refresh) {
      this._node = node;
      this._refresh = refresh;
      _updateLiveList(this);
    }
    function _updateLiveList(list) {
      var inc = list._node._inc || list._node.ownerDocument._inc;
      if (list._inc !== inc) {
        var ls = list._refresh(list._node);
        __set__(list, "length", ls.length);
        if (!list.$$length || ls.length < list.$$length) {
          for (var i = ls.length; i in list; i++) {
            if (Object.prototype.hasOwnProperty.call(list, i)) {
              delete list[i];
            }
          }
        }
        copy(ls, list);
        list._inc = inc;
      }
    }
    LiveNodeList.prototype.item = function(i) {
      _updateLiveList(this);
      return this[i] || null;
    };
    _extends(LiveNodeList, NodeList);
    function NamedNodeMap() {
    }
    function _findNodeIndex(list, node) {
      var i = list.length;
      while (i--) {
        if (list[i] === node) {
          return i;
        }
      }
    }
    function _addNamedNode(el, list, newAttr, oldAttr) {
      if (oldAttr) {
        list[_findNodeIndex(list, oldAttr)] = newAttr;
      } else {
        list[list.length++] = newAttr;
      }
      if (el) {
        newAttr.ownerElement = el;
        var doc = el.ownerDocument;
        if (doc) {
          oldAttr && _onRemoveAttribute(doc, el, oldAttr);
          _onAddAttribute(doc, el, newAttr);
        }
      }
    }
    function _removeNamedNode(el, list, attr) {
      var i = _findNodeIndex(list, attr);
      if (i >= 0) {
        var lastIndex = list.length - 1;
        while (i < lastIndex) {
          list[i] = list[++i];
        }
        list.length = lastIndex;
        if (el) {
          var doc = el.ownerDocument;
          if (doc) {
            _onRemoveAttribute(doc, el, attr);
            attr.ownerElement = null;
          }
        }
      } else {
        throw new DOMException(NOT_FOUND_ERR, new Error(el.tagName + "@" + attr));
      }
    }
    NamedNodeMap.prototype = {
      length: 0,
      item: NodeList.prototype.item,
      getNamedItem: function(key) {
        var i = this.length;
        while (i--) {
          var attr = this[i];
          if (attr.nodeName == key) {
            return attr;
          }
        }
      },
      setNamedItem: function(attr) {
        var el = attr.ownerElement;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        var oldAttr = this.getNamedItem(attr.nodeName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /* returns Node */
      setNamedItemNS: function(attr) {
        var el = attr.ownerElement, oldAttr;
        if (el && el != this._ownerElement) {
          throw new DOMException(INUSE_ATTRIBUTE_ERR);
        }
        oldAttr = this.getNamedItemNS(attr.namespaceURI, attr.localName);
        _addNamedNode(this._ownerElement, this, attr, oldAttr);
        return oldAttr;
      },
      /* returns Node */
      removeNamedItem: function(key) {
        var attr = this.getNamedItem(key);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      // raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR
      //for level2
      removeNamedItemNS: function(namespaceURI, localName) {
        var attr = this.getNamedItemNS(namespaceURI, localName);
        _removeNamedNode(this._ownerElement, this, attr);
        return attr;
      },
      getNamedItemNS: function(namespaceURI, localName) {
        var i = this.length;
        while (i--) {
          var node = this[i];
          if (node.localName == localName && node.namespaceURI == namespaceURI) {
            return node;
          }
        }
        return null;
      }
    };
    function DOMImplementation() {
    }
    DOMImplementation.prototype = {
      /**
       * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
       * The different implementations fairly diverged in what kind of features were reported.
       * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
       *
       * @deprecated It is deprecated and modern browsers return true in all cases.
       *
       * @param {string} feature
       * @param {string} [version]
       * @returns {boolean} always true
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
       * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
       */
      hasFeature: function(feature, version) {
        return true;
      },
      /**
       * Creates an XML Document object of the specified type with its document element.
       *
       * __It behaves slightly different from the description in the living standard__:
       * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
       * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
       * - this implementation is not validating names or qualified names
       *   (when parsing XML strings, the SAX parser takes care of that)
       *
       * @param {string|null} namespaceURI
       * @param {string} qualifiedName
       * @param {DocumentType=null} doctype
       * @returns {Document}
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
       *
       * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
       * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
       * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
       */
      createDocument: function(namespaceURI, qualifiedName, doctype) {
        var doc = new Document();
        doc.implementation = this;
        doc.childNodes = new NodeList();
        doc.doctype = doctype || null;
        if (doctype) {
          doc.appendChild(doctype);
        }
        if (qualifiedName) {
          var root = doc.createElementNS(namespaceURI, qualifiedName);
          doc.appendChild(root);
        }
        return doc;
      },
      /**
       * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
       *
       * __This behavior is slightly different from the in the specs__:
       * - this implementation is not validating names or qualified names
       *   (when parsing XML strings, the SAX parser takes care of that)
       *
       * @param {string} qualifiedName
       * @param {string} [publicId]
       * @param {string} [systemId]
       * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
       * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
       * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
       * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
       *
       * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
       * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
       * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
       */
      createDocumentType: function(qualifiedName, publicId, systemId) {
        var node = new DocumentType();
        node.name = qualifiedName;
        node.nodeName = qualifiedName;
        node.publicId = publicId || "";
        node.systemId = systemId || "";
        return node;
      }
    };
    function Node() {
    }
    Node.prototype = {
      firstChild: null,
      lastChild: null,
      previousSibling: null,
      nextSibling: null,
      attributes: null,
      parentNode: null,
      childNodes: null,
      ownerDocument: null,
      nodeValue: null,
      namespaceURI: null,
      prefix: null,
      localName: null,
      // Modified in DOM Level 2:
      insertBefore: function(newChild, refChild) {
        return _insertBefore(this, newChild, refChild);
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        if (oldChild) {
          this.removeChild(oldChild);
        }
      },
      removeChild: function(oldChild) {
        return _removeChild(this, oldChild);
      },
      appendChild: function(newChild) {
        return this.insertBefore(newChild, null);
      },
      hasChildNodes: function() {
        return this.firstChild != null;
      },
      cloneNode: function(deep) {
        return cloneNode(this.ownerDocument || this, this, deep);
      },
      // Modified in DOM Level 2:
      normalize: function() {
        var child = this.firstChild;
        while (child) {
          var next = child.nextSibling;
          if (next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE) {
            this.removeChild(next);
            child.appendData(next.data);
          } else {
            child.normalize();
            child = next;
          }
        }
      },
      // Introduced in DOM Level 2:
      isSupported: function(feature, version) {
        return this.ownerDocument.implementation.hasFeature(feature, version);
      },
      // Introduced in DOM Level 2:
      hasAttributes: function() {
        return this.attributes.length > 0;
      },
      /**
       * Look up the prefix associated to the given namespace URI, starting from this node.
       * **The default namespace declarations are ignored by this method.**
       * See Namespace Prefix Lookup for details on the algorithm used by this method.
       *
       * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
       *
       * @param {string | null} namespaceURI
       * @returns {string | null}
       * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
       * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
       * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
       * @see https://github.com/xmldom/xmldom/issues/322
       */
      lookupPrefix: function(namespaceURI) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            for (var n in map) {
              if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
                return n;
              }
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      // Introduced in DOM Level 3:
      lookupNamespaceURI: function(prefix) {
        var el = this;
        while (el) {
          var map = el._nsMap;
          if (map) {
            if (Object.prototype.hasOwnProperty.call(map, prefix)) {
              return map[prefix];
            }
          }
          el = el.nodeType == ATTRIBUTE_NODE ? el.ownerDocument : el.parentNode;
        }
        return null;
      },
      // Introduced in DOM Level 3:
      isDefaultNamespace: function(namespaceURI) {
        var prefix = this.lookupPrefix(namespaceURI);
        return prefix == null;
      }
    };
    function _xmlEncoder(c) {
      return c == "<" && "&lt;" || c == ">" && "&gt;" || c == "&" && "&amp;" || c == '"' && "&quot;" || "&#" + c.charCodeAt() + ";";
    }
    copy(NodeType, Node);
    copy(NodeType, Node.prototype);
    function _visitNode(node, callback) {
      if (callback(node)) {
        return true;
      }
      if (node = node.firstChild) {
        do {
          if (_visitNode(node, callback)) {
            return true;
          }
        } while (node = node.nextSibling);
      }
    }
    function Document() {
      this.ownerDocument = this;
    }
    function _onAddAttribute(doc, el, newAttr) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        el._nsMap[newAttr.prefix ? newAttr.localName : ""] = newAttr.value;
      }
    }
    function _onRemoveAttribute(doc, el, newAttr, remove) {
      doc && doc._inc++;
      var ns = newAttr.namespaceURI;
      if (ns === NAMESPACE.XMLNS) {
        delete el._nsMap[newAttr.prefix ? newAttr.localName : ""];
      }
    }
    function _onUpdateChild(doc, el, newChild) {
      if (doc && doc._inc) {
        doc._inc++;
        var cs = el.childNodes;
        if (newChild) {
          cs[cs.length++] = newChild;
        } else {
          var child = el.firstChild;
          var i = 0;
          while (child) {
            cs[i++] = child;
            child = child.nextSibling;
          }
          cs.length = i;
          delete cs[cs.length];
        }
      }
    }
    function _removeChild(parentNode, child) {
      var previous = child.previousSibling;
      var next = child.nextSibling;
      if (previous) {
        previous.nextSibling = next;
      } else {
        parentNode.firstChild = next;
      }
      if (next) {
        next.previousSibling = previous;
      } else {
        parentNode.lastChild = previous;
      }
      child.parentNode = null;
      child.previousSibling = null;
      child.nextSibling = null;
      _onUpdateChild(parentNode.ownerDocument, parentNode);
      return child;
    }
    function hasValidParentNodeType(node) {
      return node && (node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE);
    }
    function hasInsertableNodeType(node) {
      return node && (isElementNode(node) || isTextNode(node) || isDocTypeNode(node) || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.COMMENT_NODE || node.nodeType === Node.PROCESSING_INSTRUCTION_NODE);
    }
    function isDocTypeNode(node) {
      return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
    }
    function isElementNode(node) {
      return node && node.nodeType === Node.ELEMENT_NODE;
    }
    function isTextNode(node) {
      return node && node.nodeType === Node.TEXT_NODE;
    }
    function isElementInsertionPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function isElementReplacementPossible(doc, child) {
      var parentChildNodes = doc.childNodes || [];
      function hasElementChildThatIsNotChild(node) {
        return isElementNode(node) && node !== child;
      }
      if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
        return false;
      }
      var docTypeNode = find(parentChildNodes, isDocTypeNode);
      return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
    }
    function assertPreInsertionValidity1to5(parent, node, child) {
      if (!hasValidParentNodeType(parent)) {
        throw new DOMException(HIERARCHY_REQUEST_ERR, "Unexpected parent node type " + parent.nodeType);
      }
      if (child && child.parentNode !== parent) {
        throw new DOMException(NOT_FOUND_ERR, "child not in parent");
      }
      if (
        // 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
        !hasInsertableNodeType(node) || // 5. If either `node` is a Text node and `parent` is a document,
        // the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
        // || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
        // or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
        isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE
      ) {
        throw new DOMException(
          HIERARCHY_REQUEST_ERR,
          "Unexpected node type " + node.nodeType + " for parent node type " + parent.nodeType
        );
      }
    }
    function assertPreInsertionValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementInsertionPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        if (find(parentChildNodes, isDocTypeNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
        if (!child && parentElementChild) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can not be appended since element is present");
        }
      }
    }
    function assertPreReplacementValidityInDocument(parent, node, child) {
      var parentChildNodes = parent.childNodes || [];
      var nodeChildNodes = node.childNodes || [];
      if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
        var nodeChildElements = nodeChildNodes.filter(isElementNode);
        if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "More than one element or text in fragment");
        }
        if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Element in fragment can not be inserted before doctype");
        }
      }
      if (isElementNode(node)) {
        if (!isElementReplacementPossible(parent, child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one element can be added and only after doctype");
        }
      }
      if (isDocTypeNode(node)) {
        let hasDoctypeChildThatIsNotChild2 = function(node2) {
          return isDocTypeNode(node2) && node2 !== child;
        };
        var hasDoctypeChildThatIsNotChild = hasDoctypeChildThatIsNotChild2;
        if (find(parentChildNodes, hasDoctypeChildThatIsNotChild2)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Only one doctype is allowed");
        }
        var parentElementChild = find(parentChildNodes, isElementNode);
        if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
          throw new DOMException(HIERARCHY_REQUEST_ERR, "Doctype can only be inserted before an element");
        }
      }
    }
    function _insertBefore(parent, node, child, _inDocumentAssertion) {
      assertPreInsertionValidity1to5(parent, node, child);
      if (parent.nodeType === Node.DOCUMENT_NODE) {
        (_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
      }
      var cp = node.parentNode;
      if (cp) {
        cp.removeChild(node);
      }
      if (node.nodeType === DOCUMENT_FRAGMENT_NODE) {
        var newFirst = node.firstChild;
        if (newFirst == null) {
          return node;
        }
        var newLast = node.lastChild;
      } else {
        newFirst = newLast = node;
      }
      var pre = child ? child.previousSibling : parent.lastChild;
      newFirst.previousSibling = pre;
      newLast.nextSibling = child;
      if (pre) {
        pre.nextSibling = newFirst;
      } else {
        parent.firstChild = newFirst;
      }
      if (child == null) {
        parent.lastChild = newLast;
      } else {
        child.previousSibling = newLast;
      }
      do {
        newFirst.parentNode = parent;
      } while (newFirst !== newLast && (newFirst = newFirst.nextSibling));
      _onUpdateChild(parent.ownerDocument || parent, parent);
      if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
        node.firstChild = node.lastChild = null;
      }
      return node;
    }
    function _appendSingleChild(parentNode, newChild) {
      if (newChild.parentNode) {
        newChild.parentNode.removeChild(newChild);
      }
      newChild.parentNode = parentNode;
      newChild.previousSibling = parentNode.lastChild;
      newChild.nextSibling = null;
      if (newChild.previousSibling) {
        newChild.previousSibling.nextSibling = newChild;
      } else {
        parentNode.firstChild = newChild;
      }
      parentNode.lastChild = newChild;
      _onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
      return newChild;
    }
    Document.prototype = {
      //implementation : null,
      nodeName: "#document",
      nodeType: DOCUMENT_NODE,
      /**
       * The DocumentType node of the document.
       *
       * @readonly
       * @type DocumentType
       */
      doctype: null,
      documentElement: null,
      _inc: 1,
      insertBefore: function(newChild, refChild) {
        if (newChild.nodeType == DOCUMENT_FRAGMENT_NODE) {
          var child = newChild.firstChild;
          while (child) {
            var next = child.nextSibling;
            this.insertBefore(child, refChild);
            child = next;
          }
          return newChild;
        }
        _insertBefore(this, newChild, refChild);
        newChild.ownerDocument = this;
        if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
          this.documentElement = newChild;
        }
        return newChild;
      },
      removeChild: function(oldChild) {
        if (this.documentElement == oldChild) {
          this.documentElement = null;
        }
        return _removeChild(this, oldChild);
      },
      replaceChild: function(newChild, oldChild) {
        _insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
        newChild.ownerDocument = this;
        if (oldChild) {
          this.removeChild(oldChild);
        }
        if (isElementNode(newChild)) {
          this.documentElement = newChild;
        }
      },
      // Introduced in DOM Level 2:
      importNode: function(importedNode, deep) {
        return importNode(this, importedNode, deep);
      },
      // Introduced in DOM Level 2:
      getElementById: function(id) {
        var rtv = null;
        _visitNode(this.documentElement, function(node) {
          if (node.nodeType == ELEMENT_NODE) {
            if (node.getAttribute("id") == id) {
              rtv = node;
              return true;
            }
          }
        });
        return rtv;
      },
      /**
       * The `getElementsByClassName` method of `Document` interface returns an array-like object
       * of all child elements which have **all** of the given class name(s).
       *
       * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
       *
       *
       * Warning: This is a live LiveNodeList.
       * Changes in the DOM will reflect in the array as the changes occur.
       * If an element selected by this array no longer qualifies for the selector,
       * it will automatically be removed. Be aware of this for iteration purposes.
       *
       * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
       *
       * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
       * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
       */
      getElementsByClassName: function(classNames) {
        var classNamesSet = toOrderedSet(classNames);
        return new LiveNodeList(this, function(base) {
          var ls = [];
          if (classNamesSet.length > 0) {
            _visitNode(base.documentElement, function(node) {
              if (node !== base && node.nodeType === ELEMENT_NODE) {
                var nodeClassNames = node.getAttribute("class");
                if (nodeClassNames) {
                  var matches = classNames === nodeClassNames;
                  if (!matches) {
                    var nodeClassNamesSet = toOrderedSet(nodeClassNames);
                    matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet));
                  }
                  if (matches) {
                    ls.push(node);
                  }
                }
              }
            });
          }
          return ls;
        });
      },
      //document factory method:
      createElement: function(tagName) {
        var node = new Element();
        node.ownerDocument = this;
        node.nodeName = tagName;
        node.tagName = tagName;
        node.localName = tagName;
        node.childNodes = new NodeList();
        var attrs = node.attributes = new NamedNodeMap();
        attrs._ownerElement = node;
        return node;
      },
      createDocumentFragment: function() {
        var node = new DocumentFragment();
        node.ownerDocument = this;
        node.childNodes = new NodeList();
        return node;
      },
      createTextNode: function(data) {
        var node = new Text();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createComment: function(data) {
        var node = new Comment();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createCDATASection: function(data) {
        var node = new CDATASection();
        node.ownerDocument = this;
        node.appendData(data);
        return node;
      },
      createProcessingInstruction: function(target, data) {
        var node = new ProcessingInstruction();
        node.ownerDocument = this;
        node.tagName = node.nodeName = node.target = target;
        node.nodeValue = node.data = data;
        return node;
      },
      createAttribute: function(name) {
        var node = new Attr();
        node.ownerDocument = this;
        node.name = name;
        node.nodeName = name;
        node.localName = name;
        node.specified = true;
        return node;
      },
      createEntityReference: function(name) {
        var node = new EntityReference();
        node.ownerDocument = this;
        node.nodeName = name;
        return node;
      },
      // Introduced in DOM Level 2:
      createElementNS: function(namespaceURI, qualifiedName) {
        var node = new Element();
        var pl = qualifiedName.split(":");
        var attrs = node.attributes = new NamedNodeMap();
        node.childNodes = new NodeList();
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.tagName = qualifiedName;
        node.namespaceURI = namespaceURI;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        attrs._ownerElement = node;
        return node;
      },
      // Introduced in DOM Level 2:
      createAttributeNS: function(namespaceURI, qualifiedName) {
        var node = new Attr();
        var pl = qualifiedName.split(":");
        node.ownerDocument = this;
        node.nodeName = qualifiedName;
        node.name = qualifiedName;
        node.namespaceURI = namespaceURI;
        node.specified = true;
        if (pl.length == 2) {
          node.prefix = pl[0];
          node.localName = pl[1];
        } else {
          node.localName = qualifiedName;
        }
        return node;
      }
    };
    _extends(Document, Node);
    function Element() {
      this._nsMap = {};
    }
    Element.prototype = {
      nodeType: ELEMENT_NODE,
      hasAttribute: function(name) {
        return this.getAttributeNode(name) != null;
      },
      getAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        return attr && attr.value || "";
      },
      getAttributeNode: function(name) {
        return this.attributes.getNamedItem(name);
      },
      setAttribute: function(name, value) {
        var attr = this.ownerDocument.createAttribute(name);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      removeAttribute: function(name) {
        var attr = this.getAttributeNode(name);
        attr && this.removeAttributeNode(attr);
      },
      //four real opeartion method
      appendChild: function(newChild) {
        if (newChild.nodeType === DOCUMENT_FRAGMENT_NODE) {
          return this.insertBefore(newChild, null);
        } else {
          return _appendSingleChild(this, newChild);
        }
      },
      setAttributeNode: function(newAttr) {
        return this.attributes.setNamedItem(newAttr);
      },
      setAttributeNodeNS: function(newAttr) {
        return this.attributes.setNamedItemNS(newAttr);
      },
      removeAttributeNode: function(oldAttr) {
        return this.attributes.removeNamedItem(oldAttr.nodeName);
      },
      //get real attribute name,and remove it by removeAttributeNode
      removeAttributeNS: function(namespaceURI, localName) {
        var old = this.getAttributeNodeNS(namespaceURI, localName);
        old && this.removeAttributeNode(old);
      },
      hasAttributeNS: function(namespaceURI, localName) {
        return this.getAttributeNodeNS(namespaceURI, localName) != null;
      },
      getAttributeNS: function(namespaceURI, localName) {
        var attr = this.getAttributeNodeNS(namespaceURI, localName);
        return attr && attr.value || "";
      },
      setAttributeNS: function(namespaceURI, qualifiedName, value) {
        var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
        attr.value = attr.nodeValue = "" + value;
        this.setAttributeNode(attr);
      },
      getAttributeNodeNS: function(namespaceURI, localName) {
        return this.attributes.getNamedItemNS(namespaceURI, localName);
      },
      getElementsByTagName: function(tagName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType == ELEMENT_NODE && (tagName === "*" || node.tagName == tagName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      },
      getElementsByTagNameNS: function(namespaceURI, localName) {
        return new LiveNodeList(this, function(base) {
          var ls = [];
          _visitNode(base, function(node) {
            if (node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === "*" || node.namespaceURI === namespaceURI) && (localName === "*" || node.localName == localName)) {
              ls.push(node);
            }
          });
          return ls;
        });
      }
    };
    Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
    Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;
    _extends(Element, Node);
    function Attr() {
    }
    Attr.prototype.nodeType = ATTRIBUTE_NODE;
    _extends(Attr, Node);
    function CharacterData() {
    }
    CharacterData.prototype = {
      data: "",
      substringData: function(offset, count) {
        return this.data.substring(offset, offset + count);
      },
      appendData: function(text) {
        text = this.data + text;
        this.nodeValue = this.data = text;
        this.length = text.length;
      },
      insertData: function(offset, text) {
        this.replaceData(offset, 0, text);
      },
      appendChild: function(newChild) {
        throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR]);
      },
      deleteData: function(offset, count) {
        this.replaceData(offset, count, "");
      },
      replaceData: function(offset, count, text) {
        var start = this.data.substring(0, offset);
        var end = this.data.substring(offset + count);
        text = start + text + end;
        this.nodeValue = this.data = text;
        this.length = text.length;
      }
    };
    _extends(CharacterData, Node);
    function Text() {
    }
    Text.prototype = {
      nodeName: "#text",
      nodeType: TEXT_NODE,
      splitText: function(offset) {
        var text = this.data;
        var newText = text.substring(offset);
        text = text.substring(0, offset);
        this.data = this.nodeValue = text;
        this.length = text.length;
        var newNode = this.ownerDocument.createTextNode(newText);
        if (this.parentNode) {
          this.parentNode.insertBefore(newNode, this.nextSibling);
        }
        return newNode;
      }
    };
    _extends(Text, CharacterData);
    function Comment() {
    }
    Comment.prototype = {
      nodeName: "#comment",
      nodeType: COMMENT_NODE
    };
    _extends(Comment, CharacterData);
    function CDATASection() {
    }
    CDATASection.prototype = {
      nodeName: "#cdata-section",
      nodeType: CDATA_SECTION_NODE
    };
    _extends(CDATASection, CharacterData);
    function DocumentType() {
    }
    DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
    _extends(DocumentType, Node);
    function Notation() {
    }
    Notation.prototype.nodeType = NOTATION_NODE;
    _extends(Notation, Node);
    function Entity() {
    }
    Entity.prototype.nodeType = ENTITY_NODE;
    _extends(Entity, Node);
    function EntityReference() {
    }
    EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
    _extends(EntityReference, Node);
    function DocumentFragment() {
    }
    DocumentFragment.prototype.nodeName = "#document-fragment";
    DocumentFragment.prototype.nodeType = DOCUMENT_FRAGMENT_NODE;
    _extends(DocumentFragment, Node);
    function ProcessingInstruction() {
    }
    ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
    _extends(ProcessingInstruction, Node);
    function XMLSerializer() {
    }
    XMLSerializer.prototype.serializeToString = function(node, isHtml, nodeFilter) {
      return nodeSerializeToString.call(node, isHtml, nodeFilter);
    };
    Node.prototype.toString = nodeSerializeToString;
    function nodeSerializeToString(isHtml, nodeFilter) {
      var buf = [];
      var refNode = this.nodeType == 9 && this.documentElement || this;
      var prefix = refNode.prefix;
      var uri = refNode.namespaceURI;
      if (uri && prefix == null) {
        var prefix = refNode.lookupPrefix(uri);
        if (prefix == null) {
          var visibleNamespaces = [
            { namespace: uri, prefix: null }
            //{namespace:uri,prefix:''}
          ];
        }
      }
      serializeToString(this, buf, isHtml, nodeFilter, visibleNamespaces);
      return buf.join("");
    }
    function needNamespaceDefine(node, isHTML, visibleNamespaces) {
      var prefix = node.prefix || "";
      var uri = node.namespaceURI;
      if (!uri) {
        return false;
      }
      if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
        return false;
      }
      var i = visibleNamespaces.length;
      while (i--) {
        var ns = visibleNamespaces[i];
        if (ns.prefix === prefix) {
          return ns.namespace !== uri;
        }
      }
      return true;
    }
    function addSerializedAttribute(buf, qualifiedName, value) {
      buf.push(" ", qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"');
    }
    function serializeToString(node, buf, isHTML, nodeFilter, visibleNamespaces) {
      if (!visibleNamespaces) {
        visibleNamespaces = [];
      }
      if (nodeFilter) {
        node = nodeFilter(node);
        if (node) {
          if (typeof node == "string") {
            buf.push(node);
            return;
          }
        } else {
          return;
        }
      }
      switch (node.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var len = attrs.length;
          var child = node.firstChild;
          var nodeName = node.tagName;
          isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML;
          var prefixedNodeName = nodeName;
          if (!isHTML && !node.prefix && node.namespaceURI) {
            var defaultNS;
            for (var ai = 0; ai < attrs.length; ai++) {
              if (attrs.item(ai).name === "xmlns") {
                defaultNS = attrs.item(ai).value;
                break;
              }
            }
            if (!defaultNS) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.prefix === "" && namespace.namespace === node.namespaceURI) {
                  defaultNS = namespace.namespace;
                  break;
                }
              }
            }
            if (defaultNS !== node.namespaceURI) {
              for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
                var namespace = visibleNamespaces[nsi];
                if (namespace.namespace === node.namespaceURI) {
                  if (namespace.prefix) {
                    prefixedNodeName = namespace.prefix + ":" + nodeName;
                  }
                  break;
                }
              }
            }
          }
          buf.push("<", prefixedNodeName);
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (attr.prefix == "xmlns") {
              visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
            } else if (attr.nodeName == "xmlns") {
              visibleNamespaces.push({ prefix: "", namespace: attr.value });
            }
          }
          for (var i = 0; i < len; i++) {
            var attr = attrs.item(i);
            if (needNamespaceDefine(attr, isHTML, visibleNamespaces)) {
              var prefix = attr.prefix || "";
              var uri = attr.namespaceURI;
              addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
              visibleNamespaces.push({ prefix, namespace: uri });
            }
            serializeToString(attr, buf, isHTML, nodeFilter, visibleNamespaces);
          }
          if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
            var prefix = node.prefix || "";
            var uri = node.namespaceURI;
            addSerializedAttribute(buf, prefix ? "xmlns:" + prefix : "xmlns", uri);
            visibleNamespaces.push({ prefix, namespace: uri });
          }
          if (child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)) {
            buf.push(">");
            if (isHTML && /^script$/i.test(nodeName)) {
              while (child) {
                if (child.data) {
                  buf.push(child.data);
                } else {
                  serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                }
                child = child.nextSibling;
              }
            } else {
              while (child) {
                serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
                child = child.nextSibling;
              }
            }
            buf.push("</", prefixedNodeName, ">");
          } else {
            buf.push("/>");
          }
          return;
        case DOCUMENT_NODE:
        case DOCUMENT_FRAGMENT_NODE:
          var child = node.firstChild;
          while (child) {
            serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
            child = child.nextSibling;
          }
          return;
        case ATTRIBUTE_NODE:
          return addSerializedAttribute(buf, node.name, node.value);
        case TEXT_NODE:
          return buf.push(
            node.data.replace(/[<&>]/g, _xmlEncoder)
          );
        case CDATA_SECTION_NODE:
          return buf.push("<![CDATA[", node.data, "]]>");
        case COMMENT_NODE:
          return buf.push("<!--", node.data, "-->");
        case DOCUMENT_TYPE_NODE:
          var pubid = node.publicId;
          var sysid = node.systemId;
          buf.push("<!DOCTYPE ", node.name);
          if (pubid) {
            buf.push(" PUBLIC ", pubid);
            if (sysid && sysid != ".") {
              buf.push(" ", sysid);
            }
            buf.push(">");
          } else if (sysid && sysid != ".") {
            buf.push(" SYSTEM ", sysid, ">");
          } else {
            var sub = node.internalSubset;
            if (sub) {
              buf.push(" [", sub, "]");
            }
            buf.push(">");
          }
          return;
        case PROCESSING_INSTRUCTION_NODE:
          return buf.push("<?", node.target, " ", node.data, "?>");
        case ENTITY_REFERENCE_NODE:
          return buf.push("&", node.nodeName, ";");
        default:
          buf.push("??", node.nodeName);
      }
    }
    function importNode(doc, node, deep) {
      var node2;
      switch (node.nodeType) {
        case ELEMENT_NODE:
          node2 = node.cloneNode(false);
          node2.ownerDocument = doc;
        case DOCUMENT_FRAGMENT_NODE:
          break;
        case ATTRIBUTE_NODE:
          deep = true;
          break;
      }
      if (!node2) {
        node2 = node.cloneNode(false);
      }
      node2.ownerDocument = doc;
      node2.parentNode = null;
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(importNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function cloneNode(doc, node, deep) {
      var node2 = new node.constructor();
      for (var n in node) {
        if (Object.prototype.hasOwnProperty.call(node, n)) {
          var v = node[n];
          if (typeof v != "object") {
            if (v != node2[n]) {
              node2[n] = v;
            }
          }
        }
      }
      if (node.childNodes) {
        node2.childNodes = new NodeList();
      }
      node2.ownerDocument = doc;
      switch (node2.nodeType) {
        case ELEMENT_NODE:
          var attrs = node.attributes;
          var attrs2 = node2.attributes = new NamedNodeMap();
          var len = attrs.length;
          attrs2._ownerElement = node2;
          for (var i = 0; i < len; i++) {
            node2.setAttributeNode(cloneNode(doc, attrs.item(i), true));
          }
          break;
          ;
        case ATTRIBUTE_NODE:
          deep = true;
      }
      if (deep) {
        var child = node.firstChild;
        while (child) {
          node2.appendChild(cloneNode(doc, child, deep));
          child = child.nextSibling;
        }
      }
      return node2;
    }
    function __set__(object, key, value) {
      object[key] = value;
    }
    try {
      if (Object.defineProperty) {
        let getTextContent2 = function(node) {
          switch (node.nodeType) {
            case ELEMENT_NODE:
            case DOCUMENT_FRAGMENT_NODE:
              var buf = [];
              node = node.firstChild;
              while (node) {
                if (node.nodeType !== 7 && node.nodeType !== 8) {
                  buf.push(getTextContent2(node));
                }
                node = node.nextSibling;
              }
              return buf.join("");
            default:
              return node.nodeValue;
          }
        };
        getTextContent = getTextContent2;
        Object.defineProperty(LiveNodeList.prototype, "length", {
          get: function() {
            _updateLiveList(this);
            return this.$$length;
          }
        });
        Object.defineProperty(Node.prototype, "textContent", {
          get: function() {
            return getTextContent2(this);
          },
          set: function(data) {
            switch (this.nodeType) {
              case ELEMENT_NODE:
              case DOCUMENT_FRAGMENT_NODE:
                while (this.firstChild) {
                  this.removeChild(this.firstChild);
                }
                if (data || String(data)) {
                  this.appendChild(this.ownerDocument.createTextNode(data));
                }
                break;
              default:
                this.data = data;
                this.value = data;
                this.nodeValue = data;
            }
          }
        });
        __set__ = function(object, key, value) {
          object["$$" + key] = value;
        };
      }
    } catch (e) {
    }
    var getTextContent;
    exports.DocumentType = DocumentType;
    exports.DOMException = DOMException;
    exports.DOMImplementation = DOMImplementation;
    exports.Element = Element;
    exports.Node = Node;
    exports.NodeList = NodeList;
    exports.XMLSerializer = XMLSerializer;
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/entities.js
var require_entities = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/entities.js"(exports) {
    "use strict";
    var freeze = require_conventions().freeze;
    exports.XML_ENTITIES = freeze({
      amp: "&",
      apos: "'",
      gt: ">",
      lt: "<",
      quot: '"'
    });
    exports.HTML_ENTITIES = freeze({
      Aacute: "Á",
      aacute: "á",
      Abreve: "Ă",
      abreve: "ă",
      ac: "∾",
      acd: "∿",
      acE: "∾̳",
      Acirc: "Â",
      acirc: "â",
      acute: "´",
      Acy: "А",
      acy: "а",
      AElig: "Æ",
      aelig: "æ",
      af: "⁡",
      Afr: "𝔄",
      afr: "𝔞",
      Agrave: "À",
      agrave: "à",
      alefsym: "ℵ",
      aleph: "ℵ",
      Alpha: "Α",
      alpha: "α",
      Amacr: "Ā",
      amacr: "ā",
      amalg: "⨿",
      AMP: "&",
      amp: "&",
      And: "⩓",
      and: "∧",
      andand: "⩕",
      andd: "⩜",
      andslope: "⩘",
      andv: "⩚",
      ang: "∠",
      ange: "⦤",
      angle: "∠",
      angmsd: "∡",
      angmsdaa: "⦨",
      angmsdab: "⦩",
      angmsdac: "⦪",
      angmsdad: "⦫",
      angmsdae: "⦬",
      angmsdaf: "⦭",
      angmsdag: "⦮",
      angmsdah: "⦯",
      angrt: "∟",
      angrtvb: "⊾",
      angrtvbd: "⦝",
      angsph: "∢",
      angst: "Å",
      angzarr: "⍼",
      Aogon: "Ą",
      aogon: "ą",
      Aopf: "𝔸",
      aopf: "𝕒",
      ap: "≈",
      apacir: "⩯",
      apE: "⩰",
      ape: "≊",
      apid: "≋",
      apos: "'",
      ApplyFunction: "⁡",
      approx: "≈",
      approxeq: "≊",
      Aring: "Å",
      aring: "å",
      Ascr: "𝒜",
      ascr: "𝒶",
      Assign: "≔",
      ast: "*",
      asymp: "≈",
      asympeq: "≍",
      Atilde: "Ã",
      atilde: "ã",
      Auml: "Ä",
      auml: "ä",
      awconint: "∳",
      awint: "⨑",
      backcong: "≌",
      backepsilon: "϶",
      backprime: "‵",
      backsim: "∽",
      backsimeq: "⋍",
      Backslash: "∖",
      Barv: "⫧",
      barvee: "⊽",
      Barwed: "⌆",
      barwed: "⌅",
      barwedge: "⌅",
      bbrk: "⎵",
      bbrktbrk: "⎶",
      bcong: "≌",
      Bcy: "Б",
      bcy: "б",
      bdquo: "„",
      becaus: "∵",
      Because: "∵",
      because: "∵",
      bemptyv: "⦰",
      bepsi: "϶",
      bernou: "ℬ",
      Bernoullis: "ℬ",
      Beta: "Β",
      beta: "β",
      beth: "ℶ",
      between: "≬",
      Bfr: "𝔅",
      bfr: "𝔟",
      bigcap: "⋂",
      bigcirc: "◯",
      bigcup: "⋃",
      bigodot: "⨀",
      bigoplus: "⨁",
      bigotimes: "⨂",
      bigsqcup: "⨆",
      bigstar: "★",
      bigtriangledown: "▽",
      bigtriangleup: "△",
      biguplus: "⨄",
      bigvee: "⋁",
      bigwedge: "⋀",
      bkarow: "⤍",
      blacklozenge: "⧫",
      blacksquare: "▪",
      blacktriangle: "▴",
      blacktriangledown: "▾",
      blacktriangleleft: "◂",
      blacktriangleright: "▸",
      blank: "␣",
      blk12: "▒",
      blk14: "░",
      blk34: "▓",
      block: "█",
      bne: "=⃥",
      bnequiv: "≡⃥",
      bNot: "⫭",
      bnot: "⌐",
      Bopf: "𝔹",
      bopf: "𝕓",
      bot: "⊥",
      bottom: "⊥",
      bowtie: "⋈",
      boxbox: "⧉",
      boxDL: "╗",
      boxDl: "╖",
      boxdL: "╕",
      boxdl: "┐",
      boxDR: "╔",
      boxDr: "╓",
      boxdR: "╒",
      boxdr: "┌",
      boxH: "═",
      boxh: "─",
      boxHD: "╦",
      boxHd: "╤",
      boxhD: "╥",
      boxhd: "┬",
      boxHU: "╩",
      boxHu: "╧",
      boxhU: "╨",
      boxhu: "┴",
      boxminus: "⊟",
      boxplus: "⊞",
      boxtimes: "⊠",
      boxUL: "╝",
      boxUl: "╜",
      boxuL: "╛",
      boxul: "┘",
      boxUR: "╚",
      boxUr: "╙",
      boxuR: "╘",
      boxur: "└",
      boxV: "║",
      boxv: "│",
      boxVH: "╬",
      boxVh: "╫",
      boxvH: "╪",
      boxvh: "┼",
      boxVL: "╣",
      boxVl: "╢",
      boxvL: "╡",
      boxvl: "┤",
      boxVR: "╠",
      boxVr: "╟",
      boxvR: "╞",
      boxvr: "├",
      bprime: "‵",
      Breve: "˘",
      breve: "˘",
      brvbar: "¦",
      Bscr: "ℬ",
      bscr: "𝒷",
      bsemi: "⁏",
      bsim: "∽",
      bsime: "⋍",
      bsol: "\\",
      bsolb: "⧅",
      bsolhsub: "⟈",
      bull: "•",
      bullet: "•",
      bump: "≎",
      bumpE: "⪮",
      bumpe: "≏",
      Bumpeq: "≎",
      bumpeq: "≏",
      Cacute: "Ć",
      cacute: "ć",
      Cap: "⋒",
      cap: "∩",
      capand: "⩄",
      capbrcup: "⩉",
      capcap: "⩋",
      capcup: "⩇",
      capdot: "⩀",
      CapitalDifferentialD: "ⅅ",
      caps: "∩︀",
      caret: "⁁",
      caron: "ˇ",
      Cayleys: "ℭ",
      ccaps: "⩍",
      Ccaron: "Č",
      ccaron: "č",
      Ccedil: "Ç",
      ccedil: "ç",
      Ccirc: "Ĉ",
      ccirc: "ĉ",
      Cconint: "∰",
      ccups: "⩌",
      ccupssm: "⩐",
      Cdot: "Ċ",
      cdot: "ċ",
      cedil: "¸",
      Cedilla: "¸",
      cemptyv: "⦲",
      cent: "¢",
      CenterDot: "·",
      centerdot: "·",
      Cfr: "ℭ",
      cfr: "𝔠",
      CHcy: "Ч",
      chcy: "ч",
      check: "✓",
      checkmark: "✓",
      Chi: "Χ",
      chi: "χ",
      cir: "○",
      circ: "ˆ",
      circeq: "≗",
      circlearrowleft: "↺",
      circlearrowright: "↻",
      circledast: "⊛",
      circledcirc: "⊚",
      circleddash: "⊝",
      CircleDot: "⊙",
      circledR: "®",
      circledS: "Ⓢ",
      CircleMinus: "⊖",
      CirclePlus: "⊕",
      CircleTimes: "⊗",
      cirE: "⧃",
      cire: "≗",
      cirfnint: "⨐",
      cirmid: "⫯",
      cirscir: "⧂",
      ClockwiseContourIntegral: "∲",
      CloseCurlyDoubleQuote: "”",
      CloseCurlyQuote: "’",
      clubs: "♣",
      clubsuit: "♣",
      Colon: "∷",
      colon: ":",
      Colone: "⩴",
      colone: "≔",
      coloneq: "≔",
      comma: ",",
      commat: "@",
      comp: "∁",
      compfn: "∘",
      complement: "∁",
      complexes: "ℂ",
      cong: "≅",
      congdot: "⩭",
      Congruent: "≡",
      Conint: "∯",
      conint: "∮",
      ContourIntegral: "∮",
      Copf: "ℂ",
      copf: "𝕔",
      coprod: "∐",
      Coproduct: "∐",
      COPY: "©",
      copy: "©",
      copysr: "℗",
      CounterClockwiseContourIntegral: "∳",
      crarr: "↵",
      Cross: "⨯",
      cross: "✗",
      Cscr: "𝒞",
      cscr: "𝒸",
      csub: "⫏",
      csube: "⫑",
      csup: "⫐",
      csupe: "⫒",
      ctdot: "⋯",
      cudarrl: "⤸",
      cudarrr: "⤵",
      cuepr: "⋞",
      cuesc: "⋟",
      cularr: "↶",
      cularrp: "⤽",
      Cup: "⋓",
      cup: "∪",
      cupbrcap: "⩈",
      CupCap: "≍",
      cupcap: "⩆",
      cupcup: "⩊",
      cupdot: "⊍",
      cupor: "⩅",
      cups: "∪︀",
      curarr: "↷",
      curarrm: "⤼",
      curlyeqprec: "⋞",
      curlyeqsucc: "⋟",
      curlyvee: "⋎",
      curlywedge: "⋏",
      curren: "¤",
      curvearrowleft: "↶",
      curvearrowright: "↷",
      cuvee: "⋎",
      cuwed: "⋏",
      cwconint: "∲",
      cwint: "∱",
      cylcty: "⌭",
      Dagger: "‡",
      dagger: "†",
      daleth: "ℸ",
      Darr: "↡",
      dArr: "⇓",
      darr: "↓",
      dash: "‐",
      Dashv: "⫤",
      dashv: "⊣",
      dbkarow: "⤏",
      dblac: "˝",
      Dcaron: "Ď",
      dcaron: "ď",
      Dcy: "Д",
      dcy: "д",
      DD: "ⅅ",
      dd: "ⅆ",
      ddagger: "‡",
      ddarr: "⇊",
      DDotrahd: "⤑",
      ddotseq: "⩷",
      deg: "°",
      Del: "∇",
      Delta: "Δ",
      delta: "δ",
      demptyv: "⦱",
      dfisht: "⥿",
      Dfr: "𝔇",
      dfr: "𝔡",
      dHar: "⥥",
      dharl: "⇃",
      dharr: "⇂",
      DiacriticalAcute: "´",
      DiacriticalDot: "˙",
      DiacriticalDoubleAcute: "˝",
      DiacriticalGrave: "`",
      DiacriticalTilde: "˜",
      diam: "⋄",
      Diamond: "⋄",
      diamond: "⋄",
      diamondsuit: "♦",
      diams: "♦",
      die: "¨",
      DifferentialD: "ⅆ",
      digamma: "ϝ",
      disin: "⋲",
      div: "÷",
      divide: "÷",
      divideontimes: "⋇",
      divonx: "⋇",
      DJcy: "Ђ",
      djcy: "ђ",
      dlcorn: "⌞",
      dlcrop: "⌍",
      dollar: "$",
      Dopf: "𝔻",
      dopf: "𝕕",
      Dot: "¨",
      dot: "˙",
      DotDot: "⃜",
      doteq: "≐",
      doteqdot: "≑",
      DotEqual: "≐",
      dotminus: "∸",
      dotplus: "∔",
      dotsquare: "⊡",
      doublebarwedge: "⌆",
      DoubleContourIntegral: "∯",
      DoubleDot: "¨",
      DoubleDownArrow: "⇓",
      DoubleLeftArrow: "⇐",
      DoubleLeftRightArrow: "⇔",
      DoubleLeftTee: "⫤",
      DoubleLongLeftArrow: "⟸",
      DoubleLongLeftRightArrow: "⟺",
      DoubleLongRightArrow: "⟹",
      DoubleRightArrow: "⇒",
      DoubleRightTee: "⊨",
      DoubleUpArrow: "⇑",
      DoubleUpDownArrow: "⇕",
      DoubleVerticalBar: "∥",
      DownArrow: "↓",
      Downarrow: "⇓",
      downarrow: "↓",
      DownArrowBar: "⤓",
      DownArrowUpArrow: "⇵",
      DownBreve: "̑",
      downdownarrows: "⇊",
      downharpoonleft: "⇃",
      downharpoonright: "⇂",
      DownLeftRightVector: "⥐",
      DownLeftTeeVector: "⥞",
      DownLeftVector: "↽",
      DownLeftVectorBar: "⥖",
      DownRightTeeVector: "⥟",
      DownRightVector: "⇁",
      DownRightVectorBar: "⥗",
      DownTee: "⊤",
      DownTeeArrow: "↧",
      drbkarow: "⤐",
      drcorn: "⌟",
      drcrop: "⌌",
      Dscr: "𝒟",
      dscr: "𝒹",
      DScy: "Ѕ",
      dscy: "ѕ",
      dsol: "⧶",
      Dstrok: "Đ",
      dstrok: "đ",
      dtdot: "⋱",
      dtri: "▿",
      dtrif: "▾",
      duarr: "⇵",
      duhar: "⥯",
      dwangle: "⦦",
      DZcy: "Џ",
      dzcy: "џ",
      dzigrarr: "⟿",
      Eacute: "É",
      eacute: "é",
      easter: "⩮",
      Ecaron: "Ě",
      ecaron: "ě",
      ecir: "≖",
      Ecirc: "Ê",
      ecirc: "ê",
      ecolon: "≕",
      Ecy: "Э",
      ecy: "э",
      eDDot: "⩷",
      Edot: "Ė",
      eDot: "≑",
      edot: "ė",
      ee: "ⅇ",
      efDot: "≒",
      Efr: "𝔈",
      efr: "𝔢",
      eg: "⪚",
      Egrave: "È",
      egrave: "è",
      egs: "⪖",
      egsdot: "⪘",
      el: "⪙",
      Element: "∈",
      elinters: "⏧",
      ell: "ℓ",
      els: "⪕",
      elsdot: "⪗",
      Emacr: "Ē",
      emacr: "ē",
      empty: "∅",
      emptyset: "∅",
      EmptySmallSquare: "◻",
      emptyv: "∅",
      EmptyVerySmallSquare: "▫",
      emsp: " ",
      emsp13: " ",
      emsp14: " ",
      ENG: "Ŋ",
      eng: "ŋ",
      ensp: " ",
      Eogon: "Ę",
      eogon: "ę",
      Eopf: "𝔼",
      eopf: "𝕖",
      epar: "⋕",
      eparsl: "⧣",
      eplus: "⩱",
      epsi: "ε",
      Epsilon: "Ε",
      epsilon: "ε",
      epsiv: "ϵ",
      eqcirc: "≖",
      eqcolon: "≕",
      eqsim: "≂",
      eqslantgtr: "⪖",
      eqslantless: "⪕",
      Equal: "⩵",
      equals: "=",
      EqualTilde: "≂",
      equest: "≟",
      Equilibrium: "⇌",
      equiv: "≡",
      equivDD: "⩸",
      eqvparsl: "⧥",
      erarr: "⥱",
      erDot: "≓",
      Escr: "ℰ",
      escr: "ℯ",
      esdot: "≐",
      Esim: "⩳",
      esim: "≂",
      Eta: "Η",
      eta: "η",
      ETH: "Ð",
      eth: "ð",
      Euml: "Ë",
      euml: "ë",
      euro: "€",
      excl: "!",
      exist: "∃",
      Exists: "∃",
      expectation: "ℰ",
      ExponentialE: "ⅇ",
      exponentiale: "ⅇ",
      fallingdotseq: "≒",
      Fcy: "Ф",
      fcy: "ф",
      female: "♀",
      ffilig: "ﬃ",
      fflig: "ﬀ",
      ffllig: "ﬄ",
      Ffr: "𝔉",
      ffr: "𝔣",
      filig: "ﬁ",
      FilledSmallSquare: "◼",
      FilledVerySmallSquare: "▪",
      fjlig: "fj",
      flat: "♭",
      fllig: "ﬂ",
      fltns: "▱",
      fnof: "ƒ",
      Fopf: "𝔽",
      fopf: "𝕗",
      ForAll: "∀",
      forall: "∀",
      fork: "⋔",
      forkv: "⫙",
      Fouriertrf: "ℱ",
      fpartint: "⨍",
      frac12: "½",
      frac13: "⅓",
      frac14: "¼",
      frac15: "⅕",
      frac16: "⅙",
      frac18: "⅛",
      frac23: "⅔",
      frac25: "⅖",
      frac34: "¾",
      frac35: "⅗",
      frac38: "⅜",
      frac45: "⅘",
      frac56: "⅚",
      frac58: "⅝",
      frac78: "⅞",
      frasl: "⁄",
      frown: "⌢",
      Fscr: "ℱ",
      fscr: "𝒻",
      gacute: "ǵ",
      Gamma: "Γ",
      gamma: "γ",
      Gammad: "Ϝ",
      gammad: "ϝ",
      gap: "⪆",
      Gbreve: "Ğ",
      gbreve: "ğ",
      Gcedil: "Ģ",
      Gcirc: "Ĝ",
      gcirc: "ĝ",
      Gcy: "Г",
      gcy: "г",
      Gdot: "Ġ",
      gdot: "ġ",
      gE: "≧",
      ge: "≥",
      gEl: "⪌",
      gel: "⋛",
      geq: "≥",
      geqq: "≧",
      geqslant: "⩾",
      ges: "⩾",
      gescc: "⪩",
      gesdot: "⪀",
      gesdoto: "⪂",
      gesdotol: "⪄",
      gesl: "⋛︀",
      gesles: "⪔",
      Gfr: "𝔊",
      gfr: "𝔤",
      Gg: "⋙",
      gg: "≫",
      ggg: "⋙",
      gimel: "ℷ",
      GJcy: "Ѓ",
      gjcy: "ѓ",
      gl: "≷",
      gla: "⪥",
      glE: "⪒",
      glj: "⪤",
      gnap: "⪊",
      gnapprox: "⪊",
      gnE: "≩",
      gne: "⪈",
      gneq: "⪈",
      gneqq: "≩",
      gnsim: "⋧",
      Gopf: "𝔾",
      gopf: "𝕘",
      grave: "`",
      GreaterEqual: "≥",
      GreaterEqualLess: "⋛",
      GreaterFullEqual: "≧",
      GreaterGreater: "⪢",
      GreaterLess: "≷",
      GreaterSlantEqual: "⩾",
      GreaterTilde: "≳",
      Gscr: "𝒢",
      gscr: "ℊ",
      gsim: "≳",
      gsime: "⪎",
      gsiml: "⪐",
      Gt: "≫",
      GT: ">",
      gt: ">",
      gtcc: "⪧",
      gtcir: "⩺",
      gtdot: "⋗",
      gtlPar: "⦕",
      gtquest: "⩼",
      gtrapprox: "⪆",
      gtrarr: "⥸",
      gtrdot: "⋗",
      gtreqless: "⋛",
      gtreqqless: "⪌",
      gtrless: "≷",
      gtrsim: "≳",
      gvertneqq: "≩︀",
      gvnE: "≩︀",
      Hacek: "ˇ",
      hairsp: " ",
      half: "½",
      hamilt: "ℋ",
      HARDcy: "Ъ",
      hardcy: "ъ",
      hArr: "⇔",
      harr: "↔",
      harrcir: "⥈",
      harrw: "↭",
      Hat: "^",
      hbar: "ℏ",
      Hcirc: "Ĥ",
      hcirc: "ĥ",
      hearts: "♥",
      heartsuit: "♥",
      hellip: "…",
      hercon: "⊹",
      Hfr: "ℌ",
      hfr: "𝔥",
      HilbertSpace: "ℋ",
      hksearow: "⤥",
      hkswarow: "⤦",
      hoarr: "⇿",
      homtht: "∻",
      hookleftarrow: "↩",
      hookrightarrow: "↪",
      Hopf: "ℍ",
      hopf: "𝕙",
      horbar: "―",
      HorizontalLine: "─",
      Hscr: "ℋ",
      hscr: "𝒽",
      hslash: "ℏ",
      Hstrok: "Ħ",
      hstrok: "ħ",
      HumpDownHump: "≎",
      HumpEqual: "≏",
      hybull: "⁃",
      hyphen: "‐",
      Iacute: "Í",
      iacute: "í",
      ic: "⁣",
      Icirc: "Î",
      icirc: "î",
      Icy: "И",
      icy: "и",
      Idot: "İ",
      IEcy: "Е",
      iecy: "е",
      iexcl: "¡",
      iff: "⇔",
      Ifr: "ℑ",
      ifr: "𝔦",
      Igrave: "Ì",
      igrave: "ì",
      ii: "ⅈ",
      iiiint: "⨌",
      iiint: "∭",
      iinfin: "⧜",
      iiota: "℩",
      IJlig: "Ĳ",
      ijlig: "ĳ",
      Im: "ℑ",
      Imacr: "Ī",
      imacr: "ī",
      image: "ℑ",
      ImaginaryI: "ⅈ",
      imagline: "ℐ",
      imagpart: "ℑ",
      imath: "ı",
      imof: "⊷",
      imped: "Ƶ",
      Implies: "⇒",
      in: "∈",
      incare: "℅",
      infin: "∞",
      infintie: "⧝",
      inodot: "ı",
      Int: "∬",
      int: "∫",
      intcal: "⊺",
      integers: "ℤ",
      Integral: "∫",
      intercal: "⊺",
      Intersection: "⋂",
      intlarhk: "⨗",
      intprod: "⨼",
      InvisibleComma: "⁣",
      InvisibleTimes: "⁢",
      IOcy: "Ё",
      iocy: "ё",
      Iogon: "Į",
      iogon: "į",
      Iopf: "𝕀",
      iopf: "𝕚",
      Iota: "Ι",
      iota: "ι",
      iprod: "⨼",
      iquest: "¿",
      Iscr: "ℐ",
      iscr: "𝒾",
      isin: "∈",
      isindot: "⋵",
      isinE: "⋹",
      isins: "⋴",
      isinsv: "⋳",
      isinv: "∈",
      it: "⁢",
      Itilde: "Ĩ",
      itilde: "ĩ",
      Iukcy: "І",
      iukcy: "і",
      Iuml: "Ï",
      iuml: "ï",
      Jcirc: "Ĵ",
      jcirc: "ĵ",
      Jcy: "Й",
      jcy: "й",
      Jfr: "𝔍",
      jfr: "𝔧",
      jmath: "ȷ",
      Jopf: "𝕁",
      jopf: "𝕛",
      Jscr: "𝒥",
      jscr: "𝒿",
      Jsercy: "Ј",
      jsercy: "ј",
      Jukcy: "Є",
      jukcy: "є",
      Kappa: "Κ",
      kappa: "κ",
      kappav: "ϰ",
      Kcedil: "Ķ",
      kcedil: "ķ",
      Kcy: "К",
      kcy: "к",
      Kfr: "𝔎",
      kfr: "𝔨",
      kgreen: "ĸ",
      KHcy: "Х",
      khcy: "х",
      KJcy: "Ќ",
      kjcy: "ќ",
      Kopf: "𝕂",
      kopf: "𝕜",
      Kscr: "𝒦",
      kscr: "𝓀",
      lAarr: "⇚",
      Lacute: "Ĺ",
      lacute: "ĺ",
      laemptyv: "⦴",
      lagran: "ℒ",
      Lambda: "Λ",
      lambda: "λ",
      Lang: "⟪",
      lang: "⟨",
      langd: "⦑",
      langle: "⟨",
      lap: "⪅",
      Laplacetrf: "ℒ",
      laquo: "«",
      Larr: "↞",
      lArr: "⇐",
      larr: "←",
      larrb: "⇤",
      larrbfs: "⤟",
      larrfs: "⤝",
      larrhk: "↩",
      larrlp: "↫",
      larrpl: "⤹",
      larrsim: "⥳",
      larrtl: "↢",
      lat: "⪫",
      lAtail: "⤛",
      latail: "⤙",
      late: "⪭",
      lates: "⪭︀",
      lBarr: "⤎",
      lbarr: "⤌",
      lbbrk: "❲",
      lbrace: "{",
      lbrack: "[",
      lbrke: "⦋",
      lbrksld: "⦏",
      lbrkslu: "⦍",
      Lcaron: "Ľ",
      lcaron: "ľ",
      Lcedil: "Ļ",
      lcedil: "ļ",
      lceil: "⌈",
      lcub: "{",
      Lcy: "Л",
      lcy: "л",
      ldca: "⤶",
      ldquo: "“",
      ldquor: "„",
      ldrdhar: "⥧",
      ldrushar: "⥋",
      ldsh: "↲",
      lE: "≦",
      le: "≤",
      LeftAngleBracket: "⟨",
      LeftArrow: "←",
      Leftarrow: "⇐",
      leftarrow: "←",
      LeftArrowBar: "⇤",
      LeftArrowRightArrow: "⇆",
      leftarrowtail: "↢",
      LeftCeiling: "⌈",
      LeftDoubleBracket: "⟦",
      LeftDownTeeVector: "⥡",
      LeftDownVector: "⇃",
      LeftDownVectorBar: "⥙",
      LeftFloor: "⌊",
      leftharpoondown: "↽",
      leftharpoonup: "↼",
      leftleftarrows: "⇇",
      LeftRightArrow: "↔",
      Leftrightarrow: "⇔",
      leftrightarrow: "↔",
      leftrightarrows: "⇆",
      leftrightharpoons: "⇋",
      leftrightsquigarrow: "↭",
      LeftRightVector: "⥎",
      LeftTee: "⊣",
      LeftTeeArrow: "↤",
      LeftTeeVector: "⥚",
      leftthreetimes: "⋋",
      LeftTriangle: "⊲",
      LeftTriangleBar: "⧏",
      LeftTriangleEqual: "⊴",
      LeftUpDownVector: "⥑",
      LeftUpTeeVector: "⥠",
      LeftUpVector: "↿",
      LeftUpVectorBar: "⥘",
      LeftVector: "↼",
      LeftVectorBar: "⥒",
      lEg: "⪋",
      leg: "⋚",
      leq: "≤",
      leqq: "≦",
      leqslant: "⩽",
      les: "⩽",
      lescc: "⪨",
      lesdot: "⩿",
      lesdoto: "⪁",
      lesdotor: "⪃",
      lesg: "⋚︀",
      lesges: "⪓",
      lessapprox: "⪅",
      lessdot: "⋖",
      lesseqgtr: "⋚",
      lesseqqgtr: "⪋",
      LessEqualGreater: "⋚",
      LessFullEqual: "≦",
      LessGreater: "≶",
      lessgtr: "≶",
      LessLess: "⪡",
      lesssim: "≲",
      LessSlantEqual: "⩽",
      LessTilde: "≲",
      lfisht: "⥼",
      lfloor: "⌊",
      Lfr: "𝔏",
      lfr: "𝔩",
      lg: "≶",
      lgE: "⪑",
      lHar: "⥢",
      lhard: "↽",
      lharu: "↼",
      lharul: "⥪",
      lhblk: "▄",
      LJcy: "Љ",
      ljcy: "љ",
      Ll: "⋘",
      ll: "≪",
      llarr: "⇇",
      llcorner: "⌞",
      Lleftarrow: "⇚",
      llhard: "⥫",
      lltri: "◺",
      Lmidot: "Ŀ",
      lmidot: "ŀ",
      lmoust: "⎰",
      lmoustache: "⎰",
      lnap: "⪉",
      lnapprox: "⪉",
      lnE: "≨",
      lne: "⪇",
      lneq: "⪇",
      lneqq: "≨",
      lnsim: "⋦",
      loang: "⟬",
      loarr: "⇽",
      lobrk: "⟦",
      LongLeftArrow: "⟵",
      Longleftarrow: "⟸",
      longleftarrow: "⟵",
      LongLeftRightArrow: "⟷",
      Longleftrightarrow: "⟺",
      longleftrightarrow: "⟷",
      longmapsto: "⟼",
      LongRightArrow: "⟶",
      Longrightarrow: "⟹",
      longrightarrow: "⟶",
      looparrowleft: "↫",
      looparrowright: "↬",
      lopar: "⦅",
      Lopf: "𝕃",
      lopf: "𝕝",
      loplus: "⨭",
      lotimes: "⨴",
      lowast: "∗",
      lowbar: "_",
      LowerLeftArrow: "↙",
      LowerRightArrow: "↘",
      loz: "◊",
      lozenge: "◊",
      lozf: "⧫",
      lpar: "(",
      lparlt: "⦓",
      lrarr: "⇆",
      lrcorner: "⌟",
      lrhar: "⇋",
      lrhard: "⥭",
      lrm: "‎",
      lrtri: "⊿",
      lsaquo: "‹",
      Lscr: "ℒ",
      lscr: "𝓁",
      Lsh: "↰",
      lsh: "↰",
      lsim: "≲",
      lsime: "⪍",
      lsimg: "⪏",
      lsqb: "[",
      lsquo: "‘",
      lsquor: "‚",
      Lstrok: "Ł",
      lstrok: "ł",
      Lt: "≪",
      LT: "<",
      lt: "<",
      ltcc: "⪦",
      ltcir: "⩹",
      ltdot: "⋖",
      lthree: "⋋",
      ltimes: "⋉",
      ltlarr: "⥶",
      ltquest: "⩻",
      ltri: "◃",
      ltrie: "⊴",
      ltrif: "◂",
      ltrPar: "⦖",
      lurdshar: "⥊",
      luruhar: "⥦",
      lvertneqq: "≨︀",
      lvnE: "≨︀",
      macr: "¯",
      male: "♂",
      malt: "✠",
      maltese: "✠",
      Map: "⤅",
      map: "↦",
      mapsto: "↦",
      mapstodown: "↧",
      mapstoleft: "↤",
      mapstoup: "↥",
      marker: "▮",
      mcomma: "⨩",
      Mcy: "М",
      mcy: "м",
      mdash: "—",
      mDDot: "∺",
      measuredangle: "∡",
      MediumSpace: " ",
      Mellintrf: "ℳ",
      Mfr: "𝔐",
      mfr: "𝔪",
      mho: "℧",
      micro: "µ",
      mid: "∣",
      midast: "*",
      midcir: "⫰",
      middot: "·",
      minus: "−",
      minusb: "⊟",
      minusd: "∸",
      minusdu: "⨪",
      MinusPlus: "∓",
      mlcp: "⫛",
      mldr: "…",
      mnplus: "∓",
      models: "⊧",
      Mopf: "𝕄",
      mopf: "𝕞",
      mp: "∓",
      Mscr: "ℳ",
      mscr: "𝓂",
      mstpos: "∾",
      Mu: "Μ",
      mu: "μ",
      multimap: "⊸",
      mumap: "⊸",
      nabla: "∇",
      Nacute: "Ń",
      nacute: "ń",
      nang: "∠⃒",
      nap: "≉",
      napE: "⩰̸",
      napid: "≋̸",
      napos: "ŉ",
      napprox: "≉",
      natur: "♮",
      natural: "♮",
      naturals: "ℕ",
      nbsp: " ",
      nbump: "≎̸",
      nbumpe: "≏̸",
      ncap: "⩃",
      Ncaron: "Ň",
      ncaron: "ň",
      Ncedil: "Ņ",
      ncedil: "ņ",
      ncong: "≇",
      ncongdot: "⩭̸",
      ncup: "⩂",
      Ncy: "Н",
      ncy: "н",
      ndash: "–",
      ne: "≠",
      nearhk: "⤤",
      neArr: "⇗",
      nearr: "↗",
      nearrow: "↗",
      nedot: "≐̸",
      NegativeMediumSpace: "​",
      NegativeThickSpace: "​",
      NegativeThinSpace: "​",
      NegativeVeryThinSpace: "​",
      nequiv: "≢",
      nesear: "⤨",
      nesim: "≂̸",
      NestedGreaterGreater: "≫",
      NestedLessLess: "≪",
      NewLine: "\n",
      nexist: "∄",
      nexists: "∄",
      Nfr: "𝔑",
      nfr: "𝔫",
      ngE: "≧̸",
      nge: "≱",
      ngeq: "≱",
      ngeqq: "≧̸",
      ngeqslant: "⩾̸",
      nges: "⩾̸",
      nGg: "⋙̸",
      ngsim: "≵",
      nGt: "≫⃒",
      ngt: "≯",
      ngtr: "≯",
      nGtv: "≫̸",
      nhArr: "⇎",
      nharr: "↮",
      nhpar: "⫲",
      ni: "∋",
      nis: "⋼",
      nisd: "⋺",
      niv: "∋",
      NJcy: "Њ",
      njcy: "њ",
      nlArr: "⇍",
      nlarr: "↚",
      nldr: "‥",
      nlE: "≦̸",
      nle: "≰",
      nLeftarrow: "⇍",
      nleftarrow: "↚",
      nLeftrightarrow: "⇎",
      nleftrightarrow: "↮",
      nleq: "≰",
      nleqq: "≦̸",
      nleqslant: "⩽̸",
      nles: "⩽̸",
      nless: "≮",
      nLl: "⋘̸",
      nlsim: "≴",
      nLt: "≪⃒",
      nlt: "≮",
      nltri: "⋪",
      nltrie: "⋬",
      nLtv: "≪̸",
      nmid: "∤",
      NoBreak: "⁠",
      NonBreakingSpace: " ",
      Nopf: "ℕ",
      nopf: "𝕟",
      Not: "⫬",
      not: "¬",
      NotCongruent: "≢",
      NotCupCap: "≭",
      NotDoubleVerticalBar: "∦",
      NotElement: "∉",
      NotEqual: "≠",
      NotEqualTilde: "≂̸",
      NotExists: "∄",
      NotGreater: "≯",
      NotGreaterEqual: "≱",
      NotGreaterFullEqual: "≧̸",
      NotGreaterGreater: "≫̸",
      NotGreaterLess: "≹",
      NotGreaterSlantEqual: "⩾̸",
      NotGreaterTilde: "≵",
      NotHumpDownHump: "≎̸",
      NotHumpEqual: "≏̸",
      notin: "∉",
      notindot: "⋵̸",
      notinE: "⋹̸",
      notinva: "∉",
      notinvb: "⋷",
      notinvc: "⋶",
      NotLeftTriangle: "⋪",
      NotLeftTriangleBar: "⧏̸",
      NotLeftTriangleEqual: "⋬",
      NotLess: "≮",
      NotLessEqual: "≰",
      NotLessGreater: "≸",
      NotLessLess: "≪̸",
      NotLessSlantEqual: "⩽̸",
      NotLessTilde: "≴",
      NotNestedGreaterGreater: "⪢̸",
      NotNestedLessLess: "⪡̸",
      notni: "∌",
      notniva: "∌",
      notnivb: "⋾",
      notnivc: "⋽",
      NotPrecedes: "⊀",
      NotPrecedesEqual: "⪯̸",
      NotPrecedesSlantEqual: "⋠",
      NotReverseElement: "∌",
      NotRightTriangle: "⋫",
      NotRightTriangleBar: "⧐̸",
      NotRightTriangleEqual: "⋭",
      NotSquareSubset: "⊏̸",
      NotSquareSubsetEqual: "⋢",
      NotSquareSuperset: "⊐̸",
      NotSquareSupersetEqual: "⋣",
      NotSubset: "⊂⃒",
      NotSubsetEqual: "⊈",
      NotSucceeds: "⊁",
      NotSucceedsEqual: "⪰̸",
      NotSucceedsSlantEqual: "⋡",
      NotSucceedsTilde: "≿̸",
      NotSuperset: "⊃⃒",
      NotSupersetEqual: "⊉",
      NotTilde: "≁",
      NotTildeEqual: "≄",
      NotTildeFullEqual: "≇",
      NotTildeTilde: "≉",
      NotVerticalBar: "∤",
      npar: "∦",
      nparallel: "∦",
      nparsl: "⫽⃥",
      npart: "∂̸",
      npolint: "⨔",
      npr: "⊀",
      nprcue: "⋠",
      npre: "⪯̸",
      nprec: "⊀",
      npreceq: "⪯̸",
      nrArr: "⇏",
      nrarr: "↛",
      nrarrc: "⤳̸",
      nrarrw: "↝̸",
      nRightarrow: "⇏",
      nrightarrow: "↛",
      nrtri: "⋫",
      nrtrie: "⋭",
      nsc: "⊁",
      nsccue: "⋡",
      nsce: "⪰̸",
      Nscr: "𝒩",
      nscr: "𝓃",
      nshortmid: "∤",
      nshortparallel: "∦",
      nsim: "≁",
      nsime: "≄",
      nsimeq: "≄",
      nsmid: "∤",
      nspar: "∦",
      nsqsube: "⋢",
      nsqsupe: "⋣",
      nsub: "⊄",
      nsubE: "⫅̸",
      nsube: "⊈",
      nsubset: "⊂⃒",
      nsubseteq: "⊈",
      nsubseteqq: "⫅̸",
      nsucc: "⊁",
      nsucceq: "⪰̸",
      nsup: "⊅",
      nsupE: "⫆̸",
      nsupe: "⊉",
      nsupset: "⊃⃒",
      nsupseteq: "⊉",
      nsupseteqq: "⫆̸",
      ntgl: "≹",
      Ntilde: "Ñ",
      ntilde: "ñ",
      ntlg: "≸",
      ntriangleleft: "⋪",
      ntrianglelefteq: "⋬",
      ntriangleright: "⋫",
      ntrianglerighteq: "⋭",
      Nu: "Ν",
      nu: "ν",
      num: "#",
      numero: "№",
      numsp: " ",
      nvap: "≍⃒",
      nVDash: "⊯",
      nVdash: "⊮",
      nvDash: "⊭",
      nvdash: "⊬",
      nvge: "≥⃒",
      nvgt: ">⃒",
      nvHarr: "⤄",
      nvinfin: "⧞",
      nvlArr: "⤂",
      nvle: "≤⃒",
      nvlt: "<⃒",
      nvltrie: "⊴⃒",
      nvrArr: "⤃",
      nvrtrie: "⊵⃒",
      nvsim: "∼⃒",
      nwarhk: "⤣",
      nwArr: "⇖",
      nwarr: "↖",
      nwarrow: "↖",
      nwnear: "⤧",
      Oacute: "Ó",
      oacute: "ó",
      oast: "⊛",
      ocir: "⊚",
      Ocirc: "Ô",
      ocirc: "ô",
      Ocy: "О",
      ocy: "о",
      odash: "⊝",
      Odblac: "Ő",
      odblac: "ő",
      odiv: "⨸",
      odot: "⊙",
      odsold: "⦼",
      OElig: "Œ",
      oelig: "œ",
      ofcir: "⦿",
      Ofr: "𝔒",
      ofr: "𝔬",
      ogon: "˛",
      Ograve: "Ò",
      ograve: "ò",
      ogt: "⧁",
      ohbar: "⦵",
      ohm: "Ω",
      oint: "∮",
      olarr: "↺",
      olcir: "⦾",
      olcross: "⦻",
      oline: "‾",
      olt: "⧀",
      Omacr: "Ō",
      omacr: "ō",
      Omega: "Ω",
      omega: "ω",
      Omicron: "Ο",
      omicron: "ο",
      omid: "⦶",
      ominus: "⊖",
      Oopf: "𝕆",
      oopf: "𝕠",
      opar: "⦷",
      OpenCurlyDoubleQuote: "“",
      OpenCurlyQuote: "‘",
      operp: "⦹",
      oplus: "⊕",
      Or: "⩔",
      or: "∨",
      orarr: "↻",
      ord: "⩝",
      order: "ℴ",
      orderof: "ℴ",
      ordf: "ª",
      ordm: "º",
      origof: "⊶",
      oror: "⩖",
      orslope: "⩗",
      orv: "⩛",
      oS: "Ⓢ",
      Oscr: "𝒪",
      oscr: "ℴ",
      Oslash: "Ø",
      oslash: "ø",
      osol: "⊘",
      Otilde: "Õ",
      otilde: "õ",
      Otimes: "⨷",
      otimes: "⊗",
      otimesas: "⨶",
      Ouml: "Ö",
      ouml: "ö",
      ovbar: "⌽",
      OverBar: "‾",
      OverBrace: "⏞",
      OverBracket: "⎴",
      OverParenthesis: "⏜",
      par: "∥",
      para: "¶",
      parallel: "∥",
      parsim: "⫳",
      parsl: "⫽",
      part: "∂",
      PartialD: "∂",
      Pcy: "П",
      pcy: "п",
      percnt: "%",
      period: ".",
      permil: "‰",
      perp: "⊥",
      pertenk: "‱",
      Pfr: "𝔓",
      pfr: "𝔭",
      Phi: "Φ",
      phi: "φ",
      phiv: "ϕ",
      phmmat: "ℳ",
      phone: "☎",
      Pi: "Π",
      pi: "π",
      pitchfork: "⋔",
      piv: "ϖ",
      planck: "ℏ",
      planckh: "ℎ",
      plankv: "ℏ",
      plus: "+",
      plusacir: "⨣",
      plusb: "⊞",
      pluscir: "⨢",
      plusdo: "∔",
      plusdu: "⨥",
      pluse: "⩲",
      PlusMinus: "±",
      plusmn: "±",
      plussim: "⨦",
      plustwo: "⨧",
      pm: "±",
      Poincareplane: "ℌ",
      pointint: "⨕",
      Popf: "ℙ",
      popf: "𝕡",
      pound: "£",
      Pr: "⪻",
      pr: "≺",
      prap: "⪷",
      prcue: "≼",
      prE: "⪳",
      pre: "⪯",
      prec: "≺",
      precapprox: "⪷",
      preccurlyeq: "≼",
      Precedes: "≺",
      PrecedesEqual: "⪯",
      PrecedesSlantEqual: "≼",
      PrecedesTilde: "≾",
      preceq: "⪯",
      precnapprox: "⪹",
      precneqq: "⪵",
      precnsim: "⋨",
      precsim: "≾",
      Prime: "″",
      prime: "′",
      primes: "ℙ",
      prnap: "⪹",
      prnE: "⪵",
      prnsim: "⋨",
      prod: "∏",
      Product: "∏",
      profalar: "⌮",
      profline: "⌒",
      profsurf: "⌓",
      prop: "∝",
      Proportion: "∷",
      Proportional: "∝",
      propto: "∝",
      prsim: "≾",
      prurel: "⊰",
      Pscr: "𝒫",
      pscr: "𝓅",
      Psi: "Ψ",
      psi: "ψ",
      puncsp: " ",
      Qfr: "𝔔",
      qfr: "𝔮",
      qint: "⨌",
      Qopf: "ℚ",
      qopf: "𝕢",
      qprime: "⁗",
      Qscr: "𝒬",
      qscr: "𝓆",
      quaternions: "ℍ",
      quatint: "⨖",
      quest: "?",
      questeq: "≟",
      QUOT: '"',
      quot: '"',
      rAarr: "⇛",
      race: "∽̱",
      Racute: "Ŕ",
      racute: "ŕ",
      radic: "√",
      raemptyv: "⦳",
      Rang: "⟫",
      rang: "⟩",
      rangd: "⦒",
      range: "⦥",
      rangle: "⟩",
      raquo: "»",
      Rarr: "↠",
      rArr: "⇒",
      rarr: "→",
      rarrap: "⥵",
      rarrb: "⇥",
      rarrbfs: "⤠",
      rarrc: "⤳",
      rarrfs: "⤞",
      rarrhk: "↪",
      rarrlp: "↬",
      rarrpl: "⥅",
      rarrsim: "⥴",
      Rarrtl: "⤖",
      rarrtl: "↣",
      rarrw: "↝",
      rAtail: "⤜",
      ratail: "⤚",
      ratio: "∶",
      rationals: "ℚ",
      RBarr: "⤐",
      rBarr: "⤏",
      rbarr: "⤍",
      rbbrk: "❳",
      rbrace: "}",
      rbrack: "]",
      rbrke: "⦌",
      rbrksld: "⦎",
      rbrkslu: "⦐",
      Rcaron: "Ř",
      rcaron: "ř",
      Rcedil: "Ŗ",
      rcedil: "ŗ",
      rceil: "⌉",
      rcub: "}",
      Rcy: "Р",
      rcy: "р",
      rdca: "⤷",
      rdldhar: "⥩",
      rdquo: "”",
      rdquor: "”",
      rdsh: "↳",
      Re: "ℜ",
      real: "ℜ",
      realine: "ℛ",
      realpart: "ℜ",
      reals: "ℝ",
      rect: "▭",
      REG: "®",
      reg: "®",
      ReverseElement: "∋",
      ReverseEquilibrium: "⇋",
      ReverseUpEquilibrium: "⥯",
      rfisht: "⥽",
      rfloor: "⌋",
      Rfr: "ℜ",
      rfr: "𝔯",
      rHar: "⥤",
      rhard: "⇁",
      rharu: "⇀",
      rharul: "⥬",
      Rho: "Ρ",
      rho: "ρ",
      rhov: "ϱ",
      RightAngleBracket: "⟩",
      RightArrow: "→",
      Rightarrow: "⇒",
      rightarrow: "→",
      RightArrowBar: "⇥",
      RightArrowLeftArrow: "⇄",
      rightarrowtail: "↣",
      RightCeiling: "⌉",
      RightDoubleBracket: "⟧",
      RightDownTeeVector: "⥝",
      RightDownVector: "⇂",
      RightDownVectorBar: "⥕",
      RightFloor: "⌋",
      rightharpoondown: "⇁",
      rightharpoonup: "⇀",
      rightleftarrows: "⇄",
      rightleftharpoons: "⇌",
      rightrightarrows: "⇉",
      rightsquigarrow: "↝",
      RightTee: "⊢",
      RightTeeArrow: "↦",
      RightTeeVector: "⥛",
      rightthreetimes: "⋌",
      RightTriangle: "⊳",
      RightTriangleBar: "⧐",
      RightTriangleEqual: "⊵",
      RightUpDownVector: "⥏",
      RightUpTeeVector: "⥜",
      RightUpVector: "↾",
      RightUpVectorBar: "⥔",
      RightVector: "⇀",
      RightVectorBar: "⥓",
      ring: "˚",
      risingdotseq: "≓",
      rlarr: "⇄",
      rlhar: "⇌",
      rlm: "‏",
      rmoust: "⎱",
      rmoustache: "⎱",
      rnmid: "⫮",
      roang: "⟭",
      roarr: "⇾",
      robrk: "⟧",
      ropar: "⦆",
      Ropf: "ℝ",
      ropf: "𝕣",
      roplus: "⨮",
      rotimes: "⨵",
      RoundImplies: "⥰",
      rpar: ")",
      rpargt: "⦔",
      rppolint: "⨒",
      rrarr: "⇉",
      Rrightarrow: "⇛",
      rsaquo: "›",
      Rscr: "ℛ",
      rscr: "𝓇",
      Rsh: "↱",
      rsh: "↱",
      rsqb: "]",
      rsquo: "’",
      rsquor: "’",
      rthree: "⋌",
      rtimes: "⋊",
      rtri: "▹",
      rtrie: "⊵",
      rtrif: "▸",
      rtriltri: "⧎",
      RuleDelayed: "⧴",
      ruluhar: "⥨",
      rx: "℞",
      Sacute: "Ś",
      sacute: "ś",
      sbquo: "‚",
      Sc: "⪼",
      sc: "≻",
      scap: "⪸",
      Scaron: "Š",
      scaron: "š",
      sccue: "≽",
      scE: "⪴",
      sce: "⪰",
      Scedil: "Ş",
      scedil: "ş",
      Scirc: "Ŝ",
      scirc: "ŝ",
      scnap: "⪺",
      scnE: "⪶",
      scnsim: "⋩",
      scpolint: "⨓",
      scsim: "≿",
      Scy: "С",
      scy: "с",
      sdot: "⋅",
      sdotb: "⊡",
      sdote: "⩦",
      searhk: "⤥",
      seArr: "⇘",
      searr: "↘",
      searrow: "↘",
      sect: "§",
      semi: ";",
      seswar: "⤩",
      setminus: "∖",
      setmn: "∖",
      sext: "✶",
      Sfr: "𝔖",
      sfr: "𝔰",
      sfrown: "⌢",
      sharp: "♯",
      SHCHcy: "Щ",
      shchcy: "щ",
      SHcy: "Ш",
      shcy: "ш",
      ShortDownArrow: "↓",
      ShortLeftArrow: "←",
      shortmid: "∣",
      shortparallel: "∥",
      ShortRightArrow: "→",
      ShortUpArrow: "↑",
      shy: "­",
      Sigma: "Σ",
      sigma: "σ",
      sigmaf: "ς",
      sigmav: "ς",
      sim: "∼",
      simdot: "⩪",
      sime: "≃",
      simeq: "≃",
      simg: "⪞",
      simgE: "⪠",
      siml: "⪝",
      simlE: "⪟",
      simne: "≆",
      simplus: "⨤",
      simrarr: "⥲",
      slarr: "←",
      SmallCircle: "∘",
      smallsetminus: "∖",
      smashp: "⨳",
      smeparsl: "⧤",
      smid: "∣",
      smile: "⌣",
      smt: "⪪",
      smte: "⪬",
      smtes: "⪬︀",
      SOFTcy: "Ь",
      softcy: "ь",
      sol: "/",
      solb: "⧄",
      solbar: "⌿",
      Sopf: "𝕊",
      sopf: "𝕤",
      spades: "♠",
      spadesuit: "♠",
      spar: "∥",
      sqcap: "⊓",
      sqcaps: "⊓︀",
      sqcup: "⊔",
      sqcups: "⊔︀",
      Sqrt: "√",
      sqsub: "⊏",
      sqsube: "⊑",
      sqsubset: "⊏",
      sqsubseteq: "⊑",
      sqsup: "⊐",
      sqsupe: "⊒",
      sqsupset: "⊐",
      sqsupseteq: "⊒",
      squ: "□",
      Square: "□",
      square: "□",
      SquareIntersection: "⊓",
      SquareSubset: "⊏",
      SquareSubsetEqual: "⊑",
      SquareSuperset: "⊐",
      SquareSupersetEqual: "⊒",
      SquareUnion: "⊔",
      squarf: "▪",
      squf: "▪",
      srarr: "→",
      Sscr: "𝒮",
      sscr: "𝓈",
      ssetmn: "∖",
      ssmile: "⌣",
      sstarf: "⋆",
      Star: "⋆",
      star: "☆",
      starf: "★",
      straightepsilon: "ϵ",
      straightphi: "ϕ",
      strns: "¯",
      Sub: "⋐",
      sub: "⊂",
      subdot: "⪽",
      subE: "⫅",
      sube: "⊆",
      subedot: "⫃",
      submult: "⫁",
      subnE: "⫋",
      subne: "⊊",
      subplus: "⪿",
      subrarr: "⥹",
      Subset: "⋐",
      subset: "⊂",
      subseteq: "⊆",
      subseteqq: "⫅",
      SubsetEqual: "⊆",
      subsetneq: "⊊",
      subsetneqq: "⫋",
      subsim: "⫇",
      subsub: "⫕",
      subsup: "⫓",
      succ: "≻",
      succapprox: "⪸",
      succcurlyeq: "≽",
      Succeeds: "≻",
      SucceedsEqual: "⪰",
      SucceedsSlantEqual: "≽",
      SucceedsTilde: "≿",
      succeq: "⪰",
      succnapprox: "⪺",
      succneqq: "⪶",
      succnsim: "⋩",
      succsim: "≿",
      SuchThat: "∋",
      Sum: "∑",
      sum: "∑",
      sung: "♪",
      Sup: "⋑",
      sup: "⊃",
      sup1: "¹",
      sup2: "²",
      sup3: "³",
      supdot: "⪾",
      supdsub: "⫘",
      supE: "⫆",
      supe: "⊇",
      supedot: "⫄",
      Superset: "⊃",
      SupersetEqual: "⊇",
      suphsol: "⟉",
      suphsub: "⫗",
      suplarr: "⥻",
      supmult: "⫂",
      supnE: "⫌",
      supne: "⊋",
      supplus: "⫀",
      Supset: "⋑",
      supset: "⊃",
      supseteq: "⊇",
      supseteqq: "⫆",
      supsetneq: "⊋",
      supsetneqq: "⫌",
      supsim: "⫈",
      supsub: "⫔",
      supsup: "⫖",
      swarhk: "⤦",
      swArr: "⇙",
      swarr: "↙",
      swarrow: "↙",
      swnwar: "⤪",
      szlig: "ß",
      Tab: "	",
      target: "⌖",
      Tau: "Τ",
      tau: "τ",
      tbrk: "⎴",
      Tcaron: "Ť",
      tcaron: "ť",
      Tcedil: "Ţ",
      tcedil: "ţ",
      Tcy: "Т",
      tcy: "т",
      tdot: "⃛",
      telrec: "⌕",
      Tfr: "𝔗",
      tfr: "𝔱",
      there4: "∴",
      Therefore: "∴",
      therefore: "∴",
      Theta: "Θ",
      theta: "θ",
      thetasym: "ϑ",
      thetav: "ϑ",
      thickapprox: "≈",
      thicksim: "∼",
      ThickSpace: "  ",
      thinsp: " ",
      ThinSpace: " ",
      thkap: "≈",
      thksim: "∼",
      THORN: "Þ",
      thorn: "þ",
      Tilde: "∼",
      tilde: "˜",
      TildeEqual: "≃",
      TildeFullEqual: "≅",
      TildeTilde: "≈",
      times: "×",
      timesb: "⊠",
      timesbar: "⨱",
      timesd: "⨰",
      tint: "∭",
      toea: "⤨",
      top: "⊤",
      topbot: "⌶",
      topcir: "⫱",
      Topf: "𝕋",
      topf: "𝕥",
      topfork: "⫚",
      tosa: "⤩",
      tprime: "‴",
      TRADE: "™",
      trade: "™",
      triangle: "▵",
      triangledown: "▿",
      triangleleft: "◃",
      trianglelefteq: "⊴",
      triangleq: "≜",
      triangleright: "▹",
      trianglerighteq: "⊵",
      tridot: "◬",
      trie: "≜",
      triminus: "⨺",
      TripleDot: "⃛",
      triplus: "⨹",
      trisb: "⧍",
      tritime: "⨻",
      trpezium: "⏢",
      Tscr: "𝒯",
      tscr: "𝓉",
      TScy: "Ц",
      tscy: "ц",
      TSHcy: "Ћ",
      tshcy: "ћ",
      Tstrok: "Ŧ",
      tstrok: "ŧ",
      twixt: "≬",
      twoheadleftarrow: "↞",
      twoheadrightarrow: "↠",
      Uacute: "Ú",
      uacute: "ú",
      Uarr: "↟",
      uArr: "⇑",
      uarr: "↑",
      Uarrocir: "⥉",
      Ubrcy: "Ў",
      ubrcy: "ў",
      Ubreve: "Ŭ",
      ubreve: "ŭ",
      Ucirc: "Û",
      ucirc: "û",
      Ucy: "У",
      ucy: "у",
      udarr: "⇅",
      Udblac: "Ű",
      udblac: "ű",
      udhar: "⥮",
      ufisht: "⥾",
      Ufr: "𝔘",
      ufr: "𝔲",
      Ugrave: "Ù",
      ugrave: "ù",
      uHar: "⥣",
      uharl: "↿",
      uharr: "↾",
      uhblk: "▀",
      ulcorn: "⌜",
      ulcorner: "⌜",
      ulcrop: "⌏",
      ultri: "◸",
      Umacr: "Ū",
      umacr: "ū",
      uml: "¨",
      UnderBar: "_",
      UnderBrace: "⏟",
      UnderBracket: "⎵",
      UnderParenthesis: "⏝",
      Union: "⋃",
      UnionPlus: "⊎",
      Uogon: "Ų",
      uogon: "ų",
      Uopf: "𝕌",
      uopf: "𝕦",
      UpArrow: "↑",
      Uparrow: "⇑",
      uparrow: "↑",
      UpArrowBar: "⤒",
      UpArrowDownArrow: "⇅",
      UpDownArrow: "↕",
      Updownarrow: "⇕",
      updownarrow: "↕",
      UpEquilibrium: "⥮",
      upharpoonleft: "↿",
      upharpoonright: "↾",
      uplus: "⊎",
      UpperLeftArrow: "↖",
      UpperRightArrow: "↗",
      Upsi: "ϒ",
      upsi: "υ",
      upsih: "ϒ",
      Upsilon: "Υ",
      upsilon: "υ",
      UpTee: "⊥",
      UpTeeArrow: "↥",
      upuparrows: "⇈",
      urcorn: "⌝",
      urcorner: "⌝",
      urcrop: "⌎",
      Uring: "Ů",
      uring: "ů",
      urtri: "◹",
      Uscr: "𝒰",
      uscr: "𝓊",
      utdot: "⋰",
      Utilde: "Ũ",
      utilde: "ũ",
      utri: "▵",
      utrif: "▴",
      uuarr: "⇈",
      Uuml: "Ü",
      uuml: "ü",
      uwangle: "⦧",
      vangrt: "⦜",
      varepsilon: "ϵ",
      varkappa: "ϰ",
      varnothing: "∅",
      varphi: "ϕ",
      varpi: "ϖ",
      varpropto: "∝",
      vArr: "⇕",
      varr: "↕",
      varrho: "ϱ",
      varsigma: "ς",
      varsubsetneq: "⊊︀",
      varsubsetneqq: "⫋︀",
      varsupsetneq: "⊋︀",
      varsupsetneqq: "⫌︀",
      vartheta: "ϑ",
      vartriangleleft: "⊲",
      vartriangleright: "⊳",
      Vbar: "⫫",
      vBar: "⫨",
      vBarv: "⫩",
      Vcy: "В",
      vcy: "в",
      VDash: "⊫",
      Vdash: "⊩",
      vDash: "⊨",
      vdash: "⊢",
      Vdashl: "⫦",
      Vee: "⋁",
      vee: "∨",
      veebar: "⊻",
      veeeq: "≚",
      vellip: "⋮",
      Verbar: "‖",
      verbar: "|",
      Vert: "‖",
      vert: "|",
      VerticalBar: "∣",
      VerticalLine: "|",
      VerticalSeparator: "❘",
      VerticalTilde: "≀",
      VeryThinSpace: " ",
      Vfr: "𝔙",
      vfr: "𝔳",
      vltri: "⊲",
      vnsub: "⊂⃒",
      vnsup: "⊃⃒",
      Vopf: "𝕍",
      vopf: "𝕧",
      vprop: "∝",
      vrtri: "⊳",
      Vscr: "𝒱",
      vscr: "𝓋",
      vsubnE: "⫋︀",
      vsubne: "⊊︀",
      vsupnE: "⫌︀",
      vsupne: "⊋︀",
      Vvdash: "⊪",
      vzigzag: "⦚",
      Wcirc: "Ŵ",
      wcirc: "ŵ",
      wedbar: "⩟",
      Wedge: "⋀",
      wedge: "∧",
      wedgeq: "≙",
      weierp: "℘",
      Wfr: "𝔚",
      wfr: "𝔴",
      Wopf: "𝕎",
      wopf: "𝕨",
      wp: "℘",
      wr: "≀",
      wreath: "≀",
      Wscr: "𝒲",
      wscr: "𝓌",
      xcap: "⋂",
      xcirc: "◯",
      xcup: "⋃",
      xdtri: "▽",
      Xfr: "𝔛",
      xfr: "𝔵",
      xhArr: "⟺",
      xharr: "⟷",
      Xi: "Ξ",
      xi: "ξ",
      xlArr: "⟸",
      xlarr: "⟵",
      xmap: "⟼",
      xnis: "⋻",
      xodot: "⨀",
      Xopf: "𝕏",
      xopf: "𝕩",
      xoplus: "⨁",
      xotime: "⨂",
      xrArr: "⟹",
      xrarr: "⟶",
      Xscr: "𝒳",
      xscr: "𝓍",
      xsqcup: "⨆",
      xuplus: "⨄",
      xutri: "△",
      xvee: "⋁",
      xwedge: "⋀",
      Yacute: "Ý",
      yacute: "ý",
      YAcy: "Я",
      yacy: "я",
      Ycirc: "Ŷ",
      ycirc: "ŷ",
      Ycy: "Ы",
      ycy: "ы",
      yen: "¥",
      Yfr: "𝔜",
      yfr: "𝔶",
      YIcy: "Ї",
      yicy: "ї",
      Yopf: "𝕐",
      yopf: "𝕪",
      Yscr: "𝒴",
      yscr: "𝓎",
      YUcy: "Ю",
      yucy: "ю",
      Yuml: "Ÿ",
      yuml: "ÿ",
      Zacute: "Ź",
      zacute: "ź",
      Zcaron: "Ž",
      zcaron: "ž",
      Zcy: "З",
      zcy: "з",
      Zdot: "Ż",
      zdot: "ż",
      zeetrf: "ℨ",
      ZeroWidthSpace: "​",
      Zeta: "Ζ",
      zeta: "ζ",
      Zfr: "ℨ",
      zfr: "𝔷",
      ZHcy: "Ж",
      zhcy: "ж",
      zigrarr: "⇝",
      Zopf: "ℤ",
      zopf: "𝕫",
      Zscr: "𝒵",
      zscr: "𝓏",
      zwj: "‍",
      zwnj: "‌"
    });
    exports.entityMap = exports.HTML_ENTITIES;
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/sax.js
var require_sax = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/sax.js"(exports) {
    var NAMESPACE = require_conventions().NAMESPACE;
    var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/;
    var nameChar = new RegExp("[\\-\\.0-9" + nameStartChar.source.slice(1, -1) + "\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
    var tagNamePattern = new RegExp("^" + nameStartChar.source + nameChar.source + "*(?::" + nameStartChar.source + nameChar.source + "*)?$");
    var S_TAG = 0;
    var S_ATTR = 1;
    var S_ATTR_SPACE = 2;
    var S_EQ = 3;
    var S_ATTR_NOQUOT_VALUE = 4;
    var S_ATTR_END = 5;
    var S_TAG_SPACE = 6;
    var S_TAG_CLOSE = 7;
    function ParseError(message, locator) {
      this.message = message;
      this.locator = locator;
      if (Error.captureStackTrace)
        Error.captureStackTrace(this, ParseError);
    }
    ParseError.prototype = new Error();
    ParseError.prototype.name = ParseError.name;
    function XMLReader() {
    }
    XMLReader.prototype = {
      parse: function(source, defaultNSMap, entityMap) {
        var domBuilder = this.domBuilder;
        domBuilder.startDocument();
        _copy(defaultNSMap, defaultNSMap = {});
        parse(
          source,
          defaultNSMap,
          entityMap,
          domBuilder,
          this.errorHandler
        );
        domBuilder.endDocument();
      }
    };
    function parse(source, defaultNSMapCopy, entityMap, domBuilder, errorHandler) {
      function fixedFromCharCode(code) {
        if (code > 65535) {
          code -= 65536;
          var surrogate1 = 55296 + (code >> 10), surrogate2 = 56320 + (code & 1023);
          return String.fromCharCode(surrogate1, surrogate2);
        } else {
          return String.fromCharCode(code);
        }
      }
      function entityReplacer(a2) {
        var k = a2.slice(1, -1);
        if (Object.hasOwnProperty.call(entityMap, k)) {
          return entityMap[k];
        } else if (k.charAt(0) === "#") {
          return fixedFromCharCode(parseInt(k.substr(1).replace("x", "0x")));
        } else {
          errorHandler.error("entity not found:" + a2);
          return a2;
        }
      }
      function appendText(end2) {
        if (end2 > start) {
          var xt = source.substring(start, end2).replace(/&#?\w+;/g, entityReplacer);
          locator && position(start);
          domBuilder.characters(xt, 0, end2 - start);
          start = end2;
        }
      }
      function position(p, m) {
        while (p >= lineEnd && (m = linePattern.exec(source))) {
          lineStart = m.index;
          lineEnd = lineStart + m[0].length;
          locator.lineNumber++;
        }
        locator.columnNumber = p - lineStart + 1;
      }
      var lineStart = 0;
      var lineEnd = 0;
      var linePattern = /.*(?:\r\n?|\n)|.*$/g;
      var locator = domBuilder.locator;
      var parseStack = [{ currentNSMap: defaultNSMapCopy }];
      var closeMap = {};
      var start = 0;
      while (true) {
        try {
          var tagStart = source.indexOf("<", start);
          if (tagStart < 0) {
            if (!source.substr(start).match(/^\s*$/)) {
              var doc = domBuilder.doc;
              var text = doc.createTextNode(source.substr(start));
              doc.appendChild(text);
              domBuilder.currentElement = text;
            }
            return;
          }
          if (tagStart > start) {
            appendText(tagStart);
          }
          switch (source.charAt(tagStart + 1)) {
            case "/":
              var end = source.indexOf(">", tagStart + 3);
              var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, "");
              var config = parseStack.pop();
              if (end < 0) {
                tagName = source.substring(tagStart + 2).replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " is not complete:" + config.tagName);
                end = tagStart + 1 + tagName.length;
              } else if (tagName.match(/\s</)) {
                tagName = tagName.replace(/[\s<].*/, "");
                errorHandler.error("end tag name: " + tagName + " maybe not complete");
                end = tagStart + 1 + tagName.length;
              }
              var localNSMap = config.localNSMap;
              var endMatch = config.tagName == tagName;
              var endIgnoreCaseMach = endMatch || config.tagName && config.tagName.toLowerCase() == tagName.toLowerCase();
              if (endIgnoreCaseMach) {
                domBuilder.endElement(config.uri, config.localName, tagName);
                if (localNSMap) {
                  for (var prefix in localNSMap) {
                    if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
                      domBuilder.endPrefixMapping(prefix);
                    }
                  }
                }
                if (!endMatch) {
                  errorHandler.fatalError("end tag name: " + tagName + " is not match the current start tagName:" + config.tagName);
                }
              } else {
                parseStack.push(config);
              }
              end++;
              break;
            case "?":
              locator && position(tagStart);
              end = parseInstruction(source, tagStart, domBuilder);
              break;
            case "!":
              locator && position(tagStart);
              end = parseDCC(source, tagStart, domBuilder, errorHandler);
              break;
            default:
              locator && position(tagStart);
              var el = new ElementAttributes();
              var currentNSMap = parseStack[parseStack.length - 1].currentNSMap;
              var end = parseElementStartPart(source, tagStart, el, currentNSMap, entityReplacer, errorHandler);
              var len = el.length;
              if (!el.closed && fixSelfClosed(source, end, el.tagName, closeMap)) {
                el.closed = true;
                if (!entityMap.nbsp) {
                  errorHandler.warning("unclosed xml attribute");
                }
              }
              if (locator && len) {
                var locator2 = copyLocator(locator, {});
                for (var i = 0; i < len; i++) {
                  var a = el[i];
                  position(a.offset);
                  a.locator = copyLocator(locator, {});
                }
                domBuilder.locator = locator2;
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
                domBuilder.locator = locator;
              } else {
                if (appendElement(el, domBuilder, currentNSMap)) {
                  parseStack.push(el);
                }
              }
              if (NAMESPACE.isHTML(el.uri) && !el.closed) {
                end = parseHtmlSpecialContent(source, end, el.tagName, entityReplacer, domBuilder);
              } else {
                end++;
              }
          }
        } catch (e) {
          if (e instanceof ParseError) {
            throw e;
          }
          errorHandler.error("element parse error: " + e);
          end = -1;
        }
        if (end > start) {
          start = end;
        } else {
          appendText(Math.max(tagStart, start) + 1);
        }
      }
    }
    function copyLocator(f, t) {
      t.lineNumber = f.lineNumber;
      t.columnNumber = f.columnNumber;
      return t;
    }
    function parseElementStartPart(source, start, el, currentNSMap, entityReplacer, errorHandler) {
      function addAttribute(qname, value2, startIndex) {
        if (el.attributeNames.hasOwnProperty(qname)) {
          errorHandler.fatalError("Attribute " + qname + " redefined");
        }
        el.addValue(
          qname,
          // @see https://www.w3.org/TR/xml/#AVNormalize
          // since the xmldom sax parser does not "interpret" DTD the following is not implemented:
          // - recursive replacement of (DTD) entity references
          // - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
          value2.replace(/[\t\n\r]/g, " ").replace(/&#?\w+;/g, entityReplacer),
          startIndex
        );
      }
      var attrName;
      var value;
      var p = ++start;
      var s = S_TAG;
      while (true) {
        var c = source.charAt(p);
        switch (c) {
          case "=":
            if (s === S_ATTR) {
              attrName = source.slice(start, p);
              s = S_EQ;
            } else if (s === S_ATTR_SPACE) {
              s = S_EQ;
            } else {
              throw new Error("attribute equal must after attrName");
            }
            break;
          case "'":
          case '"':
            if (s === S_EQ || s === S_ATTR) {
              if (s === S_ATTR) {
                errorHandler.warning('attribute value must after "="');
                attrName = source.slice(start, p);
              }
              start = p + 1;
              p = source.indexOf(c, start);
              if (p > 0) {
                value = source.slice(start, p);
                addAttribute(attrName, value, start - 1);
                s = S_ATTR_END;
              } else {
                throw new Error("attribute value no end '" + c + "' match");
              }
            } else if (s == S_ATTR_NOQUOT_VALUE) {
              value = source.slice(start, p);
              addAttribute(attrName, value, start);
              errorHandler.warning('attribute "' + attrName + '" missed start quot(' + c + ")!!");
              start = p + 1;
              s = S_ATTR_END;
            } else {
              throw new Error('attribute value must after "="');
            }
            break;
          case "/":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                s = S_TAG_CLOSE;
                el.closed = true;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                break;
              case S_ATTR_SPACE:
                el.closed = true;
                break;
              default:
                throw new Error("attribute invalid close char('/')");
            }
            break;
          case "":
            errorHandler.error("unexpected end of input");
            if (s == S_TAG) {
              el.setTagName(source.slice(start, p));
            }
            return p;
          case ">":
            switch (s) {
              case S_TAG:
                el.setTagName(source.slice(start, p));
              case S_ATTR_END:
              case S_TAG_SPACE:
              case S_TAG_CLOSE:
                break;
              case S_ATTR_NOQUOT_VALUE:
              case S_ATTR:
                value = source.slice(start, p);
                if (value.slice(-1) === "/") {
                  el.closed = true;
                  value = value.slice(0, -1);
                }
              case S_ATTR_SPACE:
                if (s === S_ATTR_SPACE) {
                  value = attrName;
                }
                if (s == S_ATTR_NOQUOT_VALUE) {
                  errorHandler.warning('attribute "' + value + '" missed quot(")!');
                  addAttribute(attrName, value, start);
                } else {
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !value.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + value + '" missed value!! "' + value + '" instead!!');
                  }
                  addAttribute(value, value, start);
                }
                break;
              case S_EQ:
                throw new Error("attribute value missed!!");
            }
            return p;
          case "":
            c = " ";
          default:
            if (c <= " ") {
              switch (s) {
                case S_TAG:
                  el.setTagName(source.slice(start, p));
                  s = S_TAG_SPACE;
                  break;
                case S_ATTR:
                  attrName = source.slice(start, p);
                  s = S_ATTR_SPACE;
                  break;
                case S_ATTR_NOQUOT_VALUE:
                  var value = source.slice(start, p);
                  errorHandler.warning('attribute "' + value + '" missed quot(")!!');
                  addAttribute(attrName, value, start);
                case S_ATTR_END:
                  s = S_TAG_SPACE;
                  break;
              }
            } else {
              switch (s) {
                case S_ATTR_SPACE:
                  var tagName = el.tagName;
                  if (!NAMESPACE.isHTML(currentNSMap[""]) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
                    errorHandler.warning('attribute "' + attrName + '" missed value!! "' + attrName + '" instead2!!');
                  }
                  addAttribute(attrName, attrName, start);
                  start = p;
                  s = S_ATTR;
                  break;
                case S_ATTR_END:
                  errorHandler.warning('attribute space is required"' + attrName + '"!!');
                case S_TAG_SPACE:
                  s = S_ATTR;
                  start = p;
                  break;
                case S_EQ:
                  s = S_ATTR_NOQUOT_VALUE;
                  start = p;
                  break;
                case S_TAG_CLOSE:
                  throw new Error("elements closed character '/' and '>' must be connected to");
              }
            }
        }
        p++;
      }
    }
    function appendElement(el, domBuilder, currentNSMap) {
      var tagName = el.tagName;
      var localNSMap = null;
      var i = el.length;
      while (i--) {
        var a = el[i];
        var qName = a.qName;
        var value = a.value;
        var nsp = qName.indexOf(":");
        if (nsp > 0) {
          var prefix = a.prefix = qName.slice(0, nsp);
          var localName = qName.slice(nsp + 1);
          var nsPrefix = prefix === "xmlns" && localName;
        } else {
          localName = qName;
          prefix = null;
          nsPrefix = qName === "xmlns" && "";
        }
        a.localName = localName;
        if (nsPrefix !== false) {
          if (localNSMap == null) {
            localNSMap = {};
            _copy(currentNSMap, currentNSMap = {});
          }
          currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
          a.uri = NAMESPACE.XMLNS;
          domBuilder.startPrefixMapping(nsPrefix, value);
        }
      }
      var i = el.length;
      while (i--) {
        a = el[i];
        var prefix = a.prefix;
        if (prefix) {
          if (prefix === "xml") {
            a.uri = NAMESPACE.XML;
          }
          if (prefix !== "xmlns") {
            a.uri = currentNSMap[prefix || ""];
          }
        }
      }
      var nsp = tagName.indexOf(":");
      if (nsp > 0) {
        prefix = el.prefix = tagName.slice(0, nsp);
        localName = el.localName = tagName.slice(nsp + 1);
      } else {
        prefix = null;
        localName = el.localName = tagName;
      }
      var ns = el.uri = currentNSMap[prefix || ""];
      domBuilder.startElement(ns, localName, tagName, el);
      if (el.closed) {
        domBuilder.endElement(ns, localName, tagName);
        if (localNSMap) {
          for (prefix in localNSMap) {
            if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
              domBuilder.endPrefixMapping(prefix);
            }
          }
        }
      } else {
        el.currentNSMap = currentNSMap;
        el.localNSMap = localNSMap;
        return true;
      }
    }
    function parseHtmlSpecialContent(source, elStartEnd, tagName, entityReplacer, domBuilder) {
      if (/^(?:script|textarea)$/i.test(tagName)) {
        var elEndStart = source.indexOf("</" + tagName + ">", elStartEnd);
        var text = source.substring(elStartEnd + 1, elEndStart);
        if (/[&<]/.test(text)) {
          if (/^script$/i.test(tagName)) {
            domBuilder.characters(text, 0, text.length);
            return elEndStart;
          }
          text = text.replace(/&#?\w+;/g, entityReplacer);
          domBuilder.characters(text, 0, text.length);
          return elEndStart;
        }
      }
      return elStartEnd + 1;
    }
    function fixSelfClosed(source, elStartEnd, tagName, closeMap) {
      var pos = closeMap[tagName];
      if (pos == null) {
        pos = source.lastIndexOf("</" + tagName + ">");
        if (pos < elStartEnd) {
          pos = source.lastIndexOf("</" + tagName);
        }
        closeMap[tagName] = pos;
      }
      return pos < elStartEnd;
    }
    function _copy(source, target) {
      for (var n in source) {
        if (Object.prototype.hasOwnProperty.call(source, n)) {
          target[n] = source[n];
        }
      }
    }
    function parseDCC(source, start, domBuilder, errorHandler) {
      var next = source.charAt(start + 2);
      switch (next) {
        case "-":
          if (source.charAt(start + 3) === "-") {
            var end = source.indexOf("-->", start + 4);
            if (end > start) {
              domBuilder.comment(source, start + 4, end - start - 4);
              return end + 3;
            } else {
              errorHandler.error("Unclosed comment");
              return -1;
            }
          } else {
            return -1;
          }
        default:
          if (source.substr(start + 3, 6) == "CDATA[") {
            var end = source.indexOf("]]>", start + 9);
            domBuilder.startCDATA();
            domBuilder.characters(source, start + 9, end - start - 9);
            domBuilder.endCDATA();
            return end + 3;
          }
          var matchs = split(source, start);
          var len = matchs.length;
          if (len > 1 && /!doctype/i.test(matchs[0][0])) {
            var name = matchs[1][0];
            var pubid = false;
            var sysid = false;
            if (len > 3) {
              if (/^public$/i.test(matchs[2][0])) {
                pubid = matchs[3][0];
                sysid = len > 4 && matchs[4][0];
              } else if (/^system$/i.test(matchs[2][0])) {
                sysid = matchs[3][0];
              }
            }
            var lastMatch = matchs[len - 1];
            domBuilder.startDTD(name, pubid, sysid);
            domBuilder.endDTD();
            return lastMatch.index + lastMatch[0].length;
          }
      }
      return -1;
    }
    function parseInstruction(source, start, domBuilder) {
      var end = source.indexOf("?>", start);
      if (end) {
        var match = source.substring(start, end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
        if (match) {
          var len = match[0].length;
          domBuilder.processingInstruction(match[1], match[2]);
          return end + 2;
        } else {
          return -1;
        }
      }
      return -1;
    }
    function ElementAttributes() {
      this.attributeNames = {};
    }
    ElementAttributes.prototype = {
      setTagName: function(tagName) {
        if (!tagNamePattern.test(tagName)) {
          throw new Error("invalid tagName:" + tagName);
        }
        this.tagName = tagName;
      },
      addValue: function(qName, value, offset) {
        if (!tagNamePattern.test(qName)) {
          throw new Error("invalid attribute:" + qName);
        }
        this.attributeNames[qName] = this.length;
        this[this.length++] = { qName, value, offset };
      },
      length: 0,
      getLocalName: function(i) {
        return this[i].localName;
      },
      getLocator: function(i) {
        return this[i].locator;
      },
      getQName: function(i) {
        return this[i].qName;
      },
      getURI: function(i) {
        return this[i].uri;
      },
      getValue: function(i) {
        return this[i].value;
      }
      //	,getIndex:function(uri, localName)){
      //		if(localName){
      //
      //		}else{
      //			var qName = uri
      //		}
      //	},
      //	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
      //	getType:function(uri,localName){}
      //	getType:function(i){},
    };
    function split(source, start) {
      var match;
      var buf = [];
      var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
      reg.lastIndex = start;
      reg.exec(source);
      while (match = reg.exec(source)) {
        buf.push(match);
        if (match[1])
          return buf;
      }
    }
    exports.XMLReader = XMLReader;
    exports.ParseError = ParseError;
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/dom-parser.js
var require_dom_parser = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/dom-parser.js"(exports) {
    var conventions = require_conventions();
    var dom = require_dom();
    var entities = require_entities();
    var sax = require_sax();
    var DOMImplementation = dom.DOMImplementation;
    var NAMESPACE = conventions.NAMESPACE;
    var ParseError = sax.ParseError;
    var XMLReader = sax.XMLReader;
    function normalizeLineEndings(input) {
      return input.replace(/\r[\n\u0085]/g, "\n").replace(/[\r\u0085\u2028]/g, "\n");
    }
    function DOMParser(options) {
      this.options = options || { locator: {} };
    }
    DOMParser.prototype.parseFromString = function(source, mimeType) {
      var options = this.options;
      var sax2 = new XMLReader();
      var domBuilder = options.domBuilder || new DOMHandler();
      var errorHandler = options.errorHandler;
      var locator = options.locator;
      var defaultNSMap = options.xmlns || {};
      var isHTML = /\/x?html?$/.test(mimeType);
      var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
      if (locator) {
        domBuilder.setDocumentLocator(locator);
      }
      sax2.errorHandler = buildErrorHandler(errorHandler, domBuilder, locator);
      sax2.domBuilder = options.domBuilder || domBuilder;
      if (isHTML) {
        defaultNSMap[""] = NAMESPACE.HTML;
      }
      defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
      var normalize = options.normalizeLineEndings || normalizeLineEndings;
      if (source && typeof source === "string") {
        sax2.parse(
          normalize(source),
          defaultNSMap,
          entityMap
        );
      } else {
        sax2.errorHandler.error("invalid doc source");
      }
      return domBuilder.doc;
    };
    function buildErrorHandler(errorImpl, domBuilder, locator) {
      if (!errorImpl) {
        if (domBuilder instanceof DOMHandler) {
          return domBuilder;
        }
        errorImpl = domBuilder;
      }
      var errorHandler = {};
      var isCallback = errorImpl instanceof Function;
      locator = locator || {};
      function build(key) {
        var fn = errorImpl[key];
        if (!fn && isCallback) {
          fn = errorImpl.length == 2 ? function(msg) {
            errorImpl(key, msg);
          } : errorImpl;
        }
        errorHandler[key] = fn && function(msg) {
          fn("[xmldom " + key + "]	" + msg + _locator(locator));
        } || function() {
        };
      }
      build("warning");
      build("error");
      build("fatalError");
      return errorHandler;
    }
    function DOMHandler() {
      this.cdata = false;
    }
    function position(locator, node) {
      node.lineNumber = locator.lineNumber;
      node.columnNumber = locator.columnNumber;
    }
    DOMHandler.prototype = {
      startDocument: function() {
        this.doc = new DOMImplementation().createDocument(null, null, null);
        if (this.locator) {
          this.doc.documentURI = this.locator.systemId;
        }
      },
      startElement: function(namespaceURI, localName, qName, attrs) {
        var doc = this.doc;
        var el = doc.createElementNS(namespaceURI, qName || localName);
        var len = attrs.length;
        appendElement(this, el);
        this.currentElement = el;
        this.locator && position(this.locator, el);
        for (var i = 0; i < len; i++) {
          var namespaceURI = attrs.getURI(i);
          var value = attrs.getValue(i);
          var qName = attrs.getQName(i);
          var attr = doc.createAttributeNS(namespaceURI, qName);
          this.locator && position(attrs.getLocator(i), attr);
          attr.value = attr.nodeValue = value;
          el.setAttributeNode(attr);
        }
      },
      endElement: function(namespaceURI, localName, qName) {
        var current = this.currentElement;
        var tagName = current.tagName;
        this.currentElement = current.parentNode;
      },
      startPrefixMapping: function(prefix, uri) {
      },
      endPrefixMapping: function(prefix) {
      },
      processingInstruction: function(target, data) {
        var ins = this.doc.createProcessingInstruction(target, data);
        this.locator && position(this.locator, ins);
        appendElement(this, ins);
      },
      ignorableWhitespace: function(ch, start, length) {
      },
      characters: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        if (chars) {
          if (this.cdata) {
            var charNode = this.doc.createCDATASection(chars);
          } else {
            var charNode = this.doc.createTextNode(chars);
          }
          if (this.currentElement) {
            this.currentElement.appendChild(charNode);
          } else if (/^\s*$/.test(chars)) {
            this.doc.appendChild(charNode);
          }
          this.locator && position(this.locator, charNode);
        }
      },
      skippedEntity: function(name) {
      },
      endDocument: function() {
        this.doc.normalize();
      },
      setDocumentLocator: function(locator) {
        if (this.locator = locator) {
          locator.lineNumber = 0;
        }
      },
      //LexicalHandler
      comment: function(chars, start, length) {
        chars = _toString.apply(this, arguments);
        var comm = this.doc.createComment(chars);
        this.locator && position(this.locator, comm);
        appendElement(this, comm);
      },
      startCDATA: function() {
        this.cdata = true;
      },
      endCDATA: function() {
        this.cdata = false;
      },
      startDTD: function(name, publicId, systemId) {
        var impl = this.doc.implementation;
        if (impl && impl.createDocumentType) {
          var dt = impl.createDocumentType(name, publicId, systemId);
          this.locator && position(this.locator, dt);
          appendElement(this, dt);
          this.doc.doctype = dt;
        }
      },
      /**
       * @see org.xml.sax.ErrorHandler
       * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
       */
      warning: function(error) {
        console.warn("[xmldom warning]	" + error, _locator(this.locator));
      },
      error: function(error) {
        console.error("[xmldom error]	" + error, _locator(this.locator));
      },
      fatalError: function(error) {
        throw new ParseError(error, this.locator);
      }
    };
    function _locator(l) {
      if (l) {
        return "\n@" + (l.systemId || "") + "#[line:" + l.lineNumber + ",col:" + l.columnNumber + "]";
      }
    }
    function _toString(chars, start, length) {
      if (typeof chars == "string") {
        return chars.substr(start, length);
      } else {
        if (chars.length >= start + length || start) {
          return new java.lang.String(chars, start, length) + "";
        }
        return chars;
      }
    }
    "endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g, function(key) {
      DOMHandler.prototype[key] = function() {
        return null;
      };
    });
    function appendElement(hander, node) {
      if (!hander.currentElement) {
        hander.doc.appendChild(node);
      } else {
        hander.currentElement.appendChild(node);
      }
    }
    exports.__DOMHandler = DOMHandler;
    exports.normalizeLineEndings = normalizeLineEndings;
    exports.DOMParser = DOMParser;
  }
});

// node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/@xmldom+xmldom@0.8.10/node_modules/@xmldom/xmldom/lib/index.js"(exports) {
    var dom = require_dom();
    exports.DOMImplementation = dom.DOMImplementation;
    exports.XMLSerializer = dom.XMLSerializer;
    exports.DOMParser = require_dom_parser().DOMParser;
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/utils.js"(exports, module) {
    "use strict";
    function last(a) {
      return a[a.length - 1];
    }
    function first(a) {
      return a[0];
    }
    module.exports = {
      last,
      first
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/errors.js
var require_errors = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/errors.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var _require = require_utils();
    var last = _require.last;
    var first = _require.first;
    function XTError(message) {
      this.name = "GenericError";
      this.message = message;
      this.stack = new Error(message).stack;
    }
    XTError.prototype = Error.prototype;
    function XTTemplateError(message) {
      this.name = "TemplateError";
      this.message = message;
      this.stack = new Error(message).stack;
    }
    XTTemplateError.prototype = new XTError();
    function XTRenderingError(message) {
      this.name = "RenderingError";
      this.message = message;
      this.stack = new Error(message).stack;
    }
    XTRenderingError.prototype = new XTError();
    function XTScopeParserError(message) {
      this.name = "ScopeParserError";
      this.message = message;
      this.stack = new Error(message).stack;
    }
    XTScopeParserError.prototype = new XTError();
    function XTInternalError(message) {
      this.name = "InternalError";
      this.properties = {
        explanation: "InternalError"
      };
      this.message = message;
      this.stack = new Error(message).stack;
    }
    XTInternalError.prototype = new XTError();
    function XTAPIVersionError(message) {
      this.name = "APIVersionError";
      this.properties = {
        explanation: "APIVersionError"
      };
      this.message = message;
      this.stack = new Error(message).stack;
    }
    XTAPIVersionError.prototype = new XTError();
    function throwApiVersionError(msg, properties) {
      var err = new XTAPIVersionError(msg);
      err.properties = _objectSpread({
        id: "api_version_error"
      }, properties);
      throw err;
    }
    function throwMultiError(errors) {
      var err = new XTTemplateError("Multi error");
      err.properties = {
        errors,
        id: "multi_error",
        explanation: "The template has multiple errors"
      };
      throw err;
    }
    function getUnopenedTagException(options) {
      var err = new XTTemplateError("Unopened tag");
      err.properties = {
        xtag: last(options.xtag.split(" ")),
        id: "unopened_tag",
        context: options.xtag,
        offset: options.offset,
        lIndex: options.lIndex,
        explanation: 'The tag beginning with "'.concat(options.xtag.substr(0, 10), '" is unopened')
      };
      return err;
    }
    function getDuplicateOpenTagException(options) {
      var err = new XTTemplateError("Duplicate open tag, expected one open tag");
      err.properties = {
        xtag: first(options.xtag.split(" ")),
        id: "duplicate_open_tag",
        context: options.xtag,
        offset: options.offset,
        lIndex: options.lIndex,
        explanation: 'The tag beginning with "'.concat(options.xtag.substr(0, 10), '" has duplicate open tags')
      };
      return err;
    }
    function getDuplicateCloseTagException(options) {
      var err = new XTTemplateError("Duplicate close tag, expected one close tag");
      err.properties = {
        xtag: first(options.xtag.split(" ")),
        id: "duplicate_close_tag",
        context: options.xtag,
        offset: options.offset,
        lIndex: options.lIndex,
        explanation: 'The tag ending with "'.concat(options.xtag.substr(0, 10), '" has duplicate close tags')
      };
      return err;
    }
    function getUnclosedTagException(options) {
      var err = new XTTemplateError("Unclosed tag");
      err.properties = {
        xtag: first(options.xtag.split(" ")).substr(1),
        id: "unclosed_tag",
        context: options.xtag,
        offset: options.offset,
        lIndex: options.lIndex,
        explanation: 'The tag beginning with "'.concat(options.xtag.substr(0, 10), '" is unclosed')
      };
      return err;
    }
    function throwXmlTagNotFound(options) {
      var err = new XTTemplateError('No tag "'.concat(options.element, '" was found at the ').concat(options.position));
      var part = options.parsed[options.index];
      err.properties = {
        id: "no_xml_tag_found_at_".concat(options.position),
        explanation: 'No tag "'.concat(options.element, '" was found at the ').concat(options.position),
        offset: part.offset,
        part,
        parsed: options.parsed,
        index: options.index,
        element: options.element
      };
      throw err;
    }
    function getCorruptCharactersException(_ref) {
      var tag = _ref.tag, value = _ref.value, offset = _ref.offset;
      var err = new XTRenderingError("There are some XML corrupt characters");
      err.properties = {
        id: "invalid_xml_characters",
        xtag: tag,
        value,
        offset,
        explanation: "There are some corrupt characters for the field ".concat(tag)
      };
      return err;
    }
    function getInvalidRawXMLValueException(_ref2) {
      var tag = _ref2.tag, value = _ref2.value, offset = _ref2.offset;
      var err = new XTRenderingError("Non string values are not allowed for rawXML tags");
      err.properties = {
        id: "invalid_raw_xml_value",
        xtag: tag,
        value,
        offset,
        explanation: "The value of the raw tag : '".concat(tag, "' is not a string")
      };
      return err;
    }
    function throwExpandNotFound(options) {
      var _options$part = options.part, value = _options$part.value, offset = _options$part.offset, _options$id = options.id, id = _options$id === void 0 ? "raw_tag_outerxml_invalid" : _options$id, _options$message = options.message, message = _options$message === void 0 ? "Raw tag not in paragraph" : _options$message;
      var part = options.part;
      var _options$explanation = options.explanation, explanation = _options$explanation === void 0 ? 'The tag "'.concat(value, '" is not inside a paragraph') : _options$explanation;
      if (typeof explanation === "function") {
        explanation = explanation(part);
      }
      var err = new XTTemplateError(message);
      err.properties = {
        id,
        explanation,
        rootError: options.rootError,
        xtag: value,
        offset,
        postparsed: options.postparsed,
        expandTo: options.expandTo,
        index: options.index
      };
      throw err;
    }
    function throwRawTagShouldBeOnlyTextInParagraph(options) {
      var err = new XTTemplateError("Raw tag should be the only text in paragraph");
      var tag = options.part.value;
      err.properties = {
        id: "raw_xml_tag_should_be_only_text_in_paragraph",
        explanation: 'The raw tag "'.concat(tag, '" should be the only text in this paragraph. This means that this tag should not be surrounded by any text or spaces.'),
        xtag: tag,
        offset: options.part.offset,
        paragraphParts: options.paragraphParts
      };
      throw err;
    }
    function getUnmatchedLoopException(part) {
      var location = part.location, offset = part.offset, square = part.square;
      var t = location === "start" ? "unclosed" : "unopened";
      var T = location === "start" ? "Unclosed" : "Unopened";
      var err = new XTTemplateError("".concat(T, " loop"));
      var tag = part.value;
      err.properties = {
        id: "".concat(t, "_loop"),
        explanation: 'The loop with tag "'.concat(tag, '" is ').concat(t),
        xtag: tag,
        offset
      };
      if (square) {
        err.properties.square = square;
      }
      return err;
    }
    function getUnbalancedLoopException(pair, lastPair) {
      var err = new XTTemplateError("Unbalanced loop tag");
      var lastL = lastPair[0].part.value;
      var lastR = lastPair[1].part.value;
      var l = pair[0].part.value;
      var r = pair[1].part.value;
      err.properties = {
        id: "unbalanced_loop_tags",
        explanation: "Unbalanced loop tags {#".concat(lastL, "}{/").concat(lastR, "}{#").concat(l, "}{/").concat(r, "}"),
        offset: [lastPair[0].part.offset, pair[1].part.offset],
        lastPair: {
          left: lastPair[0].part.value,
          right: lastPair[1].part.value
        },
        pair: {
          left: pair[0].part.value,
          right: pair[1].part.value
        }
      };
      return err;
    }
    function getClosingTagNotMatchOpeningTag(_ref3) {
      var tags = _ref3.tags;
      var err = new XTTemplateError("Closing tag does not match opening tag");
      err.properties = {
        id: "closing_tag_does_not_match_opening_tag",
        explanation: 'The tag "'.concat(tags[0].value, '" is closed by the tag "').concat(tags[1].value, '"'),
        openingtag: first(tags).value,
        offset: [first(tags).offset, last(tags).offset],
        closingtag: last(tags).value
      };
      return err;
    }
    function getScopeCompilationError(_ref4) {
      var tag = _ref4.tag, rootError = _ref4.rootError, offset = _ref4.offset;
      var err = new XTScopeParserError("Scope parser compilation failed");
      err.properties = {
        id: "scopeparser_compilation_failed",
        offset,
        xtag: tag,
        explanation: 'The scope parser for the tag "'.concat(tag, '" failed to compile'),
        rootError
      };
      return err;
    }
    function getScopeParserExecutionError(_ref5) {
      var tag = _ref5.tag, scope = _ref5.scope, error = _ref5.error, offset = _ref5.offset;
      var err = new XTScopeParserError("Scope parser execution failed");
      err.properties = {
        id: "scopeparser_execution_failed",
        explanation: "The scope parser for the tag ".concat(tag, " failed to execute"),
        scope,
        offset,
        xtag: tag,
        rootError: error
      };
      return err;
    }
    function getLoopPositionProducesInvalidXMLError(_ref6) {
      var tag = _ref6.tag, offset = _ref6.offset;
      var err = new XTTemplateError('The position of the loop tags "'.concat(tag, '" would produce invalid XML'));
      err.properties = {
        xtag: tag,
        id: "loop_position_invalid",
        explanation: 'The tags "'.concat(tag, '" are misplaced in the document, for example one of them is in a table and the other one outside the table'),
        offset
      };
      return err;
    }
    function throwUnimplementedTagType(part, index) {
      var errorMsg = 'Unimplemented tag type "'.concat(part.type, '"');
      if (part.module) {
        errorMsg += ' "'.concat(part.module, '"');
      }
      var err = new XTTemplateError(errorMsg);
      err.properties = {
        part,
        index,
        id: "unimplemented_tag_type"
      };
      throw err;
    }
    function throwMalformedXml() {
      var err = new XTInternalError("Malformed xml");
      err.properties = {
        explanation: "The template contains malformed xml",
        id: "malformed_xml"
      };
      throw err;
    }
    function throwResolveBeforeCompile() {
      var err = new XTInternalError("You must run `.compile()` before running `.resolveData()`");
      err.properties = {
        id: "resolve_before_compile",
        explanation: "You must run `.compile()` before running `.resolveData()`"
      };
      throw err;
    }
    function throwRenderInvalidTemplate() {
      var err = new XTInternalError("You should not call .render on a document that had compilation errors");
      err.properties = {
        id: "render_on_invalid_template",
        explanation: "You should not call .render on a document that had compilation errors"
      };
      throw err;
    }
    function throwRenderTwice() {
      var err = new XTInternalError("You should not call .render twice on the same docxtemplater instance");
      err.properties = {
        id: "render_twice",
        explanation: "You should not call .render twice on the same docxtemplater instance"
      };
      throw err;
    }
    function throwFileTypeNotIdentified() {
      var err = new XTInternalError("The filetype for this file could not be identified, is this file corrupted ?");
      err.properties = {
        id: "filetype_not_identified",
        explanation: "The filetype for this file could not be identified, is this file corrupted ?"
      };
      throw err;
    }
    function throwXmlInvalid(content, offset) {
      var err = new XTTemplateError("An XML file has invalid xml");
      err.properties = {
        id: "file_has_invalid_xml",
        content,
        offset,
        explanation: "The docx contains invalid XML, it is most likely corrupt"
      };
      throw err;
    }
    function throwFileTypeNotHandled(fileType) {
      var err = new XTInternalError('The filetype "'.concat(fileType, '" is not handled by docxtemplater'));
      err.properties = {
        id: "filetype_not_handled",
        explanation: 'The file you are trying to generate is of type "'.concat(fileType, '", but only docx and pptx formats are handled'),
        fileType
      };
      throw err;
    }
    module.exports = {
      XTError,
      XTTemplateError,
      XTInternalError,
      XTScopeParserError,
      XTAPIVersionError,
      // Remove this alias in v4
      RenderingError: XTRenderingError,
      XTRenderingError,
      getClosingTagNotMatchOpeningTag,
      getLoopPositionProducesInvalidXMLError,
      getScopeCompilationError,
      getScopeParserExecutionError,
      getUnclosedTagException,
      getUnopenedTagException,
      getUnmatchedLoopException,
      getDuplicateCloseTagException,
      getDuplicateOpenTagException,
      getCorruptCharactersException,
      getInvalidRawXMLValueException,
      getUnbalancedLoopException,
      throwApiVersionError,
      throwFileTypeNotHandled,
      throwFileTypeNotIdentified,
      throwMalformedXml,
      throwMultiError,
      throwExpandNotFound,
      throwRawTagShouldBeOnlyTextInParagraph,
      throwUnimplementedTagType,
      throwXmlTagNotFound,
      throwXmlInvalid,
      throwResolveBeforeCompile,
      throwRenderInvalidTemplate,
      throwRenderTwice
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/doc-utils.js
var require_doc_utils = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/doc-utils.js"(exports, module) {
    "use strict";
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t)
              return;
            f = false;
          } else
            for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
              ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
              return;
          } finally {
            if (o)
              throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    var _require = require_lib();
    var DOMParser = _require.DOMParser;
    var XMLSerializer = _require.XMLSerializer;
    var _require2 = require_errors();
    var throwXmlTagNotFound = _require2.throwXmlTagNotFound;
    var _require3 = require_utils();
    var last = _require3.last;
    var first = _require3.first;
    function isWhiteSpace(value) {
      return /^[ \n\r\t]+$/.test(value);
    }
    function parser(tag) {
      return {
        get: function get(scope) {
          if (tag === ".") {
            return scope;
          }
          if (scope) {
            return scope[tag];
          }
          return scope;
        }
      };
    }
    var attrToRegex = {};
    function setSingleAttribute(partValue, attr, attrValue) {
      var regex;
      if (attrToRegex[attr]) {
        regex = attrToRegex[attr];
      } else {
        regex = new RegExp("(<.* ".concat(attr, '=")([^"]*)(".*)$'));
        attrToRegex[attr] = regex;
      }
      if (regex.test(partValue)) {
        return partValue.replace(regex, "$1".concat(attrValue, "$3"));
      }
      var end = partValue.lastIndexOf("/>");
      if (end === -1) {
        end = partValue.lastIndexOf(">");
      }
      return partValue.substr(0, end) + " ".concat(attr, '="').concat(attrValue, '"') + partValue.substr(end);
    }
    function getSingleAttribute(value, attributeName) {
      var index = value.indexOf(" ".concat(attributeName, '="'));
      if (index === -1) {
        return null;
      }
      var startIndex = value.substr(index).search(/["']/) + index;
      var endIndex = value.substr(startIndex + 1).search(/["']/) + startIndex;
      return value.substr(startIndex + 1, endIndex - startIndex);
    }
    function endsWith(str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }
    function startsWith(str, prefix) {
      return str.substring(0, prefix.length) === prefix;
    }
    function getDuplicates(arr) {
      var duplicates = [];
      var hash = {}, result = [];
      for (var i = 0, l = arr.length; i < l; ++i) {
        if (!hash[arr[i]]) {
          hash[arr[i]] = true;
          result.push(arr[i]);
        } else {
          duplicates.push(arr[i]);
        }
      }
      return duplicates;
    }
    function uniq(arr) {
      var hash = {}, result = [];
      for (var i = 0, l = arr.length; i < l; ++i) {
        if (!hash[arr[i]]) {
          hash[arr[i]] = true;
          result.push(arr[i]);
        }
      }
      return result;
    }
    function chunkBy(parsed, f) {
      return parsed.reduce(function(chunks, p) {
        var currentChunk = last(chunks);
        var res = f(p);
        if (res === "start") {
          chunks.push([p]);
        } else if (res === "end") {
          currentChunk.push(p);
          chunks.push([]);
        } else {
          currentChunk.push(p);
        }
        return chunks;
      }, [[]]).filter(function(p) {
        return p.length > 0;
      });
    }
    var defaults = {
      errorLogging: "json",
      paragraphLoop: false,
      nullGetter: function nullGetter(part) {
        return part.module ? "" : "undefined";
      },
      xmlFileNames: ["[Content_Types].xml"],
      parser,
      linebreaks: false,
      fileTypeConfig: null,
      delimiters: {
        start: "{",
        end: "}"
      },
      syntax: {}
    };
    function xml2str(xmlNode) {
      var a = new XMLSerializer();
      return a.serializeToString(xmlNode).replace(/xmlns(:[a-z0-9]+)?="" ?/g, "");
    }
    function str2xml(str) {
      if (str.charCodeAt(0) === 65279) {
        str = str.substr(1);
      }
      return new DOMParser().parseFromString(str, "text/xml");
    }
    var charMap = [["&", "&amp;"], ["<", "&lt;"], [">", "&gt;"], ['"', "&quot;"], ["'", "&apos;"]];
    var charMapRegexes = charMap.map(function(_ref) {
      var _ref2 = _slicedToArray(_ref, 2), endChar = _ref2[0], startChar = _ref2[1];
      return {
        rstart: new RegExp(startChar, "g"),
        rend: new RegExp(endChar, "g"),
        start: startChar,
        end: endChar
      };
    });
    function wordToUtf8(string) {
      var r;
      for (var i = charMapRegexes.length - 1; i >= 0; i--) {
        r = charMapRegexes[i];
        string = string.replace(r.rstart, r.end);
      }
      return string;
    }
    function utf8ToWord(string) {
      string = string.toString();
      var r;
      for (var i = 0, l = charMapRegexes.length; i < l; i++) {
        r = charMapRegexes[i];
        string = string.replace(r.rend, r.start);
      }
      return string;
    }
    function concatArrays(arrays) {
      var result = [];
      for (var i = 0; i < arrays.length; i++) {
        var array = arrays[i];
        for (var j = 0, len = array.length; j < len; j++) {
          result.push(array[j]);
        }
      }
      return result;
    }
    var spaceRegexp = new RegExp(String.fromCharCode(160), "g");
    function convertSpaces(s) {
      return s.replace(spaceRegexp, " ");
    }
    function pregMatchAll(regex, content) {
      var matchArray = [];
      var match;
      while ((match = regex.exec(content)) != null) {
        matchArray.push({
          array: match,
          offset: match.index
        });
      }
      return matchArray;
    }
    function isEnding(value, element) {
      return value === "</" + element + ">";
    }
    function isStarting(value, element) {
      return value.indexOf("<" + element) === 0 && [">", " ", "/"].indexOf(value[element.length + 1]) !== -1;
    }
    function getRight(parsed, element, index) {
      var val = getRightOrNull(parsed, element, index);
      if (val !== null) {
        return val;
      }
      throwXmlTagNotFound({
        position: "right",
        element,
        parsed,
        index
      });
    }
    function getRightOrNull(parsed, elements, index) {
      if (typeof elements === "string") {
        elements = [elements];
      }
      var level = 1;
      for (var i = index, l = parsed.length; i < l; i++) {
        var part = parsed[i];
        for (var j = 0, len = elements.length; j < len; j++) {
          var element = elements[j];
          if (isEnding(part.value, element)) {
            level--;
          }
          if (isStarting(part.value, element)) {
            level++;
          }
          if (level === 0) {
            return i;
          }
        }
      }
      return null;
    }
    function getLeft(parsed, element, index) {
      var val = getLeftOrNull(parsed, element, index);
      if (val !== null) {
        return val;
      }
      throwXmlTagNotFound({
        position: "left",
        element,
        parsed,
        index
      });
    }
    function getLeftOrNull(parsed, elements, index) {
      if (typeof elements === "string") {
        elements = [elements];
      }
      var level = 1;
      for (var i = index; i >= 0; i--) {
        var part = parsed[i];
        for (var j = 0, len = elements.length; j < len; j++) {
          var element = elements[j];
          if (isStarting(part.value, element)) {
            level--;
          }
          if (isEnding(part.value, element)) {
            level++;
          }
          if (level === 0) {
            return i;
          }
        }
      }
      return null;
    }
    function isTagStart(tagType, _ref3) {
      var type = _ref3.type, tag = _ref3.tag, position = _ref3.position;
      return type === "tag" && tag === tagType && (position === "start" || position === "selfclosing");
    }
    function isTagStartStrict(tagType, _ref4) {
      var type = _ref4.type, tag = _ref4.tag, position = _ref4.position;
      return type === "tag" && tag === tagType && position === "start";
    }
    function isTagEnd(tagType, _ref5) {
      var type = _ref5.type, tag = _ref5.tag, position = _ref5.position;
      return type === "tag" && tag === tagType && position === "end";
    }
    function isParagraphStart(part) {
      return isTagStartStrict("w:p", part) || isTagStartStrict("a:p", part);
    }
    function isParagraphEnd(part) {
      return isTagEnd("w:p", part) || isTagEnd("a:p", part);
    }
    function isTextStart(_ref6) {
      var type = _ref6.type, position = _ref6.position, text = _ref6.text;
      return type === "tag" && position === "start" && text;
    }
    function isTextEnd(_ref7) {
      var type = _ref7.type, position = _ref7.position, text = _ref7.text;
      return type === "tag" && position === "end" && text;
    }
    function isContent(_ref8) {
      var type = _ref8.type, position = _ref8.position;
      return type === "placeholder" || type === "content" && position === "insidetag";
    }
    function isModule(_ref9, modules) {
      var module2 = _ref9.module, type = _ref9.type;
      if (!(modules instanceof Array)) {
        modules = [modules];
      }
      return type === "placeholder" && modules.indexOf(module2) !== -1;
    }
    var corruptCharacters = /[\x00-\x08\x0B\x0C\x0E-\x1F]/;
    function hasCorruptCharacters(string) {
      return corruptCharacters.test(string);
    }
    function invertMap(map) {
      return Object.keys(map).reduce(function(invertedMap, key) {
        var value = map[key];
        invertedMap[value] = invertedMap[value] || [];
        invertedMap[value].push(key);
        return invertedMap;
      }, {});
    }
    function stableSort(arr, compare) {
      return arr.map(function(item, index) {
        return {
          item,
          index
        };
      }).sort(function(a, b) {
        return compare(a.item, b.item) || a.index - b.index;
      }).map(function(_ref10) {
        var item = _ref10.item;
        return item;
      });
    }
    module.exports = {
      endsWith,
      startsWith,
      isContent,
      isParagraphStart,
      isParagraphEnd,
      isTagStart,
      isTagEnd,
      isTextStart,
      isTextEnd,
      isStarting,
      isEnding,
      isModule,
      uniq,
      getDuplicates,
      chunkBy,
      last,
      first,
      xml2str,
      str2xml,
      getRightOrNull,
      getRight,
      getLeftOrNull,
      getLeft,
      pregMatchAll,
      convertSpaces,
      charMapRegexes,
      hasCorruptCharacters,
      defaults,
      wordToUtf8,
      utf8ToWord,
      concatArrays,
      invertMap,
      charMap,
      getSingleAttribute,
      setSingleAttribute,
      isWhiteSpace,
      stableSort
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/traits.js
var require_traits = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/traits.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
        return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t)
              return;
            f = false;
          } else
            for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
              ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
              return;
          } finally {
            if (o)
              throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var _require = require_doc_utils();
    var getRightOrNull = _require.getRightOrNull;
    var getRight = _require.getRight;
    var getLeft = _require.getLeft;
    var getLeftOrNull = _require.getLeftOrNull;
    var chunkBy = _require.chunkBy;
    var isTagStart = _require.isTagStart;
    var isTagEnd = _require.isTagEnd;
    var isContent = _require.isContent;
    var last = _require.last;
    var first = _require.first;
    var _require2 = require_errors();
    var XTTemplateError = _require2.XTTemplateError;
    var throwExpandNotFound = _require2.throwExpandNotFound;
    var getLoopPositionProducesInvalidXMLError = _require2.getLoopPositionProducesInvalidXMLError;
    function lastTagIsOpenTag(tags, tag) {
      if (tags.length === 0) {
        return false;
      }
      var innerLastTag = last(tags).substr(1);
      return innerLastTag.indexOf(tag) === 0;
    }
    function getListXmlElements(parts) {
      var result = [];
      for (var i = 0; i < parts.length; i++) {
        var _parts$i = parts[i], position = _parts$i.position, value = _parts$i.value, tag = _parts$i.tag;
        if (!tag) {
          continue;
        }
        if (position === "end") {
          if (lastTagIsOpenTag(result, tag)) {
            result.pop();
          } else {
            result.push(value);
          }
        } else if (position === "start") {
          result.push(value);
        }
      }
      return result;
    }
    function has(name, xmlElements) {
      for (var i = 0; i < xmlElements.length; i++) {
        var xmlElement = xmlElements[i];
        if (xmlElement.indexOf("<".concat(name)) === 0) {
          return true;
        }
      }
      return false;
    }
    function getExpandToDefault(postparsed, pair, expandTags) {
      var parts = postparsed.slice(pair[0].offset, pair[1].offset);
      var xmlElements = getListXmlElements(parts);
      var closingTagCount = xmlElements.filter(function(tag) {
        return tag[1] === "/";
      }).length;
      var startingTagCount = xmlElements.filter(function(tag) {
        return tag[1] !== "/" && tag[tag.length - 2] !== "/";
      }).length;
      if (closingTagCount !== startingTagCount) {
        return {
          error: getLoopPositionProducesInvalidXMLError({
            tag: first(pair).part.value,
            offset: [first(pair).part.offset, last(pair).part.offset]
          })
        };
      }
      var _loop = function _loop2() {
        var _expandTags$i = expandTags[i], contains = _expandTags$i.contains, expand = _expandTags$i.expand, onlyTextInTag = _expandTags$i.onlyTextInTag;
        if (has(contains, xmlElements)) {
          if (onlyTextInTag) {
            var left = getLeftOrNull(postparsed, contains, pair[0].offset);
            var right = getRightOrNull(postparsed, contains, pair[1].offset);
            if (left === null || right === null) {
              return 0;
            }
            var chunks = chunkBy(postparsed.slice(left, right), function(p) {
              return isTagStart(contains, p) ? "start" : isTagEnd(contains, p) ? "end" : null;
            });
            var firstChunk = first(chunks);
            var lastChunk = last(chunks);
            var firstContent = firstChunk.filter(isContent);
            var lastContent = lastChunk.filter(isContent);
            if (firstContent.length !== 1 || lastContent.length !== 1) {
              return 0;
            }
          }
          return {
            v: {
              value: expand
            }
          };
        }
      }, _ret;
      for (var i = 0, len = expandTags.length; i < len; i++) {
        _ret = _loop();
        if (_ret === 0)
          continue;
        if (_ret)
          return _ret.v;
      }
      return {};
    }
    function getExpandLimit(part, index, postparsed, options) {
      var expandTo = part.expandTo || options.expandTo;
      if (!expandTo) {
        return;
      }
      var right, left;
      try {
        left = getLeft(postparsed, expandTo, index);
        right = getRight(postparsed, expandTo, index);
      } catch (rootError) {
        if (rootError instanceof XTTemplateError) {
          throwExpandNotFound(_objectSpread({
            part,
            rootError,
            postparsed,
            expandTo,
            index
          }, options.error));
        }
        throw rootError;
      }
      return [left, right];
    }
    function expandOne(_ref, part, postparsed, options) {
      var _ref2 = _slicedToArray(_ref, 2), left = _ref2[0], right = _ref2[1];
      var index = postparsed.indexOf(part);
      var leftParts = postparsed.slice(left, index);
      var rightParts = postparsed.slice(index + 1, right + 1);
      var inner = options.getInner({
        postparse: options.postparse,
        index,
        part,
        leftParts,
        rightParts,
        left,
        right,
        postparsed
      });
      if (!inner.length) {
        inner.expanded = [leftParts, rightParts];
        inner = [inner];
      }
      return {
        left,
        right,
        inner
      };
    }
    function expandToOne(postparsed, options) {
      var errors = [];
      if (postparsed.errors) {
        errors = postparsed.errors;
        postparsed = postparsed.postparsed;
      }
      var limits = [];
      for (var i = 0, len = postparsed.length; i < len; i++) {
        var part = postparsed[i];
        if (part.type === "placeholder" && part.module === options.moduleName && // The part.subparsed check is used to fix this github issue :
        // https://github.com/open-xml-templating/docxtemplater/issues/671
        !part.subparsed) {
          try {
            var limit = getExpandLimit(part, i, postparsed, options);
            if (!limit) {
              continue;
            }
            var _limit = _slicedToArray(limit, 2), left = _limit[0], right = _limit[1];
            limits.push({
              left,
              right,
              part,
              i,
              leftPart: postparsed[left],
              rightPart: postparsed[right]
            });
          } catch (error) {
            if (error instanceof XTTemplateError) {
              errors.push(error);
            } else {
              throw error;
            }
          }
        }
      }
      limits.sort(function(l1, l2) {
        if (l1.left === l2.left) {
          return l2.part.lIndex < l1.part.lIndex ? 1 : -1;
        }
        return l2.left < l1.left ? 1 : -1;
      });
      var maxRight = -1;
      var offset = 0;
      limits.forEach(function(limit2, i2) {
        var _postparsed;
        maxRight = Math.max(maxRight, i2 > 0 ? limits[i2 - 1].right : 0);
        if (limit2.left < maxRight) {
          return;
        }
        var result;
        try {
          result = expandOne([limit2.left + offset, limit2.right + offset], limit2.part, postparsed, options);
        } catch (error) {
          if (error instanceof XTTemplateError) {
            errors.push(error);
          } else {
            throw error;
          }
        }
        if (!result) {
          return;
        }
        offset += result.inner.length - (result.right + 1 - result.left);
        (_postparsed = postparsed).splice.apply(_postparsed, [result.left, result.right + 1 - result.left].concat(_toConsumableArray(result.inner)));
      });
      return {
        postparsed,
        errors
      };
    }
    module.exports = {
      expandToOne,
      getExpandToDefault
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/module-wrapper.js
var require_module_wrapper = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/module-wrapper.js"(exports, module) {
    "use strict";
    var _require = require_errors();
    var XTInternalError = _require.XTInternalError;
    function emptyFun() {
    }
    function identity(i) {
      return i;
    }
    module.exports = function(module2) {
      var defaults = {
        set: emptyFun,
        matchers: function matchers() {
          return [];
        },
        parse: emptyFun,
        render: emptyFun,
        getTraits: emptyFun,
        getFileType: emptyFun,
        nullGetter: emptyFun,
        optionsTransformer: identity,
        postrender: identity,
        errorsTransformer: identity,
        getRenderedMap: identity,
        preparse: identity,
        postparse: identity,
        on: emptyFun,
        resolve: emptyFun,
        preResolve: emptyFun
      };
      if (Object.keys(defaults).every(function(key) {
        return !module2[key];
      })) {
        var err = new XTInternalError("This module cannot be wrapped, because it doesn't define any of the necessary functions");
        err.properties = {
          id: "module_cannot_be_wrapped",
          explanation: "This module cannot be wrapped, because it doesn't define any of the necessary functions"
        };
        throw err;
      }
      Object.keys(defaults).forEach(function(key) {
        module2[key] = module2[key] || defaults[key];
      });
      return module2;
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/scope-manager.js
var require_scope_manager = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/scope-manager.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var _require = require_errors();
    var getScopeParserExecutionError = _require.getScopeParserExecutionError;
    var _require2 = require_utils();
    var last = _require2.last;
    var _require3 = require_doc_utils();
    var concatArrays = _require3.concatArrays;
    function find(list, fn) {
      var length = list.length >>> 0;
      var value;
      for (var i = 0; i < length; i++) {
        value = list[i];
        if (fn.call(this, value, i, list)) {
          return value;
        }
      }
      return void 0;
    }
    function _getValue(tag, meta, num) {
      var _this = this;
      var scope = this.scopeList[num];
      if (this.root.finishedResolving) {
        var w = this.resolved;
        var _loop = function _loop2() {
          var lIndex = _this.scopeLindex[i];
          w = find(w, function(r) {
            return r.lIndex === lIndex;
          });
          w = w.value[_this.scopePathItem[i]];
        };
        for (var i = this.resolveOffset, len = this.scopePath.length; i < len; i++) {
          _loop();
        }
        return find(w, function(r) {
          return meta.part.lIndex === r.lIndex;
        }).value;
      }
      var result;
      var parser;
      if (!this.cachedParsers || !meta.part) {
        parser = this.parser(tag, {
          tag: meta.part,
          scopePath: this.scopePath
        });
      } else if (this.cachedParsers[meta.part.lIndex]) {
        parser = this.cachedParsers[meta.part.lIndex];
      } else {
        parser = this.cachedParsers[meta.part.lIndex] = this.parser(tag, {
          tag: meta.part,
          scopePath: this.scopePath
        });
      }
      try {
        result = parser.get(scope, this.getContext(meta, num));
      } catch (error) {
        throw getScopeParserExecutionError({
          tag,
          scope,
          error,
          offset: meta.part.offset
        });
      }
      if (result == null && num > 0) {
        return _getValue.call(this, tag, meta, num - 1);
      }
      return result;
    }
    function _getValueAsync(tag, meta, num) {
      var _this2 = this;
      var scope = this.scopeList[num];
      var parser;
      if (!this.cachedParsers || !meta.part) {
        parser = this.parser(tag, {
          tag: meta.part,
          scopePath: this.scopePath
        });
      } else if (this.cachedParsers[meta.part.lIndex]) {
        parser = this.cachedParsers[meta.part.lIndex];
      } else {
        parser = this.cachedParsers[meta.part.lIndex] = this.parser(tag, {
          tag: meta.part,
          scopePath: this.scopePath
        });
      }
      return Promise.resolve().then(function() {
        return parser.get(scope, _this2.getContext(meta, num));
      })["catch"](function(error) {
        throw getScopeParserExecutionError({
          tag,
          scope,
          error,
          offset: meta.part.offset
        });
      }).then(function(result) {
        if (result == null && num > 0) {
          return _getValueAsync.call(_this2, tag, meta, num - 1);
        }
        return result;
      });
    }
    var ScopeManager = function() {
      function ScopeManager2(options) {
        _classCallCheck(this, ScopeManager2);
        this.root = options.root || this;
        this.resolveOffset = options.resolveOffset || 0;
        this.scopePath = options.scopePath;
        this.scopePathItem = options.scopePathItem;
        this.scopePathLength = options.scopePathLength;
        this.scopeList = options.scopeList;
        this.scopeType = "";
        this.scopeTypes = options.scopeTypes;
        this.scopeLindex = options.scopeLindex;
        this.parser = options.parser;
        this.resolved = options.resolved;
        this.cachedParsers = options.cachedParsers;
      }
      _createClass(ScopeManager2, [{
        key: "loopOver",
        value: function loopOver(tag, functor, inverted, meta) {
          return this.loopOverValue(this.getValue(tag, meta), functor, inverted);
        }
      }, {
        key: "functorIfInverted",
        value: function functorIfInverted(inverted, functor, value, i, length) {
          if (inverted) {
            functor(value, i, length);
          }
          return inverted;
        }
      }, {
        key: "isValueFalsy",
        value: function isValueFalsy(value, type) {
          return value == null || !value || type === "[object Array]" && value.length === 0;
        }
      }, {
        key: "loopOverValue",
        value: function loopOverValue(value, functor, inverted) {
          if (this.root.finishedResolving) {
            inverted = false;
          }
          var type = Object.prototype.toString.call(value);
          if (this.isValueFalsy(value, type)) {
            this.scopeType = false;
            return this.functorIfInverted(inverted, functor, last(this.scopeList), 0, 1);
          }
          if (type === "[object Array]") {
            this.scopeType = "array";
            for (var i = 0; i < value.length; i++) {
              this.functorIfInverted(!inverted, functor, value[i], i, value.length);
            }
            return true;
          }
          if (type === "[object Object]") {
            this.scopeType = "object";
            return this.functorIfInverted(!inverted, functor, value, 0, 1);
          }
          return this.functorIfInverted(!inverted, functor, last(this.scopeList), 0, 1);
        }
      }, {
        key: "getValue",
        value: function getValue(tag, meta) {
          var result = _getValue.call(this, tag, meta, this.scopeList.length - 1);
          if (typeof result === "function") {
            return result(this.scopeList[this.scopeList.length - 1], this);
          }
          return result;
        }
      }, {
        key: "getValueAsync",
        value: function getValueAsync(tag, meta) {
          var _this3 = this;
          return _getValueAsync.call(this, tag, meta, this.scopeList.length - 1).then(function(result) {
            if (typeof result === "function") {
              return result(_this3.scopeList[_this3.scopeList.length - 1], _this3);
            }
            return result;
          });
        }
      }, {
        key: "getContext",
        value: function getContext(meta, num) {
          return {
            num,
            meta,
            scopeList: this.scopeList,
            resolved: this.resolved,
            scopePath: this.scopePath,
            scopeTypes: this.scopeTypes,
            scopePathItem: this.scopePathItem,
            scopePathLength: this.scopePathLength
          };
        }
      }, {
        key: "createSubScopeManager",
        value: function createSubScopeManager(scope, tag, i, part, length) {
          return new ScopeManager2({
            root: this.root,
            resolveOffset: this.resolveOffset,
            resolved: this.resolved,
            parser: this.parser,
            cachedParsers: this.cachedParsers,
            scopeTypes: concatArrays([this.scopeTypes, [this.scopeType]]),
            scopeList: concatArrays([this.scopeList, [scope]]),
            scopePath: concatArrays([this.scopePath, [tag]]),
            scopePathItem: concatArrays([this.scopePathItem, [i]]),
            scopePathLength: concatArrays([this.scopePathLength, [length]]),
            scopeLindex: concatArrays([this.scopeLindex, [part.lIndex]])
          });
        }
      }]);
      return ScopeManager2;
    }();
    module.exports = function(options) {
      options.scopePath = [];
      options.scopePathItem = [];
      options.scopePathLength = [];
      options.scopeTypes = [];
      options.scopeLindex = [];
      options.scopeList = [options.tags];
      return new ScopeManager(options);
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/error-logger.js
var require_error_logger = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/error-logger.js"(exports, module) {
    "use strict";
    function replaceErrors(key, value) {
      if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).concat("stack").reduce(function(error, key2) {
          error[key2] = value[key2];
          if (key2 === "stack") {
            error[key2] = value[key2].toString();
          }
          return error;
        }, {});
      }
      return value;
    }
    function logger(error, logging) {
      console.log(JSON.stringify({
        error
      }, replaceErrors, logging === "json" ? 2 : null));
      if (error.properties && error.properties.errors instanceof Array) {
        var errorMessages = error.properties.errors.map(function(error2) {
          return error2.properties.explanation;
        }).join("\n");
        console.log("errorMessages", errorMessages);
      }
    }
    module.exports = logger;
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/collect-content-types.js
var require_collect_content_types = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/collect-content-types.js"(exports, module) {
    "use strict";
    var ctXML = "[Content_Types].xml";
    function collectContentTypes(overrides, defaults, zip) {
      var partNames = {};
      for (var i = 0, len = overrides.length; i < len; i++) {
        var override = overrides[i];
        var contentType = override.getAttribute("ContentType");
        var partName = override.getAttribute("PartName").substr(1);
        partNames[partName] = contentType;
      }
      var _loop = function _loop2() {
        var def = defaults[_i];
        var contentType2 = def.getAttribute("ContentType");
        var extension = def.getAttribute("Extension");
        zip.file(/./).map(function(_ref) {
          var name = _ref.name;
          if (name.slice(name.length - extension.length) === extension && !partNames[name] && name !== ctXML) {
            partNames[name] = contentType2;
          }
        });
      };
      for (var _i = 0, _len = defaults.length; _i < _len; _i++) {
        _loop();
      }
      return partNames;
    }
    module.exports = collectContentTypes;
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/filetypes.js
var require_filetypes = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/filetypes.js"(exports, module) {
    "use strict";
    var docxContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";
    var docxmContentType = "application/vnd.ms-word.document.macroEnabled.main+xml";
    var dotxContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml";
    var dotmContentType = "application/vnd.ms-word.template.macroEnabledTemplate.main+xml";
    var headerContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml";
    var footnotesContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml";
    var commentsContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml";
    var footerContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml";
    var pptxContentType = "application/vnd.openxmlformats-officedocument.presentationml.slide+xml";
    var pptxSlideMaster = "application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml";
    var pptxSlideLayout = "application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml";
    var pptxPresentationContentType = "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml";
    var main = [docxContentType, docxmContentType, dotxContentType, dotmContentType];
    var filetypes = {
      main,
      docx: [headerContentType].concat(main, [footerContentType, footnotesContentType, commentsContentType]),
      pptx: [pptxContentType, pptxSlideMaster, pptxSlideLayout, pptxPresentationContentType]
    };
    module.exports = filetypes;
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/content-types.js
var require_content_types = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/content-types.js"(exports, module) {
    "use strict";
    var coreContentType = "application/vnd.openxmlformats-package.core-properties+xml";
    var appContentType = "application/vnd.openxmlformats-officedocument.extended-properties+xml";
    var customContentType = "application/vnd.openxmlformats-officedocument.custom-properties+xml";
    var settingsContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml";
    module.exports = {
      settingsContentType,
      coreContentType,
      appContentType,
      customContentType
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/common.js
var require_common = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/common.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var wrapper = require_module_wrapper();
    var filetypes = require_filetypes();
    var _require = require_content_types();
    var settingsContentType = _require.settingsContentType;
    var coreContentType = _require.coreContentType;
    var appContentType = _require.appContentType;
    var customContentType = _require.customContentType;
    var commonContentTypes = [settingsContentType, coreContentType, appContentType, customContentType];
    var Common = function() {
      function Common2() {
        _classCallCheck(this, Common2);
        this.name = "Common";
      }
      _createClass(Common2, [{
        key: "getFileType",
        value: function getFileType(_ref) {
          var doc = _ref.doc;
          var invertedContentTypes = doc.invertedContentTypes;
          if (!invertedContentTypes) {
            return;
          }
          for (var j = 0, len2 = commonContentTypes.length; j < len2; j++) {
            var ct = commonContentTypes[j];
            if (invertedContentTypes[ct]) {
              Array.prototype.push.apply(doc.targets, invertedContentTypes[ct]);
            }
          }
          var keys = ["docx", "pptx"];
          var ftCandidate;
          for (var i = 0, len = keys.length; i < len; i++) {
            var contentTypes = filetypes[keys[i]];
            for (var _j = 0, _len = contentTypes.length; _j < _len; _j++) {
              var _ct = contentTypes[_j];
              if (invertedContentTypes[_ct]) {
                for (var k = 0, _len2 = invertedContentTypes[_ct].length; k < _len2; k++) {
                  var target = invertedContentTypes[_ct][k];
                  if (doc.relsTypes[target] && ["http://purl.oclc.org/ooxml/officeDocument/relationships/officeDocument", "http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument"].indexOf(doc.relsTypes[target]) === -1) {
                    continue;
                  }
                  ftCandidate = keys[i];
                  if (filetypes.main.indexOf(_ct) !== -1 || _ct === filetypes.pptx[0]) {
                    doc.textTarget || (doc.textTarget = target);
                  }
                  doc.targets.push(target);
                }
              }
            }
            if (ftCandidate) {
              return ftCandidate;
            }
          }
          return ftCandidate;
        }
      }]);
      return Common2;
    }();
    module.exports = function() {
      return wrapper(new Common());
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/lexer.js
var require_lexer = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/lexer.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t)
              return;
            f = false;
          } else
            for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
              ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
              return;
          } finally {
            if (o)
              throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var _require = require_errors();
    var getUnclosedTagException = _require.getUnclosedTagException;
    var getUnopenedTagException = _require.getUnopenedTagException;
    var getDuplicateOpenTagException = _require.getDuplicateOpenTagException;
    var getDuplicateCloseTagException = _require.getDuplicateCloseTagException;
    var throwMalformedXml = _require.throwMalformedXml;
    var throwXmlInvalid = _require.throwXmlInvalid;
    var XTTemplateError = _require.XTTemplateError;
    var _require2 = require_doc_utils();
    var isTextStart = _require2.isTextStart;
    var isTextEnd = _require2.isTextEnd;
    var wordToUtf8 = _require2.wordToUtf8;
    var DELIMITER_NONE = 0;
    var DELIMITER_EQUAL = 1;
    var DELIMITER_START = 2;
    var DELIMITER_END = 3;
    function inRange(range, match) {
      return range[0] <= match.offset && match.offset < range[1];
    }
    function updateInTextTag(part, inTextTag) {
      if (isTextStart(part)) {
        if (inTextTag) {
          throwMalformedXml();
        }
        return true;
      }
      if (isTextEnd(part)) {
        if (!inTextTag) {
          throwMalformedXml();
        }
        return false;
      }
      return inTextTag;
    }
    function getTag(tag) {
      var position = "";
      var start = 1;
      var end = tag.indexOf(" ");
      if (tag[tag.length - 2] === "/") {
        position = "selfclosing";
        if (end === -1) {
          end = tag.length - 2;
        }
      } else if (tag[1] === "/") {
        start = 2;
        position = "end";
        if (end === -1) {
          end = tag.length - 1;
        }
      } else {
        position = "start";
        if (end === -1) {
          end = tag.length - 1;
        }
      }
      return {
        tag: tag.slice(start, end),
        position
      };
    }
    function tagMatcher(content, textMatchArray, othersMatchArray) {
      var cursor = 0;
      var contentLength = content.length;
      var allMatches = {};
      for (var i = 0, len = textMatchArray.length; i < len; i++) {
        allMatches[textMatchArray[i]] = true;
      }
      for (var _i = 0, _len = othersMatchArray.length; _i < _len; _i++) {
        allMatches[othersMatchArray[_i]] = false;
      }
      var totalMatches = [];
      while (cursor < contentLength) {
        cursor = content.indexOf("<", cursor);
        if (cursor === -1) {
          break;
        }
        var offset = cursor;
        var nextOpening = content.indexOf("<", cursor + 1);
        cursor = content.indexOf(">", cursor);
        if (cursor === -1 || nextOpening !== -1 && cursor > nextOpening) {
          throwXmlInvalid(content, offset);
        }
        var tagText = content.slice(offset, cursor + 1);
        var _getTag = getTag(tagText), tag = _getTag.tag, position = _getTag.position;
        var text = allMatches[tag];
        if (text == null) {
          continue;
        }
        totalMatches.push({
          type: "tag",
          position,
          text,
          offset,
          value: tagText,
          tag
        });
      }
      return totalMatches;
    }
    function getDelimiterErrors(delimiterMatches, fullText, syntaxOptions) {
      var errors = [];
      var inDelimiter = false;
      var lastDelimiterMatch = {
        offset: 0
      };
      var xtag;
      var delimiterWithErrors = delimiterMatches.reduce(function(delimiterAcc, currDelimiterMatch) {
        var position = currDelimiterMatch.position;
        var delimiterOffset = currDelimiterMatch.offset;
        var lastDelimiterOffset2 = lastDelimiterMatch.offset;
        var lastDelimiterLength = lastDelimiterMatch.length;
        xtag = fullText.substr(lastDelimiterOffset2, delimiterOffset - lastDelimiterOffset2);
        if (inDelimiter && position === "start") {
          if (lastDelimiterOffset2 + lastDelimiterLength === delimiterOffset) {
            xtag = fullText.substr(lastDelimiterOffset2, delimiterOffset - lastDelimiterOffset2 + lastDelimiterLength + 4);
            errors.push(getDuplicateOpenTagException({
              xtag,
              offset: lastDelimiterOffset2
            }));
            lastDelimiterMatch = currDelimiterMatch;
            delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
              error: true
            }));
            return delimiterAcc;
          }
          errors.push(getUnclosedTagException({
            xtag: wordToUtf8(xtag),
            offset: lastDelimiterOffset2
          }));
          lastDelimiterMatch = currDelimiterMatch;
          delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
            error: true
          }));
          return delimiterAcc;
        }
        if (!inDelimiter && position === "end") {
          if (syntaxOptions.allowUnopenedTag) {
            return delimiterAcc;
          }
          if (lastDelimiterOffset2 + lastDelimiterLength === delimiterOffset) {
            xtag = fullText.substr(lastDelimiterOffset2 - 4, delimiterOffset - lastDelimiterOffset2 + lastDelimiterLength + 4);
            errors.push(getDuplicateCloseTagException({
              xtag,
              offset: lastDelimiterOffset2
            }));
            lastDelimiterMatch = currDelimiterMatch;
            delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
              error: true
            }));
            return delimiterAcc;
          }
          errors.push(getUnopenedTagException({
            xtag,
            offset: delimiterOffset
          }));
          lastDelimiterMatch = currDelimiterMatch;
          delimiterAcc.push(_objectSpread(_objectSpread({}, currDelimiterMatch), {}, {
            error: true
          }));
          return delimiterAcc;
        }
        inDelimiter = !inDelimiter;
        lastDelimiterMatch = currDelimiterMatch;
        delimiterAcc.push(currDelimiterMatch);
        return delimiterAcc;
      }, []);
      if (inDelimiter) {
        var lastDelimiterOffset = lastDelimiterMatch.offset;
        xtag = fullText.substr(lastDelimiterOffset, fullText.length - lastDelimiterOffset);
        errors.push(getUnclosedTagException({
          xtag: wordToUtf8(xtag),
          offset: lastDelimiterOffset
        }));
      }
      return {
        delimiterWithErrors,
        errors
      };
    }
    function compareOffsets(startOffset, endOffset) {
      if (startOffset === -1 && endOffset === -1) {
        return DELIMITER_NONE;
      }
      if (startOffset === endOffset) {
        return DELIMITER_EQUAL;
      }
      if (startOffset === -1 || endOffset === -1) {
        return endOffset < startOffset ? DELIMITER_START : DELIMITER_END;
      }
      return startOffset < endOffset ? DELIMITER_START : DELIMITER_END;
    }
    function splitDelimiters(inside) {
      var newDelimiters = inside.split(" ");
      if (newDelimiters.length !== 2) {
        var err = new XTTemplateError("New Delimiters cannot be parsed");
        err.properties = {
          id: "change_delimiters_invalid",
          explanation: "Cannot parser delimiters"
        };
        throw err;
      }
      var _newDelimiters = _slicedToArray(newDelimiters, 2), start = _newDelimiters[0], end = _newDelimiters[1];
      if (start.length === 0 || end.length === 0) {
        var _err = new XTTemplateError("New Delimiters cannot be parsed");
        _err.properties = {
          id: "change_delimiters_invalid",
          explanation: "Cannot parser delimiters"
        };
        throw _err;
      }
      return [start, end];
    }
    function getAllDelimiterIndexes(fullText, delimiters) {
      var indexes = [];
      var start = delimiters.start, end = delimiters.end;
      var offset = -1;
      var insideTag = false;
      while (true) {
        var startOffset = fullText.indexOf(start, offset + 1);
        var endOffset = fullText.indexOf(end, offset + 1);
        var position = null;
        var len = void 0;
        var compareResult = compareOffsets(startOffset, endOffset);
        if (compareResult === DELIMITER_EQUAL) {
          compareResult = insideTag ? DELIMITER_END : DELIMITER_START;
        }
        switch (compareResult) {
          case DELIMITER_NONE:
            return indexes;
          case DELIMITER_END:
            insideTag = false;
            offset = endOffset;
            position = "end";
            len = end.length;
            break;
          case DELIMITER_START:
            insideTag = true;
            offset = startOffset;
            position = "start";
            len = start.length;
            break;
        }
        if (compareResult === DELIMITER_START && fullText[offset + start.length] === "=") {
          indexes.push({
            offset: startOffset,
            position: "start",
            length: start.length,
            changedelimiter: true
          });
          var nextEqual = fullText.indexOf("=", offset + start.length + 1);
          var nextEndOffset = fullText.indexOf(end, nextEqual + 1);
          indexes.push({
            offset: nextEndOffset,
            position: "end",
            length: end.length,
            changedelimiter: true
          });
          var _insideTag = fullText.substr(offset + start.length + 1, nextEqual - offset - start.length - 1);
          var _splitDelimiters = splitDelimiters(_insideTag);
          var _splitDelimiters2 = _slicedToArray(_splitDelimiters, 2);
          start = _splitDelimiters2[0];
          end = _splitDelimiters2[1];
          offset = nextEndOffset;
          continue;
        }
        indexes.push({
          offset,
          position,
          length: len
        });
      }
    }
    function parseDelimiters(innerContentParts, delimiters, syntaxOptions) {
      var full = innerContentParts.map(function(p) {
        return p.value;
      }).join("");
      var delimiterMatches = getAllDelimiterIndexes(full, delimiters);
      var offset = 0;
      var ranges = innerContentParts.map(function(part) {
        offset += part.value.length;
        return {
          offset: offset - part.value.length,
          lIndex: part.lIndex
        };
      });
      var _getDelimiterErrors = getDelimiterErrors(delimiterMatches, full, syntaxOptions), delimiterWithErrors = _getDelimiterErrors.delimiterWithErrors, errors = _getDelimiterErrors.errors;
      var cutNext = 0;
      var delimiterIndex = 0;
      var parsed = ranges.map(function(p, i) {
        var offset2 = p.offset;
        var range = [offset2, offset2 + innerContentParts[i].value.length];
        var partContent = innerContentParts[i].value;
        var delimitersInOffset = [];
        while (delimiterIndex < delimiterWithErrors.length && inRange(range, delimiterWithErrors[delimiterIndex])) {
          delimitersInOffset.push(delimiterWithErrors[delimiterIndex]);
          delimiterIndex++;
        }
        var parts = [];
        var cursor = 0;
        if (cutNext > 0) {
          cursor = cutNext;
          cutNext = 0;
        }
        delimitersInOffset.forEach(function(delimiterInOffset) {
          var value2 = partContent.substr(cursor, delimiterInOffset.offset - offset2 - cursor);
          if (delimiterInOffset.changedelimiter) {
            if (delimiterInOffset.position === "start") {
              if (value2.length > 0) {
                parts.push({
                  type: "content",
                  value: value2
                });
              }
            } else {
              cursor = delimiterInOffset.offset - offset2 + delimiterInOffset.length;
            }
            return;
          }
          if (value2.length > 0) {
            parts.push({
              type: "content",
              value: value2
            });
            cursor += value2.length;
          }
          var delimiterPart = {
            type: "delimiter",
            position: delimiterInOffset.position,
            offset: cursor + offset2
          };
          parts.push(delimiterPart);
          cursor = delimiterInOffset.offset - offset2 + delimiterInOffset.length;
        });
        cutNext = cursor - partContent.length;
        var value = partContent.substr(cursor);
        if (value.length > 0) {
          parts.push({
            type: "content",
            value
          });
        }
        return parts;
      }, this);
      return {
        parsed,
        errors
      };
    }
    function isInsideContent(part) {
      return part.type === "content" && part.position === "insidetag";
    }
    function getContentParts(xmlparsed) {
      return xmlparsed.filter(isInsideContent);
    }
    function decodeContentParts(xmlparsed, fileType) {
      var inTextTag = false;
      xmlparsed.forEach(function(part) {
        inTextTag = updateInTextTag(part, inTextTag);
        if (part.type === "content") {
          part.position = inTextTag ? "insidetag" : "outsidetag";
        }
        if (fileType !== "text" && isInsideContent(part)) {
          part.value = part.value.replace(/>/g, "&gt;");
        }
      });
    }
    module.exports = {
      parseDelimiters,
      parse: function parse(xmllexed, delimiters, syntax, fileType) {
        decodeContentParts(xmllexed, fileType);
        var _parseDelimiters = parseDelimiters(getContentParts(xmllexed), delimiters, syntax), delimiterParsed = _parseDelimiters.parsed, errors = _parseDelimiters.errors;
        var lexed = [];
        var index = 0;
        var lIndex = 0;
        xmllexed.forEach(function(part) {
          if (isInsideContent(part)) {
            Array.prototype.push.apply(lexed, delimiterParsed[index].map(function(p) {
              if (p.type === "content") {
                p.position = "insidetag";
              }
              p.lIndex = lIndex++;
              return p;
            }));
            index++;
          } else {
            part.lIndex = lIndex++;
            lexed.push(part);
          }
        });
        return {
          errors,
          lexed
        };
      },
      xmlparse: function xmlparse(content, xmltags) {
        var matches = tagMatcher(content, xmltags.text, xmltags.other);
        var cursor = 0;
        var parsed = matches.reduce(function(parsed2, match) {
          var value2 = content.substr(cursor, match.offset - cursor);
          if (value2.length > 0) {
            parsed2.push({
              type: "content",
              value: value2
            });
          }
          cursor = match.offset + match.value.length;
          delete match.offset;
          parsed2.push(match);
          return parsed2;
        }, []);
        var value = content.substr(cursor);
        if (value.length > 0) {
          parsed.push({
            type: "content",
            value
          });
        }
        return parsed;
      }
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/xml-matcher.js
var require_xml_matcher = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/xml-matcher.js"(exports, module) {
    "use strict";
    var _require = require_doc_utils();
    var pregMatchAll = _require.pregMatchAll;
    module.exports = function xmlMatcher(content, tagsXmlArray) {
      var res = {
        content
      };
      var taj = tagsXmlArray.join("|");
      var regexp = new RegExp("(?:(<(?:".concat(taj, ")[^>]*>)([^<>]*)</(?:").concat(taj, ")>)|(<(?:").concat(taj, ")[^>]*/>)"), "g");
      res.matches = pregMatchAll(regexp, res.content);
      return res;
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/prefix-matcher.js
var require_prefix_matcher = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/prefix-matcher.js"(exports, module) {
    "use strict";
    var nbspRegex = new RegExp(String.fromCharCode(160), "g");
    function replaceNbsps(str) {
      return str.replace(nbspRegex, " ");
    }
    function match(condition, placeHolderContent) {
      if (typeof condition === "string") {
        return replaceNbsps(placeHolderContent.substr(0, condition.length)) === condition;
      }
      if (condition instanceof RegExp) {
        return condition.test(replaceNbsps(placeHolderContent));
      }
    }
    function getValue(condition, placeHolderContent) {
      if (typeof condition === "string") {
        return replaceNbsps(placeHolderContent).substr(condition.length);
      }
      if (condition instanceof RegExp) {
        return replaceNbsps(placeHolderContent).match(condition)[1];
      }
    }
    function getValues(condition, placeHolderContent) {
      if (typeof condition === "string") {
        return [placeHolderContent, replaceNbsps(placeHolderContent).substr(condition.length)];
      }
      if (condition instanceof RegExp) {
        return replaceNbsps(placeHolderContent).match(condition);
      }
    }
    module.exports = {
      match,
      getValue,
      getValues
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/parser.js
var require_parser = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/parser.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t)
              return;
            f = false;
          } else
            for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
              ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
              return;
          } finally {
            if (o)
              throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
        return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    var _require = require_doc_utils();
    var wordToUtf8 = _require.wordToUtf8;
    var _require2 = require_prefix_matcher();
    var match = _require2.match;
    var getValue = _require2.getValue;
    var getValues = _require2.getValues;
    function getMatchers(modules, options) {
      var matchers = [];
      for (var i = 0, l = modules.length; i < l; i++) {
        var _module = modules[i];
        if (_module.matchers) {
          var mmm = _module.matchers(options);
          if (!(mmm instanceof Array)) {
            throw new Error("module matcher returns a non array");
          }
          matchers.push.apply(matchers, _toConsumableArray(mmm));
        }
      }
      return matchers;
    }
    function getMatches(matchers, placeHolderContent, options) {
      var matches = [];
      for (var i = 0, len = matchers.length; i < len; i++) {
        var matcher = matchers[i];
        var _matcher = _slicedToArray(matcher, 2), prefix = _matcher[0], _module2 = _matcher[1];
        var properties = matcher[2] || {};
        if (options.match(prefix, placeHolderContent)) {
          var values = options.getValues(prefix, placeHolderContent);
          if (typeof properties === "function") {
            properties = properties(values);
          }
          if (!properties.value) {
            var _values = _slicedToArray(values, 2);
            properties.value = _values[1];
          }
          matches.push(_objectSpread({
            type: "placeholder",
            prefix,
            module: _module2,
            onMatch: properties.onMatch,
            priority: properties.priority
          }, properties));
        }
      }
      return matches;
    }
    function moduleParse(placeHolderContent, options) {
      var modules = options.modules;
      var startOffset = options.startOffset;
      var endLindex = options.lIndex;
      var moduleParsed;
      options.offset = startOffset;
      options.match = match;
      options.getValue = getValue;
      options.getValues = getValues;
      var matchers = getMatchers(modules, options);
      var matches = getMatches(matchers, placeHolderContent, options);
      if (matches.length > 0) {
        var bestMatch = null;
        matches.forEach(function(match2) {
          match2.priority = match2.priority || -match2.value.length;
          if (!bestMatch || match2.priority > bestMatch.priority) {
            bestMatch = match2;
          }
        });
        bestMatch.offset = startOffset;
        delete bestMatch.priority;
        bestMatch.endLindex = endLindex;
        bestMatch.lIndex = endLindex;
        bestMatch.raw = placeHolderContent;
        if (bestMatch.onMatch) {
          bestMatch.onMatch(bestMatch);
        }
        delete bestMatch.onMatch;
        delete bestMatch.prefix;
        return bestMatch;
      }
      for (var i = 0, l = modules.length; i < l; i++) {
        var _module3 = modules[i];
        moduleParsed = _module3.parse(placeHolderContent, options);
        if (moduleParsed) {
          moduleParsed.offset = startOffset;
          moduleParsed.endLindex = endLindex;
          moduleParsed.lIndex = endLindex;
          moduleParsed.raw = placeHolderContent;
          return moduleParsed;
        }
      }
      return {
        type: "placeholder",
        value: placeHolderContent,
        offset: startOffset,
        endLindex,
        lIndex: endLindex
      };
    }
    var parser = {
      preparse: function preparse(parsed, modules, options) {
        function preparse2(parsed2, options2) {
          return modules.forEach(function(module2) {
            module2.preparse(parsed2, options2);
          });
        }
        return {
          preparsed: preparse2(parsed, options)
        };
      },
      parse: function parse(lexed, modules, options) {
        var inPlaceHolder = false;
        var placeHolderContent = "";
        var startOffset;
        var tailParts = [];
        var droppedTags = options.fileTypeConfig.droppedTagsInsidePlaceholder || [];
        return lexed.reduce(function lexedToParsed(parsed, token) {
          if (token.type === "delimiter") {
            inPlaceHolder = token.position === "start";
            if (token.position === "end") {
              options.parse = function(placeHolderContent2) {
                return moduleParse(placeHolderContent2, _objectSpread(_objectSpread(_objectSpread({}, options), token), {}, {
                  startOffset,
                  modules
                }));
              };
              parsed.push(options.parse(wordToUtf8(placeHolderContent)));
              Array.prototype.push.apply(parsed, tailParts);
              tailParts = [];
            }
            if (token.position === "start") {
              tailParts = [];
              startOffset = token.offset;
            }
            placeHolderContent = "";
            return parsed;
          }
          if (!inPlaceHolder) {
            parsed.push(token);
            return parsed;
          }
          if (token.type !== "content" || token.position !== "insidetag") {
            if (droppedTags.indexOf(token.tag) !== -1) {
              return parsed;
            }
            tailParts.push(token);
            return parsed;
          }
          placeHolderContent += token.value;
          return parsed;
        }, []);
      },
      postparse: function postparse(postparsed, modules, options) {
        function getTraits(traitName, postparsed2) {
          return modules.map(function(module2) {
            return module2.getTraits(traitName, postparsed2);
          });
        }
        var errors = [];
        function _postparse(postparsed2, options2) {
          return modules.reduce(function(postparsed3, module2) {
            var r = module2.postparse(postparsed3, _objectSpread(_objectSpread({}, options2), {}, {
              postparse: function postparse2(parsed, opts) {
                return _postparse(parsed, _objectSpread(_objectSpread({}, options2), opts));
              },
              getTraits
            }));
            if (r == null) {
              return postparsed3;
            }
            if (r.errors) {
              Array.prototype.push.apply(errors, r.errors);
              return r.postparsed;
            }
            return r;
          }, postparsed2);
        }
        return {
          postparsed: _postparse(postparsed, options),
          errors
        };
      }
    };
    module.exports = parser;
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/get-resolved-id.js
var require_get_resolved_id = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/get-resolved-id.js"(exports, module) {
    "use strict";
    function getResolvedId(part, options) {
      if (part.lIndex == null) {
        return null;
      }
      var path = options.scopeManager.scopePathItem;
      if (part.parentPart) {
        path = path.slice(0, path.length - 1);
      }
      var res = options.filePath + "@" + part.lIndex.toString() + "-" + path.join("-");
      return res;
    }
    module.exports = getResolvedId;
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/render.js
var require_render = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/render.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var _require = require_errors();
    var throwUnimplementedTagType = _require.throwUnimplementedTagType;
    var XTScopeParserError = _require.XTScopeParserError;
    var getResolvedId = require_get_resolved_id();
    function moduleRender(part, options) {
      var moduleRendered;
      for (var i = 0, l = options.modules.length; i < l; i++) {
        var _module = options.modules[i];
        moduleRendered = _module.render(part, options);
        if (moduleRendered) {
          return moduleRendered;
        }
      }
      return false;
    }
    function render(options) {
      var baseNullGetter = options.baseNullGetter;
      var compiled = options.compiled, scopeManager = options.scopeManager;
      options.nullGetter = function(part, sm) {
        return baseNullGetter(part, sm || scopeManager);
      };
      var errors = [];
      var parts = compiled.map(function(part, i) {
        options.index = i;
        var moduleRendered;
        try {
          moduleRendered = moduleRender(part, _objectSpread(_objectSpread({}, options), {}, {
            resolvedId: getResolvedId(part, options)
          }));
        } catch (e) {
          if (e instanceof XTScopeParserError) {
            errors.push(e);
            return part;
          }
          throw e;
        }
        if (moduleRendered) {
          if (moduleRendered.errors) {
            Array.prototype.push.apply(errors, moduleRendered.errors);
          }
          return moduleRendered;
        }
        if (part.type === "content" || part.type === "tag") {
          return part;
        }
        throwUnimplementedTagType(part, i);
      }).reduce(function(parts2, _ref) {
        var value = _ref.value;
        if (value instanceof Array) {
          for (var i = 0, len = value.length; i < len; i++) {
            parts2.push(value[i]);
          }
        } else if (value) {
          parts2.push(value);
        }
        return parts2;
      }, []);
      return {
        errors,
        parts
      };
    }
    module.exports = render;
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/postrender.js
var require_postrender = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/postrender.js"(exports, module) {
    "use strict";
    function string2buf(str) {
      var c, c2, mPos, i, bufLen = 0;
      var strLen = str.length;
      for (mPos = 0; mPos < strLen; mPos++) {
        c = str.charCodeAt(mPos);
        if ((c & 64512) === 55296 && mPos + 1 < strLen) {
          c2 = str.charCodeAt(mPos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            mPos++;
          }
        }
        bufLen += c < 128 ? 1 : c < 2048 ? 2 : c < 65536 ? 3 : 4;
      }
      var buf = new Uint8Array(bufLen);
      for (i = 0, mPos = 0; i < bufLen; mPos++) {
        c = str.charCodeAt(mPos);
        if ((c & 64512) === 55296 && mPos + 1 < strLen) {
          c2 = str.charCodeAt(mPos + 1);
          if ((c2 & 64512) === 56320) {
            c = 65536 + (c - 55296 << 10) + (c2 - 56320);
            mPos++;
          }
        }
        if (c < 128) {
          buf[i++] = c;
        } else if (c < 2048) {
          buf[i++] = 192 | c >>> 6;
          buf[i++] = 128 | c & 63;
        } else if (c < 65536) {
          buf[i++] = 224 | c >>> 12;
          buf[i++] = 128 | c >>> 6 & 63;
          buf[i++] = 128 | c & 63;
        } else {
          buf[i++] = 240 | c >>> 18;
          buf[i++] = 128 | c >>> 12 & 63;
          buf[i++] = 128 | c >>> 6 & 63;
          buf[i++] = 128 | c & 63;
        }
      }
      return buf;
    }
    function postrender(parts, options) {
      for (var i = 0, l = options.modules.length; i < l; i++) {
        var _module = options.modules[i];
        parts = _module.postrender(parts, options);
      }
      var fullLength = 0;
      var newParts = options.joinUncorrupt(parts, options);
      var longStr = "";
      var lenStr = 0;
      var maxCompact = 65536;
      var uintArrays = [];
      for (var _i = 0, len = newParts.length; _i < len; _i++) {
        var part = newParts[_i];
        if (part.length + lenStr > maxCompact) {
          var _arr = string2buf(longStr);
          fullLength += _arr.length;
          uintArrays.push(_arr);
          longStr = "";
        }
        longStr += part;
        lenStr += part.length;
        delete newParts[_i];
      }
      var arr = string2buf(longStr);
      fullLength += arr.length;
      uintArrays.push(arr);
      var array = new Uint8Array(fullLength);
      var j = 0;
      uintArrays.forEach(function(buf) {
        for (var _i2 = 0; _i2 < buf.length; ++_i2) {
          array[_i2 + j] = buf[_i2];
        }
        j += buf.length;
      });
      return array;
    }
    module.exports = postrender;
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/resolve.js
var require_resolve = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/resolve.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
        return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var getResolvedId = require_get_resolved_id();
    function moduleResolve(part, options) {
      var moduleResolved;
      for (var i = 0, l = options.modules.length; i < l; i++) {
        var _module = options.modules[i];
        moduleResolved = _module.resolve(part, options);
        if (moduleResolved) {
          return moduleResolved;
        }
      }
      return false;
    }
    function resolve(options) {
      var resolved = [];
      var baseNullGetter = options.baseNullGetter;
      var compiled = options.compiled, scopeManager = options.scopeManager;
      options.nullGetter = function(part, sm) {
        return baseNullGetter(part, sm || scopeManager);
      };
      options.resolved = resolved;
      var errors = [];
      return Promise.all(compiled.filter(function(part) {
        return ["content", "tag"].indexOf(part.type) === -1;
      }).reduce(function(promises, part) {
        options.resolvedId = getResolvedId(part, options);
        var moduleResolved = moduleResolve(part, _objectSpread(_objectSpread({}, options), {}, {
          resolvedId: getResolvedId(part, options)
        }));
        var result;
        if (moduleResolved) {
          result = moduleResolved.then(function(value) {
            resolved.push({
              tag: part.value,
              lIndex: part.lIndex,
              value
            });
          });
        } else if (part.type === "placeholder") {
          result = scopeManager.getValueAsync(part.value, {
            part
          }).then(function(value) {
            return value == null ? options.nullGetter(part) : value;
          }).then(function(value) {
            resolved.push({
              tag: part.value,
              lIndex: part.lIndex,
              value
            });
            return value;
          });
        } else {
          return;
        }
        promises.push(result["catch"](function(e) {
          if (e instanceof Array) {
            errors.push.apply(errors, _toConsumableArray(e));
          } else {
            errors.push(e);
          }
        }));
        return promises;
      }, [])).then(function() {
        return {
          errors,
          resolved
        };
      });
    }
    module.exports = resolve;
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/join-uncorrupt.js
var require_join_uncorrupt = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/join-uncorrupt.js"(exports, module) {
    "use strict";
    var _require = require_doc_utils();
    var startsWith = _require.startsWith;
    var endsWith = _require.endsWith;
    var isStarting = _require.isStarting;
    var isEnding = _require.isEnding;
    var isWhiteSpace = _require.isWhiteSpace;
    var filetypes = require_filetypes();
    function addEmptyParagraphAfterTable(parts) {
      var lastNonEmpty = "";
      for (var i = 0, len = parts.length; i < len; i++) {
        var p = parts[i];
        if (isWhiteSpace(p)) {
          continue;
        }
        if (endsWith(lastNonEmpty, "</w:tbl>")) {
          if (!startsWith(p, "<w:p") && !startsWith(p, "<w:tbl") && !startsWith(p, "<w:sectPr")) {
            p = "<w:p/>".concat(p);
          }
        }
        lastNonEmpty = p;
        parts[i] = p;
      }
      return parts;
    }
    function joinUncorrupt(parts, options) {
      var contains = options.fileTypeConfig.tagShouldContain || [];
      var collecting = "";
      var currentlyCollecting = -1;
      if (filetypes.docx.indexOf(options.contentType) !== -1) {
        parts = addEmptyParagraphAfterTable(parts);
      }
      var startIndex = -1;
      for (var i = 0, len = parts.length; i < len; i++) {
        var part = parts[i];
        for (var j = 0, len2 = contains.length; j < len2; j++) {
          var _contains$j = contains[j], tag = _contains$j.tag, shouldContain = _contains$j.shouldContain, value = _contains$j.value, drop = _contains$j.drop;
          if (currentlyCollecting === j) {
            if (isEnding(part, tag)) {
              currentlyCollecting = -1;
              if (drop) {
                for (var k = startIndex; k <= i; k++) {
                  parts[k] = "";
                }
              } else {
                for (var _k = startIndex; _k < i; _k++) {
                  parts[_k] = "";
                }
                parts[i] = collecting + value + part;
              }
              break;
            }
            collecting += part;
            for (var _k2 = 0, len3 = shouldContain.length; _k2 < len3; _k2++) {
              var sc = shouldContain[_k2];
              if (isStarting(part, sc)) {
                currentlyCollecting = -1;
                break;
              }
            }
            if (currentlyCollecting > -1) {
            }
            break;
          }
          if (currentlyCollecting === -1 && isStarting(part, tag) && // to verify that the part doesn't have multiple tags, such as <w:tc><w:p>
          part.substr(1).indexOf("<") === -1) {
            if (part[part.length - 2] === "/") {
              parts[i] = "";
              break;
            } else {
              startIndex = i;
              currentlyCollecting = j;
              collecting = part;
              break;
            }
          }
        }
      }
      return parts;
    }
    module.exports = joinUncorrupt;
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/xml-templater.js
var require_xml_templater = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/xml-templater.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var _require = require_doc_utils();
    var wordToUtf8 = _require.wordToUtf8;
    var convertSpaces = _require.convertSpaces;
    var xmlMatcher = require_xml_matcher();
    var Lexer = require_lexer();
    var Parser = require_parser();
    var _render = require_render();
    var postrender = require_postrender();
    var resolve = require_resolve();
    var joinUncorrupt = require_join_uncorrupt();
    function _getFullText(content, tagsXmlArray) {
      var matcher = xmlMatcher(content, tagsXmlArray);
      var result = matcher.matches.map(function(match) {
        return match.array[2];
      });
      return wordToUtf8(convertSpaces(result.join("")));
    }
    module.exports = function() {
      function XmlTemplater(content, options) {
        var _this = this;
        _classCallCheck(this, XmlTemplater);
        this.cachedParsers = {};
        this.content = content;
        Object.keys(options).forEach(function(key) {
          _this[key] = options[key];
        });
        this.setModules({
          inspect: {
            filePath: options.filePath
          }
        });
      }
      _createClass(XmlTemplater, [{
        key: "resolveTags",
        value: function resolveTags(tags) {
          var _this2 = this;
          this.tags = tags;
          var options = this.getOptions();
          var filePath = this.filePath;
          options.scopeManager = this.scopeManager;
          options.resolve = resolve;
          var errors = [];
          return Promise.all(this.modules.map(function(module2) {
            return Promise.resolve(module2.preResolve(options))["catch"](function(e) {
              errors.push(e);
            });
          })).then(function() {
            if (errors.length !== 0) {
              throw errors;
            }
            return resolve(options).then(function(_ref) {
              var resolved = _ref.resolved, errors2 = _ref.errors;
              errors2 = errors2.map(function(error) {
                if (!(error instanceof Error)) {
                  error = new Error(error);
                }
                error.properties = error.properties || {};
                error.properties.file = filePath;
                return error;
              });
              if (errors2.length !== 0) {
                throw errors2;
              }
              return Promise.all(resolved).then(function(resolved2) {
                options.scopeManager.root.finishedResolving = true;
                options.scopeManager.resolved = resolved2;
                _this2.setModules({
                  inspect: {
                    resolved: resolved2,
                    filePath
                  }
                });
                return resolved2;
              });
            });
          });
        }
      }, {
        key: "getFullText",
        value: function getFullText() {
          return _getFullText(this.content, this.fileTypeConfig.tagsXmlTextArray);
        }
      }, {
        key: "setModules",
        value: function setModules(obj) {
          this.modules.forEach(function(module2) {
            module2.set(obj);
          });
        }
      }, {
        key: "preparse",
        value: function preparse() {
          this.allErrors = [];
          this.xmllexed = Lexer.xmlparse(this.content, {
            text: this.fileTypeConfig.tagsXmlTextArray,
            other: this.fileTypeConfig.tagsXmlLexedArray
          });
          this.setModules({
            inspect: {
              filePath: this.filePath,
              xmllexed: this.xmllexed
            }
          });
          var _Lexer$parse = Lexer.parse(this.xmllexed, this.delimiters, this.syntax, this.fileType), lexed = _Lexer$parse.lexed, lexerErrors = _Lexer$parse.errors;
          this.allErrors = this.allErrors.concat(lexerErrors);
          this.lexed = lexed;
          this.setModules({
            inspect: {
              filePath: this.filePath,
              lexed: this.lexed
            }
          });
          var options = this.getOptions();
          Parser.preparse(this.lexed, this.modules, options);
        }
      }, {
        key: "parse",
        value: function parse() {
          this.setModules({
            inspect: {
              filePath: this.filePath
            }
          });
          var options = this.getOptions();
          this.parsed = Parser.parse(this.lexed, this.modules, options);
          this.setModules({
            inspect: {
              filePath: this.filePath,
              parsed: this.parsed
            }
          });
          var _Parser$postparse = Parser.postparse(this.parsed, this.modules, options), postparsed = _Parser$postparse.postparsed, postparsedErrors = _Parser$postparse.errors;
          this.postparsed = postparsed;
          this.setModules({
            inspect: {
              filePath: this.filePath,
              postparsed: this.postparsed
            }
          });
          this.allErrors = this.allErrors.concat(postparsedErrors);
          this.errorChecker(this.allErrors);
          return this;
        }
      }, {
        key: "errorChecker",
        value: function errorChecker(errors) {
          var _this3 = this;
          errors.forEach(function(error) {
            error.properties = error.properties || {};
            error.properties.file = _this3.filePath;
          });
          this.modules.forEach(function(module2) {
            errors = module2.errorsTransformer(errors);
          });
        }
      }, {
        key: "baseNullGetter",
        value: function baseNullGetter(part, sm) {
          var _this4 = this;
          var value = this.modules.reduce(function(value2, module2) {
            if (value2 != null) {
              return value2;
            }
            return module2.nullGetter(part, sm, _this4);
          }, null);
          if (value != null) {
            return value;
          }
          return this.nullGetter(part, sm);
        }
      }, {
        key: "getOptions",
        value: function getOptions() {
          return {
            compiled: this.postparsed,
            cachedParsers: this.cachedParsers,
            tags: this.tags,
            modules: this.modules,
            parser: this.parser,
            contentType: this.contentType,
            relsType: this.relsType,
            baseNullGetter: this.baseNullGetter.bind(this),
            filePath: this.filePath,
            fileTypeConfig: this.fileTypeConfig,
            fileType: this.fileType,
            linebreaks: this.linebreaks
          };
        }
      }, {
        key: "render",
        value: function render(to) {
          this.filePath = to;
          var options = this.getOptions();
          options.resolved = this.scopeManager.resolved;
          options.scopeManager = this.scopeManager;
          options.render = _render;
          options.joinUncorrupt = joinUncorrupt;
          var _render2 = _render(options), errors = _render2.errors, parts = _render2.parts;
          if (errors.length > 0) {
            this.allErrors = errors;
            this.errorChecker(errors);
            return this;
          }
          this.content = postrender(parts, options);
          this.setModules({
            inspect: {
              filePath: this.filePath,
              content: this.content
            }
          });
          return this;
        }
      }]);
      return XmlTemplater;
    }();
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/loop.js
var require_loop = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/loop.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _toConsumableArray(arr) {
      return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
    }
    function _nonIterableSpread() {
      throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _iterableToArray(iter) {
      if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
        return Array.from(iter);
    }
    function _arrayWithoutHoles(arr) {
      if (Array.isArray(arr))
        return _arrayLikeToArray(arr);
    }
    function ownKeys(e, r) {
      var t = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var o = Object.getOwnPropertySymbols(e);
        r && (o = o.filter(function(r2) {
          return Object.getOwnPropertyDescriptor(e, r2).enumerable;
        })), t.push.apply(t, o);
      }
      return t;
    }
    function _objectSpread(e) {
      for (var r = 1; r < arguments.length; r++) {
        var t = null != arguments[r] ? arguments[r] : {};
        r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
          _defineProperty(e, r2, t[r2]);
        }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
          Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
        });
      }
      return e;
    }
    function _defineProperty(obj, key, value) {
      key = _toPropertyKey(key);
      if (key in obj) {
        Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
      } else {
        obj[key] = value;
      }
      return obj;
    }
    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    function _unsupportedIterableToArray(o, minLen) {
      if (!o)
        return;
      if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
      var n = Object.prototype.toString.call(o).slice(8, -1);
      if (n === "Object" && o.constructor)
        n = o.constructor.name;
      if (n === "Map" || n === "Set")
        return Array.from(o);
      if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
    }
    function _arrayLikeToArray(arr, len) {
      if (len == null || len > arr.length)
        len = arr.length;
      for (var i = 0, arr2 = new Array(len); i < len; i++)
        arr2[i] = arr[i];
      return arr2;
    }
    function _iterableToArrayLimit(r, l) {
      var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
      if (null != t) {
        var e, n, i, u, a = [], f = true, o = false;
        try {
          if (i = (t = t.call(r)).next, 0 === l) {
            if (Object(t) !== t)
              return;
            f = false;
          } else
            for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true)
              ;
        } catch (r2) {
          o = true, n = r2;
        } finally {
          try {
            if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u))
              return;
          } finally {
            if (o)
              throw n;
          }
        }
        return a;
      }
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr))
        return arr;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var _require = require_doc_utils();
    var chunkBy = _require.chunkBy;
    var last = _require.last;
    var isParagraphStart = _require.isParagraphStart;
    var isModule = _require.isModule;
    var isParagraphEnd = _require.isParagraphEnd;
    var isContent = _require.isContent;
    var startsWith = _require.startsWith;
    var isTagEnd = _require.isTagEnd;
    var isTagStart = _require.isTagStart;
    var getSingleAttribute = _require.getSingleAttribute;
    var setSingleAttribute = _require.setSingleAttribute;
    var filetypes = require_filetypes();
    var wrapper = require_module_wrapper();
    var moduleName = "loop";
    function hasContent(parts) {
      return parts.some(function(part) {
        return isContent(part);
      });
    }
    function getFirstMeaningFulPart(parsed) {
      for (var i = 0, len = parsed.length; i < len; i++) {
        if (parsed[i].type !== "content") {
          return parsed[i];
        }
      }
      return null;
    }
    function isInsideParagraphLoop(part) {
      var firstMeaningfulPart = getFirstMeaningFulPart(part.subparsed);
      return firstMeaningfulPart != null && firstMeaningfulPart.tag !== "w:t";
    }
    function getPageBreakIfApplies(part) {
      return part.hasPageBreak && isInsideParagraphLoop(part) ? '<w:p><w:r><w:br w:type="page"/></w:r></w:p>' : "";
    }
    function isEnclosedByParagraphs(parsed) {
      return parsed.length && isParagraphStart(parsed[0]) && isParagraphEnd(last(parsed));
    }
    function getOffset(chunk) {
      return hasContent(chunk) ? 0 : chunk.length;
    }
    function addPageBreakAtEnd(subRendered) {
      var j = subRendered.parts.length - 1;
      if (subRendered.parts[j] === "</w:p>") {
        subRendered.parts.splice(j, 0, '<w:r><w:br w:type="page"/></w:r>');
      } else {
        subRendered.parts.push('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
      }
    }
    function addPageBreakAtBeginning(subRendered) {
      subRendered.parts.unshift('<w:p><w:r><w:br w:type="page"/></w:r></w:p>');
    }
    function isContinuous(parts) {
      return parts.some(function(part) {
        return isTagStart("w:type", part) && part.value.indexOf("continuous") !== -1;
      });
    }
    function isNextPage(parts) {
      return parts.some(function(part) {
        return isTagStart("w:type", part) && part.value.indexOf('w:val="nextPage"') !== -1;
      });
    }
    function addSectionBefore(parts, sect) {
      return ["<w:p><w:pPr>".concat(sect.map(function(_ref) {
        var value = _ref.value;
        return value;
      }).join(""), "</w:pPr></w:p>")].concat(parts);
    }
    function addContinuousType(parts) {
      var stop = false;
      var inSectPr = false;
      return parts.reduce(function(result, part) {
        if (stop === false && startsWith(part, "<w:sectPr")) {
          inSectPr = true;
        }
        if (inSectPr) {
          if (startsWith(part, "<w:type")) {
            stop = true;
          }
          if (stop === false && startsWith(part, "</w:sectPr")) {
            result.push('<w:type w:val="continuous"/>');
          }
        }
        result.push(part);
        return result;
      }, []);
    }
    function dropHeaderFooterRefs(parts) {
      return parts.filter(function(text) {
        return !startsWith(text, "<w:headerReference") && !startsWith(text, "<w:footerReference");
      });
    }
    function hasPageBreak(chunk) {
      return chunk.some(function(part) {
        return part.tag === "w:br" && part.value.indexOf('w:type="page"') !== -1;
      });
    }
    function hasImage(chunk) {
      return chunk.some(function(_ref2) {
        var tag = _ref2.tag;
        return tag === "w:drawing";
      });
    }
    function getSectPr(chunks) {
      var collectSectPr = false;
      var sectPrs = [];
      chunks.forEach(function(part) {
        if (isTagStart("w:sectPr", part)) {
          sectPrs.push([]);
          collectSectPr = true;
        }
        if (collectSectPr) {
          sectPrs[sectPrs.length - 1].push(part);
        }
        if (isTagEnd("w:sectPr", part)) {
          collectSectPr = false;
        }
      });
      return sectPrs;
    }
    function getSectPrHeaderFooterChangeCount(chunks) {
      var collectSectPr = false;
      var sectPrCount = 0;
      chunks.forEach(function(part) {
        if (isTagStart("w:sectPr", part)) {
          collectSectPr = true;
        }
        if (collectSectPr) {
          if (part.tag === "w:headerReference" || part.tag === "w:footerReference") {
            sectPrCount++;
            collectSectPr = false;
          }
        }
        if (isTagEnd("w:sectPr", part)) {
          collectSectPr = false;
        }
      });
      return sectPrCount;
    }
    function getLastSectPr(parsed) {
      var sectPr = [];
      var inSectPr = false;
      for (var i = parsed.length - 1; i >= 0; i--) {
        var part = parsed[i];
        if (isTagEnd("w:sectPr", part)) {
          inSectPr = true;
        }
        if (isTagStart("w:sectPr", part)) {
          sectPr.unshift(part.value);
          inSectPr = false;
        }
        if (inSectPr) {
          sectPr.unshift(part.value);
        }
        if (isParagraphStart(part)) {
          if (sectPr.length > 0) {
            return sectPr.join("");
          }
          break;
        }
      }
      return "";
    }
    var LoopModule = function() {
      function LoopModule2() {
        _classCallCheck(this, LoopModule2);
        this.name = "LoopModule";
        this.inXfrm = false;
        this.totalSectPr = 0;
        this.prefix = {
          start: "#",
          end: "/",
          dash: /^-([^\s]+)\s(.+)/,
          inverted: "^"
        };
      }
      _createClass(LoopModule2, [{
        key: "optionsTransformer",
        value: function optionsTransformer(opts, docxtemplater) {
          this.docxtemplater = docxtemplater;
          return opts;
        }
      }, {
        key: "preparse",
        value: function preparse(parsed, _ref3) {
          var contentType = _ref3.contentType;
          if (filetypes.main.indexOf(contentType) !== -1) {
            this.sects = getSectPr(parsed);
          }
        }
      }, {
        key: "matchers",
        value: function matchers() {
          var module2 = moduleName;
          return [[this.prefix.start, module2, {
            expandTo: "auto",
            location: "start",
            inverted: false
          }], [this.prefix.inverted, module2, {
            expandTo: "auto",
            location: "start",
            inverted: true
          }], [this.prefix.end, module2, {
            location: "end"
          }], [this.prefix.dash, module2, function(_ref4) {
            var _ref5 = _slicedToArray(_ref4, 3), expandTo = _ref5[1], value = _ref5[2];
            return {
              location: "start",
              inverted: false,
              expandTo,
              value
            };
          }]];
        }
      }, {
        key: "getTraits",
        value: function getTraits(traitName, parsed) {
          if (traitName !== "expandPair") {
            return;
          }
          return parsed.reduce(function(tags, part, offset) {
            if (isModule(part, moduleName) && part.subparsed == null) {
              tags.push({
                part,
                offset
              });
            }
            return tags;
          }, []);
        }
      }, {
        key: "postparse",
        value: function postparse(parsed, _ref6) {
          var basePart = _ref6.basePart;
          if (basePart && this.docxtemplater.fileType === "docx" && parsed.length > 0) {
            basePart.sectPrCount = getSectPrHeaderFooterChangeCount(parsed);
            this.totalSectPr += basePart.sectPrCount;
            var sects = this.sects;
            sects.some(function(sect, index) {
              if (basePart.lIndex < sect[0].lIndex) {
                if (index + 1 < sects.length && isContinuous(sects[index + 1])) {
                  basePart.addContinuousType = true;
                }
                return true;
              }
              if (parsed[0].lIndex < sect[0].lIndex && sect[0].lIndex < basePart.lIndex) {
                if (isNextPage(sects[index])) {
                  basePart.addNextPage = {
                    index
                  };
                }
                return true;
              }
            });
            basePart.lastParagrapSectPr = getLastSectPr(parsed);
          }
          if (!basePart || basePart.expandTo !== "auto" || basePart.module !== moduleName || !isEnclosedByParagraphs(parsed)) {
            return parsed;
          }
          basePart.paragraphLoop = true;
          var level = 0;
          var chunks = chunkBy(parsed, function(p) {
            if (isParagraphStart(p)) {
              level++;
              if (level === 1) {
                return "start";
              }
            }
            if (isParagraphEnd(p)) {
              level--;
              if (level === 0) {
                return "end";
              }
            }
            return null;
          });
          var firstChunk = chunks[0];
          var lastChunk = last(chunks);
          var firstOffset = getOffset(firstChunk);
          var lastOffset = getOffset(lastChunk);
          basePart.hasPageBreakBeginning = hasPageBreak(firstChunk);
          basePart.hasPageBreak = hasPageBreak(lastChunk);
          if (hasImage(firstChunk)) {
            firstOffset = 0;
          }
          if (hasImage(lastChunk)) {
            lastOffset = 0;
          }
          return parsed.slice(firstOffset, parsed.length - lastOffset);
        }
      }, {
        key: "resolve",
        value: function resolve(part, options) {
          if (!isModule(part, moduleName)) {
            return null;
          }
          var sm = options.scopeManager;
          var promisedValue = sm.getValueAsync(part.value, {
            part
          });
          var promises = [];
          function loopOver(scope, i, length) {
            var scopeManager = sm.createSubScopeManager(scope, part.value, i, part, length);
            promises.push(options.resolve(_objectSpread(_objectSpread({}, options), {}, {
              compiled: part.subparsed,
              tags: {},
              scopeManager
            })));
          }
          var errorList = [];
          return promisedValue.then(function(values) {
            return new Promise(function(resolve2) {
              if (values instanceof Array) {
                Promise.all(values).then(resolve2);
              } else {
                resolve2(values);
              }
            }).then(function(values2) {
              sm.loopOverValue(values2, loopOver, part.inverted);
              return Promise.all(promises).then(function(r) {
                return r.map(function(_ref7) {
                  var resolved = _ref7.resolved, errors = _ref7.errors;
                  errorList.push.apply(errorList, _toConsumableArray(errors));
                  return resolved;
                });
              }).then(function(value) {
                if (errorList.length > 0) {
                  throw errorList;
                }
                return value;
              });
            });
          });
        }
        // eslint-disable-next-line complexity
      }, {
        key: "render",
        value: function render(part, options) {
          if (part.tag === "p:xfrm") {
            this.inXfrm = part.position === "start";
          }
          if (part.tag === "a:ext" && this.inXfrm) {
            this.lastExt = part;
            return part;
          }
          if (!isModule(part, moduleName)) {
            return null;
          }
          var totalValue = [];
          var errors = [];
          var heightOffset = 0;
          var self = this;
          var firstTag = part.subparsed[0];
          var tagHeight = 0;
          if ((firstTag === null || firstTag === void 0 ? void 0 : firstTag.tag) === "a:tr") {
            tagHeight = +getSingleAttribute(firstTag.value, "h");
          }
          heightOffset -= tagHeight;
          var a16RowIdOffset = 0;
          var insideParagraphLoop = isInsideParagraphLoop(part);
          function loopOver(scope, i, length) {
            heightOffset += tagHeight;
            var scopeManager = options.scopeManager.createSubScopeManager(scope, part.value, i, part, length);
            part.subparsed.forEach(function(pp) {
              if (isTagStart("a16:rowId", pp)) {
                var val = +getSingleAttribute(pp.value, "val") + a16RowIdOffset;
                a16RowIdOffset = 1;
                pp.value = setSingleAttribute(pp.value, "val", val);
              }
            });
            var subRendered = options.render(_objectSpread(_objectSpread({}, options), {}, {
              compiled: part.subparsed,
              tags: {},
              scopeManager
            }));
            if (part.hasPageBreak && i === length - 1 && insideParagraphLoop) {
              addPageBreakAtEnd(subRendered);
            }
            var isNotFirst = scopeManager.scopePathItem.some(function(i2) {
              return i2 !== 0;
            });
            if (isNotFirst) {
              if (part.sectPrCount === 1) {
                subRendered.parts = dropHeaderFooterRefs(subRendered.parts);
              }
              if (part.addContinuousType) {
                subRendered.parts = addContinuousType(subRendered.parts);
              }
            } else if (part.addNextPage) {
              subRendered.parts = addSectionBefore(subRendered.parts, self.sects[part.addNextPage.index]);
            }
            if (part.addNextPage) {
              addPageBreakAtEnd(subRendered);
            }
            if (part.hasPageBreakBeginning && insideParagraphLoop) {
              addPageBreakAtBeginning(subRendered);
            }
            for (var _i = 0, len = subRendered.parts.length; _i < len; _i++) {
              totalValue.push(subRendered.parts[_i]);
            }
            Array.prototype.push.apply(errors, subRendered.errors);
          }
          var result = options.scopeManager.loopOver(part.value, loopOver, part.inverted, {
            part
          });
          if (result === false) {
            if (part.lastParagrapSectPr) {
              if (part.paragraphLoop) {
                return {
                  value: "<w:p><w:pPr>".concat(part.lastParagrapSectPr, "</w:pPr></w:p>")
                };
              }
              return {
                value: "</w:t></w:r></w:p><w:p><w:pPr>".concat(part.lastParagrapSectPr, "</w:pPr><w:r><w:t>")
              };
            }
            return {
              value: getPageBreakIfApplies(part) || "",
              errors
            };
          }
          if (heightOffset !== 0) {
            var cy = +getSingleAttribute(this.lastExt.value, "cy");
            this.lastExt.value = setSingleAttribute(this.lastExt.value, "cy", cy + heightOffset);
          }
          return {
            value: options.joinUncorrupt(totalValue, _objectSpread(_objectSpread({}, options), {}, {
              basePart: part
            })),
            errors
          };
        }
      }]);
      return LoopModule2;
    }();
    module.exports = function() {
      return wrapper(new LoopModule());
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/space-preserve.js
var require_space_preserve = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/space-preserve.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var wrapper = require_module_wrapper();
    var _require = require_doc_utils();
    var isTextStart = _require.isTextStart;
    var isTextEnd = _require.isTextEnd;
    var endsWith = _require.endsWith;
    var startsWith = _require.startsWith;
    var wTpreserve = '<w:t xml:space="preserve">';
    var wTpreservelen = wTpreserve.length;
    var wtEnd = "</w:t>";
    var wtEndlen = wtEnd.length;
    function isWtStart(part) {
      return isTextStart(part) && part.tag === "w:t";
    }
    function addXMLPreserve(chunk, index) {
      var tag = chunk[index].value;
      if (chunk[index + 1].value === "</w:t>") {
        return tag;
      }
      if (tag.indexOf('xml:space="preserve"') !== -1) {
        return tag;
      }
      return tag.substr(0, tag.length - 1) + ' xml:space="preserve">';
    }
    function isInsideLoop(meta, chunk) {
      return meta && meta.basePart && chunk.length > 1;
    }
    var SpacePreserve = function() {
      function SpacePreserve2() {
        _classCallCheck(this, SpacePreserve2);
        this.name = "SpacePreserveModule";
      }
      _createClass(SpacePreserve2, [{
        key: "postparse",
        value: function postparse(postparsed, meta) {
          var chunk = [], inTextTag = false, endLindex = 0, lastTextTag = 0;
          function isStartingPlaceHolder(part, chunk2) {
            return part.type === "placeholder" && chunk2.length > 1;
          }
          var result = postparsed.reduce(function(postparsed2, part) {
            if (isWtStart(part)) {
              inTextTag = true;
              lastTextTag = chunk.length;
            }
            if (!inTextTag) {
              postparsed2.push(part);
              return postparsed2;
            }
            chunk.push(part);
            if (isInsideLoop(meta, chunk)) {
              endLindex = meta.basePart.endLindex;
              chunk[0].value = addXMLPreserve(chunk, 0);
            }
            if (isStartingPlaceHolder(part, chunk)) {
              chunk[lastTextTag].value = addXMLPreserve(chunk, lastTextTag);
              endLindex = part.endLindex;
            }
            if (isTextEnd(part) && part.lIndex > endLindex) {
              if (endLindex !== 0) {
                chunk[lastTextTag].value = addXMLPreserve(chunk, lastTextTag);
              }
              Array.prototype.push.apply(postparsed2, chunk);
              chunk = [];
              inTextTag = false;
              endLindex = 0;
              lastTextTag = 0;
            }
            return postparsed2;
          }, []);
          Array.prototype.push.apply(result, chunk);
          return result;
        }
      }, {
        key: "postrender",
        value: function postrender(parts) {
          var lastNonEmpty = "";
          var lastNonEmptyIndex = 0;
          for (var i = 0, len = parts.length; i < len; i++) {
            var index = i;
            var p = parts[i];
            if (p === "") {
              continue;
            }
            if (endsWith(lastNonEmpty, wTpreserve) && startsWith(p, wtEnd)) {
              parts[lastNonEmptyIndex] = lastNonEmpty.substr(0, lastNonEmpty.length - wTpreservelen) + "<w:t/>";
              p = p.substr(wtEndlen);
            }
            lastNonEmpty = p;
            lastNonEmptyIndex = index;
            parts[i] = p;
          }
          return parts;
        }
      }]);
      return SpacePreserve2;
    }();
    module.exports = function() {
      return wrapper(new SpacePreserve());
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/rawxml.js
var require_rawxml = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/rawxml.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var traits = require_traits();
    var _require = require_doc_utils();
    var isContent = _require.isContent;
    var _require2 = require_errors();
    var throwRawTagShouldBeOnlyTextInParagraph = _require2.throwRawTagShouldBeOnlyTextInParagraph;
    var getInvalidRawXMLValueException = _require2.getInvalidRawXMLValueException;
    var moduleName = "rawxml";
    var wrapper = require_module_wrapper();
    function getInner(_ref) {
      var part = _ref.part, left = _ref.left, right = _ref.right, postparsed = _ref.postparsed, index = _ref.index;
      var paragraphParts = postparsed.slice(left + 1, right);
      paragraphParts.forEach(function(p, i) {
        if (i === index - left - 1) {
          return;
        }
        if (isContent(p)) {
          throwRawTagShouldBeOnlyTextInParagraph({
            paragraphParts,
            part
          });
        }
      });
      return part;
    }
    var RawXmlModule = function() {
      function RawXmlModule2() {
        _classCallCheck(this, RawXmlModule2);
        this.name = "RawXmlModule";
        this.prefix = "@";
      }
      _createClass(RawXmlModule2, [{
        key: "optionsTransformer",
        value: function optionsTransformer(options, docxtemplater) {
          this.fileTypeConfig = docxtemplater.fileTypeConfig;
          return options;
        }
      }, {
        key: "matchers",
        value: function matchers() {
          return [[this.prefix, moduleName]];
        }
      }, {
        key: "postparse",
        value: function postparse(postparsed) {
          return traits.expandToOne(postparsed, {
            moduleName,
            getInner,
            expandTo: this.fileTypeConfig.tagRawXml,
            error: {
              message: "Raw tag not in paragraph",
              id: "raw_tag_outerxml_invalid",
              explanation: function explanation(part) {
                return 'The tag "'.concat(part.value, '" is not inside a paragraph, putting raw tags inside an inline loop is disallowed.');
              }
            }
          });
        }
      }, {
        key: "render",
        value: function render(part, options) {
          if (part.module !== moduleName) {
            return null;
          }
          var value;
          var errors = [];
          try {
            value = options.scopeManager.getValue(part.value, {
              part
            });
            if (value == null) {
              value = options.nullGetter(part);
            }
          } catch (e) {
            errors.push(e);
            return {
              errors
            };
          }
          value = value ? value : "";
          if (typeof value === "string") {
            return {
              value
            };
          }
          return {
            errors: [getInvalidRawXMLValueException({
              tag: part.value,
              value,
              offset: part.offset
            })]
          };
        }
      }]);
      return RawXmlModule2;
    }();
    module.exports = function() {
      return wrapper(new RawXmlModule());
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/merge-sort.js
var require_merge_sort = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/merge-sort.js"(exports, module) {
    "use strict";
    function getMinFromArrays(arrays, state) {
      var minIndex = -1;
      for (var i = 0, l = arrays.length; i < l; i++) {
        if (state[i] >= arrays[i].length) {
          continue;
        }
        if (minIndex === -1 || arrays[i][state[i]].offset < arrays[minIndex][state[minIndex]].offset) {
          minIndex = i;
        }
      }
      return minIndex;
    }
    module.exports = function(arrays) {
      var totalLength = arrays.reduce(function(sum, array) {
        return sum + array.length;
      }, 0);
      arrays = arrays.filter(function(array) {
        return array.length > 0;
      });
      var resultArray = new Array(totalLength);
      var state = arrays.map(function() {
        return 0;
      });
      for (var i = 0; i < totalLength; i++) {
        var arrayIndex = getMinFromArrays(arrays, state);
        resultArray[i] = arrays[arrayIndex][state[arrayIndex]];
        state[arrayIndex]++;
      }
      return resultArray;
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/expand-pair-trait.js
var require_expand_pair_trait = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/expand-pair-trait.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var traitName = "expandPair";
    var mergeSort = require_merge_sort();
    var _require = require_doc_utils();
    var getLeft = _require.getLeft;
    var getRight = _require.getRight;
    var wrapper = require_module_wrapper();
    var _require2 = require_traits();
    var getExpandToDefault = _require2.getExpandToDefault;
    var _require3 = require_errors();
    var getUnmatchedLoopException = _require3.getUnmatchedLoopException;
    var getClosingTagNotMatchOpeningTag = _require3.getClosingTagNotMatchOpeningTag;
    var getUnbalancedLoopException = _require3.getUnbalancedLoopException;
    function getOpenCountChange(part) {
      switch (part.location) {
        case "start":
          return 1;
        case "end":
          return -1;
      }
    }
    function match(start, end) {
      return start != null && end != null && (start.part.location === "start" && end.part.location === "end" && start.part.value === end.part.value || end.part.value === "");
    }
    function transformer(traits) {
      var i = 0;
      var errors = [];
      while (i < traits.length) {
        var part = traits[i].part;
        if (part.location === "end") {
          if (i === 0) {
            traits.splice(0, 1);
            errors.push(getUnmatchedLoopException(part));
            return {
              traits,
              errors
            };
          }
          var endIndex = i;
          var startIndex = i - 1;
          var offseter = 1;
          if (match(traits[startIndex], traits[endIndex])) {
            traits.splice(endIndex, 1);
            traits.splice(startIndex, 1);
            return {
              errors,
              traits
            };
          }
          while (offseter < 50) {
            var startCandidate = traits[startIndex - offseter];
            var endCandidate = traits[endIndex + offseter];
            if (match(startCandidate, traits[endIndex])) {
              traits.splice(endIndex, 1);
              traits.splice(startIndex - offseter, 1);
              return {
                errors,
                traits
              };
            }
            if (match(traits[startIndex], endCandidate)) {
              traits.splice(endIndex + offseter, 1);
              traits.splice(startIndex, 1);
              return {
                errors,
                traits
              };
            }
            offseter++;
          }
          errors.push(getClosingTagNotMatchOpeningTag({
            tags: [traits[startIndex].part, traits[endIndex].part]
          }));
          traits.splice(endIndex, 1);
          traits.splice(startIndex, 1);
          return {
            traits,
            errors
          };
        }
        i++;
      }
      traits.forEach(function(_ref) {
        var part2 = _ref.part;
        errors.push(getUnmatchedLoopException(part2));
      });
      return {
        traits: [],
        errors
      };
    }
    function getPairs(traits) {
      var levelTraits = {};
      var errors = [];
      var pairs = [];
      var transformedTraits = [];
      for (var i = 0; i < traits.length; i++) {
        transformedTraits.push(traits[i]);
      }
      while (transformedTraits.length > 0) {
        var result = transformer(transformedTraits);
        errors = errors.concat(result.errors);
        transformedTraits = result.traits;
      }
      if (errors.length > 0) {
        return {
          pairs,
          errors
        };
      }
      var countOpen = 0;
      for (var _i = 0; _i < traits.length; _i++) {
        var currentTrait = traits[_i];
        var part = currentTrait.part;
        var change = getOpenCountChange(part);
        countOpen += change;
        if (change === 1) {
          levelTraits[countOpen] = currentTrait;
        } else {
          var startTrait = levelTraits[countOpen + 1];
          if (countOpen === 0) {
            pairs = pairs.concat([[startTrait, currentTrait]]);
          }
        }
        countOpen = countOpen >= 0 ? countOpen : 0;
      }
      return {
        pairs,
        errors
      };
    }
    var ExpandPairTrait = function() {
      function ExpandPairTrait2() {
        _classCallCheck(this, ExpandPairTrait2);
        this.name = "ExpandPairTrait";
      }
      _createClass(ExpandPairTrait2, [{
        key: "optionsTransformer",
        value: function optionsTransformer(options, docxtemplater) {
          this.expandTags = docxtemplater.fileTypeConfig.expandTags.concat(docxtemplater.options.paragraphLoop ? docxtemplater.fileTypeConfig.onParagraphLoop : []);
          return options;
        }
      }, {
        key: "postparse",
        value: function postparse(postparsed, _ref2) {
          var _this = this;
          var getTraits = _ref2.getTraits, _postparse = _ref2.postparse, fileType = _ref2.fileType;
          var traits = getTraits(traitName, postparsed);
          traits = traits.map(function(trait) {
            return trait || [];
          });
          traits = mergeSort(traits);
          var _getPairs = getPairs(traits), pairs = _getPairs.pairs, errors = _getPairs.errors;
          var lastRight = 0;
          var lastPair = null;
          var expandedPairs = pairs.map(function(pair) {
            var expandTo = pair[0].part.expandTo;
            if (expandTo === "auto" && fileType !== "text") {
              var result = getExpandToDefault(postparsed, pair, _this.expandTags);
              if (result.error) {
                errors.push(result.error);
              }
              expandTo = result.value;
            }
            if (!expandTo || fileType === "text") {
              var _left = pair[0].offset;
              var _right = pair[1].offset;
              if (_left < lastRight) {
                errors.push(getUnbalancedLoopException(pair, lastPair));
              }
              lastPair = pair;
              lastRight = _right;
              return [_left, _right];
            }
            var left, right;
            try {
              left = getLeft(postparsed, expandTo, pair[0].offset);
            } catch (e) {
              errors.push(e);
            }
            try {
              right = getRight(postparsed, expandTo, pair[1].offset);
            } catch (e) {
              errors.push(e);
            }
            if (left < lastRight) {
              errors.push(getUnbalancedLoopException(pair, lastPair));
            }
            lastRight = right;
            lastPair = pair;
            return [left, right];
          });
          if (errors.length > 0) {
            return {
              postparsed,
              errors
            };
          }
          var currentPairIndex = 0;
          var innerParts;
          var newParsed = postparsed.reduce(function(newParsed2, part, i) {
            var inPair = currentPairIndex < pairs.length && expandedPairs[currentPairIndex][0] <= i && i <= expandedPairs[currentPairIndex][1];
            var pair = pairs[currentPairIndex];
            var expandedPair = expandedPairs[currentPairIndex];
            if (!inPair) {
              newParsed2.push(part);
              return newParsed2;
            }
            if (expandedPair[0] === i) {
              innerParts = [];
            }
            if (pair[0].offset !== i && pair[1].offset !== i) {
              innerParts.push(part);
            }
            if (expandedPair[1] === i) {
              var basePart = postparsed[pair[0].offset];
              basePart.subparsed = _postparse(innerParts, {
                basePart
              });
              basePart.endLindex = pair[1].part.lIndex;
              delete basePart.location;
              delete basePart.expandTo;
              newParsed2.push(basePart);
              currentPairIndex++;
            }
            return newParsed2;
          }, []);
          return {
            postparsed: newParsed,
            errors
          };
        }
      }]);
      return ExpandPairTrait2;
    }();
    module.exports = function() {
      return wrapper(new ExpandPairTrait());
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/render.js
var require_render2 = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/modules/render.js"(exports, module) {
    "use strict";
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var wrapper = require_module_wrapper();
    var _require = require_errors();
    var getScopeCompilationError = _require.getScopeCompilationError;
    var _require2 = require_doc_utils();
    var utf8ToWord = _require2.utf8ToWord;
    var hasCorruptCharacters = _require2.hasCorruptCharacters;
    var _require3 = require_errors();
    var getCorruptCharactersException = _require3.getCorruptCharactersException;
    var _require4 = require_content_types();
    var settingsContentType = _require4.settingsContentType;
    var coreContentType = _require4.coreContentType;
    var appContentType = _require4.appContentType;
    var customContentType = _require4.customContentType;
    var ftprefix = {
      docx: "w",
      pptx: "a"
    };
    var Render = function() {
      function Render2() {
        _classCallCheck(this, Render2);
        this.name = "Render";
        this.recordRun = false;
        this.recordedRun = [];
      }
      _createClass(Render2, [{
        key: "optionsTransformer",
        value: function optionsTransformer(options, docxtemplater) {
          this.parser = docxtemplater.parser;
          this.fileType = docxtemplater.fileType;
          return options;
        }
      }, {
        key: "set",
        value: function set(obj) {
          if (obj.compiled) {
            this.compiled = obj.compiled;
          }
          if (obj.data != null) {
            this.data = obj.data;
          }
        }
      }, {
        key: "getRenderedMap",
        value: function getRenderedMap(mapper) {
          var _this = this;
          return Object.keys(this.compiled).reduce(function(mapper2, from) {
            mapper2[from] = {
              from,
              data: _this.data
            };
            return mapper2;
          }, mapper);
        }
      }, {
        key: "postparse",
        value: function postparse(postparsed, options) {
          var _this2 = this;
          var errors = [];
          postparsed.forEach(function(p) {
            if (p.type === "placeholder") {
              var tag = p.value;
              try {
                options.cachedParsers[p.lIndex] = _this2.parser(tag, {
                  tag: p
                });
              } catch (rootError) {
                errors.push(getScopeCompilationError({
                  tag,
                  rootError,
                  offset: p.offset
                }));
              }
            }
          });
          return {
            postparsed,
            errors
          };
        }
      }, {
        key: "render",
        value: function render(part, _ref) {
          var contentType = _ref.contentType, scopeManager = _ref.scopeManager, linebreaks = _ref.linebreaks, nullGetter = _ref.nullGetter, fileType = _ref.fileType;
          if (linebreaks && [settingsContentType, coreContentType, appContentType, customContentType].indexOf(contentType) !== -1) {
            linebreaks = false;
          }
          if (linebreaks) {
            this.recordRuns(part);
          }
          if (part.type !== "placeholder" || part.module) {
            return;
          }
          var value;
          try {
            value = scopeManager.getValue(part.value, {
              part
            });
          } catch (e) {
            return {
              errors: [e]
            };
          }
          if (value == null) {
            value = nullGetter(part);
          }
          if (hasCorruptCharacters(value)) {
            return {
              errors: [getCorruptCharactersException({
                tag: part.value,
                value,
                offset: part.offset
              })]
            };
          }
          if (fileType === "text") {
            return {
              value
            };
          }
          return {
            value: linebreaks && typeof value === "string" ? this.renderLineBreaks(value) : utf8ToWord(value)
          };
        }
      }, {
        key: "recordRuns",
        value: function recordRuns(part) {
          if (part.tag === "".concat(ftprefix[this.fileType], ":r")) {
            this.recordedRun = [];
          } else if (part.tag === "".concat(ftprefix[this.fileType], ":rPr")) {
            if (part.position === "start") {
              this.recordRun = true;
              this.recordedRun = [part.value];
            }
            if (part.position === "end" || part.position === "selfclosing") {
              this.recordedRun.push(part.value);
              this.recordRun = false;
            }
          } else if (this.recordRun) {
            this.recordedRun.push(part.value);
          }
        }
      }, {
        key: "renderLineBreaks",
        value: function renderLineBreaks(value) {
          var _this3 = this;
          var p = ftprefix[this.fileType];
          var br = this.fileType === "docx" ? "<w:r><w:br/></w:r>" : "<a:br/>";
          var lines = value.split("\n");
          var runprops = this.recordedRun.join("");
          return lines.map(function(line) {
            return utf8ToWord(line);
          }).reduce(function(result, line, i) {
            result.push(line);
            if (i < lines.length - 1) {
              result.push("</".concat(p, ":t></").concat(p, ":r>").concat(br, "<").concat(p, ":r>").concat(runprops, "<").concat(p, ":t").concat(_this3.fileType === "docx" ? ' xml:space="preserve"' : "", ">"));
            }
            return result;
          }, []);
        }
      }]);
      return Render2;
    }();
    module.exports = function() {
      return wrapper(new Render());
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/file-type-config.js
var require_file_type_config = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/file-type-config.js"(exports, module) {
    "use strict";
    var loopModule = require_loop();
    var spacePreserveModule = require_space_preserve();
    var rawXmlModule = require_rawxml();
    var expandPairTrait = require_expand_pair_trait();
    var render = require_render2();
    function DocXFileTypeConfig() {
      return {
        getTemplatedFiles: function getTemplatedFiles() {
          return [];
        },
        textPath: function textPath(doc) {
          return doc.textTarget;
        },
        tagsXmlTextArray: ["Company", "HyperlinkBase", "Manager", "cp:category", "cp:keywords", "dc:creator", "dc:description", "dc:subject", "dc:title", "cp:contentStatus", "w:t", "m:t", "vt:lpstr", "vt:lpwstr"],
        tagsXmlLexedArray: ["w:proofState", "w:tc", "w:tr", "w:tbl", "w:body", "w:document", "w:p", "w:r", "w:br", "w:rPr", "w:pPr", "w:spacing", "w:sdtContent", "w:sdt", "w:drawing", "w:sectPr", "w:type", "w:headerReference", "w:footerReference", "w:bookmarkStart", "w:bookmarkEnd", "w:commentRangeStart", "w:commentRangeEnd", "w:commentReference"],
        droppedTagsInsidePlaceholder: ["w:p", "w:br", "w:bookmarkStart", "w:bookmarkEnd"],
        expandTags: [{
          contains: "w:tc",
          expand: "w:tr"
        }],
        onParagraphLoop: [{
          contains: "w:p",
          expand: "w:p",
          onlyTextInTag: true
        }],
        tagRawXml: "w:p",
        baseModules: [loopModule, spacePreserveModule, expandPairTrait, rawXmlModule, render],
        tagShouldContain: [{
          tag: "w:tbl",
          shouldContain: ["w:tr"],
          drop: true
        }, {
          tag: "w:tc",
          shouldContain: ["w:p"],
          value: "<w:p></w:p>"
        }, {
          tag: "w:sdtContent",
          shouldContain: ["w:p", "w:r", "w:commentRangeStart", "w:sdt"],
          value: "<w:p></w:p>"
        }]
      };
    }
    function PptXFileTypeConfig() {
      return {
        getTemplatedFiles: function getTemplatedFiles() {
          return [];
        },
        textPath: function textPath(doc) {
          return doc.textTarget;
        },
        tagsXmlTextArray: ["Company", "HyperlinkBase", "Manager", "cp:category", "cp:keywords", "dc:creator", "dc:description", "dc:subject", "dc:title", "a:t", "m:t", "vt:lpstr", "vt:lpwstr"],
        tagsXmlLexedArray: ["p:sp", "a:tc", "a:tr", "a:tbl", "a:p", "a:r", "a:rPr", "p:txBody", "a:txBody", "a:off", "a:ext", "p:graphicFrame", "p:xfrm", "a16:rowId", "a:endParaRPr"],
        droppedTagsInsidePlaceholder: ["a:p", "a:endParaRPr"],
        expandTags: [{
          contains: "a:tc",
          expand: "a:tr"
        }],
        onParagraphLoop: [{
          contains: "a:p",
          expand: "a:p",
          onlyTextInTag: true
        }],
        tagRawXml: "p:sp",
        baseModules: [loopModule, expandPairTrait, rawXmlModule, render],
        tagShouldContain: [{
          tag: "a:tbl",
          shouldContain: ["a:tr"],
          drop: true
        }, {
          tag: "p:txBody",
          shouldContain: ["a:p"],
          value: "<a:p></a:p>"
        }, {
          tag: "a:txBody",
          shouldContain: ["a:p"],
          value: "<a:p></a:p>"
        }]
      };
    }
    module.exports = {
      docx: DocXFileTypeConfig,
      pptx: PptXFileTypeConfig
    };
  }
});

// node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/docxtemplater.js
var require_docxtemplater = __commonJS({
  "node_modules/.pnpm/docxtemplater@3.44.0/node_modules/docxtemplater/js/docxtemplater.js"(exports, module) {
    var _excluded = ["modules"];
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    function _objectWithoutProperties(source, excluded) {
      if (source == null)
        return {};
      var target = _objectWithoutPropertiesLoose(source, excluded);
      var key, i;
      if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
          key = sourceSymbolKeys[i];
          if (excluded.indexOf(key) >= 0)
            continue;
          if (!Object.prototype.propertyIsEnumerable.call(source, key))
            continue;
          target[key] = source[key];
        }
      }
      return target;
    }
    function _objectWithoutPropertiesLoose(source, excluded) {
      if (source == null)
        return {};
      var target = {};
      var sourceKeys = Object.keys(source);
      var key, i;
      for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0)
          continue;
        target[key] = source[key];
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor)
          descriptor.writable = true;
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
      }
    }
    function _createClass(Constructor, protoProps, staticProps) {
      if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
      if (staticProps)
        _defineProperties(Constructor, staticProps);
      Object.defineProperty(Constructor, "prototype", { writable: false });
      return Constructor;
    }
    function _toPropertyKey(t) {
      var i = _toPrimitive(t, "string");
      return "symbol" == _typeof(i) ? i : String(i);
    }
    function _toPrimitive(t, r) {
      if ("object" != _typeof(t) || !t)
        return t;
      var e = t[Symbol.toPrimitive];
      if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i))
          return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
      }
      return ("string" === r ? String : Number)(t);
    }
    var DocUtils = require_doc_utils();
    DocUtils.traits = require_traits();
    DocUtils.moduleWrapper = require_module_wrapper();
    var createScope = require_scope_manager();
    var _require = require_errors();
    var throwMultiError = _require.throwMultiError;
    var throwResolveBeforeCompile = _require.throwResolveBeforeCompile;
    var throwRenderInvalidTemplate = _require.throwRenderInvalidTemplate;
    var throwRenderTwice = _require.throwRenderTwice;
    var logErrors = require_error_logger();
    var collectContentTypes = require_collect_content_types();
    var ctXML = "[Content_Types].xml";
    var relsFile = "_rels/.rels";
    var commonModule = require_common();
    var Lexer = require_lexer();
    var defaults = DocUtils.defaults;
    var str2xml = DocUtils.str2xml;
    var xml2str = DocUtils.xml2str;
    var moduleWrapper = DocUtils.moduleWrapper;
    var concatArrays = DocUtils.concatArrays;
    var uniq = DocUtils.uniq;
    var getDuplicates = DocUtils.getDuplicates;
    var stableSort = DocUtils.stableSort;
    var _require2 = require_errors();
    var XTInternalError = _require2.XTInternalError;
    var throwFileTypeNotIdentified = _require2.throwFileTypeNotIdentified;
    var throwFileTypeNotHandled = _require2.throwFileTypeNotHandled;
    var throwApiVersionError = _require2.throwApiVersionError;
    var currentModuleApiVersion = [3, 38, 0];
    function dropUnsupportedFileTypesModules(dx) {
      dx.modules = dx.modules.filter(function(module2) {
        if (module2.supportedFileTypes) {
          if (!Array.isArray(module2.supportedFileTypes)) {
            throw new Error("The supportedFileTypes field of the module must be an array");
          }
          var isSupportedModule = module2.supportedFileTypes.indexOf(dx.fileType) !== -1;
          if (!isSupportedModule) {
            module2.on("detached");
          }
          return isSupportedModule;
        }
        return true;
      });
    }
    var Docxtemplater = function() {
      function Docxtemplater2(zip) {
        var _this = this;
        var _ref = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, _ref$modules = _ref.modules, modules = _ref$modules === void 0 ? [] : _ref$modules, options = _objectWithoutProperties(_ref, _excluded);
        _classCallCheck(this, Docxtemplater2);
        if (!Array.isArray(modules)) {
          throw new Error("The modules argument of docxtemplater's constructor must be an array");
        }
        this.targets = [];
        this.rendered = false;
        this.scopeManagers = {};
        this.compiled = {};
        this.modules = [commonModule()];
        this.setOptions(options);
        modules.forEach(function(module2) {
          _this.attachModule(module2);
        });
        if (arguments.length > 0) {
          if (!zip || !zip.files || typeof zip.file !== "function") {
            throw new Error("The first argument of docxtemplater's constructor must be a valid zip file (jszip v2 or pizzip v3)");
          }
          this.loadZip(zip);
          this.compile();
          this.v4Constructor = true;
        }
      }
      _createClass(Docxtemplater2, [{
        key: "verifyApiVersion",
        value: function verifyApiVersion(neededVersion) {
          neededVersion = neededVersion.split(".").map(function(i) {
            return parseInt(i, 10);
          });
          if (neededVersion.length !== 3) {
            throwApiVersionError("neededVersion is not a valid version", {
              neededVersion,
              explanation: "the neededVersion must be an array of length 3"
            });
          }
          if (neededVersion[0] !== currentModuleApiVersion[0]) {
            throwApiVersionError("The major api version do not match, you probably have to update docxtemplater with npm install --save docxtemplater", {
              neededVersion,
              currentModuleApiVersion,
              explanation: "moduleAPIVersionMismatch : needed=".concat(neededVersion.join("."), ", current=").concat(currentModuleApiVersion.join("."))
            });
          }
          if (neededVersion[1] > currentModuleApiVersion[1]) {
            throwApiVersionError("The minor api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater", {
              neededVersion,
              currentModuleApiVersion,
              explanation: "moduleAPIVersionMismatch : needed=".concat(neededVersion.join("."), ", current=").concat(currentModuleApiVersion.join("."))
            });
          }
          if (neededVersion[1] === currentModuleApiVersion[1] && neededVersion[2] > currentModuleApiVersion[2]) {
            throwApiVersionError("The patch api version is not uptodate, you probably have to update docxtemplater with npm install --save docxtemplater", {
              neededVersion,
              currentModuleApiVersion,
              explanation: "moduleAPIVersionMismatch : needed=".concat(neededVersion.join("."), ", current=").concat(currentModuleApiVersion.join("."))
            });
          }
          return true;
        }
      }, {
        key: "setModules",
        value: function setModules(obj) {
          this.modules.forEach(function(module2) {
            module2.set(obj);
          });
        }
      }, {
        key: "sendEvent",
        value: function sendEvent(eventName) {
          this.modules.forEach(function(module2) {
            module2.on(eventName);
          });
        }
      }, {
        key: "attachModule",
        value: function attachModule(module2) {
          if (this.v4Constructor) {
            throw new XTInternalError("attachModule() should not be called manually when using the v4 constructor");
          }
          var moduleType = _typeof(module2);
          if (moduleType === "function") {
            throw new XTInternalError("Cannot attach a class/function as a module. Most probably you forgot to instantiate the module by using `new` on the module.");
          }
          if (!module2 || moduleType !== "object") {
            throw new XTInternalError("Cannot attachModule with a falsy value");
          }
          if (module2.requiredAPIVersion) {
            this.verifyApiVersion(module2.requiredAPIVersion);
          }
          if (module2.attached === true) {
            if (typeof module2.clone === "function") {
              module2 = module2.clone();
            } else {
              throw new Error('Cannot attach a module that was already attached : "'.concat(module2.name, '". The most likely cause is that you are instantiating the module at the root level, and using it for multiple instances of Docxtemplater'));
            }
          }
          module2.attached = true;
          var wrappedModule = moduleWrapper(module2);
          this.modules.push(wrappedModule);
          wrappedModule.on("attached");
          if (this.fileType) {
            dropUnsupportedFileTypesModules(this);
          }
          return this;
        }
      }, {
        key: "setOptions",
        value: function setOptions(options) {
          var _this2 = this;
          if (this.v4Constructor) {
            throw new Error("setOptions() should not be called manually when using the v4 constructor");
          }
          if (!options) {
            throw new Error("setOptions should be called with an object as first parameter");
          }
          this.options = {};
          Object.keys(defaults).forEach(function(key) {
            var defaultValue = defaults[key];
            _this2.options[key] = options[key] != null ? options[key] : _this2[key] || defaultValue;
            _this2[key] = _this2.options[key];
          });
          this.delimiters.start = DocUtils.utf8ToWord(this.delimiters.start);
          this.delimiters.end = DocUtils.utf8ToWord(this.delimiters.end);
          return this;
        }
      }, {
        key: "loadZip",
        value: function loadZip(zip) {
          if (this.v4Constructor) {
            throw new Error("loadZip() should not be called manually when using the v4 constructor");
          }
          if (zip.loadAsync) {
            throw new XTInternalError("Docxtemplater doesn't handle JSZip version >=3, please use pizzip");
          }
          this.zip = zip;
          this.updateFileTypeConfig();
          this.modules = concatArrays([this.fileTypeConfig.baseModules.map(function(moduleFunction) {
            return moduleFunction();
          }), this.modules]);
          dropUnsupportedFileTypesModules(this);
          return this;
        }
      }, {
        key: "precompileFile",
        value: function precompileFile(fileName) {
          var currentFile = this.createTemplateClass(fileName);
          currentFile.preparse();
          this.compiled[fileName] = currentFile;
        }
      }, {
        key: "compileFile",
        value: function compileFile(fileName) {
          this.compiled[fileName].parse();
        }
      }, {
        key: "getScopeManager",
        value: function getScopeManager(to, currentFile, tags) {
          if (!this.scopeManagers[to]) {
            this.scopeManagers[to] = createScope({
              tags,
              parser: this.parser,
              cachedParsers: currentFile.cachedParsers
            });
          }
          return this.scopeManagers[to];
        }
      }, {
        key: "resolveData",
        value: function resolveData(data) {
          var _this3 = this;
          var errors = [];
          if (!Object.keys(this.compiled).length) {
            throwResolveBeforeCompile();
          }
          return Promise.resolve(data).then(function(data2) {
            _this3.setData(data2);
            _this3.setModules({
              data: _this3.data,
              Lexer
            });
            _this3.mapper = _this3.modules.reduce(function(value, module2) {
              return module2.getRenderedMap(value);
            }, {});
            return Promise.all(Object.keys(_this3.mapper).map(function(to) {
              var _this3$mapper$to = _this3.mapper[to], from = _this3$mapper$to.from, data3 = _this3$mapper$to.data;
              return Promise.resolve(data3).then(function(data4) {
                var currentFile = _this3.compiled[from];
                currentFile.filePath = to;
                currentFile.scopeManager = _this3.getScopeManager(to, currentFile, data4);
                return currentFile.resolveTags(data4).then(function(result) {
                  currentFile.scopeManager.finishedResolving = true;
                  return result;
                }, function(errs) {
                  Array.prototype.push.apply(errors, errs);
                });
              });
            })).then(function(resolved) {
              if (errors.length !== 0) {
                if (_this3.options.errorLogging) {
                  logErrors(errors, _this3.options.errorLogging);
                }
                throwMultiError(errors);
              }
              return concatArrays(resolved);
            });
          });
        }
      }, {
        key: "reorderModules",
        value: function reorderModules() {
          this.modules = stableSort(this.modules, function(m1, m2) {
            return (m2.priority || 0) - (m1.priority || 0);
          });
        }
      }, {
        key: "throwIfDuplicateModules",
        value: function throwIfDuplicateModules() {
          var duplicates = getDuplicates(this.modules.map(function(_ref2) {
            var name = _ref2.name;
            return name;
          }));
          if (duplicates.length > 0) {
            throw new XTInternalError('Detected duplicate module "'.concat(duplicates[0], '"'));
          }
        }
      }, {
        key: "compile",
        value: function compile() {
          var _this4 = this;
          this.updateFileTypeConfig();
          this.throwIfDuplicateModules();
          this.reorderModules();
          if (Object.keys(this.compiled).length) {
            return this;
          }
          this.options = this.modules.reduce(function(options, module2) {
            return module2.optionsTransformer(options, _this4);
          }, this.options);
          this.options.xmlFileNames = uniq(this.options.xmlFileNames);
          this.xmlDocuments = this.options.xmlFileNames.reduce(function(xmlDocuments, fileName) {
            var content = _this4.zip.files[fileName].asText();
            xmlDocuments[fileName] = str2xml(content);
            return xmlDocuments;
          }, {});
          this.setModules({
            zip: this.zip,
            xmlDocuments: this.xmlDocuments
          });
          this.getTemplatedFiles();
          this.templatedFiles.forEach(function(fileName) {
            if (_this4.zip.files[fileName] != null) {
              _this4.precompileFile(fileName);
            }
          });
          this.templatedFiles.forEach(function(fileName) {
            if (_this4.zip.files[fileName] != null) {
              _this4.compileFile(fileName);
            }
          });
          this.setModules({
            compiled: this.compiled
          });
          verifyErrors(this);
          return this;
        }
      }, {
        key: "getRelsTypes",
        value: function getRelsTypes() {
          var rootRels = this.zip.files[relsFile];
          var rootRelsXml = rootRels ? str2xml(rootRels.asText()) : null;
          var rootRelationships = rootRelsXml ? rootRelsXml.getElementsByTagName("Relationship") : [];
          var relsTypes = {};
          for (var i = 0, len = rootRelationships.length; i < len; i++) {
            var r = rootRelationships[i];
            relsTypes[r.getAttribute("Target")] = r.getAttribute("Type");
          }
          return relsTypes;
        }
      }, {
        key: "getContentTypes",
        value: function getContentTypes() {
          var contentTypes = this.zip.files[ctXML];
          var contentTypeXml = contentTypes ? str2xml(contentTypes.asText()) : null;
          var overrides = contentTypeXml ? contentTypeXml.getElementsByTagName("Override") : null;
          var defaults2 = contentTypeXml ? contentTypeXml.getElementsByTagName("Default") : null;
          return {
            overrides,
            defaults: defaults2,
            contentTypes,
            contentTypeXml
          };
        }
      }, {
        key: "updateFileTypeConfig",
        value: function updateFileTypeConfig() {
          var _this5 = this;
          var fileType;
          if (this.zip.files.mimetype) {
            fileType = "odt";
          }
          this.relsTypes = this.getRelsTypes();
          var _this$getContentTypes = this.getContentTypes(), overrides = _this$getContentTypes.overrides, defaults2 = _this$getContentTypes.defaults, contentTypes = _this$getContentTypes.contentTypes, contentTypeXml = _this$getContentTypes.contentTypeXml;
          if (contentTypeXml) {
            this.filesContentTypes = collectContentTypes(overrides, defaults2, this.zip);
            this.invertedContentTypes = DocUtils.invertMap(this.filesContentTypes);
            this.setModules({
              contentTypes: this.contentTypes,
              invertedContentTypes: this.invertedContentTypes
            });
          }
          this.modules.forEach(function(module2) {
            fileType = module2.getFileType({
              zip: _this5.zip,
              contentTypes,
              contentTypeXml,
              overrides,
              defaults: defaults2,
              doc: _this5
            }) || fileType;
          });
          if (fileType === "odt") {
            throwFileTypeNotHandled(fileType);
          }
          if (!fileType) {
            throwFileTypeNotIdentified();
          }
          this.fileType = fileType;
          dropUnsupportedFileTypesModules(this);
          this.fileTypeConfig = this.options.fileTypeConfig || this.fileTypeConfig || Docxtemplater2.FileTypeConfig[this.fileType]();
          return this;
        }
      }, {
        key: "renderAsync",
        value: function renderAsync(data) {
          var _this6 = this;
          return this.resolveData(data).then(function() {
            return _this6.render();
          });
        }
      }, {
        key: "render",
        value: function render(data) {
          var _this7 = this;
          if (this.rendered) {
            throwRenderTwice();
          }
          this.rendered = true;
          this.compile();
          if (this.errors.length > 0) {
            throwRenderInvalidTemplate();
          }
          if (data) {
            this.setData(data);
          }
          this.setModules({
            data: this.data,
            Lexer
          });
          this.mapper = this.mapper || this.modules.reduce(function(value, module2) {
            return module2.getRenderedMap(value);
          }, {});
          Object.keys(this.mapper).forEach(function(to) {
            var _this7$mapper$to = _this7.mapper[to], from = _this7$mapper$to.from, data2 = _this7$mapper$to.data;
            var currentFile = _this7.compiled[from];
            currentFile.scopeManager = _this7.getScopeManager(to, currentFile, data2);
            currentFile.render(to);
            _this7.zip.file(to, currentFile.content, {
              createFolders: true
            });
          });
          verifyErrors(this);
          this.sendEvent("syncing-zip");
          this.syncZip();
          return this;
        }
      }, {
        key: "syncZip",
        value: function syncZip() {
          var _this8 = this;
          Object.keys(this.xmlDocuments).forEach(function(fileName) {
            _this8.zip.remove(fileName);
            var content = xml2str(_this8.xmlDocuments[fileName]);
            return _this8.zip.file(fileName, content, {
              createFolders: true
            });
          });
        }
      }, {
        key: "setData",
        value: function setData(data) {
          this.data = data;
          return this;
        }
      }, {
        key: "getZip",
        value: function getZip() {
          return this.zip;
        }
      }, {
        key: "createTemplateClass",
        value: function createTemplateClass(path) {
          var content = this.zip.files[path].asText();
          return this.createTemplateClassFromContent(content, path);
        }
      }, {
        key: "createTemplateClassFromContent",
        value: function createTemplateClassFromContent(content, filePath) {
          var _this9 = this;
          var xmltOptions = {
            filePath,
            contentType: this.filesContentTypes[filePath],
            relsType: this.relsTypes[filePath]
          };
          Object.keys(defaults).concat(["filesContentTypes", "fileTypeConfig", "fileType", "modules"]).forEach(function(key) {
            xmltOptions[key] = _this9[key];
          });
          return new Docxtemplater2.XmlTemplater(content, xmltOptions);
        }
      }, {
        key: "getFullText",
        value: function getFullText(path) {
          return this.createTemplateClass(path || this.fileTypeConfig.textPath(this)).getFullText();
        }
      }, {
        key: "getTemplatedFiles",
        value: function getTemplatedFiles() {
          var _this10 = this;
          this.templatedFiles = this.fileTypeConfig.getTemplatedFiles(this.zip);
          this.targets.forEach(function(target) {
            _this10.templatedFiles.push(target);
          });
          this.templatedFiles = uniq(this.templatedFiles);
          return this.templatedFiles;
        }
      }]);
      return Docxtemplater2;
    }();
    function verifyErrors(doc) {
      var compiled = doc.compiled;
      doc.errors = concatArrays(Object.keys(compiled).map(function(name) {
        return compiled[name].allErrors;
      }));
      if (doc.errors.length !== 0) {
        if (doc.options.errorLogging) {
          logErrors(doc.errors, doc.options.errorLogging);
        }
        throwMultiError(doc.errors);
      }
    }
    Docxtemplater.DocUtils = DocUtils;
    Docxtemplater.Errors = require_errors();
    Docxtemplater.XmlTemplater = require_xml_templater();
    Docxtemplater.FileTypeConfig = require_file_type_config();
    Docxtemplater.XmlMatcher = require_xml_matcher();
    module.exports = Docxtemplater;
    module.exports["default"] = Docxtemplater;
  }
});
export default require_docxtemplater();
//# sourceMappingURL=docxtemplater.js.map
