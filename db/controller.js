const { selectAllTopics } = require("./model");
const fs = require("fs/promises");


exports.getAllTopics = (request, response, next) => {
    selectAllTopics()
    .then((topics) => {
        response.status(200).send({topics});
    })
    .catch((err) => {
        next(err);
    });
};