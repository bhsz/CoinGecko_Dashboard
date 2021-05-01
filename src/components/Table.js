import { CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { atLeast2dp, removeFromArray } from "./Helper";

// Reuse for homepage and favourites
export default function Table({ loading, data, setData, favourites, setFavourites, currency }) {
	// Toggle for sort order
	const [sort, setSort] = useState(1);

	const sortByProperty = (prop) => {
		return function (a, b) {
			if (a[prop] > b[prop]) return -sort;
			if (a[prop] < b[prop]) return sort;
			return 0;
		};
	};

	const handleSort = (prop) => {
		// need to clone data first to trigger re-render (sort is done in place)
		setData([...data].sort(sortByProperty(prop)));
		// Toggle ordering
		setSort((sort) => -sort);
	};

	// Build favButton depending on favourites status
	const favButton = (id) => {
		const index = favourites.findIndex((item) => item === id);
		let updateFunc;
		let text;
		if (index === -1) {
			updateFunc = () => setFavourites([...favourites, id]);
			text = "Add";
		} else {
			updateFunc = () => setFavourites(removeFromArray([...favourites], id));
			text = "Remove";
		}
		return (
			<button type="button" onClick={updateFunc}>
				{text}
			</button>
		);
	};

	return loading ? (
		<div>
			<CircularProgress className="spinner" />
		</div>
	) : (data.length === 0 ? <div className="favourites">No favourites!</div> : ( // Only possible for favourites page
		<table>
			<thead>
				<tr className="table-header">
					<th onClick={() => handleSort("market_cap_rank")}>#</th>
					<th onClick={() => handleSort("name")}>Name</th>
					<th onClick={() => handleSort("symbol")}>Symbol</th>
					<th onClick={() => handleSort("current_price")}>Price ({currency.toUpperCase()})</th>
					<th onClick={() => handleSort("total_volume")}>Volume ({currency.toUpperCase()})</th>
					<th>Sparkline (USD)</th>
					<th>Favourite</th>
				</tr>
			</thead>
			<tbody>
				{data.map((x) => (
					<tr key={x.id} className="table-row">
						<td>{x.market_cap_rank}</td>
						<td>{x.name}</td>
						<td>{x.symbol}</td>
						<td>{atLeast2dp(x.current_price)}</td>
						<td>{x.total_volume.toLocaleString("en-US")}</td>
						<td className="sparkline">
							<Sparklines data={x.sparkline_in_7d.price}>
								<SparklinesLine
									color={x.price_change_percentage_7d_in_currency > 0 ? "#7ab52b" : "red"}
								/>
							</Sparklines>
						</td>
						<td>{favButton(x.id)}</td>
					</tr>
				))}
			</tbody>
		</table>
	));
}
