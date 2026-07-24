(function ($) {

	"use strict";

	$(document).ready(function () {
		$("#preloader").fadeOut(600);
		initParallax();

		// Menu Category Filter Handler
		$('.menu-filter-btn').on('click', function () {
			$('.menu-filter-btn').removeClass('active');
			$(this).addClass('active');

			var filterValue = $(this).attr('data-filter');

			if (filterValue === 'all') {
				$('.menu-grid-item').stop(true, true).fadeIn(350);
			} else {
				$('.menu-grid-item').stop(true, true).hide();
				$('.menu-grid-item[data-category="' + filterValue + '"]').stop(true, true).fadeIn(350);
			}
		});
	});

	setTimeout(function () {
		$("#preloader").fadeOut(600);
	}, 3000); // 3 sec max wait

	// Lightweight 60fps Scroll Parallax Handler
	function initParallax() {
		var parallaxElements = document.querySelectorAll('[data-parallax-speed]');
		if (!parallaxElements.length) return;

		var ticking = false;

		function updateParallax() {
			var scrollY = window.pageYOffset || document.documentElement.scrollTop;

			parallaxElements.forEach(function (el) {
				var speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0.1;
				var rect = el.getBoundingClientRect();
				var elementTop = rect.top + scrollY;

				// Only calculate if element is near or within viewport window
				if (rect.top < window.innerHeight + 200 && rect.bottom > -200) {
					var translateY = (scrollY - elementTop) * speed;
					el.style.transform = 'translate3d(0, ' + translateY.toFixed(1) + 'px, 0)';
				}
			});

			ticking = false;
		}

		window.addEventListener('scroll', function () {
			if (!ticking) {
				window.requestAnimationFrame(updateParallax);
				ticking = true;
			}
		}, { passive: true });

		updateParallax();
	}

	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		var box = $('.header-text').height();
		var header = $('header').height();

		if (scroll >= box - header) {
			$("header").addClass("background-header");
		} else {
			$("header").removeClass("background-header");
		}
	});

	$('.input-group.date').datepicker({ format: "dd.mm.yyyy" });


	$('.filters ul li').click(function () {
		$('.filters ul li').removeClass('active');
		$(this).addClass('active');

		var data = $(this).attr('data-filter');
		$grid.isotope({
			filter: data
		})
	});

	var $grid = $(".grid").isotope({
		itemSelector: ".all",
		percentPosition: true,
		masonry: {
			columnWidth: ".all"
		}
	})

	$(".Modern-Slider").slick({
		autoplay: true,
		autoplaySpeed: 10000,
		speed: 600,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false,
		dots: true,
		pauseOnDotsHover: true,
		cssEase: 'linear',
		// fade:true,
		draggable: false,
		prevArrow: '<button class="PrevArrow"></button>',
		nextArrow: '<button class="NextArrow"></button>',
	});

	$('.search-icon a').on("click", function (event) {
		event.preventDefault();
		$("#search").addClass("open");
		$('#search > form > input[type="search"]').focus();
	});

	$("#search, #search button.close").on("click keyup", function (event) {
		if (
			event.target == this ||
			event.target.className == "close" ||
			event.keyCode == 27
		) {
			$(this).removeClass("open");
		}
	});

	$("#search-box").submit(function (event) {
		event.preventDefault();
		return false;
	});


	$(function () {
		$("#tabs").tabs();
	});


	$('.owl-menu-item').owlCarousel({
		items: 5,
		loop: true,
		dots: true,
		nav: true,
		autoplay: true,
		margin: 30,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 2
			},
			1000: {
				items: 5
			}
		}
	});

	if ($('.owl-about-carousel').length) {
		$('.owl-about-carousel').owlCarousel({
			items: 3,
			loop: true,
			dots: true,
			nav: true,
			autoplay: true,
			autoplayTimeout: 3500,
			autoplayHoverPause: true,
			margin: 24,
			responsive: {
				0: {
					items: 1
				},
				768: {
					items: 2
				},
				992: {
					items: 3
				}
			}
		});
	}

	// Window Resize Mobile Menu Fix
	mobileNav();


	// Scroll animation init
	window.sr = new scrollReveal();


	// Menu Dropdown Toggle
	if ($('.menu-trigger').length) {
		$(".menu-trigger").on('click', function () {
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				var width = $(window).width();
				if (width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);
				}
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
		$(document).on("scroll", onScroll);

		//smoothscroll
		$('.scroll-to-section a[href^="#"]').on('click', function (e) {
			e.preventDefault();
			$(document).off("scroll");

			$('.scroll-to-section a').each(function () {
				$(this).removeClass('active');
			})
			$(this).addClass('active');

			var target = this.hash,
				menu = target;
			var target = $(this.hash);
			$('html, body').stop().animate({
				scrollTop: (target.offset().top) - 79
			}, 500, 'swing', function () {
				window.location.hash = target;
				$(document).on("scroll", onScroll);
			});

		});
	});

	function onScroll(event) {
		var scrollPos = $(document).scrollTop();
		$('.nav a').each(function () {
			var currLink = $(this);
			var refElement = $(currLink.attr("href"));
			if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
				$('.nav ul li a').removeClass("active");
				currLink.addClass("active");
			}
			else {
				currLink.removeClass("active");
			}
		});
	}

	// Page loading animation
	// $(window).on('load', function () {
	// 	if ($('.cover').length) {
	// 		$('.cover').parallax({
	// 			imageSrc: $('.cover').data('image'),
	// 			zIndex: '1'
	// 		});
	// 	}

	// 	$("#preloader").animate({
	// 		'opacity': '0'
	// 	}, 600, function () {
	// 		setTimeout(function () {
	// 			$("#preloader").css("visibility", "hidden").fadeOut();
	// 		}, 300);
	// 	});
	// });


	// Window Resize Mobile Menu Fix
	$(window).on('resize', function () {
		mobileNav();
	});


	// Window Resize Mobile Menu Fix
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function () {
			if (width < 767) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}


})(window.jQuery);