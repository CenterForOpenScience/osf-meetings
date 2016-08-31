/* jshint node: true */

module.exports = function(environment) {
    var ENV = {
        modulePrefix: 'osf-meetings',
        environment: environment,
        baseURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            }
        },

        'ember-simple-auth': {
            authenticationRoute: 'login',
            routeAfterAuthentication: 'index'
        },

        APP: {
            // Here you can pass flags/options to your application instance
            // when it is created
        }
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;

        ENV.providers = {
            "osfMeetings": {
                "host": "http://localhost:4200/",
                "apiUrl": "http://localhost:8000/",
                "currentUser": "http://localhost:8000/users/me/",
                "uploadsUrl": "http://localhost:8000/uploads/",
                "uploadMultiple": false,
                "loginUrl" : "http://localhost:8000/accounts/login/"
            },
            "osf": {
                "host": "https://staging.osf.io/",
                "uploadsUrl": "https://staging-files.osf.io/v1/resources/",
                "uploadMultiple": false
            }
        }
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }

    return ENV;
};
