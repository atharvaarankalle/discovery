import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { Prompt } from "../PromptSchema";

let mongod;

/* Define the prompts to be used in the tests */
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

/* Create an in-memory database before all tests */
beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString);
});

/* Insert the prompts into the in-memory database before each test */
beforeEach(async () => {
    const collection = await mongoose.connection.db.collection("prompts");
    await collection.deleteMany({});
    await collection.insertMany(prompts);
});

/* Clear the database after each test */
afterEach(async () => {
    await mongoose.connection.db.dropCollection("prompts");
});

/* Stop the in-memory database after all tests */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

/**
 * This test checks if all prompts can be retrieved from the database
 */
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

/**
 * This test checks if a single prompt can be retrieved from the database
 */
it("gets a single prompt", async () => {
    const promptFromDb = await Prompt.findById("000000000000000000000003");

    expect(promptFromDb.prompt).toBe("Daydreaming scenario song");
    expect(promptFromDb.date).toEqual(new Date("2024-05-01T00:00:00.000+00:00"));
});

/**
 * This test checks if a new prompt can be inserted into the database
 */
it("inserts a new prompt", async () => {
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

/**
 * This test verifies that a new prompt cannot be inserted into the database with an empty prompt field
 */
it("fails to insert a new prompt with missing prompt field", () => {
    const newPrompt = new Prompt({
        date: new Date("2024-05-04T00:00:00.000+00:00")
    });

    expect(newPrompt.save()).rejects.toThrow();
});

/**
 * This test verifies that a new prompt cannot be inserted into the database with an empty date field
 */
it("fails to insert a new prompt with missing date field", () => {
    const newPrompt = new Prompt({
        prompt: "A song that makes you feel like you're floating"
    });

    expect(newPrompt.save()).rejects.toThrow();
});
