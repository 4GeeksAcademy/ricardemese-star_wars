import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { Spinner } from '../component/Spinner.jsx';

const defaultImage = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';

export const Planets = () => {
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getPlanets();
	}, [actions]);

	const handleAddFavorite = (item) => {
		const isAlreadyFavorite = store.favorites.some(fav => fav.uid === item.uid && fav.type === 'Planet');

		if (!isAlreadyFavorite) {
			actions.addFavorites({ ...item, type: 'Planet' });
		}
	};

	const isFavorite = (item) => {
		return store.favorites.some(fav => fav.uid === item.uid && fav.type === 'Planet');
	};

	if (store.planets.length === 0) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
				<Spinner />
			</div>
		);
	}

	return (
		<div className="container-fluid mt-5">
			<h1 className="text-center mb-4">Planets</h1>
			<div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 text-dark">
				{store.planets.map((planet) => (
					<div key={planet.uid} className="col d-flex justify-content-center">
						<div className="card" style={{ width: '18rem' }}>
							<img
								src={`https://starwars-visualguide.com/assets/img/planets/${planet.uid}.jpg`}
								className="card-img-top"
								alt={planet.name}
								onError={(e) => (e.target.src = defaultImage)}
								style={{ height: '100%', objectFit: 'cover' }}
							/>
							<div className="card-body d-flex flex-column">
								<h5 className="card-title">{planet.name} {isFavorite(planet) && '(Favorite)'}</h5>
								<div className="mt-auto d-flex justify-content-between align-items-center">
									<Link to={`/planets/${planet.uid}`} className="btn btn-primary">
										Details
									</Link>
									<button
										className="btn btn-outline-danger ms-2"
										onClick={() => handleAddFavorite(planet)}
										disabled={isFavorite(planet)}
									>
										<i className="fas fa-heart"></i>
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};