var Model = function(){
  this.grid = null;
  this.init = function(){
    this.grid = new Model_Grid(this);
  }
  this.step = function(ms){
    this.grid.step(ms);
  }
};
