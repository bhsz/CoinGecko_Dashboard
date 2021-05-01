import React, { useEffect, useState } from "react";
import { supportedCurrencies } from "./Helper";
import Table from "./Table";

export default function FavouritesPage({ favourites, setFavourites }) {
	// Toggle spinner
	const [loading, setLoading] = useState(false);
	// Pass data to table
	const [data, setData] = useState([]);
	const [currency, setCurrency] = useState("usd");


	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			let favouritesData = [];
			for (var i in favourites) {
				const response = await fetch(
					`https://api.coingecko.com/api/v3/coins/${favourites[i]}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
				);
				const newData = await response.json();
				// prep data cuz format is different from HomePage endpoint
				favouritesData.push({
					id: newData.id,
					name: newData.name,
					symbol: newData.symbol,
					market_cap_rank: newData.market_cap_rank,
					current_price: newData.market_data.current_price[currency],
					total_volume: newData.market_data.total_volume[currency],
					sparkline_in_7d: newData.market_data.sparkline_7d,
					price_change_percentage_7d_in_currency:
						newData.market_data.price_change_percentage_7d,
				});
			}
			setData(favouritesData);
			setLoading(false);
		};

		fetchData();
	}, [favourites, currency]);

	return (
		<div className="main">
			<select name="currency" onChange={(e) => setCurrency(e.target.value)}>
				<option value="usd">USD</option>
				{supportedCurrencies.map((c) => (c !== "usd" ?
					<option value={c}>{c.toUpperCase()}</option> : null
				))}
			</select>
			<Table loading={loading} data={data} setData={setData} favourites={favourites} setFavourites={setFavourites} currency={currency} />
		</div>
	);
}
