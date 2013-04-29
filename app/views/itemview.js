var View     = require('./view');
    template = require('./templates/itemview');

module.exports = View.extend({
    id: 'itemview',

    template: template,

    getRenderData: function(){
      return this.model.attributes;
    }

});
