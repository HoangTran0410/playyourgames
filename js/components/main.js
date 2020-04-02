/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:47:24
 * @modify date 2020-03-31 18:39:12
 * @desc [description]
 */
import { App } from './App.js';
import { Home } from './Home.js';

const app = new App();

const home = new Home(app);
document.body.appendChild(home.dom);

app.signals.domLoaded.dispatch();
