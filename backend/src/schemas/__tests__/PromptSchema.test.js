import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Prompt } from "../PromptSchema";

let mongod;

const prompts = [
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000001"),
        prompt: "Happy Daytime Song",
        date: new Date("2024-05-03T00:00:00.000+00:00")
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000002"),
        prompt: "Sad Nighttime Song",
        date: new Date("2024-05-02T00:00:00.000+00:00")
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000003"),
        prompt: "Daydreaming scenario song",
        date: new Date("2024-05-01T00:00:00.000+00:00")
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

it("gets all prompts", async () => {
    const promptsFromDb = await Prompt.find();
    expect(promptsFromDb).toBeTruthy();
    expect(promptsFromDb.length).toBe(3);

    expect(promptsFromDb[0].prompt).toBe("Happy Daytime Song");
    expect(promptsFromDb[0].date).toEqual(new Date("2024-05-03T00:00:00.000+00:00"));

    expect(promptsFromDb[1].prompt).toBe("Sad Nighttime Song");
    expect(promptsFromDb[1].date).toEqual(new Date("2024-05-02T00:00:00.000+00:00"));

    expect(promptsFromDb[2].prompt).toBe("Daydreaming scenario song");
    expect(promptsFromDb[2].date).toEqual(new Date("2024-05-01T00:00:00.000+00:00"));
});

it("gets a single prompt", async () => {
    const promptFromDb = await Prompt.findById("000000000000000000000003");

    expect(promptFromDb.prompt).toBe("Daydreaming scenario song");
    expect(promptFromDb.date).toEqual(new Date("2024-05-01T00:00:00.000+00:00"));
});

it("inserts a new prompt", async() => {
    const newPrompt = new Prompt({
        prompt: "A song that makes you feel like you're in a movie",
        date: new Date("2024-05-04T00:00:00.000+00:00")
    });

    await newPrompt.save();

    const newPromptFromDb = await mongoose.connection.db.collection("prompts").findOne({ _id: newPrompt._id });

    expect(newPromptFromDb).toBeTruthy();
    expect(newPromptFromDb.prompt).toBe("A song that makes you feel like you're in a movie");
    expect(newPromptFromDb.date).toEqual(new Date("2024-05-04T00:00:00.000+00:00"));
});
