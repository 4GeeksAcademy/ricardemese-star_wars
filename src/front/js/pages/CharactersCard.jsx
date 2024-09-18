import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { Spinner } from '../component/Spinner.jsx';

const defaultImage = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';

export const CharactersCard = () => {
  const { id } = useParams();
  const { store, actions } = useContext(Context);
  const character = store.character;
  const loading = !character;

  useEffect(() => {
    actions.getCharacterById(id);
  }, [id, actions]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner />
      </div>
    );
  }

  if (!character) {
    return <div>Character not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 d-flex justify-content-center">
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt={character.name}
            className="img-fluid"
            style={{ borderRadius: '8px' }}
            onError={(e) => e.target.src = defaultImage}
          />
        </div>
        <div className="col-md-6 text-white">
          <h1 className="mb-4">{character.name}</h1>
          <p><strong>Height:</strong> {character.height || 'N/A'}</p>
          <p><strong>Mass:</strong> {character.mass || 'N/A'}</p>
          <p><strong>Hair color:</strong> {character.hair_color || 'N/A'}</p>
          <p><strong>Skin color:</strong> {character.skin_color || 'N/A'}</p>
          <p><strong>Eye color:</strong> {character.eye_color || 'N/A'}</p>
          <p><strong>Birth year:</strong> {character.birth_year || 'N/A'}</p>
          <p><strong>Gender:</strong> {character.gender || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};