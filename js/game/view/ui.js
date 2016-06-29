View_UI = function(){
  this.view = null;
  this.ctx = null;
  this.init = function(view){
    this.view = view;
    this.ctx = view.ctx;
  };
  this.render = function()
  {
    this.ctx.font="8px";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle="#ffffff";
    this.ctx.fillText('FPS: ' + Main.frameRate, this.view.renderHeight/2, this.view.renderWidth/2)
  }
};
