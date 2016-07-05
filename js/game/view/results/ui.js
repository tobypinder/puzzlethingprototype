var View_Results_UI = function(){
  this.view = null;
  this.ctx = null;
  this.init = function(view){
    this.view = view;
    this.ctx = view.ctx;
  };
  this.render = function()
  {
    if(Main.state == Model_States.results) {
      this.ctx.font="8px";
      this.ctx.textAlign = "center";
      this.ctx.fillStyle="#ffffff";
      this.ctx.font = '8px pixeletterregular'
      this.ctx.fillText('Game Over', this.view.renderWidth/4*2.5, this.view.renderHeight/2)
    }
  }
};
