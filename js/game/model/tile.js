var Model_Tile = function(model){
  this.model = null;
  this.grid = null;

  this.color = '000'

  this.init = function(model){
    this.model = model;
    this.grid  = model.grid;

    this.color = '';
    this.color = this.color + (Math.random() > 0.5 ? '3' : '6')
    this.color = this.color + (Math.random() > 0.5 ? '3' : '6')
    this.color = this.color + (Math.random() > 0.5 ? '3' : '6')
  }

  this.init(model);
}
