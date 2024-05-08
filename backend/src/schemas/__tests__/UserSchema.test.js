import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../UserSchema";

let mongod;

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

beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const connectionString = mongod.getUri();
    await mongoose.connect(connectionString);
});

beforeEach(async () => {
    const collection = await mongoose.connection.db.collection("users");
    await collection.deleteMany({});
    await collection.insertMany(users);
});

afterEach(async () => {
    await mongoose.connection.db.dropCollection("users");
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
});

it("gets all users", async () => {
    const usersFromDb = await User.find();
    expect(usersFromDb).toBeTruthy();
    expect(usersFromDb.length).toBe(3);

    expect(usersFromDb[0].email).toBe("user1@test.com");
    expect(usersFromDb[0].displayName).toBe("User 1");
    expect(usersFromDb[0].accountCreationDate).toEqual(new Date("2024-05-03T00:00:00.000+00:00"));
    expect(usersFromDb[0].streakCount).toBe(2);
    expect(usersFromDb[0].likedSongs).toEqual([new mongoose.Types.ObjectId("000000000000000000000001"), new mongoose.Types.ObjectId("000000000000000000000002")]);
    expect(usersFromDb[0].suggestedSongs).toEqual([new mongoose.Types.ObjectId("000000000000000000000002"), new mongoose.Types.ObjectId("000000000000000000000003")]);
    expect(usersFromDb[0].profilePic).toBe("profilePic1Source");

    expect(usersFromDb[1].email).toBe("user2@test.com");
    expect(usersFromDb[1].displayName).toBe("User 2");
    expect(usersFromDb[1].accountCreationDate).toEqual(new Date("2024-05-02T00:00:00.000+00:00"));
    expect(usersFromDb[1].streakCount).toBe(5);
    expect(usersFromDb[1].likedSongs).toEqual([new mongoose.Types.ObjectId("000000000000000000000003"), new mongoose.Types.ObjectId("000000000000000000000004")]);
    expect(usersFromDb[1].suggestedSongs).toEqual([new mongoose.Types.ObjectId("000000000000000000000003"), new mongoose.Types.ObjectId("000000000000000000000004")]);
    expect(usersFromDb[1].profilePic).toBe("profilePic2Source");

    expect(usersFromDb[2].email).toBe("user3@test.com");
    expect(usersFromDb[2].displayName).toBe("User 3");
    expect(usersFromDb[2].accountCreationDate).toEqual(new Date("2024-05-07T00:00:00.000+00:00"));
    expect(usersFromDb[2].streakCount).toBe(0);
    expect(usersFromDb[2].likedSongs).toEqual([]);
    expect(usersFromDb[2].suggestedSongs).toEqual([]);
    expect(usersFromDb[2].profilePic).toBe("profilePic3Source");
});
