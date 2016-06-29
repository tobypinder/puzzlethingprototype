var View_Grid = function(){
  this.model = null;
  this.view = null;
  this.ctx = null;
  this.baseX = 3;
  this.baseY = 3;
  this.tileWidth = 12;
  this.tileHeight = 12;

  this.gridWidth = 6;
  this.gridHeight = 12;

  this.lineWidth = 1;

  this.init = function(view){
    this.view  = view;
    this.model = view.model;
    this.ctx   = view.ctx;
  };
  this.render = function() {
    // TODO: Render the grid.
    for(var i=0; i<this.gridWidth; i++) {
      for(var j=0; j<this.gridHeight; j++) {
        this.renderCell(i, j);
      }
    }

    this.renderCross(this.model.grid.cursorLX, this.model.grid.cursorY);
    this.renderCross(this.model.grid.cursorRX, this.model.grid.cursorY);
  };

  this.renderCell = function(i, j) {
    this.renderTileBackground(i, j);
  }

  this.renderTileBackground = function(i, j) {
    var x = this.baseX + (i * this.tileWidth);
    var y = this.baseY + (j * this.tileHeight);

    this.ctx.fillStyle = '#f00';
    this.ctx.fillRect(x, y, this.tileWidth, this.tileHeight)
  }

  this.renderCross = function(i, j) {
    var x = this.baseX + (i * this.tileWidth);
    var y = this.baseY + (j * this.tileHeight);

    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineJoin = "round";
    this.ctx.beginPath();

    //tl
    this.ctx.moveTo(x, y + (this.lineWidth * 2))
    this.ctx.lineTo(x, y)
    this.ctx.lineTo(x + (this.lineWidth * 2), y)

    //tr
    this.ctx.moveTo(x + this.tileWidth - (this.lineWidth * 2), y)
    this.ctx.lineTo(x + this.tileWidth, y)
    this.ctx.lineTo(x + this.tileWidth, y + (this.lineWidth * 2))

    //bl
    this.ctx.moveTo(x, y + this.tileHeight - (this.lineWidth * 2))
    this.ctx.lineTo(x, y + this.tileHeight)
    this.ctx.lineTo(x + (this.lineWidth * 2), y + this.tileHeight)

    //br
    this.ctx.moveTo(x + this.tileWidth - (this.lineWidth * 2), y + this.tileHeight)
    this.ctx.lineTo(x + this.tileWidth, y + this.tileHeight)
    this.ctx.lineTo(x + this.tileWidth, y - (this.lineWidth * 2) + this.tileHeight)

    this.ctx.stroke();
  };
}
