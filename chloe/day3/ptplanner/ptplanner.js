var alameinLine = {
  trainLine: "Alamein Line",
  stations: ['Flinders street', 'Richmond', 'East richmond', 'Burnley', 'Hawthorn', 'Glenferrie']
}

var glennyLine = {
  trainLine: "Glen Waverley Line",
  stations: ['Flagstaff', 'Melbourne central', 'Parliament', 'Richmond', 'Kooyong', 'Tooronga']
}

var sandringhamLine = {
  trainLine: "Sandringham Line",
  stations: ['Southern cross', 'Richmond', 'South yarra', 'Prahran', 'Windsor']
}

var pakenhamLine = {
  trainLine: "Pakenham Line",
  stations: ['Pakenham', 'Berwick', 'Narre Warren', 'Hallam']
}


var trainLines = [alameinLine, glennyLine, sandringhamLine, pakenhamLine];

var userOrigin = prompt("Where are you starting your journey from?");
var userOrigin = userOrigin.charAt(0).toUpperCase() + userOrigin.slice(1)
var userDestination = prompt("Where does your journey end?");
var userDestination = userDestination.charAt(0).toUpperCase() + userDestination.slice(1)


var found = false;

for (var i = 0; i < trainLines.length; i++) {
  for (var j = 0; j < trainLines[i].stations.length; j++) {
    var geoLocation = trainLines[i].stations;
    if (geoLocation.indexOf(userOrigin) !== -1 && geoLocation.indexOf(userDestination) !== -1) {
      var journeyPath = geoLocation.slice(geoLocation.indexOf(userOrigin),geoLocation.indexOf(userDestination) + 1);
              var yourPath = journeyPath.join(' ---> ');
              console.log("Origin: " + userOrigin);
              console.log("Destination: " + userDestination);
              console.log("You should take the " + trainLines[i].trainLine)
              console.log(" ");
              console.log("Your journey is as follows: " + yourPath);
              console.log(" ");
              console.log("There are " + journeyPath.length + " stops in total");
              console.log("Good luck and farewell!");
              break;
    }
  }
}

if (yourPath) {
  console.log(" ");
} else {
  console.log("Train stations are not on the same line");
}
