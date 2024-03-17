import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import './App.css';
import HomePage from "./pages/Home/HomePage";
import ChartingArtistsPage from "./pages/ChartingArtists/ChartingArtistsPage";
import ArtistAlbumsPage from "./pages/ArtistAlbums/ArtistAlbumsPage";
import TrackLyricsPage from "./pages/TrackLyrics/TrackLyricsPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" Component={HomePage}/>
                <Route path="/artists/:country" Component={ChartingArtistsPage}/>
                <Route path="/album/:id" Component={ArtistAlbumsPage}/>
                <Route path="/track/:id" Component={TrackLyricsPage}/>
            </Routes>
        </Router>
    );
}

export default App;
