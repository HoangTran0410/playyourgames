/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-30 00:11:43
 * @modify date 2020-03-30 17:50:07
 * @desc [description]
 */
import {
  UIText,
  UIPanel,
  UIRow,
  UIInput,
  UIButton,
  UIIcon,
  UISpan,
} from './libs/ui.js';

import { Others } from './utils/functions.js';

const UserProfile = function(app) {
  const { lang, config } = app;

  // container
  const container = new UIPanel();

  // Header Profile
  const profileHeader = new UIPanel()
    .addClass('header')
    .setProperty('textContent', lang.getKey('user/profile/title'));

  container.add(profileHeader);

  // Profile
  const w = '100px';

  // id
  const idUI = new UIRow().add(
    new UIText(lang.getKey('user/profile/id') + ':').setStyle('width', w)
  );

  const id = new UIInput()
    .setDisabled(true)
    .setStyle('margin', 'auto 5px')
    .onChange(function() {
      console.log('input id changed');
    });

  app.signals.socketConnected.add(function(socketId) {
    id.setValue(socketId);
    id.setStyle('width', socketId.length + 'ch');
    btnCopy.setDisabled(false);
  });

  // button copy id
  const txtCopied = new UIText(lang.getKey('user/profile/id/copied'))
    .add(new UIIcon('fa fa-check'))
    .addClass('hidden')
    .addClass('color-success');

  const btnCopy = new UIButton(lang.getKey('user/profile/id/copy'))
    .add(new UIIcon('fa fa-clone'))
    .onClick(function() {
      Others.copyTextToClipboard(
        id.getValue(),
        function() {
          btnCopy.addClass('hidden');
          txtCopied.removeClass('hidden');

          setTimeout(function() {
            btnCopy.removeClass('hidden');
            txtCopied.addClass('hidden');
          }, 3000);
        },
        function(err) {
          Swal.fire({
            icon: 'error',
            title: lang.getKey('user/profile/id/copy/error/title'),
            text: lang.getKey('user/profile/id/copy/error/text'),
          });
        }
      );
    });

  idUI.add(id, btnCopy, txtCopied);

  // name
  const nameUI = new UIRow().add(
    new UIText(lang.getKey('user/profile/username') + ':').setStyle('width', w)
  );

  const nameInput = new UIInput(config.getKey('userName'))
    .setDisabled(true)
    .setStyle('margin', 'auto 5px')
    .setProperty(
      'placeholder',
      lang.getKey('user/profile/username/placeholder')
    );

  // button edit
  const btnEditName = new UIButton(lang.getKey('user/profile/username/edit'))
    .add(new UIIcon('fa fa-edit'))
    .onClick(function() {
      nameInput.setDisabled(false);
      nameInput.focus();

      this.addClass('hidden');
      btnGroup.removeClass('hidden');
    });

  const btnGroup = new UISpan().addClass('hidden').add(
    new UIButton(lang.getKey('user/profile/username/edit/accept'))
      .add(new UIIcon('fa fa-check'))
      .addClass('bg-success-hover')
      .onClick(function() {
        // check name
        config.setKey('userName', nameInput.getValue());

        nameInput.setDisabled(true);
        btnEditName.removeClass('hidden');
        btnGroup.addClass('hidden');
      }),
    new UIButton(lang.getKey('user/profile/username/edit/cancel'))
      .add(new UIIcon('fa fa-ban'))
      .addClass('bg-danger-hover')
      .onClick(function() {
        nameInput.setValue(config.getKey('userName') || '');

        nameInput.setDisabled(true);
        btnEditName.removeClass('hidden');
        btnGroup.addClass('hidden');
      })
  );

  nameUI.add(nameInput, btnEditName, btnGroup);

  container.add(new UIPanel().addClass('center-div').add(idUI, nameUI));

  return container;
};

export { UserProfile };
