var Model = function(){
  this.stepInterval = null;
  this.lastRender = Date.now();
  this.calculateRenderMS = function()
  {
    var time = Date.now();
    result = (time - this.lastRender);
    this.lastRender = time;
    return result;
  };

  this.init = function(){
    this.stepInterval = setInterval(this.step.bind(this), Main.renderMS());
  }
  this.step = function(){
    this.currentStepMS = this.calculateStepMS()
    console.log("Rendering "+this.currentStepMS+ "ms");
  }
};
