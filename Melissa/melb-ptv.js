// Wednesday 28th Lab Exercise
// Melbourne Public Transport Journey Planner

// Station data and adjacency list
var stations = {
  'Flinders Street': {
    neighbours: ['Richmond']
  },
  'Richmond': {
    neighbours: ['Flinders Street', 'East Richmond', 'Kooyong', 'Parliament', 'Southern Cross', 'South Yarra']
  },
  'East Richmond': {
    neighbours: ['Richmond', 'Burnley']
  },
  'Burnley': {
    neighbours: ['Hawthorn', 'East Richmond']
  },
  'Hawthorn': {
    neighbours: ['Burnley', 'Glenferrie']
  },
  'Glenferrie': {
    neighbours: ['Hawthorn']
  },
  'Flagstaff': {
    neighbours: ['Melbourne Central']
  },
  'Melbourne Central': {
    neighbours: ['Flagstaff', 'Parliament']
  },
  'Parliament': {
    neighbours: ['Melbourne Central', 'Richmond']
  },
  'Kooyong': {
    neighbours: ['Richmond', 'Tooronga']
  },
  'Tooronga': {
    neighbours: ['Kooyong']
  },
  'Southern Cross': {
    neighbours: ['Richmond']
  },
  'South Yarra': {
    neighbours: ['Richmond', 'Prahran']
  },
  'Prahran': {
    neighbours: ['South Yarra', 'Windsor']
  },
  'Windsor': {
    neighbours: ['Prahran']
  }
};
var lines = {
  'Alamein': [
    stations['Flinders Street'],
    stations['Richmond'],
    stations['East Richmond'],
    stations['Burnley'],
    stations['Hawthorn'],
    stations['Glenferrie']
  ],
  'Glen Waverly': [
    stations['Flagstaff'],
    stations['Melbourne Central'],
    stations['Parliament'],
    stations['Richmond'],
    stations['Kooyong'],
    stations['Tooronga']
  ],
  'Sandringham': [
    stations['Southern Cross'],
    stations['Richmond'],
    stations['South Yarra'],
    stations['Prahran'],
    stations['Windsor']
  ]
};

// Read and validate user input
var line = prompt('Enter train line:');
var startPoint;
var endPoint;
var solution;

if (typeof lines[line] === 'undefined') {
  console.log('Line does not exist');
}
else {
  startPoint = prompt('Enter starting station:');
  if (typeof stations[startPoint] === 'undefined') {
    console.log('Start station not a valid station');
  }
  else if (lines[line].indexOf(stations[startPoint]) === -1) {
    console.log('Start station not in selected line');
  }
  else {
    endPoint = prompt('Enter destination:');
    if (typeof stations[endPoint] === 'undefined') {
      console.log('End station not a valid station');
    }
    // If valid, find path between stations
    else {
      solution = findRoute(stations, startPoint, endPoint);
      printResults(stations, lines, startPoint, endPoint, solution);
    }
  }
}

// Find route between start point and end point
function findRoute(stations, startPoint, endPoint) {
  var visitedNodes = [];
  var tree = {};
  var stack = [];
  var solution = [];

  // Depth first search - find path from start point to end point
  stack.push(startPoint);
  while (stack.length > 0) {
    // Get next node
    var current = stack.pop();
    // Mark current as visited
    visitedNodes.push(current);

    // If end point found, create path and exit
    if (current === endPoint) {
      // Reconstruct path and end search
      solution = reconstructPath(tree, startPoint, endPoint);
      return solution;
    }

    // Else, add neighbours to stack
    var neighbours = stations[current].neighbours;
    for (var i = 0; i < neighbours.length; i++) {
      if (visitedNodes.indexOf(neighbours[i]) === -1) {
        tree[neighbours[i]] = current;
        stack.push(neighbours[i]);
      }
    }
  }
}

// Build path from start to end point
function reconstructPath(tree, startPoint, endPoint) {
  var solution = [];

  // Trace path back to start point
  solution.unshift(endPoint);
  var tracePoint = tree[endPoint];
  while (tracePoint !== startPoint) {
    solution.unshift(tracePoint);
    tracePoint = tree[tracePoint];
  }
  solution.unshift(tracePoint);

  return solution;
}

// Display results
function printResults(stations, lines, startPoint, endPoint, route) {
  // Print overview
  console.log('initial rail line: ' + line);
  console.log('origin: ' + startPoint);
  console.log('destination: ' + endPoint);
  console.log('');

  var lineNames = Object.keys(lines);

  // Print stations along route
  var routeString = '';
  for (var i = 0; i < route.length - 1; i++) {
    routeString += route[i] + ' -----> ';

    var currentStation = stations[route[i]];
    var nextStation = stations[route[i + 1]];

    // Notify user of line changes
    if (lines[line].indexOf(nextStation) === -1) {
      // Find next station's line
      var nextLine = lineNames.filter(function(line) {
        return lines[line].indexOf(nextStation) !== -1;
      })[0];

      routeString += ' [Switch to ' + nextLine
        + ' line] -----> ';

      line = nextLine;
    }
  }
  routeString += route[route.length - 1];
  console.log(routeString);

  // Print statistics
  console.log('');
  console.log(route.length - 1 + ' stops total');
}
