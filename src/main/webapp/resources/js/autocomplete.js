/**
 * autocompletion JS module
 *
 * author daniel kagemann @ uniserv GmbH Pforzheim
 * created 2016-12-15
 *
 */

/**
 * Parameter for autocompletion.
 */
var AutoCompleteParameters = {
  ident: true,
  regexp: true,
  loc: false,
  equiv: true,
  prefix: true,
  suffix: false,
  fuzzy: false,
  synonym: true,
  diff: false,
  max_results: 20,

  /**
   * convert to JSON session parameter
   *
   * @param key
   *            the internal parameter to be converted
   * @return flat string in json format
   */
  toJSON: function(key) {
    return '{"enabled":"' + this[key] + '","start_tag":"<span class=\'p-'
        + key + '\'>","end_tag":"</span>"}';
  },

  /**
   * generate data uri
   *
   * @return data uri as string
   */
  query: function() {
    var uri = '', key, fmt = '';

    // build query
    for (key in AutoCompleteParameters) {
      if (typeof AutoCompleteParameters[key] === 'boolean') {
        if (uri.length > 0) {
          uri += '&';
        }
        // build the parameter string
        uri += 'par_' + key + '=' + encodeURIComponent(this.toJSON(key));
      } else if (typeof AutoCompleteParameters[key] === 'number') {
        if (uri.length > 0) {
          uri += '&';
        }
        // build the parameter string
        uri += 'par_' + key + '=' + AutoCompleteParameters[key];
      }
    }
    return uri;
  },
};

// /////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Autocomplete object
 *
 * @param selector
 *            the parent object to set automcomplete
 * @param opts
 *            options see above
 * @param token
 *            your API key
 */
function AutoComplete(selector, opts, token) {
  var self = this;

  this.results = [];
  this.container = false;
  this.element = $(selector);
  this.timeData = '';
  this.resultsNavigation = -1;
  this.token = token;
  this.dataMap = {};

  this.options = $.extend({
    minChars: 3,
    url: 'interfacekit-rest/auto-completion/complete_address',
    order: ['street', 'zip', 'city', 'city_district'],
    onSelect: function(data) {
    },
    onStart: function() {
    },
    onError: function(xhr) {
    },
    onInfo: function(data) {
    },
    timeInterval: 300,
    children: '',
    maxResults: 10,
  }, opts);

  // install keyboardhandler
//	this.element.on("keypress", function(e) {
//		self.onKey(e);
//	});
  this.element.on('keyup', function(e) {
    self.onKey(e);
  });
  this.element.on('focusout', function(e) {
    self.showContainer(false);
  });
  this.element.on('focus', function(e) {
    self.showContainer(true);
  });

  $(window).on('resize', function() {
    if (self.container !== false) {
      self.showResults(null);
    }
  });
  this.element.attr('autocomplete', 'off');
  this.installTimer();
}

/**
 * show results for selected item
 *
 * @param id
 *            the data-id of result list
 */
AutoComplete.prototype.handleSelection = function(id) {
  if (id) {
    id = parseInt(id, 10);
    if (id >= 0 && id < this.results.length) {
      var text = this.getFormattedOutput(this.results[id]);
      this.options.onSelect(text);
      //this.element.val("");
      this.showContainer(false);
    }
  }
};

/**
 * remove html tags from given data
 *
 * @param data
 *            string containing html
 * @return stripped string
 */
AutoComplete.prototype.noHTML = function(data) {
  data = data || '';
  return data.replace(/<(?:.|\n)*?>/gm, '');
};

/**
 * get outputformat of selection
 */
AutoComplete.prototype.getFormattedOutput = function(data) {
  var text = '';

  text += this.noHTML(data.out_street) + '<br/>';
  text += this.noHTML(data.out_zip) + '<br/>' + this.noHTML(data.out_city)
      + '<br/>' + this.noHTML(data.out_city_district) + '<br/>' +
      data.out_country;
  return text;
};

/**
 * install timer for timed requests
 */
AutoComplete.prototype.installTimer = function() {
  var self = this;
  if (this.options.timeInterval > 0) {
    setTimeout(function() {
      // check difference of value
      if (self.timeData.length > 0) {
        self.request(self.timeData);
        self.timeData = '';
      }
      // restart timeout
      self.installTimer();
    }, self.options.timeInterval);
  }
};

/**
 * show/hide autocompletion container
 *
 * @param showFlag
 *            true to show, otherwise false
 */
AutoComplete.prototype.showContainer = function(showFlag) {
  if (this.container !== false) {
    this.container[showFlag ? 'show' : 'hide']();
    if (showFlag === false) {
      this.container.remove();
      this.container = false;
      this.results = [];
      this.timeData = '';
      this.resultsNavigation = -1;
    }
  }
};

/**
 * create container with result data
 *
 * @param data
 *            the results
 */
