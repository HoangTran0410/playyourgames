/**
 * @author mrdoob / http://mrdoob.com/
 * @modify HoangTran https://github.com/HoangTran0410
 * @link http://youmightnotneedjquery.com/
 */

var UIElement = function(dom) {
  this.dom = dom;
};

UIElement.prototype = {
  add: function() {
    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments[i];

      if (argument instanceof UIElement) {
        this.dom.appendChild(argument.dom);
      } else {
        console.error(
          'UIElement:',
          argument,
          'is not an instance of UIElement.'
        );
      }
    }

    return this;
  },

  addBefore: function() {
    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments[i];

      if (argument instanceof UIElement) {
        this.dom.insertAdjacentElement('beforebegin', argument.dom);
      } else {
        console.error(
          'UIElement:',
          argument,
          'is not an instance of UIElement.'
        );
      }
    }

    return this;
  },

  addAfter: function() {
    for (var i = arguments.length - 1; i > 0; i--) {
      var argument = arguments[i];

      if (argument instanceof UIElement) {
        this.dom.insertAdjacentElement('afterend', argument.dom);
      } else {
        console.error(
          'UIElement:',
          argument,
          'is not an instance of UIElement.'
        );
      }
    }

    return this;
  },

  remove: function() {
    for (var i = 0; i < arguments.length; i++) {
      var argument = arguments[i];

      if (argument instanceof UIElement) {
        this.dom.removeChild(argument.dom);
      } else {
        console.error(
          'UIElement:',
          argument,
          'is not an instance of UIElement.'
        );
      }
    }

    return this;
  },

  clear: function() {
    while (this.dom.children.length) {
      this.dom.removeChild(this.dom.lastChild);
    }
  },

  getHeight: function() {
    return parseFloat(
      getComputedStyle(this.dom, null).height.replace('px', '')
    );
  },

  setHeight: function(val) {
    if (typeof val === 'function') val = val();
    if (typeof val === 'string') this.dom.style.height = val;
    else this.dom.style.height = val + 'px';
  },

  getWidth: function() {
    return parseFloat(getComputedStyle(this.dom, null).width.replace('px', ''));
  },

  setWidth: function(val) {
    if (typeof val === 'function') val = val();
    if (typeof val === 'string') this.dom.style.width = val;
    else this.dom.style.width = val + 'px';
  },

  getOffset: function() {
    let rect = this.dom.getBoundingClientRect();

    return {
      top: rect.top + document.body.scrollTop,
      left: rect.left + document.body.scrollLeft,
    };
  },

  setId: function(id) {
    this.dom.id = id;

    return this;
  },

  getId: function() {
    return this.dom.id;
  },

  setClass: function(name) {
    this.dom.className = name;

    return this;
  },

  addClass: function(name) {
    this.dom.classList.add(name);
    return this;
  },

  removeClass: function(name) {
    this.dom.classList.remove(name);
    return this;
  },

  toggleClass: function(className) {
    this.dom.classList.toggle(className);
    return this;
  },

  setStyle: function(style, value) {
    this.dom.style[style] = value;

    return this;
  },

  getStyle: function(ruleName) {
    return getComputedStyle(this.dom)[ruleName];
  },

  getAttribute: function(attr) {
    return this.dom.getAttribute(attr);
  },

  setAttribute: function(attr, value) {
    this.dom.setAttribute(attr, value);
    return this;
  },

  removeAttribute: function() {
    for (let argument of arguments) {
      this.dom.removeAttribute(argument);
    }
  },

  setProperty: function(property, value) {
    this.dom[property] = value;

    return this;
  },

  setDisabled: function(value) {
    this.dom.disabled = value;

    return this;
  },

  setTextContent: function(value) {
    this.dom.textContent = value;

    return this;
  },

  getTextContent: function() {
    return this.dom.textContent;
  },

  addHTML: function(html) {
    this.dom.innerHTML += html;
    return this;
  },

  html: function(html) {
    this.dom.innerHTML = html;
    return this;
  },

  replaceWith: function() {
    const argument = arguments[0];
    if (argument instanceof UIElement) {
      this.dom.outerHTML = argument.dom;
    } else {
      console.error('UIElement:', argument, 'is not an instance of UIElement.');
    }
  },

  focus: function() {
    this.dom.focus();
  },

  cloneDom: function() {
    return this.dom.cloneNode(true);
  },

  contains: function() {
    let argument = arguments[0];
    if (argument instanceof UIElement) {
      return this.dom !== argument.dom && this.dom.contains(argument.dom);
    } else {
      console.error('UIElement:', argument, 'is not an instance of UIElement.');
    }
  },
};

