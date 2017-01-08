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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(/*! ../css/main.scss */ 1);
	$(document).ready(function() {
	    /*//////////////////////////////////////////////////
	    /                                                  /
	    /                                                  /
	    /                Navigation                        /
	    /                                                  /
	    /                                                  /
	    //////////////////////////////////////////////////*/
	    //Allow slide toggle of mobile menu button
	    $('.menu-button').click(function() {
	        if ($(window).width() < 768) {
	            $('nav ul').slideToggle(300);
	        }
	    });
	    //prevent slide toggle of wide menu
	    $('.main-nav').click(function() {
	        if ($(window).width() < 768) {
	            $('nav ul').slideToggle(300);
	        }
	    }); //end menu toggle
	    //allow style switching on window resize
	    $(window).resize(function() {
	        $('nav ul').removeAttr('style');
	    }); //end resize
	    //Prevent mobile menu label linking to the top of page
	    $('.menu-button').click(function(event) {
	        event.preventDefault();
	    }); // end link prevention
	
	    /*//////////////////////////////////////////////////
	    /                                                  /
	    /                                                  /
	    /            Progress Bar                          /
	    /                                                  /
	    /                                                  /
	    //////////////////////////////////////////////////*/
	
	    /*  $(".progress > span").each(function() {
	          $(this)
	              .data("origWidth", $(this).width())
	              .width(0)
	              .delay(400)
	              .animate({
	                  width: $(this).data("origWidth") // or + "%" if fluid
	              }, 1200);
	      });*/
	
	
	    /*//////////////////////////////////////////////////
	    /                                                  /
	    /                                                  /
	    /            Accordion (in slide)                  /
	    /                                                  /
	    /                                                  /
	    //////////////////////////////////////////////////*/
	
	    function showAccordion() {
	        if ($(window).width() < 896) {
	            $(".condensed").accordion({ //jquery UI accordion
	                heightStyle: "content",
	                header: "h3",
	                collapsible: true,
	                active: false,
	                icons: {
	                    "header": "ui-icon-plus",
	                    "activeHeader": "ui-icon-minus"
	                }
	            });
	        }
	    }
	
	
	    $(window).resize(function() {
	        if ($(window).width() < 896) { //56rem - matches slider breakpoint in css (.main-container)
	            showAccordion();
	        } else {
	            if ($('.condensed').hasClass('ui-accordion')) { //if() rule to stop browser erroring on resize when there is no accordion
	                $('.condensed').accordion('destroy');
	            }
	        }
	    });
	    showAccordion();
	    //accordion end////////////////////////////////////////////////////////////////////////
	}); //end ready
	
	
	/*//////////////////////////////////////////////////
	/                                                  /
	/                                                  /
	/             Portfolio Tabs                       /
	/                                                  /
	/                                                  /
	//////////////////////////////////////////////////*/
	
	
	// Find list of tabs and store
	$('.tab-list').each(function() {
	    var $this = $(this);
	    //Get active list item, get anchor from active tab, get active panel
	    var $tab = $this.find('li.active');
	    var $link = $tab.find('a');
	    var $panel = $($link.attr('href'));
	    //click on tab, prevent default
	    $this.on('click', '.tab-control', function(e) {
	        e.preventDefault();
	        //store current link
	        var $link = $(this);
	        //get href of clicked tab
	        var id = this.hash;
	        //add/remove classes and animate transition
	        if (id && !$link.is('active')) {
	            $('.slide-viewer').animate({ //fade out current panel contents on tab clcik to prime for fade in.
	                opacity: 0
	            }, 100, function() { //deactivate old / activate new panel before fading in panel contents
	                $tab.removeClass('active');
	                $panel.removeClass('active');
	                $tab = $link.parent().addClass('active');
	                $panel = $(id).addClass('active');
	                $('.slide-viewer').animate({
	                    opacity: 1
	                }, 250);
	            });
	        }
	    });
	});
	
	
	/*//////////////////////////////////////////////////
	/                                                  /
	/                                                  /
	/                      SLIDER                      /
	/                                                  /
	/                                                  /
	//////////////////////////////////////////////////*/
	
	//Find sliders on page, create variables for each
	$('.slider').each(function() {
	    var $this = $(this);
	    var $group = $this.find('.slide-group');
	    var $slides = $this.find('.slide');
	    var buttonArray = [];
	    var currentIndex = 0;
	    var timeout;
	
	    //Slider move function
	    function move(newIndex) {
	        var animateLeft, slideLeft;
	        advance();
	        if ($group.is(':animated') || currentIndex === newIndex) {
	            return;
	        }
	
	        buttonArray[currentIndex].removeClass('active');
	        buttonArray[newIndex].addClass('active');
	
	        if (newIndex > currentIndex) {
	            slideLeft = '100%';
	            animateLeft = '-100%';
	        } else {
	            slideLeft = '-100%';
	            animateLeft = '100%';
	        }
	        $slides.eq(newIndex).css({
	            left: slideLeft,
	            display: 'block'
	        });
	        $group.animate({
	            left: animateLeft
	        }, function() {
	            $slides.eq(currentIndex).css({
	                display: 'none'
	            });
	            $slides.eq(newIndex).css({
	                left: 0
	            });
	            $group.css({
	                left: 0
	            });
	            currentIndex = newIndex;
	        });
	    }
	
	    function advance() {
	        clearTimeout(timeout);
	        timeout = setTimeout(function() {
	            if (currentIndex < ($slides.length - 1)) {
	                move(currentIndex + 1);
	            } else {
	                move(0);
	            }
	        }, 30000);
	    }
	
	
	    $.each($slides, function(index) {
	        var $button = $('<button type="button" class="slide-btn">&bull;</button>');
	        if (index === currentIndex) {
	            $button.addClass('active');
	        }
	        $button.on('click', function() {
	            move(index);
	        }).appendTo($this.find('.slide-buttons'));
	        buttonArray.push($button);
	    });
	
	    $('.last').on('click', function() {
	        if (currentIndex > (0)) {
	            move(currentIndex - 1);
	        } else {
	            move($slides.length - 1);
	        }
	    });
	
	    $('.next').on('click', function() {
	        if (currentIndex < ($slides.length - 1)) {
	            move(currentIndex + 1);
	        } else {
	            move(0);
	        }
	    });
	    advance();
	});
	
	//swipe for slider - uses jquery mobile
	
	$(function(){
	  // Bind the swipeleftHandler callback function to the swipe event on div.box
	  $( ".slide" ).on( "swipeleft", swipeleftHandler );
	
	  // Callback function references the event target and adds the 'swipeleft' class to it
	  function swipeleftHandler( event ){
	     $( ".next" ).click();
	  }
	});
	$(function(){
	  // Bind the swipeleftHandler callback function to the swipe event on div.box
	  $( ".slide" ).on( "swiperight", swipeRightHandler );
	
	  // Callback function references the event target and adds the 'swipeleft' class to it
	  function swipeRightHandler( event ){
	     $( ".last" ).click();
	  }
	});
	
	/*//////////////////////////////////////////////////
	/                                                  /
	/                                                  /
	/              Progress Bar                        /
	/                                                  /
	/                                                  /
	//////////////////////////////////////////////////*/
	
	
	function moveProgressBar() {
	    var getPercent = ($('.progress-wrap').data('progress-percent') / 100);
	    var getProgressWrapWidth = $('.progress-wrap').width();
	    var progressTotal = getPercent * getProgressWrapWidth;
	    var animationLength = 750;
	
	    // on page load, animate percentage bar to data percentage length
	    // .stop() used to prevent animation queueing
	    $('.progress-bar').stop().animate({
	        left: progressTotal
	    }, animationLength);
	}
	// on page load...
	moveProgressBar();
	// on browser resize...
	$(window).resize(function() {
	    moveProgressBar();
	});
	
	/*//////////////////////////////////////////////////
	/                                                  /
	/                                                  /
	/              Page Scroll                         /
	/                                                  /
	/                                                  /
	//////////////////////////////////////////////////*/
	
	
	$(".scroll").click(function(event) {
	    event.preventDefault();
	    $('html,body').animate({
	        scrollTop: $(this.hash).offset().top
	    }, 1000, 'easeOutCubic');
	});


