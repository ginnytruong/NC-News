const express = require("express");
const app = express();
app.use(express.json());
const { getAllTopics, getAllEndPoints, getArticlesById } = require("./db/controller");
const { handleErrors, handlePsqlErrors } = require("./error-handler");

app.get("/api/topics", getAllTopics)
app.get("/api", getAllEndPoints)
app.get("/api/articles/:article_id", getArticlesById)

app.use(handlePsqlErrors)
app.use(handleErrors)

app.all("/*", (request, response, next) => {
    response.status(404).send({msg: "Not found"})
  });


module.exports = app;