// var View = require('./view'),
var ItemView = require('./itemview'),
    List = require('../models/list'),
    Item = require('../models/item'),
    template = require('./templates/listview');

module.exports = Backbone.View.extend({

  el: $('body'),

  template: template,

  events: {
    'click button#add': 'addItem'
  },

  initialize: function() {
    this.collection = new List();
    this.collection.bind('add', this.appendItem);

    this.counter = 0;
    this.render();
  },

  render: function() {
    this.counter++;
    this.$el.html(this.template());
  },

  addItem: function() {
    this.counter++;
    var item = new Item();
    item.set({
      part2: item.get('part2') + ' ' + this.counter
    });
    this.collection.add(item);
  },

  appendItem: function(item) {
    var itemView = new ItemView({
      model: item
    });
    $('ul', this.el).append(itemView.render().el);
  }

});
