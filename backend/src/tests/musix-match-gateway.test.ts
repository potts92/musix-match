import {MusixMatchGateway} from "../classes/musix-match-gateway";

describe('Unit', () => {
    beforeAll(() => {
        process.env.MUSIXMATCH_API_KEY = '8e343bd24865f49e56ffb12348bb9ccf';
    });
    test('Singleton musix-match-gateway should return the same instance', () => {
        const firstInstance = MusixMatchGateway.getInstance();
        const secondInstance = MusixMatchGateway.getInstance();
        expect(firstInstance).toBe(secondInstance);
    });

    test('Singleton musix-match-gateway should return an instance of MusixMatchGateway', () => {
        const instance = MusixMatchGateway.getInstance();
        expect(instance).toBeInstanceOf(MusixMatchGateway);
    });
    test('getChartingArtists should return an array of three artists', async () => {
        const instance = MusixMatchGateway.getInstance();
        const artists = await instance.getChartingArtists('AU');
        expect(artists).toBeInstanceOf(Array);
        expect(artists.length).toBe(3);
    });
    test('getAlbumsByArtist should return an array of albums', async () => {
        const instance = MusixMatchGateway.getInstance();
        const albums = await instance.getAlbumsByArtist('259675');
        expect(albums).toBeInstanceOf(Array);
    });
    test('getTracksByAlbum should return an array of tracks', async () => {
        const instance = MusixMatchGateway.getInstance();
        const tracks = await instance.getTracksByAlbum('60157928');
        expect(tracks).toBeInstanceOf(Array);
    });
    test('getLyricsByTrack should return a string', async () => {
        const instance = MusixMatchGateway.getInstance();
        const lyrics = (await instance.getLyricsByTrack('267619808'))?.lyrics_body;
        expect(lyrics).toEqual(expect.any(String));
    });
    test('cached requests should return the same response as a non cache hit', async () => {
        const instance = MusixMatchGateway.getInstance();
        const firstRequest = await instance.getChartingArtists('AU');
        const secondRequest = await instance.getChartingArtists('AU');
        expect(firstRequest).toEqual(secondRequest);
    });
});