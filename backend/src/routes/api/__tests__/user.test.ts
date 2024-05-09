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
        likedSongs: [],
        suggestedSongs: [],
        profilePic: "profilePic1Source"
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

/**
 * Tests for the POST / route
 */
describe("POST /", () => {
    /**
     * Tests that the POST / route successfully creates a new user
     */
    it("creates a new user", (done) => {
        request(app)
            .post("/")
            .send({
                email: "testuser1@email.com",
                displayName: "Test User 1",
                accountCreationDate: new Date("2024-05-09T00:00:00.000+00:00"),
                streakCount: 0,
                likedSongs: [],
                suggestedSongs: [],
                profilePic: "profilePicSource"
            })
            .expect(201)
            .end((err, res) => {
                // If an error occurred, fail the test
                if (err) {
                    return done(err);
                }

                // Check the user returned in the response has the correct properties
                const user = res.body;
                expect(user).toHaveProperty("_id");
                expect(user.email).toBe("testuser1@email.com");
                expect(user.displayName).toBe("Test User 1");
                expect(user.accountCreationDate).toBe("2024-05-09T00:00:00.000Z");
                expect(user.streakCount).toBe(0);
                expect(user.likedSongs).toEqual([]);
                expect(user.suggestedSongs).toEqual([]);
                expect(user.profilePic).toBe("profilePicSource");
                
                return done();
            });
    });
});

/**
 * Tests for the GET /:id route
 */
describe("GET /:id", () => {
    /**
     * Tests that the GET /:id route successfully retrieves a single user
     */
    it("gets a single user", (done) => {
        request(app)
        .get("/000000000000000000000001")
        .send()
        .expect(200)
        .end((err, res) => {
            // If an error occurred, fail the test
            if (err) {
                return done(err);
            }

            // Check the user returned in the response has the correct properties
            const user = res.body;
            expect(user).toHaveProperty("_id");
            expect(user.email).toBe("user1@test.com");
            expect(user.displayName).toBe("User 1");
            expect(user.accountCreationDate).toBe("2024-05-03T00:00:00.000Z");
            expect(user.streakCount).toBe(2);
            expect(user.likedSongs).toEqual([]);
            expect(user.suggestedSongs).toEqual([]);
            expect(user.profilePic).toBe("profilePic1Source");

            return done();
        });
    });

    /**
     * Tests that the GET /:id route returns a 404 if the user is not found
     */
    it("returns a 404 if the user is not found", (done) => {
        request(app)
        .get("/000000000000000000000004")
        .send()
        .expect(404, done);
    });
});

/**
 * Tests for the PATCH /:id route
 */
describe("PATCH /:id", () => {
    /**
     * Tests that the PATCH /:id route successfully updates a user
     */
    it("updates a user", (done) => {
        request(app)
        .patch("/000000000000000000000001")
        .send({
            streakCount: 3
        })
        .expect(200)
        .end((err, res) => {
            // If an error occurred, fail the test
            if (err) {
                return done(err);
            }

            // Check the user returned in the response has the updated streak count
            const user = res.body;
            expect(user.streakCount).toBe(3);

            return done();
        });
    });

    /**
     * Tests that the PATCH /:id route returns a 404 if the user is not found
     */
    it("returns a 404 if the user is not found", (done) => {
        request(app)
        .patch("/000000000000000000000004")
        .send({
            streakCount: 3
        })
        .expect(404, done);
    });
});

/**
 * Tests for the GET /:id/liked route
 */
describe("GET /:id/liked", () => {
    /**
     * Tests that the GET /:id/liked route successfully retrieves a user's liked songs
     */
    it("gets the user's liked songs", (done) => {
        request(app)
        .get("/000000000000000000000001/liked")
        .send()
        .expect(200)
        .end((err, res) => {
            // If an error occurred, fail the test
            if (err) {
                return done(err);
            }

            // Check the liked songs returned in the response are correct
            const likedSongs = res.body;
            expect(likedSongs.length).toBe(0);
            expect(likedSongs).toEqual([]);

            return done();
        });
    });

    /**
     * Tests that the GET /:id/liked route returns a 404 if the user is not found
     */
    it("returns a 404 if the user is not found", (done) => {
        request(app)
        .get("/000000000000000000000004/liked")
        .send()
        .expect(404, done);
    });
});
