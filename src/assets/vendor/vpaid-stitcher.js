var VpaidStitcher =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/public/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';
	
	var VpaidStitcher = function VpaidStitcher() {
	  var video = void 0,
	      playerType = void 0,
	      containerElem = void 0,
	      src = void 0;
	
	  var tagIterator = function tagIterator(tags) {
	    var _iteratorNormalCompletion = true;
	    var _didIteratorError = false;
	    var _iteratorError = undefined;
	
	    try {
	      for (var _iterator = tags[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	        var tag = _step.value;
	
	        if (tag[0].startsWith('EXT-X-DATERANGE')) {
	          console.log('ad event');
	          // fire data range parser for ad
	          adParser(tag);
	          break;
	        }
	      }
	    } catch (err) {
	      _didIteratorError = true;
	      _iteratorError = err;
	    } finally {
	      try {
	        if (!_iteratorNormalCompletion && _iterator.return) {
	          _iterator.return();
	        }
	      } finally {
	        if (_didIteratorError) {
	          throw _iteratorError;
	        }
	      }
	    }
	  };
	
	  var adParser = function adParser(ad) {
	    var nonParsedAd = ad.join(),
	        adObj = {};
	
	    nonParsedAd.split('",').reduce(function (acc, entry) {
	      var key = '' + entry.split('="')[0].replace(/-/g, ""),
	          value = entry.split('="')[1];
	
	      if (acc !== undefined) adObj["ID"] = acc.split('="')[1];
	      if (value.startsWith('http,')) value = value.replace(/http,/g, "http:");
	
	      adObj[key] = value;
	    });
	
	    console.log(adObj);
	  };
	
	  var initVpaidStitcher = function initVpaidStitcher(elem, src, type) {
	    video = elem;
	    playerType = type;
	    src = src;
	    containerElem = elem;
	
	    console.log('vpaid stitcher loaded');
	  };
	
	  var jwPlayer = function jwPlayer(elem, src) {
	    containerElem = elem;
	    src = src;
	    playerType = 'jwplayer';
	
	    console.log('jwplayer loads');
	
	    var jwplayerInstance = jwplayer(containerElem);
	
	    jwplayerInstance.setup({
	      playlist: [{
	        sources: [{
	          file: src
	        }]
	      }]
	    });
	
	    // Noticed performance issues with on meta event
	    jwplayer().on('meta', function (data) {
	      // TODO: JW8 to release EXT-X-DATERANGE in upcoming release, not in current version
	      console.log(data);
	    });
	  };
	
	  var hlsPlayer = function hlsPlayer(video, src) {
	    video = video;
	    src = src;
	    playerType = 'hls';
	
	    console.log('hls loads');
	
	    if (Hls.isSupported()) {
	      var hls = new Hls(),
	          fragLoaded = false;
	
	      hls.loadSource(src);
	      hls.attachMedia(video);
	      hls.on(Hls.Events.MANIFEST_PARSED, function (e, data) {
	        video.play();
	      });
	      hls.on(Hls.Events.FRAG_CHANGED, function (e, data) {
	        tagIterator(data.frag.tagList);
	      });
	    }
	  };
	
	  return {
	    initVpaidStitcher: initVpaidStitcher,
	    hlsPlayer: hlsPlayer,
	    jwPlayer: jwPlayer
	  };
	};
	
	module.exports = VpaidStitcher;

/***/ })
/******/ ]);
//# sourceMappingURL=vpaid-stitcher.js.map