// events

var events = [
  'KeyUp',
  'KeyDown',
  'MouseOver',
  'MouseOut',
  'Click',
  'DblClick',
  'Change',
  'Focus',
];

events.forEach(function(event) {
  var method = 'on' + event;

  UIElement.prototype[method] = function(callback) {
    this.dom.addEventListener(event.toLowerCase(), callback.bind(this), false);

    return this;
  };
});

// UISpan

var UISpan = function() {
  UIElement.call(this);

  this.dom = document.createElement('span');

  return this;
};

UISpan.prototype = Object.create(UIElement.prototype);
UISpan.prototype.constructor = UISpan;

// UIDiv

var UIDiv = function() {
  UIElement.call(this);

  this.dom = document.createElement('div');

  return this;
};

UIDiv.prototype = Object.create(UIElement.prototype);
UIDiv.prototype.constructor = UIDiv;

// UIRow

var UIRow = function() {
  UIElement.call(this);

  var dom = document.createElement('div');
  dom.className = 'Row';

  this.dom = dom;

  return this;
};

UIRow.prototype = Object.create(UIElement.prototype);
UIRow.prototype.constructor = UIRow;

// UIPanel

var UIPanel = function() {
  UIElement.call(this);

  var dom = document.createElement('div');
  dom.className = 'Panel';

  this.dom = dom;

  return this;
};

UIPanel.prototype = Object.create(UIElement.prototype);
UIPanel.prototype.constructor = UIPanel;

// UIText

var UIText = function(text) {
  UIElement.call(this);

  var dom = document.createElement('span');
  dom.className = 'Text';

  this.dom = dom;
  this.setValue(text);

  return this;
};

UIText.prototype = Object.create(UIElement.prototype);
UIText.prototype.constructor = UIText;

UIText.prototype.getValue = function() {
  return this.dom.textContent;
};

UIText.prototype.setValue = function(value) {
  if (value !== undefined) {
    this.dom.textContent = value;
  }

  return this;
};

// UIInput

var UIInput = function(text = '') {
  UIElement.call(this);

  var dom = document.createElement('input');
  dom.className = 'Input';

  dom.addEventListener(
    'keydown',
    function(event) {
      event.stopPropagation();
    },
    false
  );

  this.dom = dom;
  this.setValue(text);

  return this;
};

UIInput.prototype = Object.create(UIElement.prototype);
UIInput.prototype.constructor = UIInput;

UIInput.prototype.getValue = function() {
  return this.dom.value;
};

UIInput.prototype.setValue = function(value) {
  this.dom.value = value;

  return this;
};

UIInput.prototype.setPlaceHolder = function(value) {
  this.dom.placeholder = value;

  return this;
};

// UITextArea

var UITextArea = function() {
  UIElement.call(this);

  var dom = document.createElement('textarea');
  dom.className = 'TextArea';
  dom.style.padding = '2px';
  dom.spellcheck = false;

  dom.addEventListener(
    'keydown',
    function(event) {
      event.stopPropagation();

      if (event.keyCode === 9) {
        event.preventDefault();

        var cursor = dom.selectionStart;

        dom.value =
          dom.value.substring(0, cursor) + '\t' + dom.value.substring(cursor);
        dom.selectionStart = cursor + 1;
        dom.selectionEnd = dom.selectionStart;
      }
    },
    false
  );

  this.dom = dom;

  return this;
};

