// set the dimensions and margins of the graph
var margin = {top: 10, right: 20, bottom: 30, left: 50},
  width = 500 - margin.left - margin.right,
  height = 420 - margin.top - margin.bottom;
var department = {};
var departments = [];
var start='2016-05-31 00:05:00', end = '2016-06-13 23:59:48';
var startDate = new Date(start), endDate = new Date(end);

//Read the data
function getZoneChangeData(startDate, endDate) {
  let request = new XMLHttpRequest();
  request.open("GET", "../../data/BuildingProxSensorData/json/proxOut-ver2.json", false);
  request.send(null);
  let obj = JSON.parse(request.responseText);
  let data = [];
  let departmentZoneChangeCnt = {}; // Department: Int
  let departmentFloorChangeCnt = {};// Department: Int
  let cardPrevZone = {}                 // Card: Zone
  var departmentCnt = {};
  console.log(startDate)
  console.log(endDate);
  for(const entry of obj) {
    let zone = entry['floor'].toString() + entry['zone'];
    let card = entry['proxCard'].substr(1);
    let currentDate = new Date(entry['datetime']);
    if (currentDate > endDate)
      break;
    if (currentDate < startDate)
      continue;

    if (department[card] in departmentZoneChangeCnt === false) {
      departmentZoneChangeCnt[department[card]] = 0;
      departmentFloorChangeCnt[department[card]] = 0;
    }
    if (card in cardPrevZone === false)
      cardPrevZone[card] = '#';
    if (department[card] in departmentCnt === false) {
      departmentCnt[department[card]] = 0;
    }
    if (cardPrevZone[card] === '#')
      departmentCnt[department[card]]++;
    if (cardPrevZone[card] !== zone) {
      departmentZoneChangeCnt[department[card]]++;
      if (cardPrevZone[card].charAt(0) !== zone.charAt(0))
        departmentFloorChangeCnt[department[card]]++;
      cardPrevZone[card] = zone;
    }
  }

  for (const id in departments) {
    const dep = departments[id];
    var dataEntry = new Object();
    dataEntry.department = dep;
    dataEntry.zoneChangeCnt = Math.floor(departmentZoneChangeCnt[dep] / departmentCnt[dep]);
    dataEntry.floorChangeCnt = Math.floor(departmentFloorChangeCnt[dep] / departmentCnt[dep]);
    dataEntry.peopleCnt = departmentCnt[dep];
    data.push(dataEntry);
  }

  return data;
}

var promise1 = new Promise(function(resolve, reject) {
  d3.csv("../../data/employee.csv", function (det) {
    for (const employee of det) {
      if (employee.Department === "")
        continue;
      let id = employee.FirstName.charAt(0) + employee.LastName;
      id = id.toLowerCase();
      department[id + '000'] = employee.Department;
      department[id + '001'] = employee.Department;
      department[id + '002'] = employee.Department;
      department[id + '003'] = employee.Department;
      if (departments.includes(employee.Department) === false)
        departments.push(employee.Department);
    }
    resolve();
  });
});

function drawBubbleChart(startDate, endDate) {
  promise1.then(function (value) {
    var data = getZoneChangeData(startDate, endDate);
    console.log(data);
    d3.select("svg").remove();
    d3.select("div.tooltip").remove();

    var svg = d3.select("body")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    var x = d3.scaleLinear()
      .domain([0, 70])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

// Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 350])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

// Add a scale for bubble size
    var z = d3.scaleLinear()
      .domain([0, 300])
      .range([0, 300]);

// Add a scale for bubble color
    var myColor = d3.scaleOrdinal()
      .domain(["Administration", "Engineering", "Executive", "Facilities", "HR", "Information Technology", "Security"])
      .range(d3.schemeSet2);

// -1- Create a tooltip div that is hidden by default:
    var tooltip = d3.select("body")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "black")
      .style("border-radius", "5px")
      .style("padding", "10px")
      .style("color", "white")
// -2- Create 3 functions to show / update (when mouse move but stay on same circle) / hide the tooltip
    var showTooltip = function (d) {
      tooltip
        .transition()
        .duration(200)
      tooltip
        .style("opacity", 1)
        .html("Department: " + d.department + "  # " + d.peopleCnt)
        .style("left", (d3.mouse(this)[0] + 30) + "px")
        .style("top", (d3.mouse(this)[1] + 30) + "px")
    }
    var moveTooltip = function (d) {
      tooltip
        .style("left", (d3.mouse(this)[0] + 30) + "px")
        .style("top", (d3.mouse(this)[1] + 30) + "px")
    }
    var hideTooltip = function (d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }
    // Add dots
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("class", "bubbles")
      .attr("cx", function (d) {
        return x(d.floorChangeCnt);
      })
      .attr("cy", function (d) {
        return y(d.zoneChangeCnt);
      })
      .attr("r", function (d) {
        return z(d.peopleCnt);
      })
      .style("fill", function (d) {
        return myColor(d.department);
      })
      // -3- Trigger the functions
      .on("mouseover", showTooltip)
      .on("mousemove", moveTooltip)
      .on("mouseleave", hideTooltip);

  });
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
  drawBubbleChart(new Date(startTime), new Date(endTime));
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
  drawBubbleChart(startTime, endTime);
});

