var Keyboard = {
  map: {
    left: 0,
    up: 0,
    right: 0,
    down: 0,
    space: 0
  },
  init: function() {
    document.addEventListener('keydown', function(e) { Keyboard.changeKey(e.keyCode, 1, e) });
    document.addEventListener('keyup',   function(e) { Keyboard.changeKey(e.keyCode, 0, e) });
  },
  changeKey: function(code, state, event) {
    var key = null;
    switch(code) {
      // left
      case 65:
      case 37:
        key = 'left'
        break;
      case 87:
      case 38:
        key = 'up'
        break;
      case 68:
      case 39:
        key = 'right'
        break;
      case 83:
      case 40:
        key = 'down'
        break;
      case 32:
        key = 'space'
        break;
    }

    if(key) {
      Keyboard.map[key] = state
      event.preventDefault();
    }
  }
}
