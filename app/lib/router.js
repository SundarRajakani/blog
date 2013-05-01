var application = require('application');

module.exports = Backbone.Router.extend({
    routes: {
        '': 'home'
        // get particuarl post id
    },

    home: function() {
        // $('body').html(application.homeView.render().el)
    }
});
