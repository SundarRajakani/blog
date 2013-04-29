// Application bootstrapper.
Application = {
    initialize: function() {

      var HeaderView = require('/views/headerview'),
          FooterView = require('/views/footerview');


      var Blog     = require('/models/blog'),
          BlogView = require('/views/blogview');

      var blog = new Blog();
      blog.fetch();
      console.log(blog);

      var headerView = new HeaderView();
      var blogView = new BlogView(blog);
      var footerView = new FooterView();

    }
};

module.exports = Application;
