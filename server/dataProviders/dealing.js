var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    when = require('when');

var globleCount = 0;
var mongoHandler = {
	collection: function (def, collectionId, collectionHandler) {
		MongoClient.connect("mongodb://localhost:27017/transformer", function (err, db) {
			if (err) {def.reject(err);}
			
			var collection = db.collection(collectionId);
			
			collectionHandler(def, collection);
		});
		return def.promise;
	}
};

exports.getAll = function () {
    var deferred = when.defer();
	
	mongoHandler.collection(deferred, 'dealing', function(def, col) {
		col.find().toArray(function(err, items) {
			def.resolve(items);
		});
	});
	
    return deferred.promise;
};

exports.getById = function (id) {
    var deferred = when.defer();
	
	mongoHandler.collection(deferred, 'dealing', function(def, col) {
		col.findOne({_id: id}, function (err, item) {
            def.resolve(item);
        });
	});
	
    return deferred.promise;
};

exports.insert = function(item) {
    var deferred = when.defer();
    mongoHandler.collection(deferred, 'dealing', function(def, col) {
        col.insert(item,function(err,result){
            deferred.resolve(result);
        });
    });
}

exports.saveItem = function (id, item) {
	var deferred = when.defer();
	
	// parse to number, if id is a string
	id = +id;
	console.log(item);
	mongoHandler.collection(deferred, 'dealing', function(def, col) {
		col.count({_id: id}, function (err, count) {
			if (count === 0) {
				// do insert
				
				// todo: does id == item._id?
				// todo: does item has full construction?
                item._id = +item.dealNumber;
				col.insert(item, {w: 1}, function (err, result) {
					def.resolve(item);
				});
			} else {
				// do update
				col.update({_id: id}, item, {w: 1}, function (err, result) {
					def.resolve(item);
				});
			}
		});
	});
	
	return deferred.promise;
};