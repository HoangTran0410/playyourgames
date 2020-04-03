/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:47:29
 * @modify date 2020-03-31 21:53:08
 * @desc [description]
 */
import {
  UIPanel,
  UITable,
  UIButton,
  UIIcon,
  UIRow,
  UIDiv,
} from '../utils/ui.js';

const RoomList = function(app) {
  const { lang } = app;

  const container = new UIDiv().setStyle('text-align', 'center');

  // title
  // container.add(new UIText(lang.getKey('room/list/title')));

  // table
  const fakeData = [
    {
      name: 'Hoang',
      game: 'Bida',
      owner: {
        name: 'HoangAbc',
        id: 'something',
      },
      playerCount: 20,
      maxPlayer: 50,
    },
    {
      name: 'HienCute',
      game: 'GunGame2',
      owner: {
        name: 'Hoang',
        id: 'something',
      },
      playerCount: 34,
      maxPlayer: 35,
    },
    {
      name: 'Haha',
      owner: {
        name: 'Nam',
        id: 'something',
      },
      playerCount: 1,
      maxPlayer: 10,
    },
  ];

  const fakeDataProcessed = fakeData.map((room, index) => {
    return [
      index + 1,
      room.name,
      room.game
        ? new UIButton(room.game).onClick(function() {
            app.signals.switchToTab.dispatch('game');
          })
        : '_',
      new UIButton(room.owner.name).onClick(function() {
        app.signals.switchToTab.dispatch('user');
      }),
      `${room.playerCount}/${room.maxPlayer}`,
      new UIButton(lang.getKey('room/list/table/join/button'))
        .addClass('bg-secondary-hover')
        .add(new UIIcon('fa fa-chevron-right'))
        .onClick(function() {
          alert('test: joining...');
        }),
    ];
  });

  const grid = new UIDiv()
    .addClass('grid')
    .add(
      new UIDiv().addClass('item').add(new UIDiv().addClass('item-content')),
      new UIDiv().addClass('item').add(new UIDiv().addClass('item-content')),
      new UIDiv().addClass('item').add(new UIDiv().addClass('item-content')),
      new UIDiv().addClass('item').add(new UIDiv().addClass('item-content')),
      new UIDiv().addClass('item').add(new UIDiv().addClass('item-content')),
      new UIDiv().addClass('item').add(new UIDiv().addClass('item-content')),
      new UIDiv().addClass('item').add(new UIDiv().addClass('item-content'))
    );

  container.add(grid);

  // muuri works
  let muuri;
  app.signals.filterRoom.add(function() {
    muuri.filter(function(item) {
      return item.getElement().hasAttribute('data-foo');
    });
  });

  app.signals.domLoaded.add(function() {
    const phPool = [];
    const phElem = new UIDiv();

    muuri = new Muuri(grid.dom, {
      dragEnabled: true,
      itemPlaceholderClass: 'placeholder-div',
      dragPlaceholder: {
        enabled: true,
        duration: 400,
        easing: 'ease-out',
        createElement(item) {
          return phPool.pop() || phElem.cloneDom();
        },
        onCreate(item, element) {
          // If you want to do something after the
          // placeholder is fully created, here's
          // the place to do it.
        },
        onRemove(item, element) {
          phPool.push(element);
        },
      },
    });
  });

  // placeholder empty
  const emptyPlaceholder = new UIDiv()
    .setTextContent(lang.getKey('room/list/table/empty/placeholder'))
    .addClass('notification');

  container.add(emptyPlaceholder);

  return container;
};

export { RoomList };
