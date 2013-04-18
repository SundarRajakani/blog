$(function () {

  console.log('test');



  // $.ajax({
  //  url: 'index.php',
  //  dataType: 'jsonp',
  //  type: 'POST',
  //  data: {get:'http://api.dunckr.com'},
  //  contentType: "application/json; charset=utf-8",
  //  // success: function(data) {
  //  //  console.log('here');
  //  // },

  //  complete: function(xhr,stat) {
  //   console.log(stat);
  //  }

  // });

  $.getJSON(
    'http://api.dunckr.com/?callback=?',
    function(data) {
      console.log(data);
  });

  // $.getJSON(
  //   'https://api.twitter.com/1/statuses/user_timeline.json?screen_name=BagleyTech&include_entities=true&include_rts=true&callback=?',
  //   function(data) {
  //     console.log(data);
  // });

  // $.ajax({
  //  url: 'http://api.dunckr.com/index',
  //  dataType: 'jsonp',
  //  type: 'POST',
  //  data: {'get':''},
  //  //contentType: "application/json; charset=utf-8",
  //  // success: function(data) {
  //  //  console.log('here');
  //  // },

  //  complete: function(xhr,stat) {
  //   console.log(stat);
  //  }

  // });

});
