var kkk = {
  autocompletion: {
    antragsteller: {
      parseSelection: function(data, usecase) {
        try {
          var result = kkk.autocompletion.splitAutoCompletionItem(data),
              zip = document.getElementById('Kundendaten:kd_plz'),
              city = document.getElementById('Kundendaten:kd_ort'),
              street = document.getElementById('Kundendaten:kd_strasse'),
              district = document.getElementById('Kundendaten:kd_ortsteil'),
              hausnr = document.getElementById('Kundendaten:kd_hausnr');
          switch (usecase) {
            case 'ZIP':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
                city.focus();
              }
              break;
            case 'CITY':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
              }
              if (!district.disabled) {
                district.focus();
              }
              break;
            case 'STREET':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
              }
              if (!street.disabled) {
                street.value = result[0];
                hausnr.focus();
              }
              break;
            case 'DISTRICT':
              if (!district.disabled) {
                district.value = result[3];
              }
              break;
            default:
              break;
          }
        } catch (e) {
          // Nothing
        }
      },
    },
    mitantragsteller: {
      parseSelection: function(data, usecase) {
        try {
          var result = kkk.autocompletion.splitAutoCompletionItem(data),
              zip = document.getElementById('Kundendaten:kd_mas_plz'),
              city = document.getElementById('Kundendaten:kd_mas_ort'),
              street = document.getElementById('Kundendaten:kd_mas_strasse'),
              district = document.getElementById('Kundendaten:kd_mas_ortsteil'),
              hausnr = document.getElementById('Kundendaten:kd_mas_hausnr');
          switch (usecase) {
            case 'ZIP':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
                city.focus();
              }
              break;
            case 'CITY':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
              }
              if (!district.disabled) {
                district.focus();
              }
              break;
            case 'STREET':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
              }
              if (!street.disabled) {
                street.value = result[0];
                hausnr.focus();
              }
              break;
            case 'DISTRICT':
              if (!district.disabled) {
                district.value = result[3];
              }
              break;
            default:
              break;
          }
        } catch (e) {
          // Nothing
        }
      },
    },
    gv1: {
      parseSelection: function(data, usecase) {
        try {
          var result = kkk.autocompletion.splitAutoCompletionItem(data),
              zip = document.getElementById('Kundendaten:vater:gv_plz'),
              city = document.getElementById('Kundendaten:vater:gv_ort'),
              street = document.getElementById('Kundendaten:vater:gv_strasse'),
              district = document.getElementById(
                  'Kundendaten:vater:gv_ortsteil'),
              hausnr = document.getElementById('Kundendaten:vater:gv_hausnr');
          switch (usecase) {
            case 'ZIP':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
                city.focus();
              }
              break;
            case 'CITY':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
              }
              if (!district.disabled) {
                district.focus();
              }
              break;
            case 'STREET':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
              }
              if (!street.disabled) {
                street.value = result[0];
                hausnr.focus();
              }
              break;
            case 'DISTRICT':
              if (!district.disabled) {
                district.value = result[3];
              }
              break;
            default:
              break;
          }
        } catch (e) {
          // Nothing
        }
      },
    },
    gv2: {
      parseSelection: function(data, usecase) {
        try {
          var result = kkk.autocompletion.splitAutoCompletionItem(data),
              zip = document.getElementById('Kundendaten:mutter:gv_plz'),
              city = document.getElementById('Kundendaten:mutter:gv_ort'),
              street = document.getElementById('Kundendaten:mutter:gv_strasse'),
              district = document.getElementById(
                  'Kundendaten:mutter:gv_ortsteil'),
              hausnr = document.getElementById('Kundendaten:mutter:gv_hausnr');
          switch (usecase) {
            case 'ZIP':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
                city.focus();
              }
              break;
            case 'CITY':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
              }
              if (!district.disabled) {
                district.focus();
              }
              break;
            case 'STREET':
              if (!zip.disabled) {
                zip.value = result[1];
              }
              if (!city.disabled) {
                city.value = result[2];
              }
              if (!street.disabled) {
                street.value = result[0];
                hausnr.focus();
              }
              break;
            case 'DISTRICT':
              if (!district.disabled) {
                district.value = result[3];
              }
              break;
            default:
              break;
          }
        } catch (e) {
          // Nothing
        }
      },
    },
    splitAutoCompletionItem: function(value) {
      return value.split('<br/>');
    },
    mapIds: function(id) {
      var key = '';

      switch (id) {
        case 'Kundendaten:kd_plz':
        case 'Kundendaten:kd_mas_plz':
        case 'Kundendaten:vater:gv_plz':
        case 'Kundendaten:mutter:gv_plz':
          key = 'zip';
          break;
        case 'Kundendaten:kd_ort':
        case 'Kundendaten:kd_mas_ort':
        case 'Kundendaten:vater:gv_ort':
        case 'Kundendaten:mutter:gv_ort':
          key = 'city';
          break;
        case 'Kundendaten:kd_strasse':
        case 'Kundendaten:kd_mas_strasse':
        case 'Kundendaten:vater:gv_strasse':
        case 'Kundendaten:mutter:gv_strasse':
          key = 'street';
          break;
        case 'Kundendaten:kd_ortsteil':
        case 'Kundendaten:kd_mas_ortsteil':
        case 'Kundendaten:vater:gv_ortsteil':
        case 'Kundendaten:mutter:gv_ortsteil':
          key = 'city-district';
          break;
        case 'country':
          key = 'country';
          break;
        default:
          break;
      }
      return key;
    },
    initAsAutoCompletion: function(acUrl, apikey) {
      var configPlz = {
        url: acUrl,
        maxResults: 20,
        children: '.inputsPlz',
        onSelect: function(data) {
          kkk.autocompletion.antragsteller.parseSelection(data, 'ZIP');
        },
        order: ['zip', 'city'],
      };
      var configCity = {
        url: acUrl,
        maxResults: 20,
        children: '.inputsCity',
        onSelect: function(data) {
          kkk.autocompletion.antragsteller.parseSelection(data, 'CITY');
        },
        order: ['zip', 'city'],
      };
      var configDistrict = {
        url: acUrl,
        maxResults: 20,
        children: '.inputsDistrict',
        onSelect: function(data) {
          kkk.autocompletion.antragsteller.parseSelection(data, 'DISTRICT');
        },
        order: ['city_district'],
      };
      var configStreet = {
        url: acUrl,
        children: '.inputsStreet',
        maxResults: 20,
        onSelect: function(data) {
          kkk.autocompletion.antragsteller.parseSelection(data, 'STREET');
        },
        order: ['street', 'zip', 'city'],
      };
      new AutoComplete('#Kundendaten\\:kd_plz', configPlz, apikey);
      new AutoComplete('#Kundendaten\\:kd_ort', configCity, apikey);
      new AutoComplete('#Kundendaten\\:kd_strasse', configStreet, apikey);
    },
    initMasAutoCompletion: function(acUrl, apikey) {
      var configPlz = {
        url: acUrl,
        maxResults: 20,
        children: '.masInputsPlz',
        onSelect: function(data) {
          kkk.autocompletion.mitantragsteller.parseSelection(data, 'ZIP');
        },
        order: ['zip', 'city'],
      };
      var configCity = {
        url: acUrl,
        maxResults: 20,
        children: '.masInputsCity',
        onSelect: function(data) {
          kkk.autocompletion.mitantragsteller.parseSelection(data, 'CITY');
        },
        order: ['zip', 'city'],
      };
      var configDistrict = {
        url: acUrl,
        maxResults: 20,
        children: '.masInputsDistrict',
        onSelect: function(data) {
          kkk.autocompletion.mitantragsteller.parseSelection(data, 'DISTRICT');
        },
        order: ['city_district'],
      };
      var configStreet = {
        url: acUrl,
        children: '.masInputsStreet',
        maxResults: 20,
        onSelect: function(data) {
          kkk.autocompletion.mitantragsteller.parseSelection(data, 'STREET');
        },
        order: ['street', 'zip', 'city'],
      };
      new AutoComplete('#Kundendaten\\:kd_mas_plz', configPlz, apikey);
      new AutoComplete('#Kundendaten\\:kd_mas_ort', configCity, apikey);
      new AutoComplete('#Kundendaten\\:kd_mas_strasse', configStreet, apikey);
    },
    initGv1AutoCompletion: function(acUrl, apikey) {
      var acUrl = 'http://real-time.data-quality-service.com/rest/auto-completion/complete_address';
      var configPlz = {
        url: acUrl,
        maxResults: 20,
        children: '.gv1InputsPlz',
        onSelect: function(data) {
          kkk.autocompletion.gv1.parseSelection(data, 'ZIP');
        },
        order: ['zip', 'city'],
      };
      var configCity = {
        url: acUrl,
        maxResults: 20,
        children: '.gv1InputsCity',
        onSelect: function(data) {
          kkk.autocompletion.gv1.parseSelection(data, 'CITY');
        },
        order: ['zip', 'city'],
      };
      var configDistrict = {
        url: acUrl,
        maxResults: 20,
        children: '.gv1InputsDistrict',
        onSelect: function(data) {
          kkk.autocompletion.gv1.parseSelection(data, 'DISTRICT');
        },
        order: ['city_district'],
      };
      var configStreet = {
        url: acUrl,
        children: '.gv1InputsStreet',
        maxResults: 20,
        onSelect: function(data) {
          kkk.autocompletion.gv1.parseSelection(data, 'STREET');
        },
        order: ['street', 'zip', 'city'],
      };
      new AutoComplete('#Kundendaten\\:vater\\:gv_plz', configPlz, apikey);
      new AutoComplete('#Kundendaten\\:vater\\:gv_ort', configCity, apikey);
      new AutoComplete('#Kundendaten\\:vater\\:gv_strasse', configStreet,
          apikey);
    },
    initGv2AutoCompletion: function(acUrl, apikey) {
      var acUrl = 'http://real-time.data-quality-service.com/rest/auto-completion/complete_address';
      var configPlz = {
        url: acUrl,
        maxResults: 20,
        children: '.gv2InputsPlz',
        onSelect: function(data) {
          kkk.autocompletion.gv2.parseSelection(data, 'ZIP');
        },
        order: ['zip', 'city'],
      };
      var configCity = {
        url: acUrl,
        maxResults: 20,
        children: '.gv2InputsCity',
        onSelect: function(data) {
          kkk.autocompletion.gv2.parseSelection(data, 'CITY');
        },
        order: ['zip', 'city'],
      };
      var configDistrict = {
        url: acUrl,
        maxResults: 20,
        children: '.gv2InputsDistrict',
        onSelect: function(data) {
          kkk.autocompletion.gv2.parseSelection(data, 'DISTRICT');
        },
        order: ['city_district'],
      };
      var configStreet = {
        url: acUrl,
        children: '.gv2InputsStreet',
        maxResults: 20,
        onSelect: function(data) {
          kkk.autocompletion.gv2.parseSelection(data, 'STREET');
        },
        order: ['street', 'zip', 'city'],
      };
      new AutoComplete('#Kundendaten\\:mutter\\:gv_plz', configPlz, apikey);
      new AutoComplete('#Kundendaten\\:mutter\\:gv_ort', configCity, apikey);
      new AutoComplete('#Kundendaten\\:mutter\\:gv_strasse', configStreet,
          apikey);
    },
  },
};
var buttonsPressed = new Array();
var betragTimerId;
var betragSlider;

