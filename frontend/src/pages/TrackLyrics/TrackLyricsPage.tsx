import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {Lyrics, TrackLyricsResponse} from "../../../../shared/types/music";

const TrackLyricsPage: React.FC = () => {
    //todo: only show this page if the user is logged in
    const [lyrics, setLyrics] = useState<string>('');
    const {trackId} = useParams<{ trackId: string }>();

    /**
     * Fetch the lyrics for the track
     */
    useEffect(() => {
        const fetchLyrics = async () => {
            try {
                const lyrics: AxiosResponse<Lyrics> = await axios.get('http://localhost:3001/api/music/track-lyrics', {
                    params: {track_id: trackId}
                });
                setLyrics(lyrics.data?.lyrics_body);
            } catch (error: any) {
                console.error(error);
                setLyrics('');
            }
        }

        fetchLyrics();
    }, [trackId]);

    return (
        <div>
            <h1>Lyrics for track</h1>
            <p>{lyrics}</p>
        </div>
    );
}

export default TrackLyricsPage;