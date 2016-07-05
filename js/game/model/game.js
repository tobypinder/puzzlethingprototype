var Model_Game = function(){
  this.model = null;
  this.player_grid = null;
  this.player_stats = null;

  this.init = function(model){
    this.model = model;

    this.player_stats = new Model_Stats();
    this.player_stats.init(this);

    this.player_grid = new Model_Grid();
    this.player_grid.init(this.player_stats);
  };
  this.step = function(ms){
    this.player_grid.step(ms);
    this.player_stats.step(ms);
  }
}
