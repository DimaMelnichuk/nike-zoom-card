let mySwiper = new Swiper('.testimonials__slider', {
	loop: true,
	slidesPerView: 3,
	// slidesPerGroup: 3,
	// autoHeight: true,
	grabCursor: true, // cursor hand
	spaceBetween: 30,
	// centeredSlides: true,
	// freeMode: true,
	speed: 1000,
	// effect: 'fade',


	// for tabs
	// observer: true,
	// observeParents: true,
	// observeSlideChildren: true,

/* 	thumbs: {
		swiper: {
			el: '.testimonials-mini__slider',
			slidesPerView: 3,
		}
	}, */

/* 	autoplay: {
		delay: 2000,
	}, */

	keyboard: {
		enabled: true,
		onlyInViewport: true,
		pageUpDown: true,
	},

	mousewheel: {

	},
	
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
/* 		renderFraction: function (currentClass, totalClass) {
			return 'Photo <span class="' + currentClass + '"></span>' +
					  ' of ' +
					  '<span class="' + totalClass + '"></span>';
	  } */
	 },

	navigation: {
	  nextEl: '.swiper-button-next',
	  prevEl: '.swiper-button-prev',
	},

/* 	breakpoints: {
		320: {
		  slidesPerView: 2,
		  spaceBetween: 20
		},
		480: {
		  slidesPerView: 3,
		  spaceBetween: 30
		},
		640: {
		  slidesPerView: 4,
		  spaceBetween: 40
		}
	 } */

 })