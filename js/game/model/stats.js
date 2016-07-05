var Model_Stats = function(){
  this.model = null;

  this.score = 0;
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
}
