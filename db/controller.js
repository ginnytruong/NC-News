const { selectAllTopics, selectAllEndPoints, selectArticlesById, selectArticles, selectCommentsById } = require("./model");

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
    selectArticlesById(article_id)
    .then((article) => {
        response.status(200).send(article)
    })
    .catch((err) => {
        next(err);
    });
};

exports.getArticles = (request, response, next) => {
    selectArticles()
    .then((articles) => {
        response.status(200).send({articles})
    })
    .catch((err) => {
        next(err);
    });
};

exports.getCommentsById = (request, response, next) => {
    const { article_id } = request.params;
    selectCommentsById(article_id)
    .then((comments) => {
        if (comments.length === 0) {
            return selectArticlesById(article_id)
                .then((article) => {
                    if (!article) {
                        return response.status(404).send({msg: "Not found"});
                    }
                    return response.status(200).send({comments: []});
                });
        }
        response.status(200).send({comments});
    })
    .catch((err) => {
        next(err);
    });
};