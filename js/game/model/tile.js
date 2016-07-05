var Model_Tile = function(){
  this.model = null;
  this.grid = null;

  this.type = null;

  this.moving = false;
  this.locked = false;
  this.moveTarget = null;
  this.moveStart  = 0;
  this.moveFinish = 0;
  this.x = -1;
  this.y = -1;

  this.init = function(model, x, y, factory){
    this.model = model;
    this.grid  = model.grid;
    // factory: init | nudge
    if(factory === 'nudge') {
      this.lock();
    }

    this.x = x;
    this.y = y;

    if(factory == 'init' && this.y < this.grid.START_HEIGHT) {
      this.type = Model_Tile_Types.void;
    } else {
      switch(parseInt(Math.random() * 6)) {
        case 0:
          this.type = Model_Tile_Types.red;
          break;
        case 1:
          this.type = Model_Tile_Types.green;
          break;
        case 2:
          this.type = Model_Tile_Types.blue;
          break;
        case 3:
          this.type = Model_Tile_Types.yellow;
          break;
        case 4:
          this.type = Model_Tile_Types.magenta;
          break;
        case 5:
          this.type = Model_Tile_Types.cyan;
          break;
        default:
          this.type = Model_Tile_Types.void;
          break;
      }
    }
  }

  this.invalidMatch = function() {
    return this.type.empty === true || this.moving === true || this.locked === true
  }

  this.swapWith = function(ty, tx, delay, callback) {
    var target = this.grid.rows[ty][tx];

    if(target.moving || this.moving) {
      return false;
    }

    this.grid.rows[ty][tx].moving = true;
    this.moving = true;

    this.moveTarget   = target;
    target.moveTarget = this;

    this.moveStart   = Main.lastMS;
    target.moveStart = Main.lastMS;

    this.moveFinish   = Main.lastMS + delay;
    target.moveFinish = Main.lastMS + delay;

    setTimeout(function(){
      this.moving   = false;
      target.moving = false;

      // Swap internal metadata
      var tx = target.x;
      var ty = target.y;

      target.x = this.x;
      target.y = this.y;

      this.x = tx;
      this.y = ty;

      this.grid.rows[this.y][this.x]     = this;
      this.grid.rows[target.y][target.x] = target;

      if(callback) {
        callback.bind(this)(target);
      }

      this.matchCheck();
      target.matchCheck();
    }.bind(this), delay)
  }

  this.gravity = function()
  {
    // Empty tiles cannot "fall"
    if(!this.invalidMatch())
    {
      if((this.y+1) < this.grid.HEIGHT && this.grid.rows[this.y + 1][this.x].type.empty === true){
        // Tile is above empty space.
        this.swapWith(this.y + 1, this.x, this.grid.GRAVITY_DELAY, function(target){

          // Fall further?
          this.gravity();

          // Stuff above can now fall?
          if(target.y > 0) {
            this.grid.rows[target.y - 1][target.x].gravity();
          }
        })
      }
    }
  }

  this.matchCheck = function() {
    if(this.invalidMatch()) {
      return false;
    }

    var left  = this.matchCheckLeft([]);
    var right = this.matchCheckRight([]);
    var up    = this.matchCheckUp([]);
    var down  = this.matchCheckDown([]);

    if(left.length + right.length >= 2) {
      this.transformTileType(Model_Tile_Types.void)

      for(var i=0; i< left.length; i++) {
        this.grid.rows[left[i][1]][left[i][0]].transformTileType(Model_Tile_Types.void)
      }
      for(var i=0; i< right.length; i++) {
        this.grid.rows[right[i][1]][right[i][0]].transformTileType(Model_Tile_Types.void)
      }
    }

    if((up.length + down.length) >= 2) {
      this.transformTileType(Model_Tile_Types.void)

      for(var i=0; i< up.length; i++) {
        this.grid.rows[up[i][1]][up[i][0]].transformTileType(Model_Tile_Types.void)
      }
      for(var i=0; i< down.length; i++) {
        this.grid.rows[down[i][1]][down[i][0]].transformTileType(Model_Tile_Types.void)
      }
    }
  }

  this.matchCheckLeft = function(match) {
    if(this.x === 0 || this.invalidMatch()) {
      return match;
    }

    var target = this.grid.rows[this.y][this.x - 1];

    if(target.invalidMatch() || target.type.color !== this.type.color){
      return match;
    } else {
      match.push([target.x, target.y])
      return target.matchCheckLeft(match);
    }
  }

  this.matchCheckRight = function(match) {
    if((this.x + 1) >= this.grid.WIDTH || this.invalidMatch()) {
      return match;
    }

    var target = this.grid.rows[this.y][this.x + 1];

    if(target.invalidMatch() || target.type.color !== this.type.color){
      return match;
    } else {
      match.push([target.x, target.y]);
      return target.matchCheckRight(match);
    }
  }

  this.matchCheckUp = function(match) {
    if(this.y === 0 || this.invalidMatch()) {
      return match;
    }

    var target = this.grid.rows[this.y - 1][this.x];

    if(target.invalidMatch() || target.type.color !== this.type.color){
      return match;
    } else {
      match.push([target.x, target.y]);
      return target.matchCheckUp(match);
    }
  }
  this.matchCheckDown = function(match) {
    if((this.y + 1) >= this.grid.HEIGHT || this.invalidMatch()) {
      return match;
    }

    var target = this.grid.rows[this.y + 1][this.x];

    if(target.invalidMatch() || target.type.color !== this.type.color){
      return match;
    } else {
      match.push([target.x, target.y]);
      return target.matchCheckDown(match);
    }
  }

  this.transformTileType = function(type) {
    this.type = type;

    if(this.y > 0) {
      this.grid.rows[this.y-1][this.x].gravity()
    }
  }

  this.lock = function() {
    this.locked = true;
  }

  this.unlock = function() {
    this.locked = false;
    this.matchCheck();
  }
}