/***/ },
/* 1 */
/*!***************************!*\
  !*** ./src/css/main.scss ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(/*! !./../../~/css-loader!./../../~/sass-loader!./main.scss */ 2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(/*! ./../../~/style-loader/addStyles.js */ 4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/*!**********************************************************!*\
  !*** ./~/css-loader!./~/sass-loader!./src/css/main.scss ***!
  \**********************************************************/
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(/*! ./../../~/css-loader/lib/css-base.js */ 3)();
	// imports
	
	
	// module
	exports.push([module.id, "/*\r\n\r\nTEXT ON LIGHT ----  Purple/blue #2D3142\r\nTEXT ON DARK ---- White #FFFFFF\r\nBackgrounds ---- lighter-grey  #DEDFDF\r\nBORDERS && DEVIDERS --- darker grey #BFC0C0\r\nBUTTONS & LINKS --- Orange #EF8354\r\nDarker - orange #BF6943\r\nHEADERS & BACKGROUND ---- lilac/blue #4F5D75\r\n\r\n*/\nhtml, body {\n  margin: 0;\n  padding: 0;\n  font-family: 'Lato', sans-serif;\n  background-color: #BFC0C0;\n  color: #4f5d75; }\n\n.page-container {\n  max-width: 75rem;\n  margin: auto;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); }\n\nh1 {\n  text-align: center; }\n\nh2 {\n  text-align: center; }\n\nh3 {\n  text-align: center; }\n\nh4 {\n  text-align: center; }\n\np {\n  font-size: 1.1rem;\n  padding: .75rem;\n  margin: 0; }\n\nli {\n  font-size: 1.1rem;\n  text-align: left; }\n\n.styled li {\n  list-style: none; }\n\n.styled li:before {\n  content: \"\\F101\";\n  font-family: FontAwesome;\n  color: #BF6943;\n  display: inline-block;\n  margin-left: -1.3rem;\n  width: 1.3rem; }\n\na {\n  text-decoration: none;\n  /*font-family: 'Raleway', sans-serif;*/\n  font-size: 1rem;\n  color: #4f5d75; }\n\nimg {\n  max-width: 90%; }\n\n.pointer {\n  cursor: pointer; }\n\ni {\n  color: #DEDFDF; }\n\nhr {\n  border: 0;\n  height: 1px;\n  background-image: -webkit-linear-gradient(left, #DEDFDF, #8E97A7, #DEDFDF);\n  background-image: linear-gradient(to right, #DEDFDF, #8E97A7, #DEDFDF);\n  margin: 0; }\n\nnav {\n  background-color: #8E97A7; }\n\n.logo {\n  font-family: 'Audiowide', cursive;\n  color: #DEDFDF; }\n\nnav li a, nav li i {\n  font-family: 'Lato', sans-serif;\n  color: #DEDFDF; }\n\n.btn-container {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 0 100%;\n  flex: 1 0 100%; }\n\n.btn {\n  background-color: #EF8354;\n  color: #DEDFDF;\n  position: relative;\n  border-style: none;\n  border-radius: 0;\n  font-family: FontAwesome, 'Lato', sans-serif;\n  margin-bottom: 1rem;\n  padding: 8px 16px;\n  padding: 0.5rem 1rem;\n  max-width: 10rem;\n  /*box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\r\n    border-bottom: 3px solid #BF6943;\r\n    border-radius: 5px;*/ }\n\n.btn a {\n  color: #DEDFDF; }\n\n.btn:active, .btn:hover {\n  background-color: #BF6943; }\n\n/*////////////////////////////////////\r\n\r\nNavigation\r\n\r\n////////////////////////////////////*/\n.logo {\n  float: left;\n  padding: .75rem;\n  font-size: 1.5rem;\n  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25); }\n\nnav {\n  display: table;\n  width: 100%;\n  position: relative; }\n\nnav ul {\n  float: right;\n  padding: 0;\n  margin: 0; }\n\nnav li {\n  list-style: none;\n  display: inline-block;\n  padding: 1rem .75rem; }\n\nnav li:hover {\n  background-color: #4F5D75;\n  -webkit-transition: background-color 0.75s ease;\n  transition: background-color 0.75s ease; }\n\nnav li.active {\n  background-color: #4F5D75; }\n\nnav a {\n  display: block;\n  padding: 0; }\n\n@media screen and (min-width: 48rem) {\n  .mobile-only {\n    display: none; } }\n\n.menu-button {\n  display: none; }\n\n@media screen and (max-width: 47.9999rem) {\n  .menu-button {\n    display: block;\n    padding: 1rem;\n    float: right; }\n  nav ul li {\n    display: block;\n    width: 100%;\n    padding: 1rem 0;\n    text-align: center; }\n  nav ul {\n    display: none;\n    width: 100%;\n    padding: 0;\n    margin: 0; } }\n\n/*////////////////////////////////////\r\n\r\nLanding Header\r\n\r\n////////////////////////////////////*/\n.intro-container {\n  background: -webkit-linear-gradient(#8E97A7, #4F5D75);\n  background: linear-gradient(#8E97A7, #4F5D75);\n  color: #DEDFDF; }\n\n.intro-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  min-height: calc(100vh - 51px); }\n\n.intro {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  position: relative;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  text-align: center; }\n\n.intro-text {\n  margin: .5rem 1rem;\n  font-weight: normal;\n  text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.25); }\n\n.h1 {\n  font-family: 'Audiowide', cursive;\n  margin-bottom: 3rem; }\n\n.call-to-action a, .call-to-action i {\n  color: #DEDFDF; }\n\n.call-to-action a {\n  border: 2px solid #DEDFDF;\n  padding: .5rem; }\n\n.fadeIn {\n  -webkit-animation-delay: .75s;\n  animation-delay: .75s; }\n\n@media all and (min-width: 64.1rem) {\n  .intro-container {\n    min-height: 27.5vh; }\n  .not-lg-screen {\n    display: none; } }\n\n@media screen and (max-width: 412px) {\n  .h1 {\n    font-size: 1.5rem; } }\n\n/*////////////////////////////////////\r\n\r\nPROGRESS BAR\r\n\r\n////////////////////////////////////*/\n.progress-band {\n  width: 100%; }\n\n.progress {\n  height: 50px;\n  width: 95%; }\n\n.progress-wrap {\n  background: #EF8354;\n  margin: .5rem auto;\n  overflow: hidden;\n  position: relative; }\n\n.progress-bar {\n  background: #DEDFDF;\n  position: absolute;\n  top: 0;\n  left: 0; }\n\n.progress-bar-list {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n  position: absolute;\n  list-style: none;\n  word-wrap: break-word;\n  padding-left: 0;\n  width: 100%; }\n\n.progress-bar-list li {\n  text-align: center; }\n\n.progress-bar-list li i {\n  color: #BF6943; }\n\n@media all and (max-width: 22.5rem) {\n  .progress-bar-list li {\n    font-size: 0.8rem; } }\n\n/*////////////////////////////////////\r\n\r\nPORTFOLIO PANEL LAYOUT\r\n\r\n////////////////////////////////////*/\n.portfolio-container {\n  background-color: #DEDFDF; }\n\n/*////////////////////////////////////\r\n\r\nPORTFOLIO TABs\r\n\r\n////////////////////////////////////*/\n.tab-panel {\n  display: none; }\n\n.tab-panel.active {\n  display: block; }\n\n.tab-text {\n  color: #DEDFDF;\n  font-weight: normal;\n  margin: 0;\n  padding: 0; }\n\n.tab-list {\n  background-color: #4F5D75;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  position: relative;\n  width: 100%; }\n\n.tab-list li {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 22%;\n  flex: 1 22%;\n  text-align: center;\n  padding: .5rem 0;\n  cursor: pointer; }\n\n.tab-list li a {\n  width: 100%;\n  height: 100%; }\n\n.tab-list li:hover {\n  background-color: #DEDFDF;\n  -webkit-transition: background-color .25s ease;\n  transition: background-color .25s ease; }\n\n.tab-list li:not(.active):hover h3, .tab-list li:not(.active):hover i {\n  color: #4f5d75;\n  -webkit-transition: color .25s ease;\n  transition: color .25s ease; }\n\n.tab-list i {\n  font-size: 4rem;\n  padding-bottom: .5rem;\n  width: 100%; }\n\n.tab-list li.active {\n  background-color: #DEDFDF;\n  color: #4f5d75;\n  text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);\n  -webkit-transition: text-shadow .25s ease;\n  transition: text-shadow .25s ease; }\n\n.tab-list li.active h3, .tab-list li.active i {\n  color: #4f5d75;\n  font-weight: bold;\n  -webkit-transition: color 0.25s ease;\n  transition: color 0.25s ease; }\n\n@media all and (max-width: 48rem) {\n  .tab-text {\n    font-size: 1rem;\n    padding-bottom: 1rem; }\n  .tab-list i {\n    font-size: 2.5rem; } }\n\n/*/////////////////////////////////////////////////////*/\n/*Slider styling*/\n/*/////////////////////////////////////////////////////*/\n/*\r\nTEXT ON LIGHT ----  Purple/blue #2D3142\r\nTEXT ON DARK ---- White #FFFFFF\r\nBackgrounds ---- lightgrey  #DEDFDF\r\nBORDERS && DEVIDERS ---- darkgrey #BFC0C0\r\nBUTTONS & LINKS ---- Orange #EF8354\r\nDarker - orange #BF6943\r\nHEADERS & BACKGROUND ---- lilac/blue #4F5D75\r\n*/\n.slider {\n  position: relative; }\n\n.slide-viewer {\n  position: relative;\n  overflow: hidden;\n  height: 400px; }\n\n.slide-group {\n  width: 100%;\n  height: 100%;\n  position: relative; }\n\n.slide {\n  width: 100%;\n  height: 100%;\n  display: none;\n  position: absolute; }\n\n.slide:first-child {\n  display: block; }\n\n.slide-control {\n  width: 100%;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  padding-bottom: 1rem; }\n\n.slide-btn {\n  background-color: #DEDFDF;\n  border: none;\n  color: #4F5D75; }\n\n.last {\n  height: 3rem;\n  width: 3rem;\n  border-radius: 100%;\n  background-color: #4F5D75;\n  text-align: center;\n  cursor: pointer;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  margin-left: 1rem; }\n\n.next {\n  height: 3rem;\n  width: 3rem;\n  border-radius: 100%;\n  background-color: #4F5D75;\n  text-align: center;\n  cursor: pointer;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n  margin-right: 1rem; }\n\n.last i, .next i {\n  padding-top: 1rem; }\n\n.last:hover, .next:hover {\n  background-color: #8E97A7;\n  -webkit-transition: background-color 0.75s ease;\n  transition: background-color 0.75s ease; }\n\n.slide-btn.active {\n  color: #EF8354; }\n\n@media screen and (min-width: 35rem) {\n  .slide-viewer {\n    height: 90vw; } }\n\n@media screen and (min-width: 56rem) {\n  .slide-viewer {\n    height: 25rem; } }\n\n/*////////////////////////////////////\r\n\r\nPORTFOLIO ITEM / SLIDER CONTENT\r\n\r\n////////////////////////////////////*/\n.main-container {\n  padding: 1rem; }\n\n.project-details-container {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 100%;\n  flex: 1 1 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\n.project-title {\n  font-size: 1.75rem;\n  margin: 0; }\n\n.project-pic-container {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 100%;\n  flex: 1 1 100%;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  text-align: center; }\n\n.project-pic {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 100%;\n  flex: 1 1 100%;\n  max-width: 75%;\n  text-align: center;\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); }\n\n@media screen and (min-width: 56rem) {\n  .main-container {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: row;\n    flex-direction: row; }\n  .project-pic-container {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%; }\n  .project-details-container {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 1 45%;\n    flex: 1 1 45%; }\n  .project-title {\n    font-size: 2rem; }\n  .project-pic {\n    max-width: 85%; } }\n\n/*////////////////////////////////////\r\n\r\nPORTFOLIO ITEM / ACCORDION\r\n\r\n////////////////////////////////////*/\n.ui-accordion {\n  font-family: 'Lato', sans-serif;\n  color: #4f5d75;\n  padding: 0;\n  width: 21rem;\n  margin: 1rem;\n  text-align: center;\n  border-top: 1px solid #EF8354;\n  border-bottom: 1px solid #EF8354; }\n\n.ui-accordion h4 {\n  cursor: pointer;\n  font-family: 'Lato', sans-serif;\n  color: #4f5d75;\n  text-align: center; }\n\n.ui-accordion-content {\n  background: transparent;\n  font-family: 'Lato', sans-serif;\n  color: #4f5d75;\n  margin: 0 !important;\n  padding: 0 !important;\n  border: none; }\n\n.ui-accordion-header {\n  font-family: 'Lato', sans-serif;\n  color: #4f5d75;\n  background: transparent;\n  border: none;\n  /*reset for jqueryUI*/\n  border-radius: 0;\n  /*reset for jqueryUI*/\n  padding: 0.5rem;\n  padding-top: 1.5rem;\n  margin: auto;\n  cursor: pointer; }\n\n.ui-icon-plus:hover {\n  color: #BF6943; }\n\n/*FOOTER///////////////////////*/\n.footer {\n  background-color: #DEDFDF;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n.about-container {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 100%;\n  flex: 1 1 100%;\n  margin: auto;\n  -webkit-box-ordinal-group: 2;\n  -ms-flex-order: 1;\n  order: 1; }\n\n.form-container {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 1 100%;\n  flex: 1 1 100%;\n  -webkit-box-ordinal-group: 3;\n  -ms-flex-order: 2;\n  order: 2; }\n\n@media all and (min-width: 48rem) {\n  .footer {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    -webkit-box-align: start;\n    -ms-flex-align: start;\n    align-items: flex-start; }\n  .form-container {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 55%;\n    flex: 1 55%;\n    -webkit-box-ordinal-group: 2;\n    -ms-flex-order: 1;\n    order: 1;\n    -webkit-box-align: start;\n    -ms-flex-align: start;\n    align-items: flex-start;\n    -webkit-box-pack: start;\n    -ms-flex-pack: start;\n    justify-content: flex-start; }\n  .about-container {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 35%;\n    flex: 1 35%;\n    -webkit-box-ordinal-group: 3;\n    -ms-flex-order: 2;\n    order: 2;\n    margin: 0 auto;\n    text-align: left; }\n  .about-list {\n    margin-top: .25rem;\n    border-left: 1px solid #EF8354; } }\n\nform i {\n  color: #4f5d75; }\n\nform {\n  /*fixes odd right hand white space issue */\n  width: 100%;\n  margin: 0 auto;\n  text-align: center; }\n\n.input {\n  color: #1E2125;\n  width: 75%;\n  height: 2rem;\n  padding-left: 0.5rem;\n  margin: 0.25rem;\n  vertical-align: middle;\n  border-radius: 0; }\n\n.text-area {\n  width: 75%;\n  height: 3rem;\n  color: #1E2125; }\n\n.submit {\n  text-align: center;\n  margin: 0.5rem; }\n\ninput, textarea {\n  outline-color: #EF8354; }\n\n/*\r\n\r\nTEXT ON LIGHT ----  Purple/blue #2D3142\r\nTEXT ON DARK ---- White #FFFFFF\r\nBackgrounds ---- lighter-grey  #DEDFDF\r\nBORDERS && DEVIDERS --- darker grey #BFC0C0\r\nBUTTONS & LINKS --- Orange #EF8354\r\nDarker - orange #BF6943\r\nHEADERS & BACKGROUND ---- lilac/blue #4F5D75\r\n\r\n*/\n.band {\n  width: 100%;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\n.band1 {\n  background: -webkit-linear-gradient(left, #4F5D75, #8E97A7);\n  background: linear-gradient(to right, #4F5D75, #8E97A7); }\n\n.band2 {\n  background: -webkit-linear-gradient(right, #4F5D75, #8E97A7);\n  background: linear-gradient(to left, #4F5D75, #8E97A7); }\n\n.sub-band-1 {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 100%;\n  flex: 1 100%;\n  font-weight: normal;\n  color: #DEDFDF;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n.sub-band-1 h2 {\n  font-weight: normal;\n  color: #DEDFDF; }\n\n.sub-band-2 {\n  -webkit-box-flex: 1;\n  -ms-flex: 1 100%;\n  flex: 1 100%;\n  font-weight: normal;\n  color: #DEDFDF;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  text-align: center; }\n\n.social-icons {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  list-style: none;\n  -ms-flex-pack: distribute;\n  justify-content: space-around;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  color: #DEDFDF; }\n\n.social-icons li {\n  color: #DEDFDF;\n  list-style: none;\n  display: inline-block;\n  padding: 1rem .75rem; }\n\n.social-icons li a {\n  color: #DEDFDF;\n  font-size: 1.5rem; }\n\n@media all and (min-width: 48rem) {\n  /*aligns band horizontally over 450px */\n  .band {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -ms-flex-direction: row;\n    flex-direction: row;\n    position: relative; }\n  .sub-band-1 {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 48%;\n    flex: 1 48%; }\n  .sub-band-2 {\n    -webkit-box-flex: 1;\n    -ms-flex: 1 48%;\n    flex: 1 48%; } }\n", ""]);
	
	// exports


/***/ },
/* 3 */
/*!**************************************!*\
  !*** ./~/css-loader/lib/css-base.js ***!
  \**************************************/
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/*!*************************************!*\
  !*** ./~/style-loader/addStyles.js ***!
  \*************************************/
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(true) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map