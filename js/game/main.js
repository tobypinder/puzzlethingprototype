var Main = {
  view: null,
  model: null,
  lastMS: 0,
  frameNumber: 0,
  frameRate: 0,
  init: function(){
    this.model = new Model();
    this.model.init();

    this.view = new View();
    this.view.init(this.model);

    Keyboard.init();

    requestAnimationFrame(Main.step.bind(this))
  },
  step: function(ms){
    var stepMS = this.stepMS(ms);

    this.view.step(stepMS);
    this.model.step(stepMS);

    requestAnimationFrame(Main.step.bind(this))
  },
  stepMS: function(ms) {
    var stepMS = (ms - this.lastMS);

    this.lastMS = ms;
    this.frameNumber++;
    this.frameRate = (1000 / stepMS).toFixed(2);

    return stepMS;
  }
};
