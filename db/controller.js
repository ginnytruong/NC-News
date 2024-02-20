const { selectAllTopics, selectAllEndPoints, selectArticles } = require("./model");

exports.getAllTopics = (request, response, next) => {
    selectAllTopics()
    .then((topics) => {
        response.status(200).send({topics});
    })
    .catch((err) => {
        next(err);
    });
};

exports.getAllEndPoints = (request, response, next) => {
    selectAllEndPoints()
    .then((allEndPoints) => {
        response.status(200).send(allEndPoints)
    })
    .catch((err) => {
        next(err);
    });
};

exports.getArticlesById = (request, response, next) => {
    const { article_id } = request.params;
    selectArticles(article_id)
    .then((article) => {
        response.status(200).send(article)
    })
    .catch((err) => {
        next(err);
    })
}