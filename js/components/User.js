/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:47:39
 * @modify date 2020-03-29 23:44:39
 * @desc [description]
 */
import { UIDiv } from '../utils/ui.js';
import { UserProfile } from './User.Profile.js';
import { UserList } from './User.List.js';

const User = function(app) {
  const container = new UIDiv()
    .add(new UserProfile(app))
    .add(new UserList(app));

  return container;
};

export { User };
