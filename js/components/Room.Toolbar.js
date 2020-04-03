/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 23:46:31
 * @modify date 2020-03-31 21:53:11
 * @desc [description]
 */
import {
  UIText,
  UIPanel,
  UIInput,
  UIButton,
  UISelect,
  UIIcon,
  UIDiv,
} from '../utils/ui.js';

const RoomToolbar = function(app) {
  const { lang } = app;

  const container = new UIDiv().addClass('header-div');

  // create room tool
  const createRoomTool = new UIPanel()
    .setStyle('display', 'inline-block')
    .setStyle('width', '50%')
    .setStyle('text-align', 'left')
    .add(
      new UIButton(lang.getKey('room/toolBar/create/button'))
        .addClass('bg-success-hover')
        .add(new UIIcon('fa fa-plus')),
      new UIButton(lang.getKey('room/list/refresh/button'))
        .add(new UIIcon('fa fa-refresh'))
        .setStyle('margin-left', '10px')
    );

  container.add(createRoomTool);

  // -- search tools
  // variables
  let columnToSearch = 1;

  const options = [
    ...lang.getKey('room/list/table/headers'),
    lang.getKey('room/toolBar/search/by/all'),
  ];

  // container
  const searchTool = new UIPanel()
    .setStyle('display', 'inline-block')
    .setStyle('width', '50%')
    .setStyle('text-align', 'right');

  // search input
  const searchInput = new UIInput()
    .setStyle('max-width', '15ch')
    .setProperty('placeholder', lang.getKey('room/toolBar/search/placeholder'))
    .onKeyUp(function() {
      const value = this.getValue();
      app.signals.searchRoom.dispatch(value, columnToSearch); // filter column
    });

  // select search by
  const searchBySelect = new UISelect()
    .setOptions(options)
    .setValue(columnToSearch)
    .onChange(function() {
      let value = this.getValue();
      columnToSearch = value; // save value
      searchInput.setValue(''); // clear input
      app.signals.searchRoom.dispatch('', value); // refresh table
    });

  // text search by
  const searchByText = new UIText(
    lang.getKey('room/toolBar/search/by')
  ).setStyle('padding', '0 5px');

  searchTool.add(searchInput, searchByText, searchBySelect);

  // end search tool

  container.add(searchTool);

  return container;
};

export { RoomToolbar };
