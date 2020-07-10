$(function() {
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="message-box" data-message-id=${message.id}>
          <div class="message-box__info">
            <div class="message-box__info__name">
              ${message.user_name}
            </div>
            <div class="message-box__info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="message-box__message">
            <p class="message-box__message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
      `<div class="message-box" data-message-id=${message.id}>
        <div class="message-box__info">
          <div class="message-box__info__name">
            ${message.user_name}
          </div>
          <div class="message-box__info__date">
            ${message.created_at}
          </div>
        </div>
          <div class="message-box__message">
          <p class="message-box__message__content">
            ${message.content}
          </p>
        </div>
      </div>`
      return html;
    };
  }

  $('.form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function(){
      alert('メッセージを送信に失敗しました');
    });
    return false;
  });
});