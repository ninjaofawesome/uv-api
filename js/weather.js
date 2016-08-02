(function(){
  console.log('weather!');
  var url = 'http://api.openweathermap.org/v3/uvi/40.7,-73.9/2016-01Z.json?appid=3422d80b311ca7a7f41164f624819197';
  var body = $(document.body);
  var btn = $('.results-btn');
  var results = $('.results-info');
  var comment = $('.comment');
  var info = $('.uv-display');

  $(results).hide();

  var closeResults = function(){
    $(btn).click(function(e){
      e.stopPropogation();
      $(results).slideUp(function(){
        $(info, comment).empty();
      });

      $(btn).text('Gotta Know.');
      $(body).removeClass();

    });
  }

  var success = function(data){
    var index = data.data;
    $(info).append(index);

    if (index <= 2.99) {
      $(body).addClass('green');
      $(comment).append('The UV index is low. You\'re GTG.');
    } else if (index >= 3.00 && index <= 5.99) {
      $(body).addClass('yellow');
      $(comment).append('The UV index is moderate. Don\'t forget sunblock!');
    } else if (index >= 6.00 && index <= 7.99) {
      $(body).addClass('orange');
      $(comment).append('The UV index is high. Sunblock and a hat.');
    } else if (index >= 8.00 && index <= 10.99) {
      $(body).addClass('orange');
      $(comment).append('The UV index is very high. Might want to switch up your plans.');
    } else if (index >= 11.00) {
      $(body).addClass('red');
      $(comment).append('The UV index is extreme! Stay inside!');
    }

    $(results).slideDown().fadeIn(function(){
      btn.text('I\'m cool, thanks.');
      closeResults();
    });


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