//hiermit wird ein Button disabled, sobald er geklickt (Keypress) wurde (siehe enableButton) 
function disableButton(id) {
  if (id) {
    var button = null;
    try {
      button = document.getElementById(id);
    } catch (e) {
    }
    if (button) {
      button.disabled = true;
      buttonsPressed.push(id);
    }
  }
}

//hiermit wird ein Button enabled, da ein Klick(Keypress) ihn disabled (siehe disableButton) 
function enableButton() {
  if (buttonsPressed.length > 0) {
    var buttonsToPop = new Array();
    for (var i = 0; i < buttonsPressed.length; i++) {
      var id = buttonsPressed[i];
      var button = null;
      try {
        button = document.getElementById(id);
      } catch (e) {
      }
      if (button) {
        button.disabled = false;
        buttonsToPop.push(id);
      }
    }
    for (var i = 0; i < buttonsToPop.length; i++) {
      buttonsPressed.pop(buttonsToPop[i]);
    }
  }
}

function checkTextAreaInputLength() {
  var txt = document.getElementById('abschlussForm:marktfolgeArea').value;
  if (txt == null) {
    return;
  }
  if (txt.length > 1000) {
    document.getElementById('abschlussForm:marktfolgeArea').value = txt.slice(0,
        1000);
  }
}

