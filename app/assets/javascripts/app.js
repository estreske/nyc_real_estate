d3.select('svg').attr("height", "100%")
d3.select('svg').attr("width", "100%")

function getCounts(year, q, percentile, type, borough){
  console.log("function ran")
  $.ajax({
    url: "http://api.nytimes.com/svc/real-estate/v2/sales/count.json?geo-extent-level=borough&geo-extent-value=" + borough + "&geo-summary-level=borough&date-range=" + year + "-" + q + "&building-type-id=" + type + "&api-key=1EC54803D22BA64ED89B4EC094FC5DDE:10:68849599",

    dataType: "json",
    method: "get",
    success: function(data){
      console.log(data)
      project(data)
    }
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

  $('#submit').on("click", function(e){
    console.log('clicked')
    e.preventDefault();
    getCounts(2008, "Q4", 90, 1, "Manhattan");
  })
  // project(data);
})