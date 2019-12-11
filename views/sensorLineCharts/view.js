/*


Parsing data in the following format:

[
{date, zone, sensor, value}
{date, zone, sensor, value}
...
]

*/
var start='2016-05-31 00:05:00', end = '2016-06-13 23:59:48';
var startDate = new Date(start), endDate = new Date(end);
var st = new Date(start), en = new Date(end);

var request = new XMLHttpRequest();
request.open("GET", "../../data/BuildingProxSensorData/json/floor1-MC2.json", false);
request.send(null);
let obj1 = JSON.parse(request.responseText);
request.open("GET", "../../data/BuildingProxSensorData/json/floor2-MC2.json", false);
request.send(null);
var obj2 = JSON.parse(request.responseText);
request.open("GET", "../../data/BuildingProxSensorData/json/floor3-MC2.json", false);
request.send(null);
var obj3 = JSON.parse(request.responseText);

let floorList = [
  {floor: "F_1"},
  {floor: "F_2"},
  {floor: "F_3"}
];

const zones = ["Z_4", "Z_2", "Z_7", "Z_8B", "Z_3", "VAV_SYS", "Z_1", "Z_8A", "Z_5", "BATH_EXHAUST",
  "Z_12A", "Z_7", "Z_1", "Z_2", "VAV_SYS", "Z_11", "Z_14", "Z_12C", "Z_12B", "Z_9", "Z_5", "Z_10", "Z_3", "Z_15", "Z_16", "Z_4", "Z_8", "BATH_EXHAUST",
  "Z_6", "Z_1", "Z_7", "Z_11B", "Z_10", "Z_12", "Z_9", "Z_5", "VAV_SYS", "Z_2", "Z_11A", "Z_11C", "Z_8", "BATH_EXHAUST", "Z_3"];
const types = [
  "VAV REHEAT Damper Position", "REHEAT COIL Power", "Thermostat Cooling Setpoint", "Equipment Power", "Thermostat Temp", "Thermostat Heating Setpoint", "AIR LOOP INLET Temperature", "COOLING COIL Power", "SUPPLY FAN OUTLET Temperature", "RETURN OUTLET CO2 Concentration", "VAV Availability Manager Night Cycle Control Status", "SUPPLY INLET Mass Flow Rate", "HEATING COIL Power", "Mechanical Ventilation Mass Flow Rate", "Lights Power", "SUPPLY INLET Temperature", "SUPPLY FAN OUTLET Mass Flow Rate", "RETURN OUTLE2. T CO2 Concentration", "SUPPLY FAN:Fan Power", "Outdoor Air Mass Flow Rate", "AIR LOOP INLET Mass Flow Rate", "Power", "Outdoor Air Flow Fraction",
  "Thermostat Temp", "RETURN OUTLET CO2 Concentration", "Thermostat Heating Setpoint", "VAV REHEAT Damper Position", "SUPPLY INLET Temperature", "Equipment Power", "Outdoor Air Flow Fraction", "Lights Power", "SUPPLY FAN:Fan Power", "Thermostat Cooling Setpoint", "SUPPLY INLET Mass Flow Rate", "REHEAT COIL Power", "Power", "VAV Availability Manager Night Cycle Control Status", "SUPPLY FAN OUTLET Mass Flow Rate", "AIR LOOP INLET Temperature", "AIR LOOP INLET Mass Flow Rate", "Outdoor Air Mass Flow Rate", "COOLING COIL Power", "SUPPLY FAN OUTLET Temperature", "HEATING COIL Power",
  "Equipment Power", "RETURN OUTLET CO2 Concentration", "SUPPLY INLET Temperature", "SUPPLY INLET Mass Flow Rate", "VAV REHEAT Damper Position", "Thermostat Heating Setpoint", "REHEAT COIL Power", "Lights Power", "AIR LOOP INLET Mass Flow Rate", "Thermostat Cooling Setpoint", "Power","Thermostat Temp", "VAV Damper Position", "SUPPLY FAN:Fan Power", "COOLING COIL Power", "Outdoor Air Flow Fraction", "AIR LOOP INLET Temperature", "HEATING COIL Power", "Outdoor Air Mass Flow Rate", "SUPPLY FAN OUTLET Mass Flow Rate", "SUPPLY FAN OUTLET Temperature", "VAV Availability Manager Night Cycle Control Status"
];

let zonesn = {};
let typesn = {};

for (const x of zones) {
  zonesn[x] = 1;
}

for (const x of types) {
  typesn[x] = 1;
}

let zoneList = [];
let typeList = [];

