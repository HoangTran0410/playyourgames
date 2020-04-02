/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 21:01:54
 * @modify date 2020-03-29 23:44:18
 * @desc [description]
 */
import { UIPanel } from './libs/ui.js';
import { RoomToolbar } from './Room.Toolbar.js';
import { RoomList } from './Room.List.js';

const Room = function(app) {
  const container = new UIPanel()
    .add(new RoomToolbar(app))
    .add(new RoomList(app));

  return container;
};

export { Room };
