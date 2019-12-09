const data_url = 'https://raw.githubusercontent.com/bayemirov/InfoVisTermProj/master/data/BuildingProxSensorData/json/'

function get_data(filename) {
    var data = {};
    var request = new XMLHttpRequest();
    request.open("GET", data_url + filename, false);
    request.send(null);
    var obj = JSON.parse(request.responseText);
    

    for(const entry of obj) {
        var msg = entry;
        if(filename == 'floor1-MC2.json') msg = entry['message'];
        
        const time = msg['Date/Time'].split(' ')[1];
        var sum = 0.0;
        var cnt = 0;
        for(const key in msg) {
            if(key.includes('Thermostat Temp')) {
                sum += parseFloat(msg[key]);
                cnt++;
            }
        }
        if(!(time in data)) data[time] = 0;
        data[time] += (sum / cnt);
    }
    
    for(key in data) {
        data[key] /= 14.0;
    }

    var times = Object.keys(data);
    var new_data = {};
    for(var i = 0; i < times.length; i++) {
        new_data[times[i]] = 0;
        for(var j = 0; j < 6; j++) {
            new_data[times[i]] += data[times[i + j]];
        }
        new_data[times[i]] /= 6;
        i += 5;
    }

    return new_data;
}

function displayLineChart() {
    const floor1 = get_data('floor1-MC2.json');
    const floor2 = get_data('floor2-MC2.json');
    const floor3 = get_data('floor3-MC2.json')
    var data = {
        labels: Object.keys(floor1),
        datasets: [
            {
                label: "floor1",
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: Object.values(floor1)
            },
            {
                label: "floor2",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: Object.values(floor2)
            },
            {
                label: "floor3",
                fillColor: "rgba(181,87,205,0.2)",
                strokeColor: "rgba(181,87,205,1)",
                pointColor: "rgba(181,87,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(181,87,205,1)",
                data: Object.values(floor3)
            }
        ]
    };
    var ctx = document.getElementById("lineChart").getContext("2d");
    var options = { };
    var lineChart = new Chart(ctx).Line(data, options);
}
