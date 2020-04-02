/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 23:50:15
 * @modify date 2020-03-29 23:58:25
 * @desc [description]
 */
import { UIText, UIPanel } from './libs/ui.js';
import { GameList } from './Game.List.js';

const Game = function(app) {
  const container = new UIPanel().add(new GameList(app));

  return container;
};

export { Game };
