$(function(){
  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.chat-box:last').data('message-id');

      $.ajax({
        url: 'api/messages',
        type: 'GET',
        data: {id: last_message_id},
        dataType: 'json'
      })
      .done(function(messages) {
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML = buildHTML(message);
          $('.main-chat').append(insertHTML);
          $('.main-chat').animate({scrollTop: $('.main-chat')[0].scrollHeight}, 'fast');
        });
      })
      .fail(function() {
        alert('error');
      });
    };
  };

  function buildHTML(message){
    var img = message.image ? `<img src=${message.image} >` : ``

      var html =
      `<div class="chat-box" data-message-id="${message.id}">
        <div class="top-message">
          <div class="top-message__user-name">
            ${message.user_name}
            <div class="top-message__user-name__time">
              ${message.data}
            </div>
          </div>
        </div>
        <div class="bottom-message">
          <p class="bottom-message__text">
            ${message.body}
          </p>
        </div>
        ${img}
      </div>`
      return html;
  }

  $(".message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      type: 'POST',
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat').append(html)
      $('.main-chat').animate({scrollTop: $('.main-chat')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
      $('.submit').attr('disabled', false);
    })
    .fail(function(){
      alert('error');
      $('.submit').attr('disabled', false);
    });
  });
  setInterval(reloadMessages, 5000);
});