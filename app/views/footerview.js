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
