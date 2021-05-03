import { useState } from "react";

const favKey = "coingecko-favourites";

const useFavourites = () => {
	let initialState = JSON.parse(localStorage.getItem(favKey));
	const [favourites, setState] = useState(initialState || []);

	const setFavourites = (newFavourites) => {
		localStorage.setItem(favKey, JSON.stringify(newFavourites));
		setState(newFavourites);
		console.log(newFavourites);
	}

	return {
		favourites,
		setFavourites
	}
};

export default useFavourites;