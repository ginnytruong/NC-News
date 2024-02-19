const db = require("./connection");

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