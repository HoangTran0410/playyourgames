/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:46:49
 * @modify date 2020-03-31 21:53:01
 * @desc [description]
 */
import { UITabbedPanel, UIPanel, UIIcon } from '../utils/ui.js';
import { Room } from './Room.js';
import { Game } from './Game.js';
import { User } from './User.js';
import { Settings } from './Settings.js';
import { Chat } from './Chat.js';

const Home = function(app) {
  const { lang, config } = app;

  const container = new UIPanel()
    .setId('homeContainer')
    .addClass('theme-' + config.getKey('theme')); // apply theme

  // signals themes
  app.signals.changeTheme.add(function(theme) {
    if (config.getKey('themes').indexOf(theme) > -1) {
      container.removeClass('theme-' + config.getKey('theme')); // remove current theme
      container.addClass('theme-' + theme); // apply new theme

      config.setKey('theme', theme);
    }
  });

  // tabbed
  const tabbed = new UITabbedPanel()
    .onTabChanged(function(id) {
      config.setKey('tab', id);
    })
    .addTab(
      'room',
      lang.getKey('room/title'),
      new Room(app),
      new UIIcon('fa fa-bars').addClass('not-bright')
    )
    .addTab(
      'game',
      lang.getKey('game/title'),
      new Game(app),
      new UIIcon('fa fa-gamepad').addClass('not-bright')
    )
    .addTab(
      'user',
      lang.getKey('user/title'),
      new User(app),
      new UIIcon('fa fa-group').addClass('not-bright')
    )
    .addTab(
      'settings',
      lang.getKey('settings/title'),
      new Settings(app),
      new UIIcon('fa fa-gear').addClass('not-bright')
    );

  tabbed.select(config.getKey('tab'));

  app.signals.switchToTab.add(function(tabId) {
    tabbed.select(tabId);
  });

  // chat
  const chat = new Chat(app);

  container.add(tabbed, chat);

  return container;
};

export { Home };
