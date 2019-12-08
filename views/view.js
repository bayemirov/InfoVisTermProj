var margin = {top: 20, right: 20, bottom: 70, left: 40},
  width = 600 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

// Parse the date / time

var start='2013-05-31 00:05:00', end = '2018-05-31 00:05:00';

function getRoomCnt(start, end) {
  var zoneCnt = {};
  var zones = {};

  var request = new XMLHttpRequest();
  request.open("GET", "../data/BuildingProxSensorData/json/proxOut-ver2.json", false);
  request.send(null);
  var obj = JSON.parse(request.responseText);
  for(const entry of obj) {
    if(entry['datetime'] < start || entry['datetime'] > end)
      continue;
    loc = entry['floor'].toString() + entry['zone'];
    person = entry['proxCard'];
    if (loc in zoneCnt === false) {
      zoneCnt[loc] = new Object();
      zones[loc] = 0;
    }
    if (person in zoneCnt[loc] === false) {
      zoneCnt[loc][person] = true;
      zones[loc]++;
    }
  }
  let data = [];
  for (const zone in zones)
    data.push({zone: zone, peopleCnt: zones[zone]});
  data.sort(function(a, b) {
    const zoneA = a.zone.toUpperCase();
    const zoneB = b.zone.toUpperCase();
    let comparison = 0;
    if (zoneA > zoneB) { comparison = 1; } else if (zoneA < zoneB) { comparison = -1;}
    return comparison;
  });
  return data;
}

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(10);

var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

var data = getRoomCnt(start, end);

console.log(data);

x.domain(data.map(function(d) { return d.zone; }));
y.domain([0, d3.max(data, function(d) { return d.peopleCnt; })]);

svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", "-.55em")
  .attr("transform", "rotate(-90)" );

svg.append("g")
  .attr("class", "y axis")
  .call(yAxis);

svg.selectAll("bar")
  .data(data)
  .enter().append("rect")
  .style("fill", "steelblue")
  .attr("x", function(d) { return x(d.zone); })
  .attr("width", x.rangeBand())
  .attr("y", function(d) { return y(d.peopleCnt); })
  .attr("height", function(d) { return height - y(d.peopleCnt); });
