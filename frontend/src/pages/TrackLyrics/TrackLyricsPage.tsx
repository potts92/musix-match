import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios, {AxiosResponse} from "axios";
import {Lyrics, Track} from "@musixmatch/shared/types/music";

const TrackLyricsPage: React.FC = () => {
    //todo: only show this page if the user is logged in
    const [lyrics, setLyrics] = useState<string>('');
    const [trackName, setTrackName] = useState<string>('');
    const {trackId} = useParams<{ trackId: string }>();

    /**
     * Fetch the lyrics for the track
     */
    useEffect(() => {
        /**
         * Fetch the lyrics for the track
         */
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

        /**
         * Fetch the track name for the track
         */
        const fetchTrackName = async () => {
            try {
                const track: AxiosResponse<Track> = await axios.get('http://localhost:3001/api/music/track', {
                    params: {track_id: trackId}
                });
                setTrackName(track.data?.track?.track_name);
            } catch (error: any) {
                console.error(error);
                setTrackName('');
            }
        }

        fetchTrackName();
        fetchLyrics();
    }, [trackId]);

    return (
        <div>
            <h1>Lyrics for {trackName}</h1>
            <p>{lyrics || 'No lyrics found for track'}</p>
        </div>
    );
}

export default TrackLyricsPage;