UITextArea.prototype = Object.create(UIElement.prototype);
UITextArea.prototype.constructor = UITextArea;

UITextArea.prototype.getValue = function() {
  return this.dom.value;
};

UITextArea.prototype.setValue = function(value) {
  this.dom.value = value;

  return this;
};

// UISelect

var UISelect = function() {
  UIElement.call(this);

  var dom = document.createElement('select');
  dom.className = 'Select';
  dom.style.padding = '3px';

  this.dom = dom;

  return this;
};

UISelect.prototype = Object.create(UIElement.prototype);
UISelect.prototype.constructor = UISelect;

UISelect.prototype.setMultiple = function(boolean) {
  this.dom.multiple = boolean;

  return this;
};

UISelect.prototype.setOptions = function(options) {
  var selected = this.dom.value;

  while (this.dom.children.length > 0) {
    this.dom.removeChild(this.dom.firstChild);
  }

  for (var key in options) {
    var option = document.createElement('option');
    option.value = key;
    option.innerHTML = options[key];
    this.dom.appendChild(option);
  }

  this.dom.value = selected;

  return this;
};

UISelect.prototype.getValue = function() {
  return this.dom.value;
};

UISelect.prototype.setValue = function(value) {
  value = String(value);

  if (this.dom.value !== value) {
    this.dom.value = value;
  }

  return this;
};

// UICheckbox

var UICheckbox = function(boolean) {
  UIElement.call(this);

  var dom = document.createElement('input');
  dom.className = 'Checkbox';
  dom.type = 'checkbox';

  this.dom = dom;
  this.setValue(boolean);

  return this;
};

UICheckbox.prototype = Object.create(UIElement.prototype);
UICheckbox.prototype.constructor = UICheckbox;

UICheckbox.prototype.getValue = function() {
  return this.dom.checked;
};

UICheckbox.prototype.setValue = function(value) {
  if (value !== undefined) {
    this.dom.checked = value;
  }

  return this;
};

// UIColor

var UIColor = function() {
  UIElement.call(this);

  var dom = document.createElement('input');
  dom.className = 'Color';
  dom.style.width = '64px';
  dom.style.height = '17px';
  dom.style.border = '0px';
  dom.style.padding = '2px';
  dom.style.backgroundColor = 'transparent';

  try {
    dom.type = 'color';
    dom.value = '#ffffff';
  } catch (exception) {}

  this.dom = dom;

  return this;
};

UIColor.prototype = Object.create(UIElement.prototype);
UIColor.prototype.constructor = UIColor;

UIColor.prototype.getValue = function() {
  return this.dom.value;
};

UIColor.prototype.getHexValue = function() {
  return parseInt(this.dom.value.substr(1), 16);
};

UIColor.prototype.setValue = function(value) {
  this.dom.value = value;

  return this;
};

UIColor.prototype.setHexValue = function(hex) {
  this.dom.value = '#' + ('000000' + hex.toString(16)).slice(-6);

  return this;
};

// UINumber

