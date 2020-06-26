$(document).ready(function(){
  //Cycle through all the state elements
  for(var i = 0; i < $('.container *').length; i++){
    var state = $('.container').children().eq(i);
    //Put state name in element
    state.html("<span>" + state.attr('id') + "</span>");
    adjustSize();
  }


});
function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function adjustSize(){
    //Grab our COVID data and parse it
    var stateData = JSON.parse(httpGet("https://covidtracking.com/api/states"));
    var usData = JSON.parse(httpGet("https://covidtracking.com/api/us"));
    var totalCases = usData[0]['positive']
    //Find data for state and adjust size of element accordingly
    for(var j = 0; j < data.length; j++){
        if(data[i]['state'] === state.attr('id')){
             
        }
    }
}