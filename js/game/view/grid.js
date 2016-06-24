var View_Grid = function(){
  this.view = null;
  this.ctx = null;
  this.init = function(view){
    this.view = view;
    this.ctx = view.ctx;
  };
  this.baseX = 2;
  this.baseY = 2;
  this.tileWidth = 16;
  this.tileHeight = 16;
  this.lineWidth = 2;
  this.render = function() {
    // TODO: Render the grid.


    this.renderCross(this.baseX + this.lineWidth, this.baseY + this.lineWidth, this.lineWidth * 2, this.lineWidth * 2);
    //this.renderCross(this.baseX + this.lineWidth + this.tileWidth, this.baseY + this.lineWidth, this.lineWidth * 2, this.lineWidth * 2);
  };

  this.renderCross = function(x, y, w, h) {
    this.ctx.strokeStyle = '#fff';
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.lineJoin = "round";
    this.ctx.beginPath();

    //tl
    this.ctx.moveTo(x    , y + h)
    this.ctx.lineTo(x    , y)
    this.ctx.lineTo(x + w, y)

    //tr
    this.ctx.moveTo(x + this.tileWidth - w, y)
    this.ctx.lineTo(x + this.tileWidth, y)
    this.ctx.lineTo(x + this.tileWidth, y + h)

    //bl
    this.ctx.moveTo(x    , y + this.tileHeight - h)
    this.ctx.lineTo(x    , y + this.tileHeight)
    this.ctx.lineTo(x + w, y + this.tileHeight)

    //br
    this.ctx.moveTo(x + this.tileWidth - w, y + this.tileHeight)
    this.ctx.lineTo(x + this.tileWidth, y + this.tileHeight)
    this.ctx.lineTo(x + this.tileWidth, y - h + this.tileHeight)


    this.ctx.stroke();

  };
}
