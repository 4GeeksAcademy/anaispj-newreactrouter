import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";
import { Planets } from "./component/Planets.jsx";
import { Characters } from "./component/Characters.jsx";
import { Starships } from "./component/Starships.jsx";
import { CharacterDet } from "./component/CharacterDet.jsx";
import { PlanetDet } from "./component/PlanetDet.jsx";
import { StarshipDet } from "./component/StarshipDet.jsx";

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if(!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1>Not found!</h1>} />
                        <Route element={<Planets />} path="/planets" />
                        <Route element={<Characters />} path="/characters" />
                        <Route element={<Starships />} path="/starships" />
                        <Route element={<StarshipDet />} path="/starship-details/:starshipid" />
                        <Route element={<CharacterDet />} path="/character-details/:characterid" />
                        <Route element={<PlanetDet />} path="/planet-details/:planetid" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
