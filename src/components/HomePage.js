import { useEffect, useState } from "react";
import { supportedCurrencies } from "./Helper";
import Table from "./Table";

export default function HomePage({ favourites, setFavourites }) {
	// Toggle loading
	const [loading, setLoading] = useState(false);
	// Pagination of coins
	const [page, setPage] = useState(1);
	// To pass down to table
	const [data, setData] = useState([]);
	const [currency, setCurrency] = useState("usd");

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const response = await fetch(
				`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&per_page=20&page=${page}&sparkline=true&price_change_percentage=7d`
			);
			const newData = await response.json();
			setData(newData);
			setLoading(false);
		};

		fetchData();
	}, [page, currency]);

	const handleDecrement = (e) => {
		if (page > 1) {
			setPage((p) => p - 1);
		}
	};

	return (
		<div className="main">
			<button type="button" onClick={handleDecrement}>
				Prev
			</button>
			<button type="button" onClick={() => setPage((p) => p + 1)}>
				Next
			</button>
			<select name="currency" onChange={(e) => setCurrency(e.target.value)}>
				<option value="usd">USD</option>
				{supportedCurrencies.map((c) => (c !== "usd" ?
					<option value={c}>{c.toUpperCase()}</option> : null
				))}
			</select>
			<Table loading={loading} data={data} setData={setData} favourites={favourites} setFavourites={setFavourites} currency={currency}/>
		</div>
	);
}
