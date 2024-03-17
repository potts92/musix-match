import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {
    Album, AlbumTracksResponse,
    Artist, ArtistAlbumsResponse,
    ChartArtistsResponse,
    Lyrics,
    MusixMatchGetResponse,
    Track,
    TrackLyricsResponse
} from "../../../shared/types/music";

/**
 * Interface for MusixMatch API responses
 * Utilises singleton pattern to ensure only one instance of the MusixMatchGateway is created
 */
export class MusixMatchGateway {
    private readonly apiKey: string;
    private static instance: MusixMatchGateway;
    private axiosInstance: AxiosInstance;

    /**
     * Private constructor to enforce singleton pattern
     * @private
     */
    private constructor() {
        this.apiKey = process.env.MUSIXMATCH_API_KEY as string;
        const baseURL = 'https://api.musixmatch.com/ws/1.1'
        this.axiosInstance = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });

    }

    /**
     * Get the singleton instance of the MusixMatchGateway
     */
    public static getInstance(): MusixMatchGateway {
        if (!MusixMatchGateway.instance) {
            MusixMatchGateway.instance = new MusixMatchGateway();
        }
        return MusixMatchGateway.instance;
    }

    /**
     * Make a GET request to the MusixMatch API
     * @param url
     * @param config
     */
    private async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
            ...config,
            params: {
                apikey: this.apiKey,
                ...config?.params
            }
        });

        //todo: for caching, encode config to use as a key (we know config will always be in the same order as
        // this method is private, and can only be called by public methods that control the order of the config object)

        return response.data;
    }

    /**
     * Get the top charting artists for a country
     * @param country
     */
    public async getChartingArtists(country: string): Promise<Artist[]> {
        const artists = await this.get<MusixMatchGetResponse<ChartArtistsResponse>>('chart.artists.get', {
            params: {
                page: 1,
                page_size: 3,
                country
            }
        });
        return artists?.message?.body?.artist_list;
    }

    /**
     * Get the albums for an artist
     * @param artistId
     */
    public async getAlbumsByArtist(artistId: string): Promise<Album[]> {
        const albums = await this.get<MusixMatchGetResponse<ArtistAlbumsResponse>>('artist.albums.get', {
            params: {
                artist_id: artistId,
                s_release_date: 'desc',
                page_size: 3,
                page: 1
            }
        });

        return albums?.message?.body?.album_list;
    }

    /**
     * Get the tracks for an album
     * @param albumId
     */
    public async getTracksByAlbum(albumId: string): Promise<Track[]> {
        const tracks = await this.get<MusixMatchGetResponse<AlbumTracksResponse>>('album.tracks.get', {
            params: {
                album_id: albumId,
            }
        });

        return tracks?.message?.body?.track_list;
    }

    /**
     * Get the lyrics for a track
     * @param trackId
     */
    public async getLyricsByTrack(trackId: string): Promise<Lyrics> {
        const lyrics = await this.get<MusixMatchGetResponse<TrackLyricsResponse>>('track.lyrics.get', {
            params: {
                track_id: trackId
            }
        });
        return lyrics?.message?.body?.lyrics;
    }
}