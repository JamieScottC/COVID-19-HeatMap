$(document).ready(function(){

  //Cycle through all   the state elements
  for(var i = 0; i < $('.container *').length; i++){
    var state = $('.container').children().eq(i);
    //Put state name in element
    state.html("<span>" + state.attr('id') + "</span>");
  }
  adjustSize();

  //Crreate grid layout with masonry
  $(".container").masonry({
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
  });

});
//Function for Get request
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
//Adjusts size of states cells based on total cases
function adjustSize(){
    //Grab our COVID data and parse it
    var stateData = JSON.parse(httpGet("https://covidtracking.com/api/states"));
    var usData = JSON.parse(httpGet("https://covidtracking.com/api/us"));
    var totalCases = usData[0]['positive'];
    //Cycle through all the state elements
    for(var i = 0; i < $('.container *').length; i++){
        var state = $('.container').children().eq(i);
        //Find data for state and adjust size of element accordingly
        for(var j = 0; j < stateData.length; j++){
            if(stateData[j]['state'] === state.attr('id')){
                 var stateCases = stateData[j]['positive'];
                 var percentage = (stateCases / totalCases);
                 var area = percentage * 9721.95;
                 var width = Math.sqrt(area);
                 var height = area / 5;
                 state.css('width', width + '%');
                 if(height > 50){
                    state.css('height', height + 'px');
                 }
                 if((state.width() / 6) > 15){
                    state.children().eq(0).css('font-size', (state.width() / 6) + 'px');
                 }
            }
        }
    }
    
}