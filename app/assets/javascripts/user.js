$(function() {
  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html =
    `<div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <div class="chat-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
    </div>`;

    search_list.append(html);
  }

  function addGroupMember(user_id, user_name) {
    var html =
    `<div class='chat-group-user'>
      <input name='group[user_ids][]' type='hidden' value='${user_id}'>
      <p class='chat-group-user__name'>${user_name}</p>
      <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
    </div>`;

    $("#chat-group-users").append(html);
  }

  $(document).on("keyup", "#user-search-field", function() {
    var input = $.trim($(this).val());
    var group_id = $(".chat__group_id").val();
    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input, group_id: group_id },
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

  $(document).on('click', '.chat-search-add', function(){
    $(this).parent().remove();
    var user_id = $(this).attr('data-user-id');
    var user_name = $(this).prev().text();
    addGroupMember(user_id, user_name)
  });

  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  });

  $(document).on('submit', '#chat_group', function(e){
  });
});

