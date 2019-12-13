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
const data_url = 'https://raw.githubusercontent.com/bayemirov/InfoVisTermProj/master/data/'

const profession = {
  "mbramar000": "Administration",
  "mbramar001": "Administration",
  "mbramar002": "Administration",
  "mbramar003": "Administration",
  "lcarrara000": "Administration",
  "lcarrara001": "Administration",
  "lcarrara002": "Administration",
  "lcarrara003": "Administration",
  "ncelio000": "Administration",
  "ncelio001": "Administration",
  "ncelio002": "Administration",
  "ncelio003": "Administration",
  "gflorez000": "Administration",
  "gflorez001": "Administration",
  "gflorez002": "Administration",
  "gflorez003": "Administration",
  "cforluniau000": "Administration",
  "cforluniau001": "Administration",
  "cforluniau002": "Administration",
  "cforluniau003": "Administration",
  "jfrost000": "Administration",
  "jfrost001": "Administration",
  "jfrost002": "Administration",
  "jfrost003": "Administration",
  "jholly000": "Administration",
  "jholly001": "Administration",
  "jholly002": "Administration",
  "jholly003": "Administration",
  "eklinger000": "Administration",
  "eklinger001": "Administration",
  "eklinger002": "Administration",
  "eklinger003": "Administration",
  "llagos000": "Administration",
  "llagos001": "Administration",
  "llagos002": "Administration",
  "llagos003": "Administration",
  "clais000": "Administration",
  "clais001": "Administration",
  "clais002": "Administration",
  "clais003": "Administration",
  "rmies haber000": "Administration",
  "rmies haber001": "Administration",
  "rmies haber002": "Administration",
  "rmies haber003": "Administration",
  "rpantanal000": "Administration",
  "rpantanal001": "Administration",
  "rpantanal002": "Administration",
  "rpantanal003": "Administration",
  "epavone000": "Administration",
  "epavone001": "Administration",
  "epavone002": "Administration",
  "epavone003": "Administration",
  "aribera000": "Administration",
  "aribera001": "Administration",
  "aribera002": "Administration",
  "aribera003": "Administration",
  "tseifert000": "Administration",
  "tseifert001": "Administration",
  "tseifert002": "Administration",
  "tseifert003": "Administration",
  "malinari000": "Engineering",
  "malinari001": "Engineering",
  "malinari002": "Engineering",
  "malinari003": "Engineering",
  "lazada000": "Engineering",
  "lazada001": "Engineering",
  "lazada002": "Engineering",
  "lazada003": "Engineering",
  "fbalas000": "Engineering",
  "fbalas001": "Engineering",
  "fbalas002": "Engineering",
  "fbalas003": "Engineering",
  "tbattles000": "Engineering",
  "tbattles001": "Engineering",
  "tbattles002": "Engineering",
  "tbattles003": "Engineering",
  "iborrasca000": "Engineering",
  "iborrasca001": "Engineering",
  "iborrasca002": "Engineering",
  "iborrasca003": "Engineering",
  "pbueno000": "Engineering",
  "pbueno001": "Engineering",
  "pbueno002": "Engineering",
  "pbueno003": "Engineering",
  "acalzas000": "Engineering",
  "acalzas001": "Engineering",
  "acalzas002": "Engineering",
  "acalzas003": "Engineering",
  "tcarrara000": "Engineering",
  "tcarrara001": "Engineering",
  "tcarrara002": "Engineering",
  "tcarrara003": "Engineering",
  "mcassano000": "Engineering",
  "mcassano001": "Engineering",
  "mcassano002": "Engineering",
  "mcassano003": "Engineering",
  "gcazar000": "Engineering",
  "gcazar001": "Engineering",
  "gcazar002": "Engineering",
  "gcazar003": "Engineering",
  "ldedos000": "Engineering",
  "ldedos001": "Engineering",
  "ldedos002": "Engineering",
  "ldedos003": "Engineering",
  "yfinney000": "Engineering",
  "yfinney001": "Engineering",
  "yfinney002": "Engineering",
  "yfinney003": "Engineering",
  "bfrente000": "Engineering",
  "bfrente001": "Engineering",
  "bfrente002": "Engineering",
  "bfrente003": "Engineering",
  "vfrente000": "Engineering",
  "vfrente001": "Engineering",
  "vfrente002": "Engineering",
  "vfrente003": "Engineering",
  "lgrogan000": "Engineering",
  "lgrogan001": "Engineering",
  "lgrogan002": "Engineering",
  "lgrogan003": "Engineering",
  "thagan000": "Engineering",
  "thagan001": "Engineering",
  "thagan002": "Engineering",
  "thagan003": "Engineering",
  "vhatchett000": "Engineering",
  "vhatchett001": "Engineering",
  "vhatchett002": "Engineering",
  "vhatchett003": "Engineering",
  "fmata000": "Engineering",
  "fmata001": "Engineering",
  "fmata002": "Engineering",
  "fmata003": "Engineering",
  "eminto000": "Engineering",
  "eminto001": "Engineering",
  "eminto002": "Engineering",
  "eminto003": "Engineering",
  "knielson000": "Engineering",
  "knielson001": "Engineering",
  "knielson002": "Engineering",
  "knielson003": "Engineering",
  "anubarron000": "Engineering",
  "anubarron001": "Engineering",
  "anubarron002": "Engineering",
  "anubarron003": "Engineering",
  "vomalla000": "Engineering",
  "vomalla001": "Engineering",
  "vomalla002": "Engineering",
  "vomalla003": "Engineering",
  "monda000": "Engineering",
  "monda001": "Engineering",
  "monda002": "Engineering",
  "monda003": "Engineering",
  "korilla000": "Engineering",
  "korilla001": "Engineering",
  "korilla002": "Engineering",
  "korilla003": "Engineering",
  "eorilla000": "Engineering",
  "eorilla001": "Engineering",
  "eorilla002": "Engineering",
  "eorilla003": "Engineering",
  "sparrino000": "Engineering",
  "sparrino001": "Engineering",
  "sparrino002": "Engineering",
  "sparrino003": "Engineering",
  "apinckney000": "Engineering",
  "apinckney001": "Engineering",
  "apinckney002": "Engineering",
  "apinckney003": "Engineering",
  "tquiroz000": "Engineering",
  "tquiroz001": "Engineering",
  "tquiroz002": "Engineering",
  "tquiroz003": "Engineering",
  "wreynoso000": "Engineering",
  "wreynoso001": "Engineering",
  "wreynoso002": "Engineering",
  "wreynoso003": "Engineering",
  "bridenour000": "Engineering",
  "bridenour001": "Engineering",
  "bridenour002": "Engineering",
  "bridenour003": "Engineering",
  "jsimonides000": "Engineering",
  "jsimonides001": "Engineering",
  "jsimonides002": "Engineering",
  "jsimonides003": "Engineering",
  "btempestad000": "Engineering",
  "btempestad001": "Engineering",
  "btempestad002": "Engineering",
  "btempestad003": "Engineering",
  "avico000": "Engineering",
  "avico001": "Engineering",
  "avico002": "Engineering",
  "avico003": "Engineering",
  "cwhaley000": "Engineering",
  "cwhaley001": "Engineering",
  "cwhaley002": "Engineering",
  "cwhaley003": "Engineering",
  "ibarranco000": "Executive",
  "ibarranco001": "Executive",
  "ibarranco002": "Executive",
  "ibarranco003": "Executive",
  "hblue000": "Executive",
  "hblue001": "Executive",
  "hblue002": "Executive",
  "hblue003": "Executive",
  "acampo-corrente000": "Executive",
  "acampo-corrente001": "Executive",
  "acampo-corrente002": "Executive",
  "acampo-corrente003": "Executive",
  "eedward000": "Executive",
  "eedward001": "Executive",
  "eedward002": "Executive",
  "eedward003": "Executive",
  "emintz000": "Executive",
  "emintz001": "Executive",
  "emintz002": "Executive",
  "emintz003": "Executive",
  "lorosco000": "Executive",
  "lorosco001": "Executive",
  "lorosco002": "Executive",
  "lorosco003": "Executive",
  "bovan000": "Executive",
  "bovan001": "Executive",
  "bovan002": "Executive",
  "bovan003": "Executive",
  "ssanjorge jr.000": "Executive",
  "ssanjorge jr.001": "Executive",
  "ssanjorge jr.002": "Executive",
  "ssanjorge jr.003": "Executive",
  "ostrum000": "Executive",
  "ostrum001": "Executive",
  "ostrum002": "Executive",
  "ostrum003": "Executive",
  "wvasco-pais000": "Executive",
  "wvasco-pais001": "Executive",
  "wvasco-pais002": "Executive",
  "wvasco-pais003": "Executive",
  "earpa000": "Facilities",
  "earpa001": "Facilities",
  "earpa002": "Facilities",
  "earpa003": "Facilities",
  "vawelon000": "Facilities",
  "vawelon001": "Facilities",
  "vawelon002": "Facilities",
  "vawelon003": "Facilities",
  "nbasham000": "Facilities",
  "nbasham001": "Facilities",
  "nbasham002": "Facilities",
  "nbasham003": "Facilities",
  "lbennett000": "Facilities",
  "lbennett001": "Facilities",
  "lbennett002": "Facilities",
  "lbennett003": "Facilities",
  "dcoginian000": "Facilities",
  "dcoginian001": "Facilities",
  "dcoginian002": "Facilities",
  "dcoginian003": "Facilities",
  "edavies000": "Facilities",
  "edavies001": "Facilities",
  "edavies002": "Facilities",
  "edavies003": "Facilities",
  "agerard000": "Facilities",
  "agerard001": "Facilities",
  "agerard002": "Facilities",
  "agerard003": "Facilities",
  "ahafon000": "Facilities",
  "ahafon001": "Facilities",
  "ahafon002": "Facilities",
  "ahafon003": "Facilities",
  "bhawelon000": "Facilities",
  "bhawelon001": "Facilities",
  "bhawelon002": "Facilities",
  "bhawelon003": "Facilities",
  "chawelon000": "Facilities",
  "chawelon001": "Facilities",
  "chawelon002": "Facilities",
  "chawelon003": "Facilities",
  "ckinney000": "Facilities",
  "ckinney001": "Facilities",
  "ckinney002": "Facilities",
  "ckinney003": "Facilities",
  "fkirchner000": "Facilities",
  "fkirchner001": "Facilities",
  "fkirchner002": "Facilities",
  "fkirchner003": "Facilities",
  "hmies000": "Facilities",
  "hmies001": "Facilities",
  "hmies002": "Facilities",
  "hmies003": "Facilities",
  "vmorlun000": "Facilities",
  "vmorlun001": "Facilities",
  "vmorlun002": "Facilities",
  "vmorlun003": "Facilities",
  "amorlun000": "Facilities",
  "amorlun001": "Facilities",
  "amorlun002": "Facilities",
  "amorlun003": "Facilities",
  "cmorluniau000": "Facilities",
  "cmorluniau001": "Facilities",
  "cmorluniau002": "Facilities",
  "cmorluniau003": "Facilities",
  "bmullen000": "Facilities",
  "bmullen001": "Facilities",
  "bmullen002": "Facilities",
  "bmullen003": "Facilities",
  "inant000": "Facilities",
  "inant001": "Facilities",
  "inant002": "Facilities",
  "inant003": "Facilities",
  "rparedes000": "Facilities",
  "rparedes001": "Facilities",
  "rparedes002": "Facilities",
  "rparedes003": "Facilities",
  "dscozzese000": "Facilities",
  "dscozzese001": "Facilities",
  "dscozzese002": "Facilities",
  "dscozzese003": "Facilities",
  "cshipp000": "Facilities",
  "cshipp001": "Facilities",
  "cshipp002": "Facilities",
  "cshipp003": "Facilities",
  "tsong000": "Facilities",
  "tsong001": "Facilities",
  "tsong002": "Facilities",
  "tsong003": "Facilities",
  "cstaley000": "Facilities",
  "cstaley001": "Facilities",
  "cstaley002": "Facilities",
  "cstaley003": "Facilities",
  "pyoung000": "Facilities",
  "pyoung001": "Facilities",
  "pyoung002": "Facilities",
  "pyoung003": "Facilities",
  "fadair000": "HR",
  "fadair001": "HR",
  "fadair002": "HR",
  "fadair003": "HR",
  "pbeebe000": "HR",
  "pbeebe001": "HR",
  "pbeebe002": "HR",
  "pbeebe003": "HR",
  "pratigan000": "HR",
  "pratigan001": "HR",
  "pratigan002": "HR",
  "pratigan003": "HR",
  "lalcazar000": "Information Technology",
  "lalcazar001": "Information Technology",
  "lalcazar002": "Information Technology",
  "lalcazar003": "Information Technology",
  "iarlotti000": "Information Technology",
  "iarlotti001": "Information Technology",
  "iarlotti002": "Information Technology",
  "iarlotti003": "Information Technology",
  "lbagani000": "Information Technology",
  "lbagani001": "Information Technology",
  "lbagani002": "Information Technology",
  "lbagani003": "Information Technology",
  "sbagni000": "Information Technology",
  "sbagni001": "Information Technology",
  "sbagni002": "Information Technology",
  "sbagni003": "Information Technology",
  "ibaza000": "Information Technology",
  "ibaza001": "Information Technology",
  "ibaza002": "Information Technology",
  "ibaza003": "Information Technology",
  "ebello000": "Information Technology",
  "ebello001": "Information Technology",
  "ebello002": "Information Technology",
  "ebello003": "Information Technology",
  "lbergen000": "Information Technology",
  "lbergen001": "Information Technology",
  "lbergen002": "Information Technology",
  "lbergen003": "Information Technology",
  "ncalixto000": "Information Technology",
  "ncalixto001": "Information Technology",
  "ncalixto002": "Information Technology",
  "ncalixto003": "Information Technology",
  "zcoronado000": "Information Technology",
  "zcoronado001": "Information Technology",
  "zcoronado002": "Information Technology",
  "zcoronado003": "Information Technology",
  "rfaraldo000": "Information Technology",
  "rfaraldo001": "Information Technology",
  "rfaraldo002": "Information Technology",
  "rfaraldo003": "Information Technology",
  "sflecha000": "Information Technology",
  "sflecha001": "Information Technology",
  "sflecha002": "Information Technology",
  "sflecha003": "Information Technology",
  "sflorez000": "Information Technology",
  "sflorez001": "Information Technology",
  "sflorez002": "Information Technology",
  "sflorez003": "Information Technology",
  "slowery000": "Information Technology",
  "slowery001": "Information Technology",
  "slowery002": "Information Technology",
  "slowery003": "Information Technology",
  "iovan000": "Information Technology",
  "iovan001": "Information Technology",
  "iovan002": "Information Technology",
  "iovan003": "Information Technology",
  "ssinagra000": "Information Technology",
  "ssinagra001": "Information Technology",
  "ssinagra002": "Information Technology",
  "ssinagra003": "Information Technology",
  "csolos000": "Information Technology",
  "csolos001": "Information Technology",
  "csolos002": "Information Technology",
  "csolos003": "Information Technology",
  "junger000": "Information Technology",
  "junger001": "Information Technology",
  "junger002": "Information Technology",
  "junger003": "Information Technology",
  "cwhelan000": "Information Technology",
  "cwhelan001": "Information Technology",
  "cwhelan002": "Information Technology",
  "cwhelan003": "Information Technology",
  "dbartley000": "Security",
  "dbartley001": "Security",
  "dbartley002": "Security",
  "dbartley003": "Security",
  "mcanada000": "Security",
  "mcanada001": "Security",
  "mcanada002": "Security",
  "mcanada003": "Security",
  "jcastellanos000": "Security",
  "jcastellanos001": "Security",
  "jcastellanos002": "Security",
  "jcastellanos003": "Security",
  "hcocinaro000": "Security",
  "hcocinaro001": "Security",
  "hcocinaro002": "Security",
  "hcocinaro003": "Security",
  "sfusil000": "Security",
  "sfusil001": "Security",
  "sfusil002": "Security",
  "sfusil003": "Security",
  "kherrero000": "Security",
  "kherrero001": "Security",
  "kherrero002": "Security",
  "kherrero003": "Security",
  "sholiday000": "Security",
  "sholiday001": "Security",
  "sholiday002": "Security",
  "sholiday003": "Security",
  "pkemp000": "Security",
  "pkemp001": "Security",
  "pkemp002": "Security",
  "pkemp003": "Security",
  "vlagos000": "Security",
  "vlagos001": "Security",
  "vlagos002": "Security",
  "vlagos003": "Security",
  "slea000": "Security",
  "slea001": "Security",
  "slea002": "Security",
  "slea003": "Security",
  "anardi000": "Security",
  "anardi001": "Security",
  "anardi002": "Security",
  "anardi003": "Security",
  "jnespola000": "Security",
  "jnespola001": "Security",
  "jnespola002": "Security",
  "jnespola003": "Security",
  "mnotaro000": "Security",
  "mnotaro001": "Security",
  "mnotaro002": "Security",
  "mnotaro003": "Security",
  "apherigo000": "Security",
  "apherigo001": "Security",
  "apherigo002": "Security",
  "apherigo003": "Security",
  "fresumir000": "Security",
  "fresumir001": "Security",
  "fresumir002": "Security",
  "fresumir003": "Security",
  "drhoads000": "Security",
  "drhoads001": "Security",
  "drhoads002": "Security",
  "drhoads003": "Security",
  "ssalvay000": "Security",
  "ssalvay001": "Security",
  "ssalvay002": "Security",
  "ssalvay003": "Security",
  "mshultz000": "Security",
  "mshultz001": "Security",
  "mshultz002": "Security",
  "mshultz003": "Security",
  "xsowell000": "Security",
  "xsowell001": "Security",
  "xsowell002": "Security",
  "xsowell003": "Security",
  "evann000": "Security",
  "evann001": "Security",
  "evann002": "Security",
  "evann003": "Security",
  "mvollan000": "Security",
  "mvollan001": "Security",
  "mvollan002": "Security",
  "mvollan003": "Security"
};

var request = new XMLHttpRequest();
request.open("GET", data_url+"BuildingProxSensorData/json/floor1-MC2.json", false);
request.send(null);
let obj1 = JSON.parse(request.responseText);
request.open("GET", data_url+"BuildingProxSensorData/json/floor2-MC2.json", false);
request.send(null);
var obj2 = JSON.parse(request.responseText);
request.open("GET", data_url+"BuildingProxSensorData/json/floor3-MC2.json", false);
request.send(null);
var obj3 = JSON.parse(request.responseText);

request.open("GET", data_url+"BuildingProxSensorData/json/f1z8a-MC2.json", false);
request.send(null);
var f1z8a = JSON.parse(request.responseText);
request.open("GET", data_url+"BuildingProxSensorData/json/f2z2-MC2.json", false);
request.send(null);
var f2z2 = JSON.parse(request.responseText);
request.open("GET", data_url+"BuildingProxSensorData/json/f2z4-MC2.json", false);
request.send(null);
var f2z4 = JSON.parse(request.responseText);
request.open("GET", data_url+"BuildingProxSensorData/json/f3z1-MC2.json", false);
request.send(null);
var f3z1 = JSON.parse(request.responseText);
request.open("GET", data_url+"BuildingProxSensorData/json/proxOut-ver2.json", false);
request.send(null);
var peopleCon = JSON.parse(request.responseText);

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
  "Equipment Power", "RETURN OUTLET CO2 Concentration", "SUPPLY INLET Temperature", "SUPPLY INLET Mass Flow Rate", "VAV REHEAT Damper Position", "Thermostat Heating Setpoint", "REHEAT COIL Power", "Lights Power", "AIR LOOP INLET Mass Flow Rate", "Thermostat Cooling Setpoint", "Power","Thermostat Temp", "VAV Damper Position", "SUPPLY FAN:Fan Power", "COOLING COIL Power", "Outdoor Air Flow Fraction", "AIR LOOP INLET Temperature", "HEATING COIL Power", "Outdoor Air Mass Flow Rate", "SUPPLY FAN OUTLET Mass Flow Rate", "SUPPLY FAN OUTLET Temperature", "VAV Availability Manager Night Cycle Control Status",
  "Hazium Concentration",
  "Population Concentration",
  "Security",
  "Information Technology",
  "Facilities",
  "Executive",
  "HR",
  "Engineering",
  "Administration"
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
let prevZone = {};

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

