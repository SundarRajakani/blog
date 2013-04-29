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
