/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 22:06:20
 * @modify date 2020-03-31 21:53:13
 * @desc [description]
 */

import {
  UIPanel,
  UIText,
  UISelect,
  UIRow,
  UIButton,
  UIIcon,
} from '../utils/ui.js';
import Utils from '../utils/functions.js';

const Settings = function(app) {
  const { lang, config } = app;

  const container = new UIPanel()
    .addClass('center-div')
    .setStyle('margin', '30px auto');

  const w = '200px';

  // language
  const languageRow = new UIRow().add(
    new UIText(lang.getKey('settings/language')).setStyle('width', w),
    new UISelect()
      .setStyle('width', '150px')
      .setOptions(lang.getAvailableLangs())
      .setValue(lang.getCurrentLang())
      .onFocus(function() {
        this.previous = this.getValue();
      })
      .onChange(function() {
        const newLang = this.getValue();
        const ref = this;

        Swal.fire({
          title: lang.getKey('settings/language/confirm/title', newLang),
          text: lang.getKey('settings/language/confirm/text', newLang),
          confirmButtonText: lang.getKey(
            'settings/language/confirm/button/ok',
            newLang
          ),
          cancelButtonText: lang.getKey(
            'settings/language/confirm/button/cancel',
            newLang
          ),
          showCancelButton: true,
          reverseButtons: true,
        }).then(result => {
          if (result.value) {
            lang.set(newLang);
            window.location.reload();
          } else {
            ref.setValue(ref.previous); // reset select
          }
        });
      })
  );
  container.add(languageRow);

  // theme
  const themeOptions = {};
  config.getKey('themes').forEach(key => {
    const value = lang.getKey(`settings/theme/${key}`);
    themeOptions[key] = value;
  });

  // get prefer theme if needed
  if (!config.getKey('theme')) {
    const preferTheme = Utils.detectColorScheme();
    console.log(`Prefer theme detected: ${preferTheme}`);
    if (preferTheme) {
      app.signals.changeTheme.dispatch(preferTheme);
    } else {
      app.signals.changeTheme.dispatch('light'); // default theme
    }
  }

  const themeRow = new UIRow().add(
    new UIText(lang.getKey('settings/theme')).setStyle('width', w),
    new UISelect()
      .setStyle('width', '150px')
      .setOptions(themeOptions)
      .setValue(config.getKey('theme'))
      .onChange(function() {
        const value = this.getValue();
        app.signals.changeTheme.dispatch(value);
      })
  );

  container.add(themeRow);

  // Reset App
  const resetRow = new UIRow().setStyle('margin-top', '50px').add(
    new UIText(lang.getKey('settings/reset')).setStyle('width', w),
    new UIButton(lang.getKey('settings/reset/button'))
      .addClass('bg-danger-hover')
      .add(new UIIcon('fa fa-trash'))
      .onClick(function() {
        Swal.fire({
          title: lang.getKey('settings/reset/confirm/title'),
          text: lang.getKey('settings/reset/confirm/text'),
          confirmButtonText: lang.getKey('settings/reset/confirm/button/ok'),
          cancelButtonText: lang.getKey('settings/reset/confirm/button/cancel'),
          showCancelButton: true,
          reverseButtons: true,
        }).then(result => {
          if (result.value) {
            config.clear();
            window.location.reload();
          }
        });
      })
  );

  container.add(resetRow);

  return container;
};

export { Settings };
