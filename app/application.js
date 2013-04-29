// Application bootstrapper.
Application = {
    initialize: function() {

      var HeaderView = require('/views/headerview'),
          FooterView = require('/views/footerview');


      var Blog     = require('/models/blog'),
          BlogView = require('/views/blogview');

      var content = [
       {
        id:     '1',
        title:    'first post',
        description:'this is my first post',
        thumb:    '../assets/images/glyphicons-halflings-white.png',
        content:  '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, ut, animi, distinctio aperiam sed molestias culpa officiis molestiae reiciendis ipsa harum laudantium expedita voluptatem saepe minus nisi dolor. Assumenda, officiis!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, ut, animi, distinctio aperiam sed molestias culpa officiis molestiae reiciendis ipsa harum laudantium expedita voluptatem saepe minus nisi dolor. Assumenda, officiis!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, ut, animi, distinctio aperiam sed molestias culpa officiis molestiae reiciendis ipsa harum laudantium expedita voluptatem saepe minus nisi dolor. Assumenda, officiis!</p>',
        type:   [
                'general',
                'programming'
              ],
        date:   '1st of Jan'
       },
       {
        id:     '2',
        title:    'second post',
        description:'post number #2',
        thumb:    '../assets/images/glyphicons-halflings-white.png',
        content:  '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, ut, animi, distinctio aperiam sed molestias culpa officiis molestiae reiciendis ipsa harum laudantium expedita voluptatem saepe minus nisi dolor. Assumenda, officiis!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, ut, animi, distinctio aperiam sed molestias culpa officiis molestiae reiciendis ipsa harum laudantium expedita voluptatem saepe minus nisi dolor. Assumenda, officiis!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, ut, animi, distinctio aperiam sed molestias culpa officiis molestiae reiciendis ipsa harum laudantium expedita voluptatem saepe minus nisi dolor. Assumenda, officiis!</p>',
        type:   [
                'javascript',
                'programming'
              ],
        date:   '1st of Feb'
       },
       {
        id:     '3',
        title:    'third post',
        description:'posting again!!!',
        thumb:    '../assets/images/glyphicons-halflings-white.png',
        content:  '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, ut, animi, distinctio aperiam sed molestias culpa officiis molestiae reiciendis ipsa harum laudantium expedita voluptatem saepe minus nisi dolor. Assumenda, officiis!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, ut, animi, distinctio aperiam sed molestias culpa officiis molestiae reiciendis ipsa harum laudantium expedita voluptatem saepe minus nisi dolor. Assumenda, officiis!</p><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, ut, animi, distinctio aperiam sed molestias culpa officiis molestiae reiciendis ipsa harum laudantium expedita voluptatem saepe minus nisi dolor. Assumenda, officiis!</p>',
        type:   [
                'general',
                'news'
              ],
        date:   '1st of March'
       }

      ];

      var headerView = new HeaderView();

      var blog = new Blog(content);
      var blogView = new BlogView({ collection: blog });

      var footerView = new FooterView();

    }
};

module.exports = Application;
