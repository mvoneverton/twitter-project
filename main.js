$(function () {

  var user = {
    handle: '@bradwestfall',
    img: 'brad.png'
  };

  var composeHtml = $('#template-compose').text();
  var composeTmpl = Handlebars.compile(composeHtml);

  var tweetHtml = $('#template-tweet').text();
  var tweetTmpl = Handlebars.compile(tweetHtml);

  var threadHtml = $('#template-thread').text();
  var threadTmpl = Handlebars.compile(threadHtml);

  var renderCompose = function() {
    return composeTmpl();
  };

  var renderTweet = function(user, message) {
    return tweetTmpl({
      tweetUser: user.handle,
      tweetUserImg: user.img,
      tweetMessage: message,
    });
  };

  var renderThread = function(tweet, compose) {
    return threadTmpl({
      tweetTmpl: tweet,
      composeTmpl: compose
    });
  };

  $('main').on('click', 'textarea', function () {
    $(this).parent('.compose').addClass('expand');
    return false;
  });

  $('.tweets').on('click', '.tweet', function () {
    $(this).parent('.thread').toggleClass('expand');
    return false;
  });

  $('main').on('submit', 'form', function() {
    var message = $(this).find('textarea').val();
    $(this)
      .find('textarea')
      .val('')
      .parent('.compose')
      .removeClass('expand');

    if ($(this).parent('header').length) {

      $('.tweets').append(renderThread(renderTweet(user, message), renderCompose()));

    } else {

      $(this).parent('.replies').append(renderTweet(user, message));

    };

    return false;
  });

});