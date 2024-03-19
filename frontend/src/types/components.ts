import {Albums, AlbumTracks, Track} from "../../../shared/types/music";

export interface AlbumProps {
    albumTracks: AlbumTracks;
    albums: Albums;
}

export interface TrackProps {
    track: Track['track'];
}