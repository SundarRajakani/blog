$(function () {
  $.ajax({
      url: 'http://api.dunckr.com/get',
      dataType: 'jsonp',
      success: function (data) {
        console.log(data);
      }
    });
});
