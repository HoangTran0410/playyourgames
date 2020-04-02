/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:46:14
 * @modify date 2020-03-30 17:50:27
 * @desc idea from threeJs editor
 */

const Config = function() {
  const name = 'playyourgames-client';

  const staticStorage = {
    serverUrl: 'https://playyourgames-server.herokuapp.com/',
    // serverUrl: 'localhost:3000',
    themes: ['light', 'dark'],
  };

  const storage = {
    language: 'en',
    tab: 'room',
    userName: '',
    theme: null,
  };

  if (window.localStorage[name] === undefined) {
    window.localStorage[name] = JSON.stringify(storage);
  } else {
    var data = JSON.parse(window.localStorage[name]);

    for (var key in data) {
      storage[key] = data[key];
    }
  }

  return {
    getKey(key) {
      return storage[key] || staticStorage[key];
    },
    setKey: function() {
      // key, value, key, value ...

      for (var i = 0, l = arguments.length; i < l; i += 2) {
        storage[arguments[i]] = arguments[i + 1];
      }

      window.localStorage[name] = JSON.stringify(storage);
    },

    clear: function() {
      delete window.localStorage[name];
    },
  };
};

export { Config };
