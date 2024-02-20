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
        });
    });
});

describe("GET /api/articles/:article_id", () => {
    test("returns status code 200 & requested article", () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((response) => {
            const articles = response.body;
            expect(articles.article_id).toBe(1);
            expect(articles).toMatchObject({
                article_id: expect.any(Number),
                author: expect.any(String),
                title: expect.any(String),
                body: expect.any(String),
                topic: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                article_img_url: expect.any(String)
            });
        });
    });
    test("returns status code 404 Not found for non-existent article id", () => {
        return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then((response) => {
            const body = response.body;
            expect(body).toHaveProperty("msg")
            expect(body.msg).toBe("Not found");
        });
    });
    test("returns status code 400 Bad request for invalid article id", () => {
        return request(app)
        .get("/api/articles/invalid_id")
        .expect(400)
        .then((response) => {
            const body = response.body;
            expect(body).toHaveProperty("msg")
            expect(body.msg).toBe("Bad request");
        });
    });
});

