$(document).ready(function(){

  for(var i = 0; i < $('.container *').length; i++){
    var state = $('.container').children().eq(i);
    state.html("<span>" + state.attr('id').replace('_', ' ') + "</span>");

  }

});