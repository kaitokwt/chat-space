$(function(){
  function buildHTML(message){
    if (message.image){
      var html =
      `<div class="chat-box">
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
        <img asset_path src=${message.image} >
      </div>`
      return html;
    } else {
      var html =
      `<div class="chat-box">
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
      </div>`
      return html;
    };
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