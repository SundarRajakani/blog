// Application bootstrapper.
Application = {
    initialize: function() {

      var HeaderView = require('/views/headerview'),
          FooterView = require('/views/footerview');


      var Blog     = require('/models/blog'),
          BlogView = require('/views/blogview');

      var headerView = new HeaderView();

      var blog = new Blog();
      var blogView = new BlogView({ collection: blog });

      var footerView = new FooterView();

    }
};

module.exports = Application;
