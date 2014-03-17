// Generated by CoffeeScript 1.7.1

var Exception, News, db;

db = require('../models');

Exception = require('./Exception').Exception;


/*

    Controlleur gérant les News
 */

News = (function () {

    "use strict";
    
    function News() {}

    News.find_all = function (callback) {
        var query;
        query = db.News.findAll({
            include: [db.User]
        });
        query.success(function (news) {
            callback(null, news);
        });
        query.error(function (err) {
            console.log("News@find_all: " + err);
            callback(err, null);
        });
    };

    News.find_by_id = function (id, callback) {
        var err, query;
        if (typeof id === "number") {
            id = parseInt(id, 10);
            query = db.News.find(id);
            query.success(function (user) {
                callback(null, user);
            });
            query.error(function (err) {
                console.log("News@find_by_id: " + err);
                callback(err, null);
            });
        } else {
            err = new Exception("News@find_by_id: Id should be an integer in range    [0..n], |" + id + "| given. ", 1);
            callback(err, null);
        }
    };

    News.find_by_title = function (title_param, callback) {
        var query;
        if (typeof title_param === "string") {
            query = db.News.find({
                where: {
                    title: title_param
                }
            });
            query.success(function (user) {
                callback(null, user);
            });
            query.error(function (err) {
                console.log("News@find_by_title: " + err);
                callback(err, null);
            });
        }
    };

    return News;

})();

exports.News = News;