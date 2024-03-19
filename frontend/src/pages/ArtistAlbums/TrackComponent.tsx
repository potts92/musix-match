import React from "react";
import {TrackProps} from "../../types/components";

/**
 * Component to render a track
 * @param track
 * @constructor
 */
const TrackComponent: React.FC<TrackProps> = ({track}) => {
    return (
        <li>
            <a href={`/track/${track.track_id}`}>
                {track.track_name}
            </a>
        </li>
    );
}

export default TrackComponent;