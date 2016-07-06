var Model_Stats = function(){
  this.model = null;
  this.grid = null;

  this.score = 0;
  this.nudges = 0;
  this.level = function(){
    return (Math.floor((this.nudges) / 3)) + 1
  }

  this.matches = {
    m3: 0,
    m4: 0,
    m5: 0,
    m6: 0,
    m7: 0
  }

  this.combos = {
    x1: 0,
    x2: 0,
    x3: 0,
    x4: 0,
    x5: 0,
    x6: 0,
    x7: 0,
    x8: 0,
    x9: 0,
    x10: 0
  }

  this.init = function(model){
    this.model = model;
  };
  this.step = function(ms){

  }
  this.addMatch = function(number) {
    this.matches['m' + number]++;

    this.score += Math.pow(2, number -3) * 10 * number
  }

  this.recordNudge = function() {
    var currentLevel = this.level();
    this.nudges += 1

    if(this.level() > currentLevel) {
      this.accelerateGrid();
    }
  }

  this.accelerateGrid = function(){
    // TODO: I am a megahack and these shouldn't appear to be constants.
    this.grid.ROLLING_NUDGE_TIMER = this.grid.ROLLING_NUDGE_TIMER * 0.85;
    this.grid.CURSOR_SWAP_DELAY = this.grid.CURSOR_SWAP_DELAY * 0.85;
  }
}
