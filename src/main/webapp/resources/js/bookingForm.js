$(document).ready(() => {
  // jsf generates ids formId:givenId
  let currentValueInput = $('#bookingData\\:passengerCountOutput');
  let maxValueInput = $('#bookingData\\:maxSliderTickHidden');
  let slider = $('#passengerCountSlider').slider({
    max: maxValueInput.val(),
    value: currentValueInput.val(),
    change: (event, ui) => {
      currentValueInput.val(ui.value);
    },
  });

  document.updateSlider = function() {
    let currentValue = Number.parseInt(currentValueInput.val());
    let maxValue = Number.parseInt(maxValueInput.val());
    let minValue = 1;
    if (minValue <= currentValue && currentValue <= maxValue) {
      // Schieberposition aktualisieren
      // to avoid a loop only change when changed through direct input
      slider.slider('value', currentValue);
      // Validierungsmeldung ausknipsen (falls vorhanden)
      if (document.getElementById('bookingData:costMsg')) {
        document.getElementById(
            'bookingData:costMsg').style.display = 'none';
      }
    }
  };
});