import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Album, Albums, AlbumTracks} from "../../../../shared/types/music";
import axios, {AxiosResponse} from "axios";
import AlbumComponent from "./AlbumComponent";

const ArtistAlbumsPage: React.FC = () => {
    //todo: only show this page if the user is logged in
    const [albums, setAlbums] = useState<Albums>(new Map());
    const [artist, setArtist] = useState<string>('');
    const [tracks, setTracks] = useState<AlbumTracks[]>([]);
    const {artistId} = useParams<{ artistId: string }>();

    /**
     * Fetch the albums for the artist
     */
    useEffect(() => {
        const fetchAlbums = async () => {
            try {
                //return the albums for the artist and map them by their ID
                const returnedAlbums: AxiosResponse<Album[]> = await axios.get('http://localhost:3001/api/music/artist-albums/', {params: {artist_id: artistId}});
                const albums = returnedAlbums.data.reverse().reduce((acc: Albums, album: Album) => {
                    acc.set(album?.album?.album_id, album?.album);
                    return acc;
                }, new Map());

                setAlbums(albums);
                setArtist(returnedAlbums.data[0]?.album?.artist_name || '');
            } catch (error: any) {
                console.error(error);
                setAlbums(new Map() as Albums);
            }
        }

        fetchAlbums();
    }, [artistId]);

    /**
     * Fetch the tracks for the albums when the albums change
     */
    useEffect(() => {
        const fetchTracks = async () => {
            try {
                //return the tracks for the albums
                const promises: Promise<AxiosResponse<AlbumTracks>>[] = [];
                albums.forEach(async album => {
                    promises.push(axios.get('http://localhost:3001/api/music/album-tracks', {
                            params: {album_id: album.album_id}
                        })
                    );
                });
                //await array of promises and map the results to the desired shape
                const albumTracks: AlbumTracks[] = [];
                await Promise.all(promises).then((values) => {
                    values.forEach(value => albumTracks.push({
                        album_id: value.data.album_id,
                        tracks: value.data.tracks
                    }));
                });
                setTracks(albumTracks as AlbumTracks[]);
            } catch (error: any) {
                console.error(error);
                setTracks([] as AlbumTracks[]);
            }
        }
        fetchTracks();
    }, [albums]);

    return (
        <div>
            <h1>{artist && `${artist}'s albums:`}</h1>
            <ul>
                {tracks.map(album => (
                    <AlbumComponent key={album.album_id} albumTracks={album} albums={albums}/>
                ))}
            </ul>
        </div>
    );
}

export default ArtistAlbumsPage;