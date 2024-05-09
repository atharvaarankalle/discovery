import routes from "../user";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import express from "express";
import request from "supertest";

let mongod: MongoMemoryServer;
const app = express();
app.use(express.json());
app.use("/", routes);

/* Define the users to be used in the tests */
const users = [
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000001"),
        email: "user1@test.com",
        displayName: "User 1",
        accountCreationDate: new Date("2024-05-03T00:00:00.000+00:00"),
        streakCount: 2,
        likedSongs: [new mongoose.Types.ObjectId("000000000000000000000001"), new mongoose.Types.ObjectId("000000000000000000000002")],
        suggestedSongs: [new mongoose.Types.ObjectId("000000000000000000000002"), new mongoose.Types.ObjectId("000000000000000000000003")],
        profilePic: "profilePic1Source"
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000002"),
        email: "user2@test.com",
        displayName: "User 2",
        accountCreationDate: new Date("2024-05-02T00:00:00.000+00:00"),
        streakCount: 5,
        likedSongs: [new mongoose.Types.ObjectId("000000000000000000000003"), new mongoose.Types.ObjectId("000000000000000000000004")],
        suggestedSongs: [new mongoose.Types.ObjectId("000000000000000000000003"), new mongoose.Types.ObjectId("000000000000000000000004")],
        profilePic: "profilePic2Source"
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000003"),
        email: "user3@test.com",
        displayName: "User 3",
        accountCreationDate: new Date("2024-05-07T00:00:00.000+00:00"),
        streakCount: 0,
        likedSongs: [],
        suggestedSongs: [],
        profilePic: "profilePic3Source"
    }
];

/* Create an in-memory database before all tests */
beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString);
});

/* Insert the users into the in-memory database before each test */
beforeEach(async () => {
    const collection = await mongoose.connection.db.collection("users");
    await collection.deleteMany({});
    await collection.insertMany(users);
});

/* Clear the database after each test */
afterEach(async () => {
    await mongoose.connection.db.dropCollection("users");
});

/* Stop the in-memory database after all tests */
afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});