var UINumber = function(number) {
  UIElement.call(this);

  var scope = this;

  var dom = document.createElement('input');
  dom.className = 'Number';
  dom.value = '0.00';

  this.value = 0;

  this.min = -Infinity;
  this.max = Infinity;

  this.precision = 2;
  this.step = 1;
  this.unit = '';
  this.nudge = 0.01;

  this.dom = dom;

  this.setValue(number);

  var changeEvent = document.createEvent('HTMLEvents');
  changeEvent.initEvent('change', true, true);

  var distance = 0;
  var onMouseDownValue = 0;

  var pointer = [0, 0];
  var prevPointer = [0, 0];

  function onMouseDown(event) {
    event.preventDefault();

    distance = 0;

    onMouseDownValue = scope.value;

    prevPointer = [event.clientX, event.clientY];

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
  }

  function onMouseMove(event) {
    var currentValue = scope.value;

    pointer = [event.clientX, event.clientY];

    distance += pointer[0] - prevPointer[0] - (pointer[1] - prevPointer[1]);

    var value =
      onMouseDownValue + (distance / (event.shiftKey ? 5 : 50)) * scope.step;
    value = Math.min(scope.max, Math.max(scope.min, value));

    if (currentValue !== value) {
      scope.setValue(value);
      dom.dispatchEvent(changeEvent);
    }

    prevPointer = [event.clientX, event.clientY];
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);

    if (Math.abs(distance) < 2) {
      dom.focus();
      dom.select();
    }
  }

  function onTouchStart(event) {
    if (event.touches.length === 1) {
      distance = 0;

      onMouseDownValue = scope.value;

      prevPointer = [event.touches[0].pageX, event.touches[0].pageY];

      document.addEventListener('touchmove', onTouchMove, false);
      document.addEventListener('touchend', onTouchEnd, false);
    }
  }

  function onTouchMove(event) {
    var currentValue = scope.value;

    pointer = [event.touches[0].pageX, event.touches[0].pageY];

    distance += pointer[0] - prevPointer[0] - (pointer[1] - prevPointer[1]);

    var value =
      onMouseDownValue + (distance / (event.shiftKey ? 5 : 50)) * scope.step;
    value = Math.min(scope.max, Math.max(scope.min, value));

    if (currentValue !== value) {
      scope.setValue(value);
      dom.dispatchEvent(changeEvent);
    }

    prevPointer = [event.touches[0].pageX, event.touches[0].pageY];
  }

  function onTouchEnd(event) {
    if (event.touches.length === 0) {
      document.removeEventListener('touchmove', onTouchMove, false);
      document.removeEventListener('touchend', onTouchEnd, false);
    }
  }

  function onChange() {
    scope.setValue(dom.value);
  }

  function onFocus() {
    dom.style.backgroundColor = '';
    dom.style.cursor = '';
  }

  function onBlur() {
    dom.style.backgroundColor = 'transparent';
    dom.style.cursor = 'col-resize';
  }

  function onKeyDown(event) {
    event.stopPropagation();

    switch (event.keyCode) {
      case 13: // enter
        dom.blur();
        break;

      case 38: // up
        event.preventDefault();
        scope.setValue(scope.getValue() + scope.nudge);
        dom.dispatchEvent(changeEvent);
        break;

      case 40: // down
        event.preventDefault();
        scope.setValue(scope.getValue() - scope.nudge);
        dom.dispatchEvent(changeEvent);
        break;
    }
  }

  onBlur();

  dom.addEventListener('keydown', onKeyDown, false);
  dom.addEventListener('mousedown', onMouseDown, false);
  dom.addEventListener('touchstart', onTouchStart, false);
  dom.addEventListener('change', onChange, false);
  dom.addEventListener('focus', onFocus, false);
  dom.addEventListener('blur', onBlur, false);

  return this;
};

UINumber.prototype = Object.create(UIElement.prototype);
UINumber.prototype.constructor = UINumber;

UINumber.prototype.getValue = function() {
  return this.value;
};

UINumber.prototype.setValue = function(value) {
  if (value !== undefined) {
    value = parseFloat(value);

    if (value < this.min) value = this.min;
    if (value > this.max) value = this.max;

    this.value = value;
    this.dom.value = value.toFixed(this.precision);

    if (this.unit !== '') this.dom.value += ' ' + this.unit;
  }

  return this;
};

UINumber.prototype.setPrecision = function(precision) {
  this.precision = precision;

  return this;
};

UINumber.prototype.setStep = function(step) {
  this.step = step;

  return this;
};

UINumber.prototype.setNudge = function(nudge) {
  this.nudge = nudge;

  return this;
};

UINumber.prototype.setRange = function(min, max) {
  this.min = min;
  this.max = max;

  return this;
};

UINumber.prototype.setUnit = function(unit) {
  this.unit = unit;

  return this;
};

// UIInteger

