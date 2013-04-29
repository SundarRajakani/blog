// Application bootstrapper.
Application = {
    initialize: function() {

      var HeaderView = require('/views/headerview'),
          FooterView = require('/views/footerview');


      var Blog     = require('/models/blog'),
          BlogView = require('/views/blogview');

      var blog = new Blog();

      var headerView = new HeaderView();
      var blogView = new BlogView({ collection: blog});
      var footerView = new FooterView();

    }
};

module.exports = Application;
