import React from "react";
import TrackComponent from "./TrackComponent";
import {AlbumProps} from "../../types/components";

/**
 * Component to render the tracks of an album
 * @param albumTracks
 * @param albums
 * @constructor
 */
const AlbumComponent: React.FC<AlbumProps> = ({albumTracks, albums}) => {
    const albumDetails = albums.get(albumTracks.album_id);

    /**
     * Loop through the tracks of the album and render them (or a message if there are no tracks)
     */
    const renderTracks = () => {
        if (albumTracks.tracks.length === 0) return (<li>No tracks found</li>);

        return albumTracks.tracks.map(track => (
            <TrackComponent key={track.track.track_id} track={track.track}/>
        ));
    }

    return (
        <li>
            Album: {albumDetails?.album_name || ''}
            <ul>
                {renderTracks()}
            </ul>
        </li>
    );
}

export default AlbumComponent;
