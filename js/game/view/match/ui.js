var View_Match_UI = function(){
  this.view = null;
  this.ctx = null;
  this.baseX = 81
  this.baseY = 3

  this.init = function(view){
    this.view = view;
    this.ctx = view.ctx;
  };
  this.render = function()
  {
    //if(Main.state == Model_States.match) {
      this.ctx.font="8px";
      this.ctx.fillStyle="#ffffff";
      this.ctx.font = '6px pixeletterregular'
      this.ctx.textAlign = "start";
      this.ctx.textBaseline="top";
      this.ctx.fillText('FPS: ' + Main.frameRate, this.baseX, this.baseY)
    //}
  }
};
