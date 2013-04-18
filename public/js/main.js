$(function () {

  console.log('test');



  $.ajax({
   url: 'http://api.dunckr.com/get',
   dataType: 'jsonp',
   type: 'POST',
   data: '',
   contentType: "application/json; charset=utf-8",
   // success: function(data) {
   //  console.log('here');
   // },

   complete: function(xhr,stat) {
    console.log(stat);
   }

  });


});
