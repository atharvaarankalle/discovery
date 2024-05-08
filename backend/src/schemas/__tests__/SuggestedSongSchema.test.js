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