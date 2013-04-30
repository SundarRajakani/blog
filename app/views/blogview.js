var Template = require('./templates/blog'),
    PostView = require('/views/postview');

module.exports = Backbone.View.extend({

  el: $('#blog'),

  template: Template,

  initialize: function() {
    // bindall render
    // model on change render
    // http://stackoverflow.com/questions/9220092/backbone-js-view-renders-before-model-fetch
    // 
    // // http://stackoverflow.com/questions/5681246/backbone-js-rendering-view
    this.collection.fetch({
      success: function() {
        console.log(this);
        this.render();
      }
    },this);
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
