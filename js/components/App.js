/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:47:12
 * @modify date 2020-03-31 18:39:24
 * @desc [description]
 */
import { Config } from '../configs/Config.js';
import { Lang } from '../utils/Lang.js';
import { Socket } from './Socket.js';

const App = function () {
  const { Signal } = signals;

  this.signals = {
    // socket
    socketConnected: new Signal(),

    // settings
    changeTheme: new Signal(),

    // room
    filterRoom: new Signal(),

    // utils
    domLoaded: new Signal(),
  };

  this.config = new Config();
  this.lang = new Lang(this.config);
  this.socket = new Socket(this);
};

export { App };
