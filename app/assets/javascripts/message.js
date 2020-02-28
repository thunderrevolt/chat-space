$(function(){
  function buildHTML(message){
    if (message.image) {
      var html = 
        `<div class="message", data-message-id=${message.id}>
          <div class="message__info">
            <div class="message__info--user">
              ${message.user_name}
            </div>
            <div class="message__info--time">
              ${message.created_at}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
            <img class="lower-message__image" src=${message.image} alt="Thumb flexbox cheat sheet">
          </div>
        </div>`
      return html;
    } else {
      var html = 
          `<div class="message", data-message-id=${message.id}>
             <div class="message__info">
                <div class="message__info--user">
                  ${message.user_name}
                </div>
                <div class="message__info--time">
                  ${message.created_at}
                </div>
              </div>
              <div class="message__text">
                <p class="lower-message__content">
                  ${message.content}
                </p>
              </div>
          </div>`
      return html;
    }
  }
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('#new_message > input.form__message--submit').attr('disabled', false)
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
  })
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});