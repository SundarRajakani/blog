(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("application", function(exports, require, module) {
  // Application bootstrapper.
  Application = {
      initialize: function() {

        var HeaderView = require('/views/headerview'),
            FooterView = require('/views/footerview');


        var Blog     = require('/models/blog'),
            BlogView = require('/views/blogview');

        // var blog = new Blog();
        // var p = blog.fetch();
        // p.done(function() {
        //   console.log(blog);
        //   var blogView = new BlogView({ collection: blog});
        // });


        var json = {"id":"1","title":"Hello World","description":"<b>Duis aute<\/b> irure dolor in reprehenderit in voluptate velit esse cillum Dolore eu fugiat nulla pariatur.","content":"<h1>Lorem ipsum dolor sit amet</h1> <p>consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <span>commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Exc</span>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n<p>Nostrud exercitation ullamco laboris nisi ut aliquip ex ea epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>","thumb":"blank","date":"2013-04-03 14:30:31","category":"test"};
        var blog = new Blog(json);
        //var blogView = new BlogView({ collection: blog});


        var headerView = new HeaderView();
        //var footerView = new FooterView();
      }
  };

  module.exports = Application;
  
});
window.require.register("initialize", function(exports, require, module) {
  var application = require('application')

  $(function() {
      application.initialize()
      Backbone.history.start()
  })
  
});
window.require.register("lib/router", function(exports, require, module) {
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
  
});
window.require.register("lib/view_helper", function(exports, require, module) {
  
});
window.require.register("models/blog", function(exports, require, module) {
  var Post = require('./post');

  module.exports = Backbone.Collection.extend({

    model: Post,

    url: '/api/get'

  });
  
});
window.require.register("models/post", function(exports, require, module) {
  
  module.exports = Backbone.Model.extend({

    defaults: {
      
    }

  });
});
window.require.register("views/blogview", function(exports, require, module) {
  var Template = require('./templates/blog'),
      PostView = require('/views/postview');

  module.exports = Backbone.View.extend({

    el: $('#blog'),

    template: Template,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template);
      _.each(this.collection.models, function(item) {
        console.log(item);
        this.renderEach(item);
      }, this);
      return this;
    },

    renderEach: function(item) {
      var postView = new PostView({ model: item });
      $(this.el).append(postView.render().el);
    }

  });
  
});
window.require.register("views/footerview", function(exports, require, module) {
  var Template = require('./templates/footer');

  module.exports = Backbone.View.extend({

    el: $('footer'),

    template: Template,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template);
      return this;
    }

  });
  
});
window.require.register("views/headerview", function(exports, require, module) {
  var Template = require('./templates/header');

  module.exports = Backbone.View.extend({

    el: $('header'),

    template: Template,

    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.html(this.template);
      return this;
    }

  });
  
});
window.require.register("views/postview", function(exports, require, module) {
  var Template = require('./templates/post');

  module.exports = Backbone.View.extend({

    className: 'post',

    template: Template,

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }

  });
  
});
window.require.register("views/templates/blog", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    });
});
window.require.register("views/templates/footer", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div class=\"span12\">\n	<p>The opinions stated here are my own and not that of my employers.</p>\n	<p>©duncanbeaton.com</p>\n</div>";
    });
});
window.require.register("views/templates/header", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<row>\n  <div id=\"logo\">dunckr*</div>\n</row>\n<row>\n  <div class=\"menu-bar\">\n\n    <a href=\"https://twitter.com/dunckr\" alt=\"@dunckr\"><i class=\"icon-twitter icon-4x\"></i>\n</a>\n    <a href=\"http://github.com/dunckr\" alt=\"github/dunckr\"><i class=\"icon-github icon-4x\"></i></a>\n    <a href=\"mailto:d\" alt=\"Message\"><i class=\"icon-envelope-alt icon-4x\"></i></a>  \n  </div>\n</row>\n";
    });
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<header>\n	<div class=\"container\">\n		<h1>Banana Pancakes</h1>\n	</div>\n</header>\n\n<div class=\"container\">\n	\n	<p class=\"lead\">Congratulations, your Brunch project is set up and very yummy. Thanks for using Banana Pancakes!</p>\n	\n	<div class=\"row\">\n		\n		<div class=\"span4\">\n			<h2>Banana Pancakes I</h2>\n			<p><a href=\"http://allrecipes.com/recipe/banana-pancakes-i/\"><img src=\"http://i.imgur.com/YlAsp.jpg\" /></a></p>\n			<blockquote>\n				<p>Crowd pleasing banana pancakes made from scratch. A fun twist on ordinary pancakes.</p>\n				<small><a href=\"http://allrecipes.com/cook/1871017/profile.aspx\">ADDEAN1</a> from <cite title=\"allrecepies.com\">allrecepies.com</cite></small>\n			</blockquote>\n			<p><a class=\"btn\" href=\"http://allrecipes.com/recipe/banana-pancakes-i/\">View Recipe &raquo;</a></p>\n		</div>\n		\n		<div class=\"span4\">\n			<h2>Banana Brown Sugar Pancakes</h2>\n			<p><a href=\"http://allrecipes.com/recipe/banana-brown-sugar-pancakes\"><img src=\"http://i.imgur.com/Yaq7Y.jpg\" /></a></p>\n			<blockquote>\n				<p>This recipe I made because I wanted to use up some instant banana oatmeal I had. I don't use syrup on it because of the sweetness from the oatmeal and brown sugar.</p>\n				<small><a href=\"http://allrecipes.com/cook/10041806/profile.aspx\">Nscoober2</a> from <cite title=\"allrecepies.com\">allrecepies.com</cite></small>\n			</blockquote>\n			<p><a class=\"btn\" href=\"http://allrecipes.com/recipe/banana-brown-sugar-pancakes\">View Recipe &raquo;</a></p>\n		</div>\n		\n		<div class=\"span4\">\n			<h2>Banana Pancakes II</h2>\n			<p><a href=\"http://allrecipes.com/recipe/banana-pancakes-ii/\"><img src=\"http://i.imgur.com/dEh09.jpg\" /></a></p>\n			<blockquote>\n				<p>These yummy pancakes are a snap to make.</p>\n				<small><a href=\"http://allrecipes.com/cook/18911/profile.aspx\">sal</a> from <cite title=\"allrecepies.com\">allrecepies.com</cite></small>\n			</blockquote>\n			<p><a class=\"btn\" href=\"http://allrecipes.com/recipe/banana-pancakes-ii/\">View Recipe &raquo;</a></p>\n		</div>\n		\n	</div>\n	\n</div>\n";
    });
});
window.require.register("views/templates/post", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "";
    buffer += "\n		<li>"
      + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
      + "</li>\n		";
    return buffer;
    }

    buffer += "<div class=\"span12\">\n	<h1>Post ";
    if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</h1>\n	<p>";
    if (stack1 = helpers.description) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.description; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</p>\n	<p>";
    if (stack1 = helpers.date) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.date; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</p>\n	<p>";
    if (stack1 = helpers.type) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</p>\n	<p>";
    if (stack1 = helpers.content) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.content; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "</p>\n	<ul> ";
    stack1 = helpers.each.call(depth0, depth0.type, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n	</ul>\n</div>";
    return buffer;
    });
});
