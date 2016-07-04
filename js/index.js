$(function() {
  var loaded = 0;
  var scripts = [
    'main',
    'model',
    'model/grid',
    'model/tile',
    'view',
    'view/ui',
    'view/grid',
    'keyboard'
  ];

  $.each(scripts, function(index, value) {
    var path = 'js/game/' + value + '.js'
    $.getScript(path).done(function(){
      // console.log('Loaded '+ path)
      loaded++;

      if(loaded == scripts.length) {
        Main.init();
      }
    }).fail(function(jqxhr, settings, exception) {
      console.group('Ajax Loading Failure');
      console.error('Could not load file: '+ path);
      console.error(exception);
      console.groupEnd();
    });

  });
});
