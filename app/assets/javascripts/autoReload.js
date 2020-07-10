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
  
  let reloadMessages = function() {
    let last_message_id = $('.message-box:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message);
        });
        $('.chat-main__message-list').append(insertHTML);
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});