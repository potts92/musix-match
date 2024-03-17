import React, {useEffect, useState} from "react";
import {Artist} from "../../../../shared/types/music";
import axios from "axios";

const ChartingArtistsPage: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artists = await axios.get('http://localhost:3001/api/music/charting-artists');
            } catch (error: any) {
                console.error(error);
                setArtists([] as Artist[]);
            }
        }

        fetchArtists();
    }, []);

    return (
        <div>
            <h1>Top Charting Artists</h1>
            <ul>
                {artists.map(artist => <li key={artist.artist_id}>{artist.artist_name}</li>)}
            </ul>
        </div>
    );
}

export default ChartingArtistsPage;