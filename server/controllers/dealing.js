var dataProvider = require('../dataProviders/dataProvider');

exports.getAll = function (req, res, next) {
    dataProvider.dealing.getAll().then(function (items) {
        res.json(items);
    });
}

exports.getById = function (req, res, next) {
    var id = parseInt(req.params.id, 10);
    dataProvider.dealing.getById(id).then(function (item) {
        res.json(item);
    });
}

exports.saveItem = function (req, res, next) {
    var item = req.body
        , id = req.params.id;

    dataProvider.dealing.saveItem(id, item).then(function (item) {
        res.json(item);
    });
};

exports.insert = function (req, res, next) {
    var item = req.body;
    dataProvider.dealing.saveItem(item.dealNumber,item).then(function (item) {
        res.json(item);
    });
};