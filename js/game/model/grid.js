var Model_Grid = function(){
  this.model = null;

  this.cursorLX = 2;
  this.cursorRX = 3;
  this.cursorY  = 6;

  this.WIDTH  = 6;
  this.HEIGHT = 12;

  this.CURSOR_MOVE_DELAY = 100;
  this.NUDGE_DELAY = 700;

  //this.CURSOR_SWAP_DELAY = 500;
  //this.GRAVITY_DELAY = 1000;
  this.CURSOR_SWAP_DELAY = 150;
  this.GRAVITY_DELAY = 100;

  this.cursorMoveDelay = 0;
  this.cursorSwapDelay = 0;
  this.nudgeDelay = 0;
  this.cursorMoved = false;

  this.rows = [];

  this.init = function(model){
    this.model = model;

    for(var i=0; i<this.HEIGHT; i++) {
      var row = [];
      for(var j=0; j<this.WIDTH; j++) {
        row[j] = new Model_Tile();
        row[j].init(model, j, i);
      }
      this.rows.push(row);
    }

    // Gravity Testing
    for(var i=0; i<this.HEIGHT; i++) {
      for(var j=0; j<this.WIDTH; j++) {
        this.rows[i][j].gravity();
      }
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
    this.nudgeDelay = this.nudgeDelay - ms
  }
  this.moveCursor = function() {
    if(this.cursorMoveDelay <= 0) {
      if(Keyboard.map.left) {
        this.moveX(-1);
      }
      if(Keyboard.map.right) {
        this.moveX(1);
      }
      if(Keyboard.map.up) {
        this.moveY(-1);
      }
      if(Keyboard.map.down) {
        this.moveY(1);
      }
    }
    if(this.nudgeDelay < 0) {
      if(Keyboard.map.nudge) {
        this.nudge();
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
    var y  = this.cursorY;
    var lx = this.cursorLX;
    var rx = this.cursorRX;

    this.rows[y][lx].swapWith(y, rx, this.CURSOR_SWAP_DELAY, function(target){
      this.gravity();
      target.gravity();

      if(y > 0) {
        this.grid.rows[y - 1][lx].gravity();
        this.grid.rows[y - 1][rx].gravity();
      }
    });
  }

  this.nudge = function() {
    var emptyAtTop = true;

    $.each(this.rows[0], function(idx) {
      if(this.rows[0][idx].empty !== true) {
        emptyAtTop = false;
      }
    }.bind(this));

    if(emptyAtTop) {
      // Remove top row, add filled bottom row.
      this.rows.shift();

      var blocks = [];
      for(var i=0;i<this.WIDTH;i++) {
        var tile = new Model_Tile();
        tile.init(this.model, i, this.HEIGHT-1, 'filled');

        blocks.push(tile);
      }

      for(var y=0;y<(this.HEIGHT-1);y++)
      {
        for(var x=0;x<this.WIDTH;x++) {
          this.rows[y][x].y = y
        }
      }

      this.rows.push(blocks)
    }

    this.nudgeDelay = this.NUDGE_DELAY;
  }
}
