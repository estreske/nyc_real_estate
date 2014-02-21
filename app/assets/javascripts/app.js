d3.select('svg').attr("height", "100%")
d3.select('svg').attr("width", "100%")
var API_data = []
var x = -200

function clearCSV(){
  $.ajax({
    url: '/clear',
    dataType: "json",
    method: "get",
    success: function(data){
      console.log("Cleared CSV")
    }
  })
}
function ajaxCounts(year, q, percentile, type, borough){
  var params = {
    year: year,
    q: q,
    percentile: percentile,
    type: type,
    borough: borough
  }
  $.ajax({
    url: '/counts',
    dataType: "json",
    method: "get",
    data: params,
    success: function(data){
      console.log("COUNT DATA",data)
      API_data.push({count: data, x: x+= 150})
    }
  })
}
function ajaxPrices(year, q, percentile, type, borough){
  var params = {
    year: year,
    q: q,
    percentile: percentile,
    type: type,
    borough: borough
  }

  $.ajax({
    url: '/prices',
    dataType: "json",
    method: "GET",
    data: params,
    error: function(e){
      console.log("ERROR", e)
    },
    success: function(data){
      var last = API_data[API_data.length - 1]
      console.log("AJAX PRICE DATA",data.price)
      console.log("API OBJECT", last)
      last.price = data.price
      
    }
    
  })
}

function getData(year, q, percentile, type, borough){
  ajaxCounts(year, q, percentile, type, borough)
  ajaxPrices(year, q, percentile, type, borough)
  return API_data
}


function getCounts(){

  $('#submit').on("click", function(e){
    console.log('clicked')
    e.preventDefault();
    clearCSV();
    var year = $('#year').val()
    var q = $('#quarter').val()
    var percentile = $('#percentile').val()
    var type = $('#building_type').val()
    getData(year, q, percentile, type, "Manhattan");
    // setTimeout(function(){
    //   project(API_data)
    // }, 1000)
    setTimeout(function(){
      getData(year, q, percentile, type, "Queens")
    }, 1500);
    // setTimeout(function(){
    //   project(API_data)
    // }, 4000)
    setTimeout(function(){
      getData(year, q, percentile, type, "Bronx")
    }, 3000);
    // setTimeout(function(){
    //   project(API_data)
    // }, 7000)
    setTimeout(function(){
      getData(year, q, percentile, type, "Brooklyn")
    }, 4500);
    // setTimeout(function(){
    //   project(API_data)
    // }, 10000)
    setTimeout(function(){
      getData(year, q, percentile, type, "Staten%20Island")
    }, 6000);
    setTimeout(function(){
      // project(API_data)
    }, 7500)

    setTimeout(function(){location.reload()}, 8000)
  })
}

var x = 0;

var y = 0;

function project(data){
  console.log("projecting", data)
  var projection = d3.select('svg').selectAll('rect').data(data)

  projection.enter()
    .append('rect')

  projection
    .attr("y", 20)
    .attr("x", function(d) {return d.x})
    .attr("height", function(d){ return d.price / 1000})
    .attr("width", "100")
    .attr("fill", "red")
    .classed({rendered: true})

  projection.exit()
}


$(function(){
  clearCSV();
  getCounts();
  // ajaxPrices(2008, "Q4", 60, 3, "Queens");
  // project(data);
})