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


        // var json = {"id":"1","title":"Hello World","description":"<b>Duis aute</b> irure dolor in reprehenderit in voluptate velit esse cillum Dolore eu fugiat nulla pariatur.","content":"<pre><code>bind [:shift;cmd nudge +10% +0 # right bind ]:shift;cmd nudge -10% +0      # left </code></pre><h1>Lorem ipsum dolor sit amet</h1> <p>consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, <span>commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Exc</span>quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n<p>Nostrud exercitation ullamco laboris nisi ut aliquip ex ea epteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>","thumb":"blank","date":"2013-04-03 14:30:31","category":"test"};
        // var blog = new Blog(json);
        // var blogView = new BlogView({ collection: blog});


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
  Handlebars.registerHelper('dateFormat', function(timestamp) {
    var date = new Date(timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];
    console.log(timestamp);
    console.log(months);
    console.log(date);
    return date.getDay() + ' ' +
           months[date.getMonth()] + ' ' +
           date.getFullYear();
  });
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
    


    return "<!--  -->";
    });
});
window.require.register("views/templates/footer", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<!--  <div class=\"footbar navbar navbar-fixed-bottom\">\n --> 	\n\n<div class=\"footbar span12\"></div>\n 	<p class=\"nav dis\">The opinions stated here are my own and not those of my employers.</p>\n    <p class=\"nav pull-right copy\">©duncanbeaton.com</p>\n</div>";
    });
});
window.require.register("views/templates/header", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    


    return "<div id=\"logo\" class=\"logo span6\">\n	dunckr*\n</div>\n<div class=\"menu-bar span5\">\n	<a href=\"https://twitter.com/dunckr\" alt=\"@dunckr\"><i class=\"icon-twitter icon-4x\"></i></a>\n	<a href=\"http://github.com/dunckr\" alt=\"github/dunckr\"><i class=\"icon-github icon-4x\"></i></a>\n	<a href=\"mailto:d\" alt=\"Message\"><i class=\"icon-envelope-alt icon-4x\"></i></a>  \n</div>";
    });
});
window.require.register("views/templates/post", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    this.compilerInfo = [2,'>= 1.0.0-rc.3'];
  helpers = helpers || Handlebars.helpers; data = data || {};
    var buffer = "", stack1, stack2, options, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


    buffer += "<div class=\"article span8\">\n	<div class=\"heading\">\n		<div class=\"title\">";
    if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
    else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
    buffer += escapeExpression(stack1)
      + "</div>\n		<div class=\"date\">";
    options = {hash:{},data:data};
    buffer += escapeExpression(((stack1 = helpers.dateFormat),stack1 ? stack1.call(depth0, depth0.date, options) : helperMissing.call(depth0, "dateFormat", depth0.date, options)))
      + "</div>\n	</div>\n	<div class=\"content\">";
    if (stack2 = helpers.content) { stack2 = stack2.call(depth0, {hash:{},data:data}); }
    else { stack2 = depth0.content; stack2 = typeof stack2 === functionType ? stack2.apply(depth0) : stack2; }
    if(stack2 || stack2 === 0) { buffer += stack2; }
    buffer += "</div>\n</div>";
    return buffer;
    });
});