function checkScheibe() {
  if ('true' == document.getElementById('scheibenWert').innerHTML) {
    showScheibe();
  } else {
    hideScheibe();
  }
}

//Anzeige der Popup-Scheibe
function showScheibe() {
  if (jQuery('.ui-widget-overlay').size() === 0) {
    document.getElementById('popupScheibe').style.display = '';
    var height = (window.screen.availHeight > document.body.clientHeight) ?
        window.screen.availHeight : document.body.clientHeight;
    document.getElementById('popupScheibe').style.height = height + 'px';
  }
}

// verstecken der Popup-Scheibe
function hideScheibe() {
  document.getElementById('popupScheibe').style.display = 'none';
}

function showAjaxScheibe() {
  document.body.style.cursor = 'wait';
  document.getElementById('ajaxScheibe').style.display = '';
  var height = (window.screen.availHeight > document.body.clientHeight) ?
      window.screen.availHeight : document.body.clientHeight;
  document.getElementById('ajaxScheibe').style.height = height + 'px';
}

function hideAjaxScheibe() {
  document.body.style.cursor = 'default';
  document.getElementById('ajaxScheibe').style.display = 'none';
}

//Überschreiben des Title Attributes um undefined Popup zu umgehen
function setBodyAttributes() {
  document.body.title = '';
}

