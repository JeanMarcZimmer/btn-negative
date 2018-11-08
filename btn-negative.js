/*
** Author: Jean-Marc Zimmer
** Licence: MIT
*/

$(function() {

  const hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];

  function hex(x) {
    return isNaN(x) ? "00" : hexDigits[(x - x % 16) / 16] + hexDigits[x % 16];
  }
  function hexify(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
  function darken(rgb) {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    return "rgb(" + parseInt(0.9 * rgb[1]) + ',' + parseInt(0.88 * rgb[2]) + ',' + parseInt(0.87 * rgb[3]) + ')';
  }

  function getParentBackground($elem) {
    var color = $elem.css("background-color");
    if (color && color !== 'rgba(0, 0, 0, 0)')
      return color;
    return ($elem.is('body') ? false : getParentBackground($elem.parent()));
  }

  function getParentColor($elem) {
    var color = $elem.css("color");
    if (color && color !== 'rgba(0, 0, 0, 0)')
      return color;
    return ($elem.is('body') ? false : getParentColor($elem.parent()));
  }

  $('.btn-negative, .btn-outline-negative').each(function() {
    var bgColor = hexify(getParentBackground($(this).parent()));
    var color = hexify(getParentColor($(this).parent()));
    var rgb = getParentColor($(this).parent());
    this.style.setProperty('--btn-negative-color0', bgColor);
    this.style.setProperty('--btn-negative-color1', color);
    this.style.setProperty('--btn-negative-shadow-color', color + "88");
    this.style.setProperty('--btn-negative-color2', hexify(darken(rgb)));
    this.style.setProperty('--btn-negative-color3', hexify(darken(darken(rgb))));
  });

});