var UIInteger = function(number) {
  UIElement.call(this);

  var scope = this;

  var dom = document.createElement('input');
  dom.className = 'Number';
  dom.value = '0';

  this.value = 0;

  this.min = -Infinity;
  this.max = Infinity;

  this.step = 1;
  this.nudge = 1;

  this.dom = dom;

  this.setValue(number);

  var changeEvent = document.createEvent('HTMLEvents');
  changeEvent.initEvent('change', true, true);

  var distance = 0;
  var onMouseDownValue = 0;

  var pointer = [0, 0];
  var prevPointer = [0, 0];

  function onMouseDown(event) {
    event.preventDefault();

    distance = 0;

    onMouseDownValue = scope.value;

    prevPointer = [event.clientX, event.clientY];

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
  }

  function onMouseMove(event) {
    var currentValue = scope.value;

    pointer = [event.clientX, event.clientY];

    distance += pointer[0] - prevPointer[0] - (pointer[1] - prevPointer[1]);

    var value =
      onMouseDownValue + (distance / (event.shiftKey ? 5 : 50)) * scope.step;
    value = Math.min(scope.max, Math.max(scope.min, value)) | 0;

    if (currentValue !== value) {
      scope.setValue(value);
      dom.dispatchEvent(changeEvent);
    }

    prevPointer = [event.clientX, event.clientY];
  }

  function onMouseUp() {
    document.removeEventListener('mousemove', onMouseMove, false);
    document.removeEventListener('mouseup', onMouseUp, false);

    if (Math.abs(distance) < 2) {
      dom.focus();
      dom.select();
    }
  }

  function onChange() {
    scope.setValue(dom.value);
  }

  function onFocus() {
    dom.style.backgroundColor = '';
    dom.style.cursor = '';
  }

  function onBlur() {
    dom.style.backgroundColor = 'transparent';
    dom.style.cursor = 'col-resize';
  }

  function onKeyDown(event) {
    event.stopPropagation();

    switch (event.keyCode) {
      case 13: // enter
        dom.blur();
        break;

      case 38: // up
        event.preventDefault();
        scope.setValue(scope.getValue() + scope.nudge);
        dom.dispatchEvent(changeEvent);
        break;

      case 40: // down
        event.preventDefault();
        scope.setValue(scope.getValue() - scope.nudge);
        dom.dispatchEvent(changeEvent);
        break;
    }
  }

  onBlur();

  dom.addEventListener('keydown', onKeyDown, false);
  dom.addEventListener('mousedown', onMouseDown, false);
  dom.addEventListener('change', onChange, false);
  dom.addEventListener('focus', onFocus, false);
  dom.addEventListener('blur', onBlur, false);

  return this;
};

UIInteger.prototype = Object.create(UIElement.prototype);
UIInteger.prototype.constructor = UIInteger;

UIInteger.prototype.getValue = function() {
  return this.value;
};

UIInteger.prototype.setValue = function(value) {
  if (value !== undefined) {
    value = parseInt(value);

    this.value = value;
    this.dom.value = value;
  }

  return this;
};

UIInteger.prototype.setStep = function(step) {
  this.step = parseInt(step);

  return this;
};

UIInteger.prototype.setNudge = function(nudge) {
  this.nudge = nudge;

  return this;
};

UIInteger.prototype.setRange = function(min, max) {
  this.min = min;
  this.max = max;

  return this;
};

// UIBreak

var UIBreak = function() {
  UIElement.call(this);

  var dom = document.createElement('br');
  dom.className = 'Break';

  this.dom = dom;

  return this;
};

UIBreak.prototype = Object.create(UIElement.prototype);
UIBreak.prototype.constructor = UIBreak;

// UIHorizontalRule

var UIHorizontalRule = function() {
  UIElement.call(this);

  var dom = document.createElement('hr');
  dom.className = 'HorizontalRule';

  this.dom = dom;

  return this;
};

UIHorizontalRule.prototype = Object.create(UIElement.prototype);
UIHorizontalRule.prototype.constructor = UIHorizontalRule;

// UIButton

var UIButton = function(value) {
  UIElement.call(this);

  var dom = document.createElement('button');
  dom.className = 'Button';

  this.dom = dom;
  this.dom.textContent = value;

  return this;
};

UIButton.prototype = Object.create(UIElement.prototype);
UIButton.prototype.constructor = UIButton;