function isInteger(value) {
  return String(value).search(/^\s*(\+|-)?\d+\s*$/) != -1;
}

//Zeige zwischen dem Auslösen eines Ajax-Requests und der Antwort den Sanduhr-Cursor an
function onEventResponse(event) {
  if (event.status == 'complete' || event.status == 'success' ||
      event.status == 'error') {
    document.body.style.cursor = 'default';
    document.getElementById('ajaxScheibe').style.display = 'none';
  }

  if (event.status == 'begin') {
    document.body.style.cursor = 'wait';
    document.getElementById('ajaxScheibe').style.display = '';
  }
}

function buildBetragsSlider() {

  var newValue = parseInt(document.getElementById(
      'dispo_bestaetigung_form_id:sliderIndexHidden').value);
  var newMax = parseInt(document.getElementById(
      'dispo_bestaetigung_form_id:maxSliderTickHidden').value);
  betragSlider = 1;

  $('#betragSlider').slider({
    max: newMax,
    value: newValue,
  });
}

//warten bis Schieber initialisiert sind
function waitForSlider() {
  var test = betragSlider;

  if ((typeof test == 'undefined')
      || (test == null)
      || (test == 'undefined')) {
    setTimeout('waitForSlider()', 500);
  } else {
    setEventHandlers();
  }
}

//Event Handler an Schieber basteln
function setEventHandlers() {
  // Events attachen
  var betragSliderThumb = document.getElementById('betragSlider').children[1];
  var betragSliderRail = document.getElementById('betragSlider').children[0];

  if (betragSliderThumb != 'undefined' && betragSliderThumb != null) {
    betragSliderThumb.onmousedown = function() {
      updateValueField();
    };
    betragSliderRail.onmousedown = function() {
      updateValueField();
    };
  } else {
    waitForSlider();
  }

  document.body.onmouseup = function() {
    if (betragTimerId) {
      clearTimeout(betragTimerId);
      betragTimerId = null;
    }
  };
};

//update des Textfeldes aufgrund von Wunschbetragsänderung
function updateValueField() {
  var wunschBetragAusgabe = document.getElementById(
      'dispo_bestaetigung_form_id:kb_wunschbetrag');
  var minBetrag = document.getElementById(
      'dispo_bestaetigung_form_id:minBetrag').innerHTML.replace('.', '');
  var index = $('#betragSlider').slider('option', 'value');

  if (isInteger(minBetrag)) {
    var newValue = parseInt(minBetrag) + index * 100;
    document.getElementById(
        'dispo_bestaetigung_form_id:sliderIndexHidden').value = index;
    wunschBetragAusgabe.value = formatPrice(newValue, false);
    // Validierungsmeldung ausknipsen (falls vorhanden)
    if (document.getElementById('dispo_bestaetigung_form_id:wunschbetragMsg')) {
      document.getElementById(
          'dispo_bestaetigung_form_id:wunschbetragMsg').style.display = 'none';
    }
    betragTimerId = setTimeout('updateValueField()', 50);
  }
};

