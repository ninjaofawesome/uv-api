(function(){
  console.log('weather!');
  var url = 'http://api.openweathermap.org/v3/uvi/40.7,-73.9/2016Z.json?appid=3422d80b311ca7a7f41164f624819197';
  var body = $(document.body);
  var btn = $('.results-btn');
  var results = $('.results-info');
  var comment = $('.comment');
  var info = $('.uv-display');

  $(results).hide();

  var success = function(data){
    var index = data.data;
    $(info).append(index);

    if (index <= 2.99) {
      $(body).addClass('green');
      $(comment).append('the UV index is low');
    } else if (index >= 3.00 && index <= 5.99) {
      $(body).addClass('yellow');
      $(comment).append('the UV index is moderate');
    } else if (index >= 6.00 && index <= 7.99) {
      $(body).addClass('orange');
      $(comment).append('the UV index is high');
    } else if (index >= 8.00 && index <= 10.99) {
      $(body).addClass('orange');
      $(comment).append('the UV index is very high');
    } else if (index >= 11.00) {
      $(body).addClass('red');
      $(comment).append('the UV index is extreme');
    }

    $(results).slideToggle();


  }
  var error = function(data, xhr){
    console.log('failure', data);
    $(info).append('?');
  }

  $(btn).click(function(){
    $.ajax({
      dataType: "json",
      url: url,
      success: success,
      error: error
    });
  })


})();