UIButton.prototype.setLabel = function(value) {
  this.dom.textContent = value;

  return this;
};

// UITabbedPanel

var UITabbedPanel = function() {
  UIElement.call(this);

  var dom = document.createElement('div');

  this.dom = dom;

  this.setClass('TabbedPanel');

  this.tabs = [];
  this.panels = [];

  this.tabsDiv = new UIDiv();
  this.tabsDiv.setClass('Tabs');

  this.panelsDiv = new UIDiv();
  this.panelsDiv.setClass('Panels');

  this.add(this.tabsDiv);
  this.add(this.panelsDiv);

  this.selected = '';
  this.onTabChangedCallBack = function() {};

  return this;
};

UITabbedPanel.prototype = Object.create(UIElement.prototype);
UITabbedPanel.prototype.constructor = UITabbedPanel;

UITabbedPanel.prototype.select = function(id) {
  var tab;
  var panel;
  var scope = this;

  // Deselect current selection
  if (this.selected && this.selected.length) {
    tab = this.tabs.find(function(item) {
      return item.dom.id === scope.selected;
    });
    panel = this.panels.find(function(item) {
      return item.dom.id === scope.selected;
    });

    if (tab) {
      tab.removeClass('selected');
    }

    if (panel) {
      panel.setStyle('display', 'none');
    }
  }

  tab = this.tabs.find(function(item) {
    return item.dom.id === id;
  });
  panel = this.panels.find(function(item) {
    return item.dom.id === id;
  });

  if (tab) {
    tab.addClass('selected');
  }

  if (panel) {
    panel.setStyle('display', '');
  }

  this.selected = id;
  this.onTabChangedCallBack(id);

  return this;
};

UITabbedPanel.prototype.addTab = function(id, label, items, extra) {
  var tab = new UITabbedPanel.Tab(label, this);
  tab.setId(id);

  if (extra) {
    tab.add(extra);
  }

  this.tabs.push(tab);
  this.tabsDiv.add(tab);

  var panel = new UIDiv();
  panel.setId(id);
  panel.add(items);
  panel.setStyle('display', 'none');
  this.panels.push(panel);
  this.panelsDiv.add(panel);

  return this;
};

UITabbedPanel.prototype.onTabChanged = function(fn) {
  this.onTabChangedCallBack = fn;

  return this;
};

UITabbedPanel.prototype.onChangeTab = function(fn) {};

UITabbedPanel.Tab = function(text, parent) {
  UIText.call(this, text);
  this.parent = parent;

  this.setClass('Tab');

  var scope = this;

  this.dom.addEventListener('click', function() {
    scope.parent.select(scope.dom.id);
  });

  return this;
};

UITabbedPanel.Tab.prototype = Object.create(UIText.prototype);
UITabbedPanel.Tab.prototype.constructor = UITabbedPanel.Tab;

// UIListbox
var UIListbox = function() {
  UIElement.call(this);

  var dom = document.createElement('div');
  dom.className = 'Listbox';
  dom.tabIndex = 0;

  this.dom = dom;
  this.items = [];
  this.listitems = [];
  this.selectedIndex = 0;
  this.selectedValue = null;

  return this;
};

UIListbox.prototype = Object.create(UIElement.prototype);
UIListbox.prototype.constructor = UIListbox;

UIListbox.prototype.setItems = function(items) {
  if (Array.isArray(items)) {
    this.items = items;
  }

  this.render();
};

UIListbox.prototype.render = function() {
  while (this.listitems.length) {
    var item = this.listitems[0];

    item.dom.remove();

    this.listitems.splice(0, 1);
  }

  for (var i = 0; i < this.items.length; i++) {
    var item = this.items[i];

    var listitem = new UIListbox.ListboxItem(this);
    listitem.setId(item.id || `Listbox-${i}`);
    listitem.setTextContent(item.name || item.type);
    this.add(listitem);
  }
};

// Assuming user passes valid list items
UIListbox.prototype.add = function() {
  var items = Array.from(arguments);

  this.listitems = this.listitems.concat(items);

  UIElement.prototype.add.apply(this, items);
};

