import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import HomePage from "./pages/Home/HomePage";
import ArtistPage from "./pages/Artist/ArtistPage";
import AlbumPage from "./pages/Album/AlbumPage";
import TrackPage from "./pages/Track/TrackPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={HomePage}/>
                <Route path="/artist/:id" Component={ArtistPage}/>
                <Route path="/album/:id" Component={AlbumPage}/>
                <Route path="/track/:id" Component={TrackPage}/>
            </Routes>
        </Router>
    );
}

export default App;
