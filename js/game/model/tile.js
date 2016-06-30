var Model_Tile = function(){
  this.model = null;
  this.grid = null;

  this.empty = false;

  this.TYPES = {
    void: {
      color: 'rgba(0,0,0,0)',
      empty: true
    },
    red: {
      color: '#933',
      empty: false
    },
    green: {
      color: '#393',
      empty: false
    },
    blue: {
      color: '#339',
      empty: false
    },
    yellow: {
      color: '#993',
      empty: false
    },
    magenta: {
      color: '#939',
      empty: false
    },
    cyan: {
      color: '#399',
      empty: false
    }
  }

  this.type = null;
  this.color = '000';
  this.moving = false;
  this.moveTarget = null;
  this.moveStart  = 0;
  this.moveFinish = 0;
  this.x = -1;
  this.y = -1;

  this.init = function(model, x, y){
    this.model = model;
    this.grid  = model.grid;

    this.x     = x;
    this.y     = y;

    switch(parseInt(Math.random() * 10)) {
      case 0:
        this.type = this.TYPES.red;
        break;
      case 1:
        this.type = this.TYPES.green;
        break;
      case 2:
        this.type = this.TYPES.blue;
        break;
      case 3:
        this.type = this.TYPES.yellow;
        break;
      case 4:
        this.type = this.TYPES.magenta;
        break;
      case 5:
        this.type = this.TYPES.cyan;
        break;
      default:
        this.type = this.TYPES.void;
        break;
    }

    this.color = this.type.color;
    this.empty = this.type.empty;
  }

  this.swapWith = function(ty, tx, delay, callback) {
    var target = this.grid.rows[ty][tx];

    this.grid.rows[ty][tx].moving = true;
    this.moving = true;

    this.moveTarget   = target;
    target.moveTarget = this;

    this.moveStart   = Main.lastMS;
    target.moveStart = Main.lastMS;

    this.moveFinish   = Main.lastMS + delay;
    target.moveFinish = Main.lastMS + delay;

    setTimeout(function(){

      var l = this;
      var r = target;

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
    }.bind(this), delay)
  }

  this.gravity = function()
  {
    // Empty tiles cannot "fall"
    if(this.empty === false)
    {
      if((this.y+1) < this.grid.HEIGHT && this.grid.rows[this.y + 1][this.x].empty === true){
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
}
