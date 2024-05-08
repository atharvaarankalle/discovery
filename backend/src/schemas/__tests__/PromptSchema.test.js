import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Prompt from "../PromptSchema";

let mongod;

const prompts = [
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000001"),
        prompt: "Happy Daytime Song",
        date: new Date("2024-05-02T00:00:00.000+00:00")
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000002"),
        prompt: "Sad Nighttime Song",
        date: new Date("2024-05-02T00:00:00.000+00:00")
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000003"),
        prompt: "Daydreaming scenario song",
        date: new Date("2024-05-02T00:00:00.000+00:00")
    }
];

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();

    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString);
});

beforeEach(async () => {
    await mongoose.connection.db.dropDatabase();

    const collection = await mongoose.connection.db.createCollection("prompts");
    await collection.insertMany(prompts);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection("prompts");
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});