//update der Schieberposition aufgrund einer Texteingabe
function updateSchieber() {
  var minValue = document.getElementById(
      'dispo_bestaetigung_form_id:minBetrag').innerHTML.replace('.', '');
  var currentValue = document.getElementById(
      'dispo_bestaetigung_form_id:kb_wunschbetrag').value.replace('.', '');
  var maxValue = document.getElementById(
      'dispo_bestaetigung_form_id:maxBetrag').innerHTML.replace('.', '');

  if (isInteger(currentValue)) {
    if (minValue <= currentValue && currentValue <= maxValue) {
      var index = (currentValue - minValue) / 100;
      document.getElementById(
          'dispo_bestaetigung_form_id:sliderIndexHidden').value = index;
      // Schieberposition aktualisieren
      $('#betragSlider').slider('option', 'value', index);
      // Validierungsmeldung ausknipsen (falls vorhanden)
      if (document.getElementById(
              'dispo_bestaetigung_form_id:wunschbetragMsg')) {
        document.getElementById(
            'dispo_bestaetigung_form_id:wunschbetragMsg').style.display = 'none';
      }
      // Eingabefeld mit dem formatierten Wert überschreiben
      document.getElementById(
          'dispo_bestaetigung_form_id:kb_wunschbetrag').value
          = formatPrice(currentValue, false);
    }
  }
}

//Formatierung eines monetären Betrags
function formatPrice(price, withcents) {
  price += '';
  price = price.replace('.', ',');
  var idx = (price.indexOf(',') >= 0) ? price.indexOf(',') : price.length;
  var decimal = price.substring(0, idx);
  var out = '';
  var cnt = 0;
  for (var i = decimal.length - 1; i >= 0; i--) {
    out = decimal.substr(i, 1) + out;
    cnt++;
    if ((cnt % 3 == 0) && (i > 0)) {
      out = '.' + out;
    }
  }

  var cents = price.substring(idx + 1, price.length);
  if (cents.length > 0) {
    cents = ',' + cents;
    if (cents.length < 3) {
      cents += '0';
    }
  } else {
    cents = ',00';
  }

  if (withcents == true) {
    if (cents.length > 2) {
      var tmp = (Math.floor(parseFloat(cents.replace(',', '.')) * 100) /
          100).toString().replace('0.', ',');
      cents = (tmp != '0') ? tmp : ',00';
      if (cents.length < 3) {
        cents += '0';
      }
      ;
    }
    return (out + cents);
  }
  return (out);
};

/**
 * Disable backspace key for all elements except input text/textarea fields.
 * http://www.sitepoint.com/forums/showthread.php?t=168890
 */
if (typeof window.event != 'undefined') {
  document.onkeydown = function() {
    var element = event.srcElement;
    var type = element.type;
    var tagName = element.tagName.toUpperCase();
    if (tagName != 'INPUT' && tagName != 'TEXTAREA') {
      return (event.keyCode != 8);
    } else {
      if (tagName == 'INPUT') {
        if (type == 'hidden' || type == 'button' || type == 'submit' ||
            element.readOnly == true) {
          return (event.keyCode != 8);
        }
      }
    }
  };
} else {
  document.onkeypress = function(e) {
    var target = e.target;
    var type = target.type;
    var nodeName = target.nodeName.toUpperCase();
    if (nodeName != 'INPUT' && nodeName != 'TEXTAREA') {
      return (e.keyCode != 8);
    } else {
      if (nodeName == 'INPUT') {
        if (type == 'hidden' || type == 'button' || type == 'submit' ||
            target.readOnly == true) {
          return (e.keyCode != 8);
        }
      }
    }
  };
}

function normalizeInput(element) {
  element.value = jQuery.trim(element.value).
      replace(new RegExp('\\s{2,}', 'g'), ' ');
}

function checkListBeforeUpping(element) {
  normalizeInput(element);
  var value = element.value;
  var nameArray = value.split(' ');
  var list = document.getElementById('nachnameAusschlussliste').innerHTML;
  if (nameArray.length == 1) {
    firstLetterToUpper(element);
  } else {
    var listArray = list.split(',');
    var found = false;
    for (var i = 0; i < listArray.length; i++) {
      if (nameArray[0] == listArray[i]) {
        found = true;
      }
    }
    if (!found) {
      firstLetterToUpper(element);
    }
  }
}

function firstLetterToUpper(element) {
  normalizeInput(element);
  element.value = element.value.slice(0, 1).toUpperCase() +
      element.value.slice(1);
}

