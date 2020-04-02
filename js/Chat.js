/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:47:15
 * @modify date 2020-03-31 18:39:15
 * @desc [description]
 */
import { UIPanel, UIButton, UISpan, UIIcon } from './libs/ui.js';

const Chat = function(app) {
  const { lang } = app;

  const container = new UIPanel().setId('chatContainer').addClass('closed');

  const closeButton = new UIButton()
    .setTextContent(lang.getKey('chat/title'))
    .setId('btnCloseChat')
    .onClick(function() {
      container.toggleClass('closed');
    })
    .add(new UIIcon('fa fa-comments'));

  container.add(closeButton);

  return container;
};

export { Chat };