UIListbox.prototype.selectIndex = function(index) {
  if (index >= 0 && index < this.items.length) {
    this.setValue(this.listitems[index].getId());
  }

  this.selectedIndex = index;
};

UIListbox.prototype.getValue = function() {
  return this.selectedValue;
};

UIListbox.prototype.setValue = function(value) {
  for (var i = 0; i < this.listitems.length; i++) {
    var element = this.listitems[i];

    if (element.getId() === value) {
      element.addClass('active');
    } else {
      element.removeClass('active');
    }
  }

  this.selectedValue = value;

  var changeEvent = document.createEvent('HTMLEvents');
  changeEvent.initEvent('change', true, true);
  this.dom.dispatchEvent(changeEvent);
};

// Listbox Item
UIListbox.ListboxItem = function(parent) {
  UIElement.call(this);

  var dom = document.createElement('div');
  dom.className = 'ListboxItem';

  this.parent = parent;
  this.dom = dom;

  var scope = this;

  function onClick() {
    if (scope.parent) {
      scope.parent.setValue(scope.getId());
    }
  }

  dom.addEventListener('click', onClick, false);

  return this;
};

UIListbox.ListboxItem.prototype = Object.create(UIElement.prototype);
UIListbox.ListboxItem.prototype.constructor = UIListbox.ListboxItem;

// Table
var UITable = function() {
  UIElement.call(this);

  var dom = document.createElement('table');
  dom.className = 'Table';

  this.dom = dom;
  return this;
};

UITable.prototype = Object.create(UIElement.prototype);
UITable.prototype.constructor = UITable;

UITable.prototype.setHeaders = function(headers) {
  this.headers = headers;

  //Get the count of columns.
  var columnCount = headers.length;

  //Add the header row.
  var row = this.dom.insertRow(-1);
  for (var i = 0; i < columnCount; i++) {
    var headerCell = document.createElement('TH');
    headerCell.innerHTML = headers[i];
    row.appendChild(headerCell);
  }

  return this;
};

UITable.prototype.setRows = function(rows) {
  if (!rows[0]) return this;

  //Get the count of columns.
  var columnCount = rows[0].length;

  //Add the data rows.
  for (var i = 0; i < rows.length; i++) {
    var row = this.dom.insertRow(-1);
    for (var j = 0; j < columnCount; j++) {
      var cell = row.insertCell(-1);

      if (rows[i][j].dom) {
        cell.appendChild(rows[i][j].dom);
      } else cell.innerHTML = rows[i][j];
    }
  }

  return this;
};

UITable.prototype.filter = function(value, column) {
  const filter = value.toLowerCase();
  const tr = this.dom.getElementsByTagName('tr');

  for (let i = 1; i < tr.length; i++) {
    let tds = tr[i].getElementsByTagName('td');
    let found = false;

    let columnNotValid = !column || column < 0 || column >= tds.length;
    let len = columnNotValid ? 0 : tds.length;

    for (let j = 0; j < len; j++) {
      let td = columnNotValid ? tds[j] : tds[column];

      if (td) {
        let txtValue = td.textContent || td.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
          found = true;
          break;
        }
      }
    }

    tr[i].style.display = found ? '' : 'none';
  }
};

// Icon
var UIIcon = function(iconClass) {
  UIElement.call(this);

  var dom = document.createElement('i');
  dom.className = 'Icon ' + iconClass;

  this.dom = dom;
  return this;
};

UIIcon.prototype = Object.create(UIElement.prototype);
UIIcon.prototype.constructor = UIIcon;

export {
  UIElement,
  UISpan,
  UIDiv,
  UIRow,
  UIPanel,
  UIText,
  UIInput,
  UITextArea,
  UISelect,
  UICheckbox,
  UIColor,
  UINumber,
  UIInteger,
  UIBreak,
  UIHorizontalRule,
  UIButton,
  UITabbedPanel,
  UIListbox,
  UITable,
  UIIcon,
};
