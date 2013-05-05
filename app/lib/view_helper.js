Handlebars.registerHelper('dateFormat', function(timestamp) {
  var date = new Date(timestamp);
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec'];
  console.log(timestamp);
  console.log(months);
  console.log(date);
  return date.getDay() + ' ' +
         months[date.getMonth()] + ' ' +
         date.getFullYear();
});