AutoComplete.prototype.showResults = function(data) {
  var fixPos = this.element.offset(), height = this.element.outerHeight(),
      width = this.element.outerWidth()
          || 'auto';

  if (data != null) {
    this.results = data;
  }
  // create if not existing
  if (this.container === false) {
    this.container = $('<div class="autocomplete"></div>');
    $('body').append(this.container);

    var self = this;
    // install some handler
    this.container.on('mousedown', function(e) {
      var id = $(e.target).attr('data-id');
      // in case of html between the line we should get the parent
      if (typeof id === 'undefined') {
        id = $(e.target).parent().attr('data-id');
      }
      self.handleSelection(id);
      self.showContainer(false);
      return false;
    });
  }

  // set position
  this.container.css({
    position: 'absolute',
    left: fixPos.left,
    top: fixPos.top + height,
    //width : width
  });

  // clear content if data available
  if (data != null) {
    this.container.empty();
    this.dataMap = {};

    // order and check the real length
    var i, text, maxresults = this.options.maxResults, begin = 0,
        end = Math.min(maxresults, data.length);

    for (i = begin; i < end; i++) {
      text = this.getOrderText(data[i], ' ');
      if (!(text in this.dataMap)) {
        this.dataMap[text] = text;
        this.container.append('<div class="autocomplete--item" data-id="'
            + i + '">' + text + '</div>');
      }
    }

    // hide if no data available
    if (data.length === 0) {
      this.showContainer(false);
    }
  }
};

/**
 * return text separated with given key and order using options.
 *
 * @param data
 *            the json data
 * @param separator
 *            the separator to use
 */
AutoComplete.prototype.getOrderText = function(data, separator) {
  var j, text = '';
  for (j = 0; j < this.options.order.length; j++) {
    var name = this.options.order[j];
    name = /^out_/.test(name) ? name : ('out_' + name);
    if (data[name]) {
      if (data[name].length > 0) {
        if (text.length > 0) {
          text += separator;
        }
        text += data[name];
        text += name === 'out_street' ? ', ' : '';
      }
    }
  }
  return text;
};

/**
 * sending request
 *
 * @param value
 *            the value to send
 */
AutoComplete.prototype.request = function(value) {
  var self = this,
      ajaxCall;
  self.options.onStart();

  ajaxCall = {
    url: self.options.url,
    data: AutoCompleteParameters.query() + '&' + value,
    success: function(data) {
      self.showResults(data.content);
      self.options.onInfo(data.info);
    },
    error: function(jqXHR) {
      if (jqXHR.status === 406) {
        self.options.onInfo(jqXHR.responseJSON.info);
      }
      self.options.onError(jqXHR);
    },
  };

  if (document.documentMode < 10) {
    ajaxCall['headers'] = {
      'X-Auth-Token': self.token,
      'Origin': window.location.protocol + '//' + window.location.host,
    };
  } else {
    ajaxCall['headers'] = {'X-Auth-Token': self.token};
  }
  $.ajax(ajaxCall);
};

/**
 * handle navigation via keyboard
 *
 * @param keycode
 *            the code
 * @return true if navigation keys
 */
AutoComplete.prototype.handleNavigation = function(keycode) {
  if (this.container === false) {
    return false;
  }
  switch (keycode) {
//	case 37: // left
//	case 39: // right
//		$('[data-id=-1]').mousedown();
//		break;
    case 38: // up
      this.resultsNavigation -= (this.resultsNavigation > 0) ? 1 : 0;
      break;
    case 40: // down
      this.resultsNavigation += (this.resultsNavigation < this.results.length -
          1) ? 1
          : 0;
      this.resultsNavigation = (this.resultsNavigation == -1) ? 0
          : this.resultsNavigation;
      break;
    case 37: // left
    case 39: // right
    case 13: // return
      this.handleSelection($(
          '.autocomplete--item:eq(' + this.resultsNavigation + ')').attr(
          'data-id'));
      return true;
    case 27: // escape
      this.showContainer(false);
      return true;
    default:
      return false; // do nothing here
  }
  // update the selection
  $('.autocomplete--item').removeClass('selected');
  $('.autocomplete--item:eq(' + this.resultsNavigation + ')').addClass(
      'selected');
  return true;
};

/**
 * key handler for user input
 *
 * @param ev
 *            the event object
 */
AutoComplete.prototype.onKey = function(ev) {
  var val = this.element.val(), key = this.element.attr('name'), query = '';

  key = kkk.autocompletion.mapIds(key);

  // handle keyboard navigation
  if (this.handleNavigation(ev.keyCode) === true) {
    return false;
  }

  key = /^in_/.test(key) ? key : ('in_' + key);

  if (val.length >= this.options.minChars) {
    // collect all fields
    if (this.options.children.length > 0) {
      var i, name, lst = $(this.options.children);

      for (i = 0; i < lst.length; i++) {
        name = kkk.autocompletion.mapIds($(lst[i]).attr('name'));
        if (name != key) {
          if (query.length > 0) {
            query += '&';
          }

          // all args must start with "in_" except country
          if (name !== 'country') {
            name = /^in_/.test(name) ? name : ('in_' + name);
          }
          query += name + '=' + encodeURIComponent($(lst[i]).val());
        }
      }
    }
    if (query.length > 0) {
      query += '&';
    }
    query += key + '=' + val;

    // only in case of timeinterval = 0 we send direct
    if (this.options.timeInterval > 0) {
      this.timeData = query;
    } else {
      this.request(query);
    }
  } else {
    this.showContainer(false); // remove old container if there is one
  }
};
