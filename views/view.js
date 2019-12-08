// Parse the date / time

var start='2016-05-31 00:05:00', end = '2016-06-13 23:59:48';
var startDate = new Date(start), endDate = new Date(end);

var request = new XMLHttpRequest();
request.open("GET", "../data/BuildingProxSensorData/json/proxOut-ver2.json", false);
request.send(null);

var constZones = ["1 1", "1 2", "1 3", "1 4", "1 5",
                  "1 6", "1 7", "1 8", "2 1", "2 2",
                  "2 3", "2 4", "2 6", "2 7", "3 1",
                  "3 2", "3 3", "3 4", "3 6",
                  "3 Server Room"]

function getRoomCnt(start, end) {
  var zoneCnt = {};
  var zones = {};
  var obj = JSON.parse(request.responseText);

  for(const entry of obj) {
    loc = entry['floor'].toString() + entry['zone'];
    person = entry['proxCard'];
    if (loc in zoneCnt === false) {
      zoneCnt[loc] = new Object();
      zones[loc] = 0;
    }
    if(new Date(entry['datetime']) < start || new Date(entry['datetime']) > end)
      continue;
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

var margin = {top: 20, right: 20, bottom: 70, left: 40},
  width = 700 - margin.left - margin.right,
  height = 350 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
  .scale(x)
  .orient("bottom");

var yAxis = d3.svg.axis()
  .scale(y)
  .orient("left")
  .ticks(5);

// Bar Chart

function drawBarChart(startTime, endTime) {
  var data = getRoomCnt(new Date(startTime), new Date(endTime));

  x.domain(data.map(function(d) { return d.zone; }));
  y.domain([0, d3.max(data, function(d) { return d.peopleCnt; })]);
  d3.select("svg").remove();
  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
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
}


// formatter

Number.prototype.padLeft = function(base,chr){
  var  len = (String(base || 10).length - String(this).length)+1;
  return len > 0? new Array(len).join(chr || '0')+this : this;
}

function toHHMMSS(sec_num) {
  var d = new Date(sec_num);
  return [(d.getMonth()+1).padLeft(),
    d.getDate().padLeft(),
    d.getFullYear()].join('/') +' ' +
  [d.getHours().padLeft(),
    d.getMinutes().padLeft(),
    d.getSeconds().padLeft()].join(':');
}

// Sliders

var slider1 = document.getElementById("myRange");
var output = document.getElementById("startDate");

output.innerHTML = slider1.value;

slider1.oninput = function() {
  var time = startDate.getTime() + (((endDate.getTime() - startDate.getTime()) * this.value) / 10000);
  console.log(time);
  output.innerHTML = toHHMMSS(time);
};

slider1.addEventListener("change", function() {
  var x = slider1.value;
  var color = 'liner-gradient(90deg, rgb(117, 252, 117)' + x + '%, rgb(214, 214, 214)' + x + '%)';
  slider1.style.background = color;
  var startTime = startDate.getTime() + (((endDate.getTime() - startDate.getTime()) * slider1.value) / 10000);
  var endTime = startDate.getTime() + (((endDate.getTime() - startDate.getTime()) * slider2.value) / 10000);
  drawBarChart(new Date(startTime), new Date(endTime));
});

var slider2 = document.getElementById("myRange2");
var output2 = document.getElementById("endDate");

output2.innerHTML = slider2.value;

slider2.oninput = function() {
  var time = startDate.getTime() + (((endDate.getTime() - startDate.getTime()) * this.value) / 10000);
  output2.innerHTML = toHHMMSS(time);
};

slider2.addEventListener("change", function() {
  var x = slider2.value;
  var color = 'liner-gradient(90deg, rgb(117, 252, 117)' + x + '%, rgb(214, 214, 214)' + x + '%)';
  slider2.style.background = color;
  var startTime = startDate.getTime() + (((endDate.getTime() - startDate.getTime()) * slider1.value) / 10000);
  var endTime = startDate.getTime() + (((endDate.getTime() - startDate.getTime()) * slider2.value) / 10000);
  drawBarChart(startTime, endTime);
});


