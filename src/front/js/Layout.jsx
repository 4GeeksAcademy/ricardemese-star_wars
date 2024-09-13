import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom page / views
import { Home } from "./pages/Home.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Single } from "./pages/Single.jsx";
import { Characters } from "./pages/Characters.jsx";
import { CharactersCard } from "./pages/CharactersCard.jsx";
import { Planets } from "./pages/Planets.jsx";
import { PlanetsCard } from "./pages/PlanetsCard.jsx";
import { Starships } from "./pages/Starships.jsx";
import { StarshipsCard } from "./pages/StarshipsCard.jsx";
import { ContactsList } from "./pages/ContactsList.jsx";
import { ContactsForm } from "./pages/ContactsForm.jsx";



//create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div className="d-flex flex-column min-vh-100">
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<CharactersCard />} path="/characters/:id" />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<PlanetsCard />} path="/planets/:id" />
                        <Route element={<Starships />} path="/starships" />
                        <Route element={<StarshipsCard />} path="/starships/:id" />
                        <Route element={<ContactsList />} path="/contacts" />
                        <Route element={<ContactsForm />} path="/addcontacts" />
                        <Route element={<h1>Not found!</h1>} path='*' />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
