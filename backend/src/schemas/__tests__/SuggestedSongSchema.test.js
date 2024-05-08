import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { SuggestedSong } from "../SuggestedSongSchema";

let mongod;

const suggestedSongs = [
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000001"),
        caption: "Wow such an awesome song",
        prompt: new mongoose.Types.ObjectId("000000000000000000000001"),
        spotifySongId: "songId1",
        user: new mongoose.Types.ObjectId("000000000000000000000001")
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000002"),
        caption: "This song is so cool",
        prompt: new mongoose.Types.ObjectId("000000000000000000000001"),
        spotifySongId: "songId2",
        user: new mongoose.Types.ObjectId("000000000000000000000002")
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000003"),
        caption: "This song is so sad",
        prompt: new mongoose.Types.ObjectId("000000000000000000000002"),
        spotifySongId: "songId3",
        user: new mongoose.Types.ObjectId("000000000000000000000003")
    }
];

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString);
});

beforeEach(async () => {
    const collection = await mongoose.connection.db.collection("suggestedsongs");
    await collection.deleteMany({});
    await collection.insertMany(suggestedSongs);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection("suggestedsongs");
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

it("gets all suggested songs", async () => {
    const suggestedSongsFromDb = await SuggestedSong.find();
    expect(suggestedSongsFromDb).toBeTruthy();
    expect(suggestedSongsFromDb.length).toBe(3);

    expect(suggestedSongsFromDb[0].caption).toBe("Wow such an awesome song");
    expect(suggestedSongsFromDb[0].prompt).toEqual(new mongoose.Types.ObjectId("000000000000000000000001"));
    expect(suggestedSongsFromDb[0].spotifySongId).toBe("songId1");
    expect(suggestedSongsFromDb[0].user).toEqual(new mongoose.Types.ObjectId("000000000000000000000001"));

    expect(suggestedSongsFromDb[1].caption).toBe("This song is so cool");
    expect(suggestedSongsFromDb[1].prompt).toEqual(new mongoose.Types.ObjectId("000000000000000000000001"));
    expect(suggestedSongsFromDb[1].spotifySongId).toBe("songId2");
    expect(suggestedSongsFromDb[1].user).toEqual(new mongoose.Types.ObjectId("000000000000000000000002"));

    expect(suggestedSongsFromDb[2].caption).toBe("This song is so sad");
    expect(suggestedSongsFromDb[2].prompt).toEqual(new mongoose.Types.ObjectId("000000000000000000000002"));
    expect(suggestedSongsFromDb[2].spotifySongId).toBe("songId3");
    expect(suggestedSongsFromDb[2].user).toEqual(new mongoose.Types.ObjectId("000000000000000000000003"));
});

it("gets a single suggested song", async () => {
    const suggestedSongFromDb = await SuggestedSong.findById("000000000000000000000002");

    expect(suggestedSongFromDb.caption).toBe("This song is so cool");
    expect(suggestedSongFromDb.prompt).toEqual(new mongoose.Types.ObjectId("000000000000000000000001"));
    expect(suggestedSongFromDb.spotifySongId).toBe("songId2");
    expect(suggestedSongFromDb.user).toEqual(new mongoose.Types.ObjectId("000000000000000000000002"));
});

it("creates a suggested song", async () => {
    const newSuggestedSong = new SuggestedSong({
        caption: "This song is so happy",
        prompt: new mongoose.Types.ObjectId("000000000000000000000001"),
        spotifySongId: "songId4",
        user: new mongoose.Types.ObjectId("000000000000000000000004")
    });

    await newSuggestedSong.save();

    const newSuggestedSongFromDb = await mongoose.connection.db.collection("suggestedsongs").findOne({ _id: newSuggestedSong._id });

    expect(newSuggestedSongFromDb.caption).toBe("This song is so happy");
    expect(newSuggestedSongFromDb.prompt).toEqual(new mongoose.Types.ObjectId("000000000000000000000001"));
    expect(newSuggestedSongFromDb.spotifySongId).toBe("songId4");
    expect(newSuggestedSongFromDb.user).toEqual(new mongoose.Types.ObjectId("000000000000000000000004"));
});

it("successfully inserts a suggested song with an empty caption field", async () => {
    const newSuggestedSong = new SuggestedSong({
        prompt: new mongoose.Types.ObjectId("000000000000000000000001"),
        spotifySongId: "songId4",
        user: new mongoose.Types.ObjectId("000000000000000000000004")
    });

    await newSuggestedSong.save();

    const newSuggestedSongFromDb = await mongoose.connection.db.collection("suggestedsongs").findOne({ _id: newSuggestedSong._id });

    expect(newSuggestedSongFromDb.caption).toBeUndefined();
    expect(newSuggestedSongFromDb.prompt).toEqual(new mongoose.Types.ObjectId("000000000000000000000001"));
    expect(newSuggestedSongFromDb.spotifySongId).toBe("songId4");
    expect(newSuggestedSongFromDb.user).toEqual(new mongoose.Types.ObjectId("000000000000000000000004"));
});

it("fails to insert a suggested song with missing prompt field", async () => {
    const newSuggestedSong = new SuggestedSong({
        caption: "This song is so happy",
        spotifySongId: "songId4",
        user: new mongoose.Types.ObjectId("000000000000000000000004")
    });

    await expect(newSuggestedSong.save()).rejects.toThrow();
});

it("fails to insert a suggested song with missing spotifySongId field", async () => {
    const newSuggestedSong = new SuggestedSong({
        caption: "This song is so happy",
        prompt: new mongoose.Types.ObjectId("000000000000000000000001"),
        user: new mongoose.Types.ObjectId("000000000000000000000004")
    });

    await expect(newSuggestedSong.save()).rejects.toThrow();
});

it("fails to insert a suggested song with missing user field", async () => {
    const newSuggestedSong = new SuggestedSong({
        caption: "This song is so sad",
        prompt: new mongoose.Types.ObjectId("000000000000000000000002"),
        spotifySongId: "songId4"
    });

    await expect(newSuggestedSong.save()).rejects.toThrow();
});
