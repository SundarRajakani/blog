// Application bootstrapper.
Application = {
    initialize: function() {

      require('/lib/view_helper');

      var HeaderView = require('/views/headerview'),
          FooterView = require('/views/footerview');


      var Blog     = require('/models/blog'),
          BlogView = require('/views/blogview');

      var blog = new Blog();
      var p = blog.fetch();
      p.done(function() {
        console.log(blog);
        var blogView = new BlogView({ collection: blog});
      });

      var headerView = new HeaderView();
      var footerView = new FooterView();
    }
};

module.exports = Application;
