var Model_Tile = function(){
  this.model = null;
  this.grid = null;

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

    this.color = '';
    this.color = this.color + (Math.random() > 0.5 ? '3' : '9')
    this.color = this.color + (Math.random() > 0.5 ? '3' : '9')
    this.color = this.color + (Math.random() > 0.5 ? '3' : '9')
  }

  this.swapWith = function(ty, tx, delay, callback) {

    var target = this.grid.rows[ty][tx];
    console.log("Swapping ["+this.y+"]["+this.x+"] <> ["+target.y+"]["+target.x+"] ("+ty+"|"+tx+") ")

    this.grid.rows[ty][tx].moving = true;
    this.moving = true;

    this.moveTarget   = target;
    target.moveTarget = this;

    this.moveStart   = Main.lastMS;
    target.moveStart = Main.lastMS;

    this.moveFinish   = Main.lastMS + delay;
    target.moveFinish = Main.lastMS + delay;

    setTimeout(function(){
      callback.bind(this)();
      var l = this;
      var r = target;

      this.moving   = false;
      target.moving = false;

      // Swap internal metadata

      //console.log("Swapping ["+l.y+"]["+l.x+"] <> ["+r.y+"]["+r.x+"]")
      var tx = target.x;
      var ty = target.y;

      target.x = this.x;
      target.y = this.y;

      this.x = tx;
      this.y = ty;

      this.grid.rows[this.y][this.x]     = this;
      this.grid.rows[target.y][target.x] = target;

      //debugger;

    }.bind(this), delay)

  }
}
