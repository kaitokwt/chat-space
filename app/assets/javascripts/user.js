$(document).on("turbolinks:load", function() {
  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html =
    `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="chat-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>`;
    search_list.append(html);
  }

  $(document).on("keyup", "#user-search-field", function(e) {
    var input = $.trim($(this).val());
    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input },
      dataType: "json"
    })
      .done(function(users) {
        if (input.length === 0) {
          search_list.empty();
        } else if (input.length !== 0) {
          search_list.empty();
          users.forEach(function(user) {
            appendUser(user);
          });
        } else {
          search_list.empty();
        }
      })
      .fail(function() {
        alert("ユーザー検索に失敗しました。");
      })
  });
  $(document).on('click', '.chat-group-user__btn', function(){
    var id = $('.chat-group-user__btn').attr('data-user-id');
    console.log(id);
  });
});

