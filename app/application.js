// Application bootstrapper.
Application = {
    initialize: function() {

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


      // var json = {"id":"1","title":"Hello World","description":"<b>Duis aute<\/b> irure dolor in reprehenderit in voluptate velit esse cillum Dolore eu fugiat nulla pariatur.","content":"<h1>Lorem ipsum dolor sit amet</h1> <p>consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <span>commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Exc</span>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n<p>Nostrud exercitation ullamco laboris nisi ut aliquip ex ea epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>","thumb":"blank","date":"2013-04-03 14:30:31","category":"test"};
      // var blog = new Blog(json);
      // var blogView = new BlogView({ collection: blog});


      var headerView = new HeaderView();
      //var footerView = new FooterView();
    }
};

module.exports = Application;
