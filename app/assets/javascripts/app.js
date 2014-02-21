d3.select('svg').attr("height", "100%")
d3.select('svg').attr("width", "100%")
var API_data = []
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
      API_data.push({count: data})
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
    var year = $('#year').val()
    var q = $('#quarter').val()
    var percentile = $('#percentile').val()
    var type = $('#building_type').val()
    getData(year, q, percentile, type, "Manhattan");
    setTimeout(function(){project(API_data)}, 1000);
    setTimeout(function(){
      getData(year, q, percentile, type, "Queens")
      project(API_data)
    }, 1500)
    
    // setTimeout(getData(year, q, percentile, type, "Bronx"), 4500)
    // project(API_data.splice(0,2))
    // setTimeout(getData(year, q, percentile, type, "Brooklyn"), 6000)
    // project(API_data.splice(0,2))
    // setTimeout(getData(year, q, percentile, type, "Staten%20Island"), 7500)
    // project(API_data.splice(0,2))
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
    .attr("x", function(d){return d.count})
    .attr("height", function(d){ console.log("price", d.price)})
    .attr("width", function(d){return d.count})
    .attr("fill", "red")

  projection.exit()
}


$(function(){
  getCounts();
  // ajaxPrices(2008, "Q4", 60, 3, "Queens");
  // project(data);
})