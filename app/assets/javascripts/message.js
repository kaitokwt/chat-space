$(function(){
  var reloadMessages = function() {
    var last_message_id = $('.chat-box:last').data('message-id');

    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message){
        var insertHTML = insertHTML + buildHTML(message);

      });
      //メッセージが入ったHTMLを取得

      //メッセージを追加

    })
    .fail(function() {
      console.log('error');
    });
  };

  function buildHTML(message){
    var img = message.image.url ? `<img asset_path src=${message.image.url} >` : ``

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
});