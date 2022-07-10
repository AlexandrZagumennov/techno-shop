import { API_URI } from "./var.js";

// Получение всех товаров
export const getGoods = ({page}) => {
	const url = new URL(`${API_URI}api/goods`);

	if (page) url.searchParams.append('page', page)

	return fetch(url).then(response => response.json());
};

// Получение одного товара
export const getGoodsItem = (id) => 
	fetch(`${API_URI}api/goods/${id}`)
		.then(response => response.json())
