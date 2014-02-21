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
    $('svg').remove();
    $('#prices').hide();
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

    setTimeout(function(){start()}, 8000)

    setTimeout(function(){$('#prices').show()}, 9000)
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

function start(){
  var width = 700,
    height = 500,
    radius = Math.min(width, height) / 2;

  var color = d3.scale.category20();

  var pie = d3.layout.pie()
    .value(function(d) { return d.prices; })
    .sort(null);

  var arc = d3.svg.arc()
    .innerRadius(radius - 100)
    .outerRadius(radius - 20);

  var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  d3.csv("data.csv", type, function(error, data) {
    var path = svg.datum(data).selectAll("path")
      .data(pie)
    .enter().append("path")
      .attr("fill", function(d, i) { return color(i); })
      .attr("d", arc)
      .each(function(d) { this._current = d; }); // store the initial angles

  d3.selectAll("input")
      .on("change", change);

  // var timeout = setTimeout(function() {
  //   d3.select("input[value=\"oranges\"]").property("checked", true).each(change);
  // }, 2000);

  function change() {
    var value = this.value;
    clearTimeout(timeout);
    pie.value(function(d) { return d[value]; }); // change the value function
    path = path.data(pie); // compute the new angles
    path.transition().duration(750).attrTween("d", arcTween); // redraw the arcs
  }
});

function type(d) {
  d.prices = +d.prices || 0;
  d.oranges = +d.oranges || 0;
  return d;
}

// Store the displayed angles in _current.
// Then, interpolate from _current to the new angles.
// During the transition, _current is updated in-place by d3.interpolate.
function arcTween(a) {
  var i = d3.interpolate(this._current, a);
  this._current = i(0);
  return function(t) {
    return arc(i(t));
  };
}
}


$(function(){
  $('#prices').hide();
  clearCSV();
  getCounts();
  // ajaxPrices(2008, "Q4", 60, 3, "Queens");
  // project(data);
})