import express from "express";
import {MusixMatchGateway} from "../classes/musix-match-gateway";

const router = express.Router();
const musixMatch = MusixMatchGateway.getInstance();

/**
 * Get the top artists for a country
 */
router.get('/charting-artists', async (req, res) => {
    try {
        const country = req.query.country as string;
        const artists = await musixMatch.getChartingArtists(country);

        //todo: stretch goal: paginate results to get more artists
        res.status(200).send(artists);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(`Couldn't retrieve artists for country: ${req.query.country}`);
    }
});

/**
 * Get the albums for an artist by their ID
 */
router.get('/artist-albums', async (req, res) => {
    try {
        const artistId = req.query.artist_id as string;
        const albums = await musixMatch.getAlbumsByArtist(artistId);

        res.status(200).send(albums);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(`Couldn't retrieve albums for artist with ID: ${req.query.artist_id}`);
    }
});

/**
 * Get the tracks for an album by its ID
 */
router.get('/album-tracks', async (req, res) => {
    try {
        const albumId = req.query.album_id as string;
        const tracks = await musixMatch.getTracksByAlbum(albumId);

        res.status(200).send({album_id: parseInt(albumId), tracks});
    } catch (error: any) {
        console.error(error);
        res.status(500).send(`Couldn't retrieve tracks for album with ID: ${req.query.album_id}`);
    }
});

/**
 * Get the lyrics for a track by its ID
 */
router.get('/track-lyrics', async (req, res) => {
    try {
        const trackId = req.query.track_id as string;
        const lyrics = await musixMatch.getLyricsByTrack(trackId);

        res.status(200).send(lyrics);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(`Couldn't retrieve lyrics for track with ID: ${req.query.track_id}`);
    }
});

/**
 * Get the track by its ID
 */
router.get('/track', async (req, res) => {
    try {
        const trackId = req.query.track_id as string;
        const track = await musixMatch.getTrack(trackId);

        res.status(200).send(track);
    } catch (error: any) {
        console.error(error);
        res.status(500).send(`Couldn't retrieve track with ID: ${req.query.track_id}`);
    }
});

export default router;