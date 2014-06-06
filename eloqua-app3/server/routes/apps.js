'use strict';

module.exports = function(app) 
{
    // Home route
    var apps = require('../controllers/apps');

    app.route('/apps').get(apps.render);

};
