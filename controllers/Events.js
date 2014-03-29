
var Events, Exception, db;

db = require('../models');

Exception = require('./Exception').Exception;


/*

    Controlleur gérant les Events
 */

Events = (function () {

    "use strict";

    function Events() {}

    Events.find_all = function (callback) {
        var query;
        query = db.Event.findAll({
            include: [
                {
                    model: db.User,
                    include: [db.Status]
                }, db.Status, db.Project
            ]
        });
        query.success(function (Events) {
            callback(null, Events);
        });
        query.error(function (err) {
            console.log("Events@find_all: " + err);
            callback(err, null);
        });
    };

    Events.find_by_id = function (id, callback) {
        var err, query;
        if (typeof id === "number") {
            id = parseInt(id, 10);
            query = db.Event.find({
                where: {
                    id: id
                },
                include: [
                    {
                        model: db.User,
                        include: [db.Status]
                    }, db.Status, db.Project
                ]
            });
            query.success(function (event) {
                callback(null, event);
            });
            query.error(function (err) {
                console.log("Events@find_all: " + err);
                callback(err, null);
            });
        } else {
            err = new Exception("Events@find_by_id: Id should be an integer in range    [0..n], |" + id + "| given. ", 1);
            callback(err, null);
        }
    };

    Events.find_by_title = function (title_param, callback) {
        var query;
        if (typeof title_param === "string") {
            query = db.Event.find({
                where: {
                    title: title_param
                }
            });
            query.success(function (user) {
                callback(null, user);
            });
            query.error(function (err) {
                console.log("Events@find_by_title: " + err);
                callback(err, null);
            });
        }
    };

    Events.find_next_events = function (callback) {

        var query;
        query = db.Event.findAll({
            where: ['end >= NOW()']
        });
        query.success(function (list) {
            callback(null, list);
        });
        query.error(function (err) {
            console.log("Events@find_next_events: " + err);
            callback(err, null);
        });
    };

    Events.update = function (event, callback) {
        var id;
        id = parseInt(event.id, 10);
        Events.find_by_id(id, function (err, db_event) {
            var query;
            if (err !== null) {
                console.log(err);
                callback(err, null);
            }
            if (db_event !== null) {
                query = db_event.updateAttributes({
                    title: event.title,
                    description: event.description,
                    allDay: event.allDay,
                    start: event.start,
                    end: event.end,
                    url: event.url,
                    color: event.color,
                    priority: event.priority,
                    StatuId: event.StatuId,
                    ProjectId: event.ProjectId
                });
                query.success(function (db_event) {
                    Events.find_by_id(db_event.id, function (err, event_with_all_data) {
                        callback(null, event_with_all_data);
                    });
                });
                query.error(function (err) {
                    if (err !== null) {
                        console.log(err);
                        callback(err, null);
                    }
                });
            }
        });
    };

    return Events;

})();

exports.Events = Events;

