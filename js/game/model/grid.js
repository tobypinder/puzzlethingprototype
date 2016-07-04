var Model_Grid = function(){
  this.model = null;

  this.cursorLX = 2;
  this.cursorRX = 3;
  this.cursorY  = 6;

  this.WIDTH  = 6;
  this.HEIGHT = 13;
  this.ACTIVE_HEIGHT = this.HEIGHT - 1;
  this.START_HEIGHT = 7;

  this.CURSOR_MOVE_DELAY = 130;
  this.NUDGE_DELAY = 700;
  this.ROLLING_NUDGE_TIMER = 8000

  //this.CURSOR_SWAP_DELAY = 500;
  //this.GRAVITY_DELAY = 1000;
  this.CURSOR_SWAP_DELAY = 175;
  this.GRAVITY_DELAY = 100;

  this.cursorMoveDelay = 0;
  this.cursorSwapDelay = 0;
  this.nudgeDelay = 0;
  this.rollingNudgeMS = 0;
  this.cursorMoved = false;
  this.rows = [];

  this.init = function(model){
    this.model = model;

    for(var i=0; i<this.HEIGHT; i++) {
      var row = [];
      for(var j=0; j<this.WIDTH; j++) {
        row[j] = new Model_Tile();
        row[j].init(model, j, i, 'init');

        if(i == this.HEIGHT - 1) {
          row[j].lock();
        }
      }
      this.rows.push(row);
    }

    // Gravity and match testing
    for(var i=0; i<this.HEIGHT; i++) {
      for(var j=0; j<this.WIDTH; j++) {
        this.rows[i][j].gravity();
        this.rows[i][j].matchCheck();
      }
    }
  };
  this.step = function(ms){
    this.decrementDelays(ms);
    this.moveCursor();
    this.swapCursor();
  }
  this.decrementDelays = function(ms) {
    this.cursorMoveDelay -= ms
    this.cursorSwapDelay -= ms
    this.nudgeDelay -= ms
    this.rollingNudgeMS += ms

    if(this.rollingNudgeMS > this.ROLLING_NUDGE_TIMER) {
      this.rollingNudgeMS -= this.ROLLING_NUDGE_TIMER
      this.nudge(false)
    }
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
        this.nudge(true);
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
    if(this.cursorY + delta >= 0 && this.cursorY + delta < this.ACTIVE_HEIGHT)
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

  this.nudge = function(forced) {
    var emptyAtTop = true;

    // TODO: Only check and prevent if force = false. If false = true and overflowing, then
    // gameover or start the gameover timer.

    $.each(this.rows[0], function(idx) {
      if(this.rows[0][idx].empty !== true) {
        emptyAtTop = false;
      }
    }.bind(this));

    if(emptyAtTop) {
      // Remove top row
      this.rows.shift();

      // Update Y Metadata for all blocks.
      for(var y=0;y<(this.HEIGHT-1);y++)
      {
        for(var x=0;x<this.WIDTH;x++) {
          this.rows[y][x].y = y
        }
      }

      // Add filled bottom row.
      var blocks = [];
      for(var i=0; i<this.WIDTH; i++) {
        // Create new tile.
        var tile = new Model_Tile();
        tile.init(this.model, i, this.HEIGHT-1, 'nudge');

        blocks.push(tile);
      }

      this.rows.push(blocks)

      // Unlock tiles above and check for matches.
      $.each(this.rows[this.HEIGHT-2], function(idx){
        this.rows[this.HEIGHT - 2][idx].unlock();
      }.bind(this));
    }

    this.nudgeDelay = this.NUDGE_DELAY;
  }
}
