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
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000002"),
        email: "user2@test.com",
        displayName: "User 2",
        accountCreationDate: new Date("2024-05-04T00:00:00.000+00:00"),
        streakCount: 0,
        likedSongs: [],
        suggestedSongs: [new mongoose.Types.ObjectId("000000000000000000000004")],
        profilePic: "profilePic2Source"
    }
];

/* Define the suggested songs to be used in the tests */
const suggestedSongs = [
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000003"),
        spotifySongId: "song1Id",
        caption: "Song 1",
        prompt: new mongoose.Types.ObjectId("000000000000000000000004"),
        user: new mongoose.Types.ObjectId("000000000000000000000001"),
        createdAt: new Date("2024-05-08T00:00:00.000+00:00"),
        updatedAt: new Date("2024-05-08T00:00:00.000+00:00")
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000004"),
        spotifySongId: "song2Id",
        caption: "Song 2",
        prompt: new mongoose.Types.ObjectId("000000000000000000000005"),
        user: new mongoose.Types.ObjectId("000000000000000000000002"),
        createdAt: new Date("2024-05-09T00:00:00.000+00:00"),
        updatedAt: new Date("2024-05-09T00:00:00.000+00:00")
    }
];

const prompts = [
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000004"),
        date: new Date("2024-05-08T00:00:00.000+00:00"),
        prompt: "Prompt 1"
    },
    {
        _id: new mongoose.Types.ObjectId("000000000000000000000005"),
        date: new Date("2024-05-09T00:00:00.000+00:00"),
        prompt: "Prompt 2"
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

    const suggestedSongCollection = await mongoose.connection.db.collection("suggestedsongs");
    await suggestedSongCollection.deleteMany({});
    await suggestedSongCollection.insertMany(suggestedSongs);

    const promptCollection = await mongoose.connection.db.collection("prompts");
    await promptCollection.deleteMany({});
    await promptCollection.insertMany(prompts);
});

/* Clear the database after each test */
afterEach(async () => {
    await mongoose.connection.db.dropCollection("users");
    await mongoose.connection.db.dropCollection("suggestedsongs");
    await mongoose.connection.db.dropCollection("prompts");
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
     * Tests that the GET /:id route returns 404 not found if the user is not found
     */
    it("returns 404 not found if the user is not found", (done) => {
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
     * Tests that the PATCH /:id route returns 404 not found if the user is not found
     */
    it("returns 404 not found if the user is not found", (done) => {
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
     * Tests that the GET /:id/liked route returns 404 not found if the user is not found
     */
    it("returns 404 not found if the user is not found", (done) => {
        request(app)
        .get("/000000000000000000000004/liked")
        .send()
        .expect(404, done);
    });
});

/**
 * Tests for the PUT /:id/liked route
 */
describe("PUT /:id/liked", () => {
    /**
     * Tests that the PUT /:id/liked route successfully adds a song to the user's liked songs
     */
    it("adds a song to the user's liked songs", (done) => {
        request(app)
        .put("/000000000000000000000001/liked")
        .send({
            songId: "000000000000000000000003"
        })
        .expect(200)
        .end((err, res) => {
            // If an error occurred, fail the test
            if (err) {
                return done(err);
            }

            const user = res.body;
            expect(user.likedSongs).toEqual(["000000000000000000000003"]);

            return done();
        });
    });

    /**
     * Tests that the PUT /:id/liked route returns 400 bad request if the song is already liked
     */
    it("returns 400 bad request if the song is already liked", (done) => {
        request(app)
        .put("/000000000000000000000001/liked")
        .send({
            songId: "000000000000000000000003"
        })
        .end((err, res) => {
            // If an error occurred, fail the test
            if (err) {
                return done(err);
            }

            request(app)
            .put("/000000000000000000000001/liked")
            .send({
                songId: "000000000000000000000003"
            })
            .expect(400, done);
        });
    });

    /**
     * Tests that the PUT /:id/liked route returns 404 not found if the user is not found
     */
    it("returns 404 not found if the user is not found", (done) => {
        request(app)
        .put("/000000000000000000000004/liked")
        .send({
            songId: "000000000000000000000003"
        })
        .expect(404, done);
    });
});

/**
 * Tests for the DELETE /:id/liked/:songId route
 */
describe("DELETE /:id/liked/:songId", () => {
    /**
     * Tests that the DELETE /:id/liked/:songId route successfully deletes a song from the user's liked songs
     */
    it("deletes a song from the user's liked songs", (done) => {
        request(app)
        .delete("/000000000000000000000002/liked/000000000000000000000003")
        .send()
        .expect(200)
        .end((err, res) => {
            // If an error occurred, fail the test
            if (err) {
                return done(err);
            }

            const user = res.body;
            expect(user.likedSongs).toEqual([]);

            return done();
        });
    });

    /**
     * Tests that the DELETE /:id/liked/:songId route returns 404 not found if the user is not found
     */
    it("returns 404 not found if the user is not found", (done) => {
        request(app)
        .delete("/000000000000000000000004/liked/000000000000000000000003")
        .send()
        .expect(404, done);
    });
});

/**
 * Tests for the GET /:id/suggested/today route
 */
describe("GET /:id/suggested/today", () => {
    /**
     * Tests that the GET /:id/suggested/today route successfully retrieves today's suggested song for the user
     */
    it("gets today's suggested song for the user", (done) => {
        request(app)
        .get("/000000000000000000000002/suggested/today")
        .send()
        .expect(200)
        .end((err, res) => {
            // If an error occurred, fail the test
            if (err) {
                return done(err);
            }

            const suggestedSong = res.body;
            expect(suggestedSong).toHaveProperty("_id");
            expect(suggestedSong.spotifySongId).toBe("song2Id");
            expect(suggestedSong.caption).toBe("Song 2");
            expect(suggestedSong.prompt).toBe("000000000000000000000005");
            expect(suggestedSong.user).toBe("000000000000000000000002");
            expect(suggestedSong.createdAt).toBe("2024-05-09T00:00:00.000Z");
            expect(suggestedSong.updatedAt).toBe("2024-05-09T00:00:00.000Z");

            return done();
        });
    });

    /**
     * Tests that the GET /:id/suggested/today route returns 404 not found if the user has no suggested songs for today
     */
    it("returns 404 not found if the user has no suggested songs for today", (done) => {
        request(app)
        .get("/000000000000000000000001/suggested/today")
        .send()
        .expect(404, done);
    });

    /**
     * Tests that the GET /:id/suggested/today route returns 404 not found if the user is not found
     */
    it("returns 404 not found if the user is not found", (done) => {
        request(app)
        .get("/000000000000000000000004/suggested/today")
        .send()
        .expect(404, done);
    });
});
