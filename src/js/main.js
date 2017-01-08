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
