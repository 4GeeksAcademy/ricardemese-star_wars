import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { Spinner } from '../component/Spinner.jsx';

const defaultImage = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';

export const PlanetsCard = () => {
	const { id } = useParams();
	const { store, actions } = useContext(Context);

	useEffect(() => {
		actions.getPlanetById(id);
	}, [id, actions]);

	if (!store.planet) {
		return (
			<div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
				<Spinner />
			</div>
		);
	}

	const planet = store.planet;

	return (
		<div className="container mt-5">
			<div className="row align-items-center">
				<div className="col-md-6 d-flex justify-content-center">
					<img
						src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
						alt={planet.name}
						className="img-fluid"
						style={{ borderRadius: '8px' }}
						onError={(e) => e.target.src = defaultImage}
					/>
				</div>

				<div className="col-md-6 text-white">
					<h1 className="mb-4">{planet.name}</h1>
					<p><strong>Population:</strong> {planet.population || 'N/A'}</p>
					<p><strong>Terrain:</strong> {planet.terrain || 'N/A'}</p>
					<p><strong>Climate:</strong> {planet.climate || 'N/A'}</p>
					<p><strong>Diameter:</strong> {planet.diameter || 'N/A'}</p>
					<p><strong>Rotation Period:</strong> {planet.rotation_period || 'N/A'}</p>
					<p><strong>Orbital Period:</strong> {planet.orbital_period || 'N/A'}</p>
					<p><strong>Gravity:</strong> {planet.gravity || 'N/A'}</p>
					<p><strong>Surface Water:</strong> {planet.surface_water || 'N/A'}</p>
				</div>
			</div>
		</div>
	);
};