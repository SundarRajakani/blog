Handlebars.registerHelper('dateFormat', function(timestamp) {
  var a = timestamp.split(/[^0-9]/);
  var date = new Date (a[0],a[1]-1,a[2],a[3],a[4],a[5] );
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];
  console.log(timestamp);
  console.log(months);
  console.log(date);
  return date.getDate() + ' ' +
         months[date.getMonth()] + ' ' +
         date.getFullYear();
});