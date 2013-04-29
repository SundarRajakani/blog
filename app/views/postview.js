var Template = require('./templates/post');

module.exports = Backbone.View.extend({

  className: 'post',

  template: Template,

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});
