var View = function(){
  this.ctx = null;
  this.model = null;
  this.ui = null;
  this.canvasWidth = 800;
  this.canvasHeight = 600;
  this.renderWidth = 200;
  this.renderHeight = 150;
  this.renderScaleX = function()
  {
    return this.canvasHeight / this.renderHeight
  };
  this.renderScaleY = function()
  {
    return this.canvasHeight / this.renderHeight
  };
  this.init = function(model){
    var c = document.getElementById('game');
    this.ctx = c.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;

    this.model = model;

    this.ui = new View_UI();
    this.ui.init(this);

    this.grid = new View_Grid();
    this.grid.init(this);
  };
  this.step = function(ms)
  {
    this.wipe();
    this.pushState();

    this.ui.render();
    this.grid.render();

    this.popState();
  };

  this.wipe = function()
  {
    this.ctx.fillStyle = '#111111';
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
  };

  this.pushState = function()
  {
    this.ctx.save();
    this.startNudge();
    this.startScale();
  }

  this.popState = function()
  {
    this.ctx.restore();
  }

  this.startNudge = function()
  {
    // Disabled antialias nudge - must be a better method!
    // this.ctx.translate(-0.5, -0.5);
  }

  this.startScale = function()
  {
    this.ctx.scale(this.renderScaleX(), this.renderScaleY());
  }
};
