const express = require("express");
const app = express();
app.use(express.json());
const { getAllTopics, getAllEndPoints, getArticlesById, getArticles, getCommentsById } = require("./db/controller");
const { handleErrors, handlePsqlErrors } = require("./error-handler");

app.get("/api/topics", getAllTopics)
app.get("/api", getAllEndPoints)
app.get("/api/articles/:article_id", getArticlesById)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id/comments", getCommentsById)

app.use(handlePsqlErrors)
app.use(handleErrors)

app.all("/*", (request, response, next) => {
    response.status(404).send({msg: "Not found"})
  });


module.exports = app;