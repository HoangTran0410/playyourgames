/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:46:57
 * @modify date 2020-03-29 23:42:14
 * @desc [description]
 * @link http://youmightnotneedjquery.com/#replace_from_html
 */

function fallbackCopyTextToClipboard(text, onFailed) {
  let textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    let successful = document.execCommand('copy');
    let msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    onFailed(err);
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

export default {
  hackerText(dom, text, timeout) {
    let currentText = dom.getTextContent();
    console.log(currentText);
  },

  getJSON: function(url, success, failed) {
    let request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.onload = function() {
      if (this.status >= 200 && this.status < 400) {
        // Success!
        let data = JSON.parse(this.response);
        success(data);
      } else {
        failed(this);
        // We reached our target server, but it returned an error
      }
    };

    request.onerror = function() {
      // There was a connection error of some sort
      failed(this);
    };

    request.send();
  },

  ajax: function({ type, url, data, success, error } = {}) {
    if (type === 'POST') {
      let request = new XMLHttpRequest();
      request.open('POST', url, true);
      request.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded; charset=UTF-8'
      );
      request.send(data);
    }

    if (type === 'GET') {
      let request = new XMLHttpRequest();
      request.open('GET', url, true);

      request.onload = function() {
        if (this.status >= 200 && this.status < 400) {
          // Success!
          let resp = this.response;
          success(resp);
        } else {
          error(this);
          // We reached our target server, but it returned an error
        }
      };

      request.onerror = function() {
        // There was a connection error of some sort
        error(this);
      };

      request.send();
    }
  },

  nowFormatted() {
    return '[' + /\d\d\:\d\d\:\d\d/.exec(new Date())[0] + ']';
  },

  now: function() {
    return Date.now();
  },

  numberFormatted(num) {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  },

  documentReady(fn) {
    if (document.readyState != 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  },

  parseHTML: function(str) {
    let tmp = document.implementation.createHTMLDocument();
    tmp.body.innerHTML = str;
    return tmp.body.children;
  },

  type: function(obj) {
    return Object.prototype.toString
      .call(obj)
      .replace(/^\[object (.+)\]$/, '$1')
      .toLowerCase();
  },

  detectColorScheme() {
    // https://stackoverflow.com/questions/56300132/how-to-over-ride-css-prefers-color-scheme-setting

    if (!window.matchMedia) {
      //matchMedia method not supported
      return false;
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      //OS theme setting detected as dark
      return 'dark';
    }

    return 'light';
  },

  copyTextToClipboard(text, onSuccess, onFailed) {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text, onFailed);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function() {
        onSuccess();
        console.log('Async: Copying to clipboard was successful!');
      },
      function(err) {
        onFailed(err);
        console.error('Async: Could not copy text: ', err);
      }
    );
  },

  deepExtend: function(out) {
    out = out || {};
    for (let i = 1; i < arguments.length; i++) {
      let obj = arguments[i];
      if (!obj) continue;
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object') {
            if (obj[key] instanceof Array == true) out[key] = obj[key].slice(0);
            else out[key] = deepExtend(out[key], obj[key]);
          } else out[key] = obj[key];
        }
      }
    }
    return out;
  },
  extend: function(out) {
    out = out || {};

    for (let i = 1; i < arguments.length; i++) {
      if (!arguments[i]) continue;

      for (let key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) out[key] = arguments[i][key];
      }
    }

    return out;
  },
};
