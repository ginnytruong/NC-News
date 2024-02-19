const { dirname } = require("path");
const db = require("./connection");
const fs =require("fs/promises");

exports.selectAllTopics = () => {
    const topicsSqlStr = `SELECT * FROM topics`;

    return db.query(topicsSqlStr)
    .then((topics) => {
        if(!topics.rows.length) {
            return Promise.reject({status: 404, msg: "Not found"})
        }
        return topics.rows;
    });
};

exports.selectAllEndPoints = () => {
    return fs.readFile("endpoints.json", "utf-8")
    .then((data) => {
        return JSON.parse(data);
    });
    };