//Bill's Hut

// First we need to generate a random pokemon based on the day. Look at Aegyo's swarms to make sure these don't overlap.
// Then we need a way of tracking when you saw what pokemon to capture and when you last captured that pokemon.
// Then We need a dungeon maze that you walk through to get to Bill
// Then we need a unique battling system that will test skill
// Right now I'm thinking that a wild pokemon generates a random type to attack you with and you need to choose a type to block with
// You'll be given three choices selectable with 1,2,3 or a,w,d. One of those is guaranteed to work to block the type.
// If you make 10 errors, you get booted out and have to retry the dungeon. (with a decrease in the reward at the end)
// For succeeding in finding Bill at the end of the tunnel, you get a large amount of quest points and diamonds based on the pokemon's egg steps.
// This challenge will not be available more than once per day

var NOT_STARTED = 0;
var STARTED = 1;
var POKE_CAPTURED = 2;
var STARTED_DUNGEON = 3;
var COMPLETED = 4;

var BREAK = 0;
var SHOW_ATTACK = 1;
var CHOOSE_DEFENCE = 2;
var DECIDE = 3;

var NORTH = 0;
var WEST = 1;
var SOUTH = 2;
var EAST = 3;

var caveSizeX = 10;
var caveSizeY = 10;

var bill = { // TODO: move to player object, integrate with save/load
	stage: NOT_STARTED,
	attempts: 0,
	cave: [],
	caveEncounters: [],
	inEncounter: false,
	encounterStage: BREAK,
	posX: 0,
	posY: 0,
	currentEncounter: null
}

var Encounter = function (x, y, name) {
	this.remaining = 5;
	this.atX = x;
	this.atY = y;
	this.name = name;
}

var getTodaysChallenge = function () {
	var d = new Date();
	var dateSeed = Number(d.getDate() + 1000*d.getMonth()*d.getYear() + 100000*d.getDate());
	var pokemonRand = seededRand(dateSeed);
	return pokemonList[Math.floor(pokemonList.length * (pokemonRand/233280))];
}

var showBillsHut = function () {
	switch(bill.stage){
		case NOT_STARTED:
			bill.stage = STARTED;
			showBillsMessage("", "");
			break;
		case STARTED:
			showBillsMessage("", "");
			break;
		case POKE_CAPTURED:
			// TODO: initialize dungeon and dungeonEncs
			showBillsMessage("", "");
			break;
		case STARTED_DUNGEON:
			showBillsCave();
			break;
		case COMPLETED:
			showBillsMessage("", "");
			console.log("Hey, thanks for all the help! Come back tommorow and I'll have another challenge for you. Oh, and I found these Diamonds down there. I already have a fully upgraded mine so you can have them.");
			//Add QP based on #attempts
			//Add Diamonds (eggsteps / 40?)
			break;
		default:
			console.log("something has gone terribly wrong");
	}
}

var showBillsMessage = function(message, img){
	var html = "";
}

var showBillsCave = function () {
	if (bill.inEncounter){
		showBillsEncounter();
	} else {
		var caveEl = document.getElementById("caveView");
		for (var i = 0; i < bill.cave.length; i++){
			var rowEl = document.createElement("div");
			for (var j = 0; j < bill.cave[0].length; j++){
				var colEl = document.createElement("div");
				colEl.className = "cavesquare";
				for (var k = 0; k < 4; k++){
					if (bill.cave[i][j] % (1 << (k + 1)) >= 1 << k){
						switch (k){
							case NORTH:
								colEl.style.borderTopWidth = 0;
								break;
							case WEST:
								colEl.style.borderLeftWidth = 0;
								break;
							case SOUTH:
								colEl.style.borderBottomWidth = 0;
								break;
							case EAST:
								colEl.style.borderRightWidth = 0;
						}
					}
				}
				rowEl.appendChild(colEl);
			}
			caveEl.appendChild(rowEl);
		}
	}
	document.getElementById("currentEnemy").style.display = "none";
	document.getElementById("townView").style.display = "none";
	document.getElementById("shopView").style.display = "none";
	document.getElementById("dungeonView").style.display = "none";
	document.getElementById("gymView").style.display = "none";
	
}

var showBillsEncounter = function () {
	
}

var updateBillsChallenge = function (name) {
	if (name === getTodaysChallenge().name && bill.stage === STARTED){
		bill.stage = POKE_CAPTURED;
		$.notify("You caught a " + name + "! Visit Bill to get a reward!", 'success'); //TODO: custom Bill notification?
	}
}

var startCave = function () {
	
}

var moveCave = function (dir) {
	switch (dir){
		case NORTH:
			break;
		case WEST:
			break;
		case SOUTH:
			break;
		case EAST:
			break;
		default:
			console.log(dir + " is not a direction");
	}
}

var makeCave = function () {
	for (var i = 0; i < caveSizeX; i++){
		var row = [];
		for (var j = 0; j < caveSizeY; j++){
			row.push(0);
		}
		bill.cave.push(row);
	}
	// Use a randomized Depth First Search to generate a map. Make Encounters will probably be a part of this as well.
	var stack = [{x: 0, y: 0, sinceLastEnc: 0, fromDir: WEST}]; //(0,0) is the starting square
	while (stack.length > 0){
		var currentNode = stack.pop();
		//console.log("trying node at " + currentNode.x + ", " + currentNode.y + " from " + currentNode.fromDir);
		if (bill.cave[currentNode.x][currentNode.y] > 0){
			//console.log("node already visited");
			continue;
		}
		var changeNeighbor = getNeigbor(currentNode.x, currentNode.y, currentNode.fromDir);
		if (changeNeighbor !== undefined){
			bill.cave[changeNeighbor.x][changeNeighbor.y] += 1 << oppositeDir(currentNode.fromDir);
			bill.cave[currentNode.x][currentNode.y] += 1 << currentNode.fromDir;
		}
		var neighbors = getNeighbors(currentNode.x, currentNode.y);
		while (neighbors.length > 0){
			var index = Math.floor(Math.random() * neighbors.length);
			var newNode = neighbors.splice(index, 1)[0];
			newNode.sinceLastEnc = currentNode.sinceLastEnc + 1;
			stack.push(newNode);
		}
	}
	
}

var getNeighbors = function(x, y){
	var neighbors = [];
	if (x > 0){
		neighbors.push({x: x-1, y: y, fromDir: SOUTH});
	}
	if (x < caveSizeX-1){
		neighbors.push({x: x+1, y: y, fromDir: NORTH});
	}
	if (y > 0){
		neighbors.push({x: x, y: y-1, fromDir: EAST});
	}
	if (y < caveSizeY-1){
		neighbors.push({x: x, y: y+1, fromDir: WEST});
	}
	return neighbors;
}

var getNeigbor = function(x, y, dir){
	switch (dir){
		case NORTH:
			if (x > 0){
				return {x: x-1, y: y};
			} else {
				return undefined;
			}
			break;
		case WEST:
			if (y > 0){
				return {x: x, y: y-1};
			} else {
				return undefined;
			}
			break;
		case SOUTH:
			if (x < caveSizeX-1){
				return {x: x+1, y: y};
			} else {
				return undefined;
			}
			break;
		case EAST:
			if (y < caveSizeY-1){
				return {x: x, y: y+1};
			} else {
				return undefined;
			}
			break;
		default:
			return undefined;
	}
}

var oppositeDir = function (dir){
	switch (dir){
		case NORTH:
			return SOUTH;
		case SOUTH:
			return NORTH;
		case WEST:
			return EAST;
		case EAST:
			return WEST;
		default:
			return 0;
	}
}

var makeEncounters = function () {
	
}