'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Eloquaapps = new Module('eloquaapps');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Eloquaapps.register(function(app, auth, database)
{
    //We enable routing. By default the Package Object is passed to the routes
    Eloquaapps.routes(app, auth, database);

    //We are adding a link to the main menu for all authenticated users
    Eloquaapps.menus.add(
    {
        title: 'eloquaapps example page',
        link: 'eloquaapps example page',
        roles: ['authenticated'],
        menu: 'main'
    });

    /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Eloquaapps.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Eloquaapps.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Eloquaapps.settings(function(err, settings) {
        //you now have the settings object
    });
    */

    return Eloquaapps;
});