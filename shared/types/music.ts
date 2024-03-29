export interface Artist {
    artist: {
        artist_id: string;
        artist_name: string;
    }
}

export interface Album {
    album: {
        album_id: string;
        album_name: string;
        artist_id: string;
        artist_name: string;
        album_rating: string;
    }
}

export interface Track {
    track: {
        track_id: string;
        track_name: string;
        album_id: string;
        album_name: string;
        artist_id: string;
        artist_name: string;
        track_rating: string;
        has_lyrics: boolean;
    }
}

export interface Lyrics {
    lyrics_id: string;
    lyrics_body: string;
    script_tracking_url: string;
    pixel_tracking_url: string;
    html_tracking_url: string;
}

export interface MusixMatchGetResponse<T> {
    message: {
        body: T;
        header: any;
    }
}

export interface TrackLyricsResponse {
    lyrics: Lyrics;
}

export interface ChartArtistsResponse {
    artist_list: Artist[];
}

export interface ArtistAlbumsResponse {
    album_list: Album[];
}

export interface AlbumTracksResponse {
    track_list: Track[];
}

export interface AlbumTracks {
    album_id: string;
    tracks: Track[];
}

export type Albums = Map<string, Album["album"]>;
export interface AlbumsWithTracks {
    [album_id: string]: Track[];
}