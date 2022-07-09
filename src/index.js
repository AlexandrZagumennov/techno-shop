import './index.html';
import './cart.html';
import './card.html';
import './index.scss';


import Swiper, { Thumbs, Scrollbar, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import { startPagination } from './modules/pagination';
import { getGoods } from './modules/goodsService';
import { renderGoods } from './modules/renderGoods';

try {
	const paginationWrapper = document.querySelector('.pagination');
	const goodsList = document.querySelector('.goods__list');
	const pageURL = new URL(location);
	const page = +pageURL.searchParams.get('page') || 1;

	goodsList.innerHTML = `
		<div class = "goods__preload">
			<svg width="194" height="195" viewBox="0 0 194 195" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M193 98.0001C192.999 118.273 186.58 138.025 174.663 154.426C162.747 170.827 145.944 183.034 126.663 189.298C107.382 195.562 86.6127 195.561 67.3322 189.296C48.0516 183.031 31.2494 170.823 19.3335 154.422C7.41761 138.02 0.999853 118.268 1 97.9947C1.00015 77.7217 7.41819 57.9692 19.3343 41.5681C31.2504 25.1669 48.0529 12.9591 67.3335 6.69422C86.6141 0.429353 107.383 0.42907 126.664 6.69341" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</div>
	`;
	
	getGoods({page}).then(({goods, pages, page})=> {
		renderGoods(goodsList, goods);

		startPagination(paginationWrapper, pages, page);
	});

} catch (e) {
	console.warn(e);
	console.warn('Это не главная страница');
};


/* Слайдеры */

const thumbsSwiper = new Swiper('.card__slider-thumb', {
	spaceBetween: 44,
	slidesPerView: 3,
	scrollbar: {
		el: '.swiper-scrollbar',
		draggable: true,
	},
	modules: [Scrollbar]
});

new Swiper('.card__image', {
	spaceBetween: 10,
	slidesPerView: 1,
	thumbs: {
		swiper: thumbsSwiper,
		slideThumbActiveClass: 'card__thumb-btn_active',
	},
	modules: [Thumbs]
});

new Swiper('.recommended__carousel', {
	spaceBetween: 30,
	slidesPerView: 5,
		navigation: {
			nextEl: '.recommended__arrow_right',
			prevEl: '.recommended__arrow_left',
			disabledClass: 'recommended__arrow_disabled',
	},
	modules: [Navigation]
});

