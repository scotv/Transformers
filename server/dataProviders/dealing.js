var MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    when = require('when');

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

exports.saveItem = function (id, item) {
	var deferred = when.defer();
	
	// parse to number, if id is a string
	id = +id;
	
	mongoHandler.collection(deferred, 'dealing', function(def, col) {
		col.update({_id: id}, {$set: item}, {w: 1, upsert: true, multi: true}, function (err, rowAffected) {
			console.log('************dealing.saveItem************');
			console.log(err, rowAffected);
			if (!err) {
				console.log('dealing has been insert / updated.');
				def.resolve(item);
			}
		});
	});
	
	return deferred.promise;
};
