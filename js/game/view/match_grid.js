var View_Match_Grid = function(){
  this.model = null;
  this.view = null;
  this.ctx = null;
  this.baseX = 3;
  this.baseY = 3;
  this.tileWidth = 12;
  this.tileHeight = 12;

  this.lineWidth = 1;

  this.nudgeY = function() {
    return parseInt(this.model.grid.rollingNudgeMS / this.model.grid.ROLLING_NUDGE_TIMER * this.tileHeight * 4) / 4
  }

  this.totalGridWidth = function() {
    return this.tileWidth * this.model.grid.WIDTH;
  }

  this.totalGridHeight = function() {
    return this.tileHeight * this.model.grid.ACTIVE_HEIGHT;
  }

  this.init = function(view){
    this.view  = view;
    this.model = view.model;
    this.ctx   = view.ctx;
  };
  this.render = function() {
    // TODO: Render the grid.
    for(var i=0; i<this.model.grid.WIDTH; i++) {
      for(var j=0; j<this.model.grid.HEIGHT; j++) {
        this.renderCell(i, j);
      }
    }

    this.renderGridBackground();
    this.renderGridMask();

    this.renderCross(this.model.grid.cursorLX, this.model.grid.cursorY);
    this.renderCross(this.model.grid.cursorRX, this.model.grid.cursorY);
  };

  this.renderCell = function(i, j) {
    this.renderTile(i, j);
  }

  this.renderTile = function(i, j) {
    if(this.model.grid.rows[j][i].moving === true) {
      var tile = this.model.grid.rows[j][i];

      var animLength = tile.moveFinish - tile.moveStart
      var percentage = (Main.lastMS - tile.moveStart) / animLength

      // sin^2 easing
      percentage = Math.sin(percentage * Math.PI * 0.5)
      percentage = Math.pow(percentage, 2)

      var posI = ((1 - percentage) * tile.x)  + (percentage * tile.moveTarget.x)
      var posJ = ((1 - percentage) * tile.y)  + (percentage * tile.moveTarget.y)

      var x = this.baseX + (posI * this.tileWidth);
      var y = this.baseY + (posJ * this.tileHeight);
    }else {
      var x = this.baseX + (i * this.tileWidth);
      var y = this.baseY + (j * this.tileHeight);
    }

    y = y - this.nudgeY();

    this.ctx.fillStyle = this.model.grid.rows[j][i].type.color;
    this.ctx.fillRect(x, y, this.tileWidth, this.tileHeight)

    //if(j == this.model.grid.HEIGHT - 1) {
    if(this.model.grid.rows[j][i].locked === true) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
      this.ctx.fillRect(x, y, this.tileWidth, this.tileHeight)
    }
  }

  this.renderCross = function(i, j) {
    var x = this.baseX + (i * this.tileWidth);
    var y = this.baseY + (j * this.tileHeight) - this.nudgeY();

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

  this.renderGridBackground = function() {
    this.ctx.strokeStyle = '#999';
    this.ctx.strokeRect(
      this.baseX,
      this.baseY,
      this.totalGridWidth(),
      this.totalGridHeight()
    )
  }

  this.renderGridMask = function(){
    this.ctx.fillStyle = '#999';

    // Top
    this.ctx.fillRect(
      0,
      0,
      this.totalGridWidth() + (2 * this.baseX),
      this.baseY
    )

    // Bottom
    this.ctx.fillRect(
      0,
      this.totalGridHeight() + this.baseY,
      this.totalGridWidth() + (2 * this.baseX),
      this.baseY
    )

    // Left
    this.ctx.fillRect(
      0,
      0,
      this.baseX,
      this.totalGridHeight() + (2 * this.baseY)
    )

    // Left
    this.ctx.fillRect(
      this.totalGridWidth() + this.baseX,
      0,
      this.baseX,
      this.totalGridHeight() + (2 * this.baseY)
    )
  }
}
