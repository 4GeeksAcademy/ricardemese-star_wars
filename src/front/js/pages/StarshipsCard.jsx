import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { Spinner } from '../component/Spinner.jsx';

const defaultImage = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';

export const StarshipsCard = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getStarshipById(id);
    }, [id, actions]);

    const starship = store.starship;

    if (!starship) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner />
            </div>
        );
    }

    return (
        <div className="container mt-5">
            <div className="row align-items-center">
                <div className="col-md-6 d-flex justify-content-center">
                    <img
                        src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
                        alt={starship.name}
                        className="img-fluid"
                        style={{ borderRadius: '8px' }}
                        onError={(e) => e.target.src = defaultImage}
                    />
                </div>

                <div className="col-md-6 text-white">
                    <h1 className="mb-4">{starship.name}</h1>
                    <p><strong>Model:</strong> {starship.model || 'N/A'}</p>
                    <p><strong>Class:</strong> {starship.starship_class || 'N/A'}</p>
                    <p><strong>Manufacturer:</strong> {starship.manufacturer || 'N/A'}</p>
                    <p><strong>Cost:</strong> {starship.cost_in_credits || 'N/A'}</p>
                    <p><strong>Length:</strong> {starship.length || 'N/A'}</p>
                    <p><strong>Crew:</strong> {starship.crew || 'N/A'}</p>
                    <p><strong>Passengers:</strong> {starship.passengers || 'N/A'}</p>
                    <p><strong>Max atmosphering speed:</strong> {starship.max_atmosphering_speed || 'N/A'}</p>
                    <p><strong>Hyperdrive rating:</strong> {starship.hyperdrive_rating || 'N/A'}</p>
                    <p><strong>MGLT:</strong> {starship.MGLT || 'N/A'}</p>
                    <p><strong>Cargo capacity:</strong> {starship.cargo_capacity || 'N/A'}</p>
                    <p><strong>Consumables:</strong> {starship.consumables || 'N/A'}</p>
                    <p><strong>Pilots:</strong> {starship.pilots ? starship.pilots.join(', ') : 'N/A'}</p>
                </div>
            </div>
        </div>
    );
};