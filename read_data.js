var fs = require('fs')

function getRoomCnt(start, end) {
    var roomCnt = {}
    var cardLoc = {}

    fs.readFile('data/BuildingProxSensorData/json/proxOut-ver2.json', 'utf8', function (err, data) {
        if (err) throw err;
        const obj = JSON.parse(data);
        for(const entry of obj) {
            if(entry['datetime'] < start || entry['datetime'] > end) {
                break;
            }
            loc = entry['floor'].toString() + entry['zone'];
            card = entry['proxCard']
            if(!(loc in roomCnt)) {
                roomCnt[loc] = 0;
            }
            if(card in cardLoc) {
                roomCnt[cardLoc[card]]--;
            }
            roomCnt[loc]++;
            cardLoc[card] = loc;
        }
        return cardLoc
    });
}