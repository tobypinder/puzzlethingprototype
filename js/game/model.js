var Model = function(){
  this.grid = null;
  this.init = function(){
    this.grid = new Model_Grid();
    this.grid.init(this);
  }
  this.step = function(ms){
    this.grid.step(ms);
  }
};
