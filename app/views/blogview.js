var Template = require('./templates/blog'),
    PostView = require('/views/postview');

module.exports = Backbone.View.extend({

  el: $('#blog'),

  template: Template,

  initialize: function() {
    this.collection.fetch();
    console.log(this.collection);
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
