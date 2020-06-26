$(document).ready(function(){

  //Cycle through all   the state elements
  for(var i = 0; i < $('.container *').length; i++){
    var state = $('.container').children().eq(i);
    //Put state name in element
    state.html("<span>" + state.attr('id') + "</span>");
  }
  adjustSize();
  adjustColor();
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
                 //Adjust width
                 state.css('width', width + '%');
                 //Adjust height
                 if(height > 50){
                    state.css('height', height + 'px');
                 }
                 //Adjust font size
                 if((state.width() / 6) > 15){
                    state.children().eq(0).css('font-size', (state.width() / 6) + 'px');
                 }
            }
        }
    }
    
}

//Adjusts color based on total new cases
function adjustColor(){
    //First lets find the national avg of new cases
    var stateData = JSON.parse(httpGet("https://covidtracking.com/api/states"));
    var usData = JSON.parse(httpGet("https://covidtracking.com/api/us"));
    var nationalAvg = (usData[0]['states'] / usData[0]['positiveIncrease']);
    //Cycle through all the state elements
    for(var i = 0; i < $('.container *').length; i++){
        var state = $('.container').children().eq(i);
        //Find data for state and adjust color of the element accordingly
        for(var j = 0; j < stateData.length; j++){
            if(stateData[j]['state'] === state.attr('id')){
                var dif = stateData[j]['positiveIncrease'] - nationalAvg;
                if(dif > 5000){
                    state.css('background-color', '#eb1b1e')
                }else if(dif > 4500){
                    state.css('background-color', '#eb1b1e');
                }else if(dif > 4500){
                    state.css('background-color', '#ff3937');
                }else if(dif > 4000){
                    state.css('background-color', '#ff7635');
                }else if(dif > 3500){
                    state.css('background-color', '#ffae37');
                }else if(dif > 3000){
                    state.css('background-color', '#fec51c');
                }else if(dif > 2500){
                    state.css('background-color', '#ffda38');
                }else if(dif > 2000){
                    state.css('background-color', '#ffec03');
                }else if(dif > 1500){
                    state.css('background-color', '#efff02');
                }else if(dif > 1000){
                    state.css('background-color', '#95ed50');
                }else if(dif > 500){
                    state.css('background-color', '#56e75a');
                }else{
                    state.css('background-color', '#3ed542')
                }
            }
        }
    }

}