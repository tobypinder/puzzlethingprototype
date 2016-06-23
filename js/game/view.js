var View = function(){
  this.ctx = null;
  this.ui = null;
  this.canvasHeight = 800;
  this.canvasWidth = 600;
  this.renderHeight = 200;
  this.renderWidth = 150;
  this.lastRender = Date.now();
  this.calculateFPS = function()
  {
    var time = Date.now();
    result = parseInt(1000 / (time - this.lastRender))

    this.lastRender = time;
    return result
  };
  this.renderScaleX = function()
  {
    return this.canvasHeight / this.renderHeight
  };
  this.renderScaleY = function()
  {
    return this.canvasHeight / this.renderHeight
  };
  this.frameNumber = 0;
  this.stepInterval = null;
  this.init = function(){
    var c = document.getElementById('game');
    this.ctx = c.getContext('2d');
    this.ctx.imageSmoothingEnabled = false;
    this.stepInterval = setInterval(this.step.bind(this), Main.renderMS());

    this.ui = new View_UI();
    this.ui.init(this);

    this.grid = new View_Grid();
    this.grid.init(this);

  };
  this.step = function()
  {
    this.frameNumber++;
    this.wipe();
    this.pushState();

    this.ui.render();
    this.grid.render();

    this.popState();
  };

  this.wipe = function()
  {
    this.ctx.fillStyle = '#111111';
    this.ctx.fillRect(0, 0, this.canvasHeight, this.canvasWidth);
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
    this.ctx.translate(-0.5, -0.5);
  }

  this.startScale = function()
  {
    this.ctx.scale(this.renderScaleX(), this.renderScaleY());
  }
};
