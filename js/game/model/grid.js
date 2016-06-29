var Model_Grid = function(){
  this.model = null;

  this.cursorLX = 2;
  this.cursorRX = 3;
  this.cursorY  = 6;

  this.WIDTH  = 6;
  this.HEIGHT = 12;

  this.CURSOR_MOVE_DELAY = 50;
  this.CURSOR_SWAP_DELAY = 50;
  this.cursorMoveDelay = 0;
  this.cursorSwapDelay = 0;
  this.cursorMoved = false;

  this.rows = []
  this.init = function(view){
    this.model = model;
  };
  this.step = function(ms){
    this.decrementDelays(ms);
    this.moveCursor();

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
}
