var site = require('./controllers/site'),
    dealing = require('./controllers/dealing'),
    MongoClient = require('mongodb').MongoClient;

module.exports = {
    router: function (app) {
        //home
        app.get('/', site.index);

        //dealing
        app.get('/api/dealing', dealing.getAll);
        app.post('/api/dealing', dealing.insert);
        app.get('/api/dealing/:id', dealing.getById);
		app.put('/api/dealing/:id', dealing.saveItem);
    },

    init: function (refresh) {
        if (refresh) {
            MongoClient.connect("mongodb://localhost:27017/transformer", function (err, db) {
                db.dropDatabase(function (err, result) {
                    db.dropCollection('dealing', function (err, result) {

                    });
                });
            });
        }
    }

};