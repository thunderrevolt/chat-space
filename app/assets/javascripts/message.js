$(function(){

  function buildHTML(message){
    if (message.image) {
      var html = 
          `<div class="message__info">
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
          </div>`
      return html;
    } else {
      var html = 
             `<div class="message__info">
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
      $('.message').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('form')[0].reset();
      $('#new_message > input.form__message--submit').attr('disabled', false)
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました")
    })
  })
});
