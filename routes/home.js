'use strict';

var models  = require('../models');

module.exports = function () {
    return [{
        method: 'GET',
        path: '/',
        handler: function (request, reply) {

            models.User.findAll({
                include: [ models.Task ]
            }).then(function(users) {

                reply.view('index',{
                    title: 'Express',
                        users: users
                });

            });

        }
    }];
}();
