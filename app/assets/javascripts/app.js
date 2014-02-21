d3.select('svg').attr("height", "100%")
d3.select('svg').attr("width", "100%")

function ajaxCounts(year, q, percentile, type, borough){
  console.log("function ran")
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
      console.log(data)
      // project(data)
    }
  })
}
function ajaxPrices(year, q, percentile, type, borough){
  console.log("function ajax ran")
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
      console.log(data)
      // project(data)
    }
  })
}


function getCounts(){

  $('#submit').on("click", function(e){
    console.log('clicked')
    e.preventDefault();
    var year = $('#year').val()
    var q = $('#quarter').val()
    var percentile = $('#percentile').val()
    var type = $('#building_type').val()
    setTimeout(ajaxCounts(year, q, percentile, type, "Manhattan"), 1500);
    setTimeout(ajaxCounts(year, q, percentile, type, "Queens"), 3000)
    setTimeout(ajaxCounts(year, q, percentile, type, "Bronx"), 4500)
    setTimeout(ajaxCounts(year, q, percentile, type, "Brooklyn"), 6000)
    setTimeout(ajaxCounts(year, q, percentile, type, "Staten%20Island"), 7500)
  })
}
function project(data){
  var projection = d3.select('svg').selectAll('rect').data(data)

  projection.enter()
    .append('rect')

  projection
    .attr("y", 20)
    .attr("x", 20)
    .attr("height", 30)
    .attr("width", 30)
    .attr("fill", "red")

  projection.exit()
}


$(function(){
  // getCounts();
  ajaxPrices(2008, "Q4", 60, 3, "Queens");
  // project(data);
})