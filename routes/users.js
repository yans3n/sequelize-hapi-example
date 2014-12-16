'use strict';

var models = require('../models');

module.exports = function () {
    return [
        {
            method: 'POST',
            path: '/api/users/create',
            handler: function (request, reply) {

                models.User.create({
                    username: request.payload['username']
                }).then(function () {
                    reply.redirect('/');
                });

            }
        },
        {
            method: 'GET',
            path: '/api/users/{userId}/destroy',
            handler: function (request, reply) {

                models.User.find({
                    where: {
                        id: request.params['userId']
                    },
                    include: [models.Task]
                }).then(function (user) {
                    models.Task.destroy({
                        where: {
                            UserId: user.id
                        }
                    }).then(function (affectedRows) {
                        user.destroy().then(function () {
                            reply.redirect('/');
                        });
                    });
                });

            }
        },
        {
            method: 'POST',
            path: '/api/users/{userId}/tasks/create',
            handler: function (request, reply) {

                models.User.find({
                    where: {
                        id: request.params['userId']
                    }
                }).then(function (user) {
                    models.Task.create({
                        title: request.payload['title'],
                        UserId: user.id
                    }).then(function () {
                        reply.redirect('/');
                    });
                });

            }
        },
        {
            method: 'GET',
            path: '/api/users/{userId}/tasks/{taskId}/destroy',
            handler: function (request, reply) {
                models.User.find({
                    where: {
                        id: request.params['userId']
                    }
                }).then(function (user) {
                    models.Task.find({
                        where: {
                            id: request.params['taskId']
                        }
                    }).then(function (task) {
                        task.setUser(null).then(function () {
                            task.destroy().then(function () {
                                reply.redirect('/');
                            });
                        });
                    });
                });
            }
        }
    ];
}();
