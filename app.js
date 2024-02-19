const express = require("express");
const app = express();
app.use(express.json());

const { getAllTopics, getAllEndPoints } = require("./db/controller")

app.get("/api/topics", getAllTopics)
app.get("/api", getAllEndPoints)

app.all("/*", (request, response, next) => {
    response.status(404).send({msg: "Not found"})
  });

module.exports = app;