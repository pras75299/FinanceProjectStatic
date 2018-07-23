(function($) {

	"use strict";


    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Check ie and version
    function isIE () {
        var myNav = navigator.userAgent.toLowerCase();
        return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1], 10) : false;
    }


    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $(".navigation-holder");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $(".navigation-holder .close-navbar");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })
    }

    toggleMobileNavigation();


    // Function for toggle a class for small menu
    function toggleClassForSmallNav() {
        var windowWidth = window.innerWidth;
        var mainNav = $("#navbar > ul");

        if (windowWidth <= 991) {
            mainNav.addClass("small-nav");
        } else {
            mainNav.removeClass("small-nav");
        }
    }

    toggleClassForSmallNav();


    // Function for small menu
    function smallNavFunctionality() {
        var windowWidth = window.innerWidth;
        var mainNav = $(".navigation-holder");
        var smallNav = $(".navigation-holder > .small-nav");
        var subMenu = smallNav.find(".sub-menu");
        var megamenu = smallNav.find(".mega-menu");
        var menuItemWidthSubMenu = smallNav.find(".menu-item-has-children > a");

        if (windowWidth <= 991) {
            subMenu.hide();
            megamenu.hide();
            menuItemWidthSubMenu.on("click", function(e) {
                var $this = $(this);
                $this.siblings().slideToggle();
                 e.preventDefault();
                e.stopImmediatePropagation();
            })
        } else if (windowWidth > 991) {
            mainNav.find(".sub-menu").show();
            mainNav.find(".mega-menu").show();
        }
    }

    smallNavFunctionality();


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }


    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = $this.find(".slider-bg").attr("src");

                $this.css({
                    backgroundImage: "url("+ img +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


    //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").slick({
                autoplay: true,
                autoplaySpeed: 6000,
                pauseOnHover: true,
                arrows: true,
                prevArrow: '<button type="button" class="slick-prev">Previous</button>',
                nextArrow: '<button type="button" class="slick-next">Next</button>',
                dots: true,
                fade: true,
                cssEase: 'linear'
            });
        }
    }


    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(500, function() {

                //active wow
                wow.init();

                //Active heor slider
                heroSlider();

            });
        }
    }


    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });


    /*------------------------------------------
        = ACTIVE POPUP IMAGE
    -------------------------------------------*/  
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/  
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {  
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });    
    }


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/  
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });    
    }


    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".sortable-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery(); 


    /*------------------------------------------
        = MASONRY GALLERY SETTING
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-grid').length) {
            var $grid =  $('.masonry-grid').masonry({
                itemSelector: '.grid',
                columnWidth: '.grid',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();


    /*------------------------------------------
        = PROGRESS BAR
    -------------------------------------------*/
    function progressBar() {
        if ($(".progress-bar").length) {
            var $progress_bar = $('.progress-bar');
            $progress_bar.appear();
            $(document.body).on('appear', '.progress-bar', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    var percent = current_item.data('percent');
                    current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
                }
                
            });
        };
    }

    progressBar();    
	
	
    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/

    // Function for clone an element for sticky menu
    function cloneNavForSticyMenu($ele, $newElmClass) {
        $ele.addClass('original').clone().insertAfter($ele).addClass($newElmClass).removeClass('original');
    }

    // clone home style 1 navigation for sticky menu
    if ($('.site-header .navigation').length) {
        cloneNavForSticyMenu($('.site-header .navigation'), "sticky-header");
    }

    // Function for sticky menu
    function stickIt($stickyClass, $toggleClass) {

        if ($(window).scrollTop() >= 300) {
            var orgElement = $(".original");
            var coordsOrgElement = orgElement.offset();
            var leftOrgElement = coordsOrgElement.left;  
            var widthOrgElement = orgElement.css("width");

            $stickyClass.addClass($toggleClass);

            $stickyClass.css({
                "width": widthOrgElement
            }).show();

            $(".original").css({
                "visibility": "hidden"
            });

        } else {

            $(".original").css({
                "visibility": "visible"
            });

            $stickyClass.removeClass($toggleClass);
        }
    }


    /*------------------------------------------
        = FUN FACT COUNT
    -------------------------------------------*/
    if ($(".start-count").length) {
        $('.counter').appear();
        $(document.body).on('appear', '.counter', function(e) {
            var $this = $(this),
            countTo = $this.attr('data-count');

            $({ countNum: $this.text()}).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }


    /*------------------------------------------
        = BLOG SLIDER
    -------------------------------------------*/  
    if($(".blog-slider".length)) {
        $(".blog-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed: 500,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            responsive: {
                0 : {
                    items: 1,
                    margin: 0,
                },

                600 : {
                    items: 2,
                },

                992 : {
                    items: 3,
                },

                1200 : {
                    items: 4,
                }
            }
        });
    }

    /*------------------------------------------
        = BLOG DETAILS SLIDER
    -------------------------------------------*/  
    if($(".blog-details-slider".length)) {
        $(".blog-details-slider").owlCarousel({
            mouseDrag: false,
            smartSpeed: 500,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            responsive: {
                0 : {
                    items: 1,
                    margin: 0,
                },

                600 : {
                    items: 2,
                },
            }
        });
    }


    /*------------------------------------------
        = PARTNERS SLIDER
    -------------------------------------------*/
    if ($(".partners-slider").length) {
        $(".partners-slider").owlCarousel({
            autoplay:true,
            smartSpeed: 300,
            margin: 30,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            responsive: {
                0 : {
                    items: 2
                },

                500 : {
                    items: 3
                },

                992 : {
                    items: 4
                }
            }
        });
    }


    /*------------------------------------------
        = PARTNERS SLIDER s2
    -------------------------------------------*/
    if ($(".partners-slider-s2").length) {
        $(".partners-slider-s2").owlCarousel({
            // autoplay:true,
            smartSpeed: 300,
            margin: 0,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            responsive: {
                0 : {
                    items: 2
                },

                500 : {
                    items: 3
                },

                1200 : {
                    items: 4
                }
            }
        });
    }


    /*------------------------------------------
        = PARTNERS SLIDER s3
    -------------------------------------------*/
    if ($(".partners-slider-s3").length) {
        $(".partners-slider-s3").owlCarousel({
            // autoplay:true,
            smartSpeed: 300,
            margin: 10,
            loop:true,
            autoplayHoverPause:true,
            dots: false,
            responsive: {
                0 : {
                    items: 2
                },

                500 : {
                    items: 3
                },

                1200 : {
                    items: 5
                }
            }
        });
    }
    

    
    /*------------------------------------------
        = TESTIMONIALS SLIDER
    -------------------------------------------*/
    if ($(".testimonials-slider").length) {
        $(".testimonials-slider").owlCarousel({
            //autoplay:true,
            smartSpeed: 600,
            margin: 0,
            loop:true,
            items: 1,
        });
    }


    /*------------------------------------------
        = CASE STUDIES SLIDER
    -------------------------------------------*/
    if ($(".case-studies-slider").length) {
        $(".case-studies-slider").owlCarousel({
            // autoplay:true,
            smartSpeed: 300,
            margin: 15,
            loop:true,
            autoplayHoverPause:true,
            responsive: {
                0 : {
                    items: 1,
                    margin: 0
                },

                992 : {
                    items: 2
                }
            }
        });
    }


    /*------------------------------------------
        = CHART
    -------------------------------------------*/
    function caseStudyChart() {
        if ($("#chart").length) {

            var $chart = $("#chart");
            $chart.appear();

            $(document.body).on('appear', '#chart', function() {
                var current_item = $(this);
                
                if (!current_item.hasClass('appeared')) {
                    current_item.addClass('appeared');

                    var ctx = $("#chart");
                    var lineChart = new Chart(ctx, {
                        type: "line",
                        data: {
                            labels: ["May", "June", "July", "Aug", "Sep"],
                            datasets: [
                                {
                                    label: "Other Clients",
                                    data: [2000, 3500, 2900, 3800, 3000],
                                    backgroundColor: "rgba(236,233,233, 0.5)",
                                    borderColor: "#7da2f5",
                                    borderWidth: 2,
                                    lineTension: 0,
                                    pointRadius: 4,
                                    pointBorderColor: "#7da2f5",
                                    pointBackgroundColor: "#fff"

                                },

                                {
                                    label: "Our clients",
                                    data: [3000, 5000,4000, 5500, 4000],
                                    backgroundColor: "rgba(254,245,231, 0.5)",
                                    borderColor: "#f6b34a",
                                    borderWidth: 2,
                                    lineTension: 0,
                                    pointRadius: 4,
                                    pointBorderColor: "#f6b34a",
                                    pointBackgroundColor: "#fff"

                                },
                            ]
                        },
                        options: {
                            maintainAspectRatio: false,
                            animation: {
                                duration: 2500,
                            }
                        }
                    });
                }                
            });
        }
    }

    caseStudyChart();

    if($('.popup-gmaps').length) {
        $('.popup-gmaps').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }


    


    /*------------------------------------------
        = GOOGLE MAP
    -------------------------------------------*/  
    function map() {

        var locations = [
            ['Hotel royal international khulna ', 22.8103888, 89.5619609,1],
            ['City inn khulna', 22.820884, 89.551216,2],
        ];

        var map = new google.maps.Map(document.getElementById('map'), {
            center: new google.maps.LatLng( 22.8103888, 89.5619609),
            zoom: 12,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROADMAP

        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) {  
                marker = new google.maps.Marker({
                position: new google.maps.LatLng(locations[i][1], locations[i][2]),
                map: map,
                icon:'images/map-marker.png'
            });

            google.maps.event.addListener(marker, 'click', (function(marker, i) {
                return function() {
                    infowindow.setContent(locations[i][0]);
                    infowindow.open(map, marker);
                }
            })(marker, i));
        }
    }; 


    /*------------------------------------------
        = CONTACT FORM SUBMISSION
    -------------------------------------------*/  
    if ($("#contact-form").length) {
        $("#contact-form").validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },

                email: "required",

                phone: "required",

            },

            messages: {
                name: "Please enter your name",
                email: "Please enter your email",
                phone: "Please enter your phone",
            },

            submitHandler: function (form) {
                $.ajax({
                    type: "POST",
                    url: "mail.php",
                    data: $(form).serialize(),
                    success: function () {
                        $( "#loader").hide();
                        $( "#success").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#success").slideUp( "slow" );
                        }, 3000);
                        form.reset();
                    },
                    error: function() {
                        $( "#loader").hide();
                        $( "#error").slideDown( "slow" );
                        setTimeout(function() {
                        $( "#error").slideUp( "slow" );
                        }, 3000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }


    /*------------------------------------------
        = STYLE SWITCHER
    -------------------------------------------*/  
    // HTML FOR COLOR SWITCHER
    var switcherHtml = '<div class="style-switcher-box"> <div class="switcher-inner"><h5>Style Switcher</h5> <div class="main-list"> <div class="list"> <span class="list-title">Skin color</span> <div class="sublist"> <ul class="color-chager"> <li class="color-default"><img src="assets/images/switcher-color/img-1.jpg" alt></li> <li class="color-style1"><img src="assets/images/switcher-color/img-2.jpg" alt></li> <li class="color-style2"><img src="assets/images/switcher-color/img-3.jpg" alt></li> <li class="color-style3"><img src="assets/images/switcher-color/img-4.jpg" alt></li> </ul> </div> </div> <div class="list layout"> <span class="list-title">Layout</span> <div class="sublist"> <ul class="layout-sw"> <li>Full width</li> <li class="box">Box</li> </ul> </div> </div> </div> <p><span>Note: </span> This template is build with SASS. The skin color is only demo. You can change the color scheme as your like. </p> </div> <button class="toggle-btn"><i class="fa fa-cog"></i></button> </div>';
    var blankStyleInject = '<link href="assets/css/blank-color.css" rel="stylesheet" title="switchstyle">';
    var htmlHead = $("head");

        $("body").append(switcherHtml);
        htmlHead.append(blankStyleInject);


    function styleSwitcher() {
        if ($(".style-switcher-box").length) {
            var switcherHolder = $(".style-switcher-box"),
                btn = switcherHolder.find(".toggle-btn"),
                colorChangerBtn = $(".style-switcher-box .color-chager li"),
                layoutChangerBtn = $(".style-switcher-box .layout-sw li"),
                links = document.getElementsByTagName("link");
            var body = $("body");

            for (var i = 0; i <= links.length; i++){
                var title = links[i].getAttribute("title");
                if ( title == "switchstyle") {
                    var targetLink = links[i];
                    var href = links[i].getAttribute("href");
                    break;
                }
            }


            btn.on("click", function() {
                switcherHolder.toggleClass("toggle-switcherbox");

            })

            colorChangerBtn.on("click", function() {
                var $this = $(this);
                var styleFileName = $this.attr("class");
                targetLink.href = "assets/css/" + styleFileName + ".css";
            });

            layoutChangerBtn.on("click", function(e) {
                var $this = $(this);
                if ( $this.hasClass("box") ) {
                    body.addClass("box-layout");
                } else {
                    body.removeClass("box-layout");
                }
            })
        }
    }

    styleSwitcher();    
    


    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();

            sliderBgSetting();
			
            toggleMobileNavigation();

            smallNavFunctionality();

            sortingGallery();
			

        });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {

		if ($(".site-header").length) {
            stickIt($(".sticky-header"), "sticky-on"); 
        }
    });

    
    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {
        
        toggleClassForSmallNav();

        clearTimeout($.data(this, 'resizeTimer'));
        $.data(this, 'resizeTimer', setTimeout(function() {
            smallNavFunctionality();
        }, 200));

    });



})(window.jQuery);
