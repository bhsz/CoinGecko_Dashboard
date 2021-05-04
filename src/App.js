import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import FavouritesPage from "./components/FavouritesPage";
import HomePage from "./components/HomePage";
import useFavourites from "./hooks/useFavourites";

function App() {
	const {favourites, setFavourites} = useFavourites();

	return (
		<div className="App">
			<Router>
				<Link to="/">
					<button type="button">Home</button>
				</Link>
				<Link to="/favourites">
					<button type="button">Favourites</button>
				</Link>
				<Route exact path="/" render={() => <HomePage favourites={favourites} setFavourites={setFavourites} />} />
				<Route path="/favourites" render={() => <FavouritesPage favourites={favourites} setFavourites={setFavourites} />} />
			</Router>
		</div>
	);
}

export default App;
