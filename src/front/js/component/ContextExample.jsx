// 1. Importar el hook useContext
import React, { useContext } from "react";
// 2. Importar context desde el archivo appContext.js
import { Context } from "../store/appContext.js";

export const ContextExample = () => {
    // 3. Utilizo: Destructurando Store y el Actions de Context mediante el useContext
    const { store, actions } = useContext(Context);

    const handleLogin = () => {
        actions.setIsLoged(!store.isLoged);
    }

    return (
        <div className="container text-center border mt-3">
            {/* 4. Utilizo la sintaxis store.clave para mostrar el valor */}
            <p>{store.user}</p>
            <p>{store.cohorte}</p>
            <button className="btn btn-warning" onClick={handleLogin}>
                {store.isLoged ? 'Logout ' : 'Login '}
                Login
            </button>
        </div>
    )
}