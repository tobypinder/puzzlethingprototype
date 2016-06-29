var Model_Grid = function(model){
  this.model = null;

  this.cursorLX = 2;
  this.cursorRX = 3;
  this.cursorY  = 6;

  this.WIDTH  = 6;
  this.HEIGHT = 12;

  this.CURSOR_MOVE_DELAY = 100;
  this.CURSOR_SWAP_DELAY = 150;
  this.cursorMoveDelay = 0;
  this.cursorSwapDelay = 0;
  this.cursorMoved = false;

  this.rows = [];

  this.init = function(model){
    this.model = model;

    for(var i=0; i<this.HEIGHT; i++) {
      var row = [];
      for(var j=0; j<this.WIDTH; j++) {
        row[j] = new Model_Tile(model);
      }
      this.rows.push(row);
    }
  };
  this.step = function(ms){
    this.decrementDelays(ms);
    this.moveCursor();
    this.swapCursor();
  }
  this.decrementDelays = function(ms) {
    this.cursorMoveDelay = this.cursorMoveDelay - ms
    this.cursorSwapDelay = this.cursorSwapDelay - ms
  }
  this.moveCursor = function() {
    if(this.cursorMoveDelay <= 0) {
      if(Keyboard.map.left) {
        this.moveX(-1)
      }
      if(Keyboard.map.right) {
        this.moveX(1)
      }
      if(Keyboard.map.up) {
        this.moveY(-1)
      }
      if(Keyboard.map.down) {
        this.moveY(1)
      }
    }

    if(this.cursorMoved === true) {
      this.cursorMoved = false;
      this.cursorMoveDelay = this.CURSOR_MOVE_DELAY;
    }
  }
  this.swapCursor = function() {
    if(this.cursorSwapDelay <= 0) {
      if(Keyboard.map.space
          && this.rows[this.cursorY][this.cursorLX].moving === false
          && this.rows[this.cursorY][this.cursorRX].moving === false
      ) {
        this.swap();
        this.cursorSwapDelay = this.CURSOR_SWAP_DELAY;
      }
    }
  }
  this.moveX = function(delta) {
    if(this.cursorLX + delta >= 0 && this.cursorRX + delta < this.WIDTH)
    {
      this.cursorLX += delta;
      this.cursorRX += delta;
      this.cursorMoved = true;
    }
  }
  this.moveY = function(delta) {
    if(this.cursorY + delta >= 0 && this.cursorY + delta < this.HEIGHT)
    {
      this.cursorY += delta;
      this.cursorMoved = true;
    }
  }
  this.swap = function() {
    y  = this.cursorY;
    lx = this.cursorLX;
    rx = this.cursorRX;

    this.rows[y][lx].moving = true;
    this.rows[y][rx].moving = true;

    setTimeout(function(){
      var left = this.rows[y][lx];
      var right = this.rows[y][rx];

      this.rows[y][lx] = right;
      this.rows[y][rx] = left;

      this.rows[y][lx].moving = false;
      this.rows[y][rx].moving = false;
    }.bind(this), this.CURSOR_SWAP_DELAY);
  }

  this.init(model);
}
