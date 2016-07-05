var Model_Tile_Type = function(color, empty){
  this.color = color;
  this.empty = empty;
}

var Model_Tile_Types = {
  void: new Model_Tile_Type('rgba(0,0,0,0)', true),
  red: new Model_Tile_Type('#933', false),
  green: new Model_Tile_Type('#393', false),
  blue: new Model_Tile_Type('#339', false),
  yellow: new Model_Tile_Type('#993', false),
  magenta: new Model_Tile_Type('#939', false),
  cyan: new Model_Tile_Type('#399', false)
}
