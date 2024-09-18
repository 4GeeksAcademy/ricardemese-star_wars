import React, { useContext } from "react";
import { Context } from "../store/appContext.js";

export const BtnFavoritos = () => {
    const { store, actions } = useContext(Context);

    const handleRemoveFavorite = (item) => {
        actions.removeFavorites(item);
    };

    return (
        <div className="dropdown" style={{ position: 'relative' }}>
            <button className="btn btn-warning dropdown-toggle me-5" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ position: 'relative' }}>
                Favorites
                <span className="badge rounded-pill bg-danger" style={{
                    position: 'absolute',
                    top: '0',
                    right: '0',
                    transform: 'translate(50%, -50%)'
                }}>
                    {store.favorites.length}
                    <span className="visually-hidden">unread messages</span>
                </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
                {store.favorites.length === 0 ? (
                    <li className="dropdown-item">No favorites added <i className="fas fa-mask"></i></li>
                ) : (
                    store.favorites.map((item, index) => (
                        <li key={index} className="dropdown-item d-flex justify-content-between align-items-center">
                            <span>{item.name} - {item.type}</span>
                            <button
                                className="btn btn-outline-danger btn-sm"
                                onClick={() => handleRemoveFavorite(item)}
                                style={{ border: 'none', background: 'transparent' }}
                            >
                                <i className="fas fa-trash"></i>
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};