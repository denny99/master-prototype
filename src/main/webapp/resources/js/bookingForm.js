$(document).ready(() => {
  let output = $('#passengerCountOutput');
  $('#passengerSlider').slider({
    max: 10,
    value: 1,
    change: (event, ui) => {
      output.val(ui.value);
    },
  });
});