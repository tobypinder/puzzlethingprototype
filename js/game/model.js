var Model = function(){
  this.grid = null;
  this.game = null;
  this.init = function(){
    this.game = new Model_Game();
    this.game.init(this);

    this.grid = this.game.player_grid
  }
  this.step = function(ms){
    this.game.step(ms);
  }
};
