const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api/topics", () => {
    test("returns status code 200 & array of objects with slug and description properties", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
            const topics = response.body.topics;
            topics.forEach((topic) => {
                expect(topic).toHaveProperty("slug");
                expect(topic).toHaveProperty("description");
            });
            });
        });
    });

describe("GET /api/invalidpath", () => {
    test("returns status code 404 and msg 'Not found' when invalid path is input", () => {
        return request(app)
        .get("/api/invalidpath")
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toBe("Not found");
        });
        });
    });