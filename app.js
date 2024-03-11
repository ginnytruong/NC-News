const express = require("express");
const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
const { getAllTopics, getAllEndPoints, getArticlesById, getArticles, getCommentsById, postCommentsById, patchArticleById, deleteCommentById, getUsers } = require("./controllers/controller");
const { handleErrors, handlePsqlErrors } = require("./error-handler");

app.get("/api/topics", getAllTopics)
app.get("/api", getAllEndPoints)
app.get("/api/articles/:article_id", getArticlesById)
app.get("/api/articles", getArticles)
app.get("/api/articles/:article_id/comments", getCommentsById)
app.post("/api/articles/:article_id/comments", postCommentsById)
app.patch("/api/articles/:article_id", patchArticleById)
app.delete("/api/comments/:comment_id", deleteCommentById)
app.get("/api/users", getUsers)

app.use(handlePsqlErrors)
app.use(handleErrors)

app.all("/*", (request, response, next) => {
    response.status(404).send({msg: "Not found"})
  });


module.exports = app;