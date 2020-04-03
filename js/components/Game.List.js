/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 23:57:27
 * @modify date 2020-03-29 23:57:27
 * @desc [description]
 */
import { UIText, UIDiv } from '../utils/ui.js';

const GameList = function(app) {
  const container = new UIDiv();
  container.add(new UIText('Games List'));

  return container;
};

export { GameList };
