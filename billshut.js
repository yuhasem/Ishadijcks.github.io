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

var bill = { // TODO: move to player object, integrate with save/load
	stage: NOT_STARTED,
	attempts: 0,
	cave: null,
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
	if (todaysChallenge === ""){
		var d = new Date();
		var dateSeed = Number(d.getDate() + 1000*d.getMonth()*d.getYear() + 100000*d.getDate());
		var pokemonRand = seededRand(dateSeed);
		todaysChallenge = pokemonList[Math.floor(pokemonList.length * (pokemonRand/233280))];
	}
	return todaysChallenge;
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

var showBillsMessage(message, img){
	var html = "";
	
	
}

var showBillsCave = function () {
	if (bill.inEncounter){
		showBillsEncounter();
	} else {
		var html = "";
	}
}

var showBillsEncounter = function () {
	
}

var updateBillsChallenge = function (name) {
	if (name === getTodaysChallenge() && bill.stage === STARTED){
		bill.stage = POKE_CAPTURED;
		$.notify("You caught a "+name + "! Visit Bill to get a reward!", 'success'); //TODO: custom Bill notification?
	}
}

var makeCave = function () {
	// Use a randomized Depth First Search to generate a map. Make Encounters will probably be a part of this as well.
}

var makeEncounters = function () {
	
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
		case EAST;
			break;
		default:
			console.log(dir + " is not a direction");
	}
}