for (const x of Object.keys(zonesn)) {
  zoneList.push(new Object());
  zoneList[zoneList.length - 1].zone = x;
}

for (const x of Object.keys(typesn)) {
  typeList.push(new Object());
  typeList[typeList.length - 1].type = x;
}

zoneList.sort((a, b) => (a.zone > b.zone) ? 1 : -1);
typeList.sort((a, b) => (a.type > b.type) ? 1 : -1);

function getMessageData(message, startTime, endTime, selectedZone, selectedSensor) {
  let data = [];
  for (let sensor of Object.keys(message)) {
      data = data.concat([{
        date: message["Date/Time"],
        zone: sensor.substr(0, sensor.indexOf(' ')).split(':')[0],
        sensor: sensor.substr(sensor.indexOf(' ') + 1),
        value: parseInt(message[sensor])
      }]);
      const o = data[data.length - 1];
      if (o.zone !== selectedZone
        || o.sensor !== selectedSensor
        || (new Date(o.date)).getTime() < startTime.getTime()
        || (new Date(o.date)).getTime() > endTime.getTime())
        data.pop();
      else {
        data[data.length - 1].date = new Date(data[data.length - 1].date);
      }
  }
  return data;
}

function getData(startTime, endTime, selectedZone, selectedSensor) {
  let newData = [];
  for (const entry of obj1) {
    const message = entry.message;
    //console.log(getMessageData(message, startTime, endTime, selectedZone, selectedSensor));
    newData = newData.concat(getMessageData(message, startTime, endTime, selectedZone, selectedSensor));
  }
  for (const entry of obj2) {
    const message = entry;
    newData = newData.concat(getMessageData(message, startTime, endTime, selectedZone, selectedSensor));
  }
  for (const entry of obj3) {
    const message = entry;
    newData = newData.concat(getMessageData(message, startTime, endTime, selectedZone, selectedSensor));
  }
  return newData;
}

var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var id = 1;

function drawLineChart(data) {
  d3.select('body')
    .append('div')
    .attr('id', 'a' + id);
  var svg = d3.select("#a" + id)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");
  id++;
  // Add X axis --> it is a date format
  var x = d3.scaleTime()
    .domain([st, en])
    .range([ 0, width ]);
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).ticks(5));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return +d.value; })])
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Add the line
  svg.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()
      .x(function(d) { return x(d.date) })
      .y(function(d) { return y(+d.value) })
    );
}

let chartId = 1;

function createSelection(chartId, selectId, data) {
  let dropDown = d3.select('#' + chartId).append("select")
    .attr("id", chartId + selectId);
  let options = dropDown.selectAll("option")
    .data(data)
    .enter()
    .append("option");

  options
    .text(function(d) {
      return d[selectId];
    })
    .attr("value", function(d) {
      return d[selectId];
    });
}

function addSelect() {
  d3.select('body').append('div').attr('id', 'chart' + chartId);

  createSelection('chart' + chartId, 'floor', floorList);
  createSelection('chart' + chartId, 'zone', zoneList);
  createSelection('chart' + chartId, 'type', typeList);

  chartId++;
}

function onSubmit() {
  for (let i = 1; i < id; i++) {
    d3.select("#a" + i).remove();
  }
  id = 1;
  //var select = d3.select('#chart1floor option:checked').text();
  for (let i = 1; i < chartId; i++) {
    const floor = d3.select('#chart' + i + 'floor option:checked').text();
    const zone = d3.select('#chart' + i + 'zone option:checked').text();
    const type = d3.select('#chart' + i + 'type option:checked').text();
    drawLineChart(getData(st, en, floor + '_' + zone, type));
  }
}

//-------------------------------------------

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

//sliders
var slider1 = document.getElementById("myRange");
var output = document.getElementById("startDate");

output.innerHTML = slider1.value;

slider1.oninput = function() {
  var time = startDate.getTime() + (((endDate.getTime() - startDate.getTime()) * this.value) / 10000);
  output.innerHTML = toHHMMSS(time);
};

slider1.addEventListener("change", function() {
  var x = slider1.value;
  var color = 'liner-gradient(90deg, rgb(117, 252, 117)' + x + '%, rgb(214, 214, 214)' + x + '%)';
  slider1.style.background = color;
  var startTime = startDate.getTime() + (((endDate.getTime() - startDate.getTime()) * slider1.value) / 10000);
  var endTime = startDate.getTime() + (((endDate.getTime() - startDate.getTime()) * slider2.value) / 10000);
  st = new Date(startTime);
  en = new Date(endTime);
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
  st = new Date(startTime);
  en = new Date(endTime);
});


//drawLineChart(data);
//drawLineChart(data);