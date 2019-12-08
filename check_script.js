#!/usr/bin/env node

var fs = require('fs')

var start='2013-05-31 00:05:00', end = '2018-05-31 00:05:00';

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
    console.log(roomCnt);
});