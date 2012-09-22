// Init app
App = Em.Application.create({
    jsonapi: null, 
    ready: function () {
        "use strict"
        Em.info('Ready!');
        App.jsonapi = new JSONAPI(CONFIG);
    }
});

Em.info = function(message, test) {
    if (!test) {
        Em.Logger.log("INFO: " + message);
    }
};
