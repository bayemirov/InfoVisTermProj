const data_url = 'https://raw.githubusercontent.com/bayemirov/InfoVisTermProj/master/data/BuildingProxSensorData/json/'
const scale = 48;

function get_data(filename, stat, zone='F_1_Z_8A') {
    var data = {};
    var request = new XMLHttpRequest();
    request.open("GET", data_url + filename, false);
    request.send(null);
    var obj = JSON.parse(request.responseText);
    

    for(const entry of obj) {
        var msg = entry;
        if(filename == 'floor1-MC2.json') msg = entry['message'];
        
        const time = msg['Date/Time'];
        for(const key in msg) {
            if(key.includes(stat) && key.includes(zone)) {
                data[time] = parseFloat(msg[key]);
            }
        }
    }

    var newData = {}
    var keys = Object.keys(data)
    var avgCnt = Math.max(1, Math.round(keys.length / scale));
    for(var i = 0; i < keys.length; i+=avgCnt) {
        newData[keys[i]] = data[keys[i]];
    }

    return newData;
}

function displayLineChart(stat) {
    const floor1 = get_data('floor1-MC2.json', stat);
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
                data: Object.values(floor1),
            },
        ]
    };
    var ctx = document.getElementById(stat).getContext("2d");
    var options = {};
    var lineChart = new Chart(ctx).Line(data, options);
}

function displaySelected() {
    console.log('kuku');
    const stats = $("#select_stat>option").map(function() { return $(this).val(); });
    const selected = $('#select_stat').val();
    
    for(const stat of stats) {
        var div_id = '#' + stat + ' div';
        if(selected.includes(stat)) {
            displayLineChart(stat);
            $(div_id).show();
        }
        else {
            $(document).ready(function(){
                $('#'+stat).hide();
            console.log('hided')});
        }
    }
}