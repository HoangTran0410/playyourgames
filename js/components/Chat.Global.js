/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-30 00:02:40
 * @modify date 2020-03-30 00:02:40
 * @desc [description]
 */
import { UIPanel, UIText, UISelect } from '../libs/ui.js';

const ChatGlobal = function(app) {
  const { lang } = app;

  const container = new UIPanel();

  const title = new UIText('Chats Global');
  container.add(title);

  return container;
};

export { ChatGlobal };
