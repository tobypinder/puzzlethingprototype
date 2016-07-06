var View_Match_UI = function(){
  this.view = null;
  this.ctx = null;
  this.baseX = 81;
  this.baseY = 3;
  this.lineHeight = 8;
  this.columnOffset = 74;

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

    this.ctx.fillText('Score: ' + this.view.model.game.player_stats.score, this.baseX, this.baseY + this.lineHeight)
    this.ctx.fillText('Level: ' + this.view.model.game.player_stats.level(), this.baseX + this.columnOffset, this.baseY + this.lineHeight)

    // STATS
    var matches = this.view.model.game.player_stats.matches
    for(var i=3;i<=7;i++) {
      this.ctx.fillText("█ x" +i+' = ' + matches['m' + i], this.baseX, this.baseY + (i * this.lineHeight))
    }
  }
};
