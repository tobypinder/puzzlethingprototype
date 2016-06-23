var Main = {
  view: null,
  model: null,
  renderFPS: 60,
  renderMS: function() { return (1000 / parseFloat(this.renderFPS)) },
  engineFPS: 60,
  engineMS: function() { return (1000 / parseFloat(this.engineFPS)) },
  gameLoop: null,
  init: function(){
    this.view = new View();
    this.view.init();

    this.model = new Model();
    this.model.init();
  },
  step: function(){
    this.view.step();
    this.model.step();
  }
};