function getPeopleData(startTime, endTime, selectedZone, selectedSensor) {
  /*
  data [{
    date:  Datetime
    value: population count
  }]
  */
  let population = 0;
  let data = [];
  for (const entry of peopleCon) {
    const message = entry;
    message.proxCard = message.proxCard.replace(/\s/g, '');
    message.zone = message.zone.replace(/\s/g, '');
    if (selectedSensor !== profession[message.proxCard]
    && selectedSensor !== "Population Concentration")
      continue;
    if ((new Date(message["datetime"])).getTime() < startTime.getTime()
      || (new Date(message["datetime"])).getTime() > endTime.getTime())
      continue;
    const currentZone = 'F_' + message.floor + '_Z_' + message.zone;
    /*console.log(currentZone);
    console.log(selectedZone);
    console.log(message.proxCard);
    console.log(prevZone[message.proxCard]);*/
    if (currentZone === prevZone[message.proxCard])
      continue;
    if (currentZone === selectedZone)
      population++;
    else if (prevZone[message.proxCard] === selectedZone)
      population--;
    data = data.concat([{
      date: new Date(message["datetime"]),
      zone: selectedZone,
      value: population
    }]);

    prevZone[message.proxCard] = currentZone;
  }
  return data;
}

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
  if (["Population Concentration",
    "Security",
    "Information Technology",
    "Facilities",
    "Executive",
    "HR",
    "Engineering",
    "Administration"].includes(selectedSensor) === true) {
    newData = newData.concat(getPeopleData(startTime, endTime, selectedZone, selectedSensor));
  } else if (selectedSensor !== "Hazium Concentration") {
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
  } else {
    for (const entry of f1z8a) {
      const message = entry.message;
      newData = newData.concat(getMessageData(message, startTime, endTime, selectedZone, selectedSensor));
    }
    for (const entry of f2z2) {
      const message = entry.message;
      newData = newData.concat(getMessageData(message, startTime, endTime, selectedZone, selectedSensor));
    }
    for (const entry of f2z4) {
      const message = entry.message;
      newData = newData.concat(getMessageData(message, startTime, endTime, selectedZone, selectedSensor));
    }
    for (const entry of f3z1) {
      const message = entry.message;
      newData = newData.concat(getMessageData(message, startTime, endTime, selectedZone, selectedSensor));
    }
  }
  console.log(newData);
  return newData;
}

var margin = {top: 10, right: 30, bottom: 30, left: 60},
  width = 1200 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

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
  var  len = (String(base || 10).length - String(this).length) + 1;
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