/*
 * wird bei jedem ajax ausgelöst, zeigt scheibe und sanduhr an,
 * input-felder werden normalisiert und eventhandler für normalisierung erneuert
 */
function handleAjax(data) {
  var ajaxStatus = data.status; // Can be "begin", "complete", "success" and "error".
  switch (ajaxStatus) {
    case 'begin': // Right before sending ajax request.
      showAjaxScheibe();
      if (data.source.type === 'text') {
        normalizeInput(data.source);
      } else if (data.source.type === 'submit') {
        disableButton(data.source.id);
      }
      break;
    case 'complete':
      break;
    case 'success': // When ajax response is successfully processed.
      if (data.source.type === 'submit') {
        enableButton();
        checkDisabled();
      } else if (data.source.type === 'text') {
        jQuery('.iceInpTxt').blur(function() {
          normalizeInput(this);
        });
        jQuery('.iceInpTxt').change(function() {
          normalizeInput(this);
        });
      }
      hideAjaxScheibe();
      break;
    default: // When ajax response is unsuccessfully processed.
      enableButton();
      checkDisabled();
      hideAjaxScheibe();
      break;
  }
}

//webRTC-Check
function detectRTC() {
  if ((typeof DetectRTC != 'undefined')
      && (DetectRTC != null)
      && (DetectRTC != 'undefined')) {
    DetectRTC.load(function() {
      jQuery('#produktAuswahlForm\\:webRTCSupported').
          val((DetectRTC.isWebRTCSupported || DetectRTC.isORTCSupported));
    });
    jQuery('#produktAuswahlForm\\:webRTCSupported').
        val((DetectRTC.isWebRTCSupported || DetectRTC.isORTCSupported));
  }
};

var updateIFramePopup = function() {
  jQuery('#iFrame0').remove();
  jQuery('.show').show();
  jQuery('.hide').hide();
  jQuery('#iFrameWrapper').
      addClass('contentLevelContainer').
      css('margin', '8px');
  jQuery('.frameHolder').each(function() {
    var elementHeight = jQuery(this).outerHeight(); // including padding
    var topValue = window.screen.availHeight / 2 - elementHeight / 2 +
        jQuery(window).scrollTop() - 35;
    topValue = topValue <= 0 ? 0 : topValue;
    jQuery(this).css('top', topValue);
    var elementWidth = jQuery(this).outerWidth(), // including padding
        leftValue = window.screen.availWidth / 2 - elementWidth / 2 +
            jQuery(window).scrollLeft() - window.screen.availWidth * 0.2;
    leftValue = leftValue <= 0 ? 0 : leftValue;
    jQuery(this).css('left', leftValue);
  });
};

var closeVideoIdentIFrame = function() {
  jQuery('.videoIdentDisabled').prop('disabled', true);
  jQuery('#iFrame0').remove();
  jQuery('.show').show();
  jQuery('.hide').hide();
  jQuery('.frameHolder').hide();
  jQuery('#videoIdentText').css('color', 'green');
  jQuery('#postIdentText').css('color', 'red').css('font-weight', 'bold');
  hideScheibe();
  clearInterval(kkk.videoLegiPopupResizer);
};

var closeEluIFrame = function() {
  jQuery('#iFrame0').remove();
  jQuery('.show').show();
  jQuery('.hide').hide();
  jQuery('#iFrameWrapper').
      addClass('contentLevelContainer').
      css('margin', '8px');
  jQuery('.frameHolder').each(function() {
    var elementHeight = jQuery(this).outerHeight(); // including padding
    var topValue = window.screen.availHeight / 2 - elementHeight +
        jQuery(window).scrollTop();
    topValue = topValue <= 0 ? 0 : topValue;
    jQuery(this).css('top', topValue);
    var elementWidth = jQuery(this).outerWidth(), // including padding
        leftValue = jQuery(window).width() / 2 - elementWidth / 2 +
            jQuery(window).scrollLeft();
    leftValue = leftValue <= 0 ? 0 : leftValue;
    jQuery(this).css('left', leftValue);

  });
  kkk.centrizePopUp();
  clearInterval(kkk.videoLegiPopupResizer);
};

kkk.centrizePopUp = function() {
  jQuery('.frameHolder').each(function() {
    showScheibe();
  });
};

var checkDisabled = function(development) {
  jQuery('.disabled').each(function() {
    this.disabled = true;
  });
};
