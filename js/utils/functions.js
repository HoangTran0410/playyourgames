/**
 * @author Hoang Tran / https://github.com/HoangTran0410
 * @create date 2020-03-29 20:46:57
 * @modify date 2020-03-29 23:42:14
 * @desc [description]
 */

function fallbackCopyTextToClipboard(text, onFailed) {
  var textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
  } catch (err) {
    onFailed(err);
    console.error('Fallback: Oops, unable to copy', err);
  }

  document.body.removeChild(textArea);
}

const DateUtils = {
  getFormattedTime() {
    return '[' + /\d\d\:\d\d\:\d\d/.exec(new Date())[0] + ']';
  },
};

const NumberUtils = {
  format(num) {
    return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  },
};

const Others = {
  hackerText(dom, text, timeout) {
    let currentText = dom.getTextContent();
    console.log(currentText);
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
};

export { DateUtils, NumberUtils, Others };
