const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const endpoints = require("../endpoints.json");


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
                expect(typeof topic.slug).toBe("string");
                expect(topic).toHaveProperty("description");
                expect(typeof topic.description).toBe("string")
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

describe("GET /api", () => {
    test("returns descriptions from endpoints.js for all api endpoints", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then((response) => {
            const body = response.body;
            expect(body).toEqual(endpoints);
        })
    })
})