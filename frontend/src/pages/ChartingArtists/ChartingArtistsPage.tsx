import React, {useEffect, useState} from "react";
import {Artist} from "../../../../shared/types/music";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

const ChartingArtistsPage: React.FC = () => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const {country} = useParams<{ country: string }>();

    /**
     * Fetch the top charting artists for the given country
     * and provide a link to their albums
     */
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const artists = await axios.get('http://localhost:3001/api/music/charting-artists', {params: {country}});
                console.log('artists', artists);
                setArtists(artists.data);
            } catch (error: any) {
                console.error(error);
                setArtists([] as Artist[]);
            }
        }

        fetchArtists();
    }, [country]);

    return (
        <div>
            <h1>Top Charting Artists in {country}</h1>
            <ul>
                {artists.map(artist => {
                    return <li key={artist?.artist?.artist_id}>
                        <Link to={`artist-albums/${artist?.artist?.artist_id}`}>
                            {artist?.artist?.artist_name}
                        </Link>
                    </li>
                })}
            </ul>
        </div>
    );
}

export default ChartingArtistsPage;