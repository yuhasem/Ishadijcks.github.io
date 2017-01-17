var showCardGame = function (){
	var html = "";
	
	html += "<div>";
	if (!playingGame){
		html += "<button onClick='startGame()' class='btn btn-info'>Play Game</button>";
	} else {
		if (game.sideTurn == 0){
			html += "<button onClick='endTurn()' class='btn btn-info'>End Turn</button>";
		}
	}
	html += "</div>";
	html += "<div class='row'>";
	html += 	"<span>Deck: " + game.sides[1].deck.length + "</span> ";
	html += 	"<span>Hand: " + game.sides[1].hand.length + "</span> ";
	html += 	"<span>Discard: " + game.sides[1].discard.length + "</span> ";
	html += 	"<span>Defeated: " + game.sides[1].defeated + "</span>";
	html += "</div>";
	html += "<div class='row'>";
	for (var i = 0; i < game.sides[1].hand.length; i++){
		html += "<span>" + (game.sides[1].hand[i] ? game.sides[1].hand[i].name : "Empty") + "</span>";
	}
	html += "</div>";
	html += "<div class='row'>";
	for (var i = 0; i < game.sides[1].bench.length; i++){
		html += "<span class='pokemonCard'>" + pokeDisplay(game.sides[1].bench[i]) + "</span>";
	}
	html += "</div>";
	html += "<div class='pokemonCard'>" + pokeDisplay(game.sides[1].active) + "</div>";
	html += "<br>" //hue
	html += "<div onClick='selectCard(0)' class='pokemonCard" + (selectedIndex == 0 && selected ? " selected" : "") + "'>" + pokeDisplay(game.sides[0].active) + "</div>";
	if (game.sides[0].active){
		html += "<div class='row'>";
		for (var i = 0; i < game.sides[0].active.attacks.length; i++){
			var att = game.sides[0].active.attacks[i];
			html += "<span onClick='attack(0, + " + i + ")'>" + att.name + ": " + att.damage + "</span> "; // cost: ";
			html += "<span>Type: " + energyTypeDisplay(att.element) + "</span> ";
			html += "<span>Cost: </span>"
			/*
			for (var type in game.sides[0].active.attacks[i].cost){
				html += type + " x" + game.sides[0].active.attacks[i].cost[type];
			}
			*/
			html += energyObjectDisplay(att.cost);
			//html += "</span> ";
		}
		html += "</div>";
	}
	html += "<div class='row'>";
	for (var i = 0; i < game.sides[0].bench.length; i++){
		html += "<span onClick='selectCard("+(i+1)+")' class='pokemonCard " + (selectedIndex == (i+1) && selected ? " selected" : "") + "'>" + pokeDisplay(game.sides[0].bench[i]) + "</span>";
	}
	html += "</div>";
	html += "<div class='row'>";
	for (var i = 0; i < game.sides[0].hand.length; i++){
		html += "<span onClick='selectCard("+(i+6)+")' " + (selectedIndex == (i+6) && selected ? "class='selected'" : "") + ">" + (game.sides[0].hand[i] ? game.sides[0].hand[i].name : "Empty") + "</span>";
	}
	html += "</div>";
	html += "<div class='row'>";
	html += 	"<span>Deck: " + game.sides[0].deck.length + "</span> ";
	html += 	"<span>Hand: " + game.sides[0].hand.length + "</span> ";
	html += 	"<span>Discard: " + game.sides[0].discard.length + "</span> ";
	html += 	"<span>Defeated: " + game.sides[0].defeated + "</span>";
	html += "</div>";
	
	html += "<br><br>";
	for (var i = 0; i < gameConsole.length; i++){
		html += "<div>" + gameConsole[i] + "</div>";
	}
	
	$("#cardGameBody").html(html);
}

var pokeDisplay = function (poke) {
	if (!poke){
		return "Empty";
	}
	var html = "";
	var a = 1;
	for (var i = 0; i < pokemonList.length; i++){
		if (pokemonList[i].name === poke.species){
			a = (i+1);
			break;
		}
	}
	html += "<div><img src='images/pokemon/" + a + ".png'>" + "</div>";
	html += "<div><span>" + poke.name + "</span> <span>HP: " + poke.health + "/" + poke.maxHealth + "</span></div>";
	html += "<div>Type: " + energyTypeDisplay(poke.element) + "</div>";
	/*html += "<div>";
	for (var i = 0; i < poke.energy.length; i++){
		html += "<span>" + poke.energy[i].name + "</span> ";
	}
	html += "</div>"*/
	html += "<div>Energy: ";
	html += energyObjectDisplay(poke.energyTotal);
	html += "</div>";
	return html;
}

var energyObjectDisplay = function (obj) {
	var html = "";
	html += "<span>";
	for (var type in obj){
		var img = energyTypeDisplay(type);
		for (var i = 0; i < obj[type]; i++){
			html += img;
		}
	}
	if (html === "<span>"){
		html += "0";
	}
	html += "</span>";
	return html;
}

var energyTypeDisplay = function (type) {
	//energy images from http://ilkcmp.deviantart.com/art/Neo-Redux-Energy-Type-Icons-212735332
	if (type === "colorless"){
		type = "normal";
	}
	return "<img src='images/energy/" + type + ".png' width='20px' height='20px'>";
}

var showDeckBuilder = function () {
	console.log("showing deck");
	var html = "";
	
	html += "<div>";
	html += 	"<h3>Current Deck ("+player.cards.deck.length+"/"+player.cards.maxDeck+"):</h3>";
	html += "</div>";
	
	for (var i = 0; i < player.cards.deck.length; i++){
		html += "<span onClick='removeFromDeck("+i+")'>";
		html += 	player.cards.deck[i];
		html += "</span>";
	}
	
	html += "<div>";
	html += 	"<h3>Available Cards</h3>";
	html += "</div>";
	
	for (var card in player.cards.availableCards){
		html += "<span onClick='addToDeck(\""+card+"\")'>";
		html += 	card + " x " + player.cards.availableCards[card];
		html += "</span>";
	}
	
	$("#deckBuilderBody").html(html);
}

var Side = function () {
	var temp = {};
	temp.deck = [];
	temp.hand = [];
	temp.discard = [];
	temp.active = null;
	temp.bench = Array.apply(null, Array(5));
	temp.defeated = 0;
	return temp;
}

var game = {
	sides: [Side(), Side()], //sides[0] is player, sides[1] is opponent
	turn: 0,
	sideTurn: 0,
	pokemonAction: false,
	energyAction: false,
}
var playingGame = false;
var stopAfter = 2;
var startingHand = 7;
var gameConsole = Array.apply("", Array(15));
var selected = false;
var selectedIndex = 0;
var wins = 0;
var losses = 0; //These will be in the player object along with other stats probably TODO

var oppDeck = ["Rattata", "Rattata", "Raticate", "Spearow", "Spearow", "Fearow", "Normal Energy", "Normal Energy", "Normal Energy", "Flying Energy", "Flying Energy", "Flying Energy"];

var logMessage = function (message){
	gameConsole.shift();
	gameConsole.push(message);
}

var startGame = function (){
	game.sides = [Side(), Side()];
	game.turn = 0,
	game.sideTurn = 0,
	game.pokemonAction = false;
	game.energyAction = false;
	makeDeck(player.cards.deck, game.sides[0].deck);
	makeDeck(oppDeck, game.sides[1].deck);
	if (!isValidDeck(game.sides[0].deck) || !isValidDeck(game.sides[1].deck)){
		console.log("something went wrong, someone's deck isn't right");
		logMessage("An Error Occurred, look at the console for more.");
		showCardGame();
		return;
	}
	playingGame = true;
	for (var i = 0; i < startingHand; i++){
		drawCard(0);
		drawCard(1);
	}
	logMessage("Starting Game!");
	startTurn();
	showCardGame();
}

var makeDeck = function (fromCards, toDeck){
	for (var i = 0; i < fromCards.length; i++){
		var card = newCard(fromCards[i]);
		if (card){
			toDeck.push(card);
		} else {
			logMessage(fromCards[i] + " is not a valid card");
		}
	}
}

var isValidDeck = function (deck){
	//TODO
	return true;
}

var endGame = function (win){
	if (playingGame){
		playingGame = false;
		if (win){
			logMessage("You Win!");
			wins++;
		} else {
			logMessage("You Lose!");
			losses++;
		}
		showCardGame();
	}
}

var startTurn = function (){
	if (!playingGame){
		return;
	}
	dealBrnDamage(1);
	dealPsnDamage(1);
	logMessage("It's your turn!");
	slpEndCheck(0);
	frzEndCheck(0);
	game.sideTurn = 0;
	game.turn++;
	game.pokemonAction = false;
	game.energyAction = false;
	drawCard(0);
	
	showCardGame();
}

var endTurn = function (){
	if (!playingGame){
		return;
	}
	game.sideTurn = 1;
	if (game.sides[0].active === null){
		logMessage("You didn't have an active pokemon at the end of the turn");
		endGame(false);
		return;
	}
	dealBrnDamage(0);
	dealPsnDamage(0);
	game.pokemonAction = false;
	game.energyAction = false;
	logMessage("It's you opponent's turn!");
	slpEndCheck(1);
	frzEndCheck(1);
	drawCard(1);
	opponentTurn();
}

var dealBrnDamage = function (side){
	if (game.sides[side].active && game.sides[side].active.status === "brn"){
		game.sides[side].active.health -= 20;
		logMessage(game.sides[side].active.name + " was hurt by its burn!");
		if (game.sides[side].active.health <= 0){
			fainted(side, 0);
		}
	}
}

var dealPsnDamage = function (side){
	if (game.sides[side].active && game.sides[side].active.status === "psn"){
		game.sides[side].active.health -= 10;
		logMessage(game.sides[side].active.name + " was hurt by poison!");
		if (game.sides[side].active.health <= 0){
			fainted(side, 0);
		}
	}
	for (var i = 0; i < game.sides[side].bench.length; i++){
		if (game.sides[side].bench[i] && game.sides[side].bench[i].status === "psn"){
			game.sides[side].bench[i].health -= 10;
			logMessage(game.sides[side].bench[i].name + " was hurt by posion!");
			if (game.sides[side].bench[i].health <= 0){
				fainted(side, i+1);
			}
		}
	}
}

var slpEndCheck = function (side){
	if (game.sides[side].active && game.sides[side].active.status === "slp"){
		if (Math.random() > 0.5){
			game.sides[side].active.status = "";
			logMessage(game.sides[side].active.name + " woke up!");
		}
	}
	for (var i = 0; i < game.sides[side].bench.length; i++){
		if (game.sides[side].bench[i] && game.sides[side].bench[i].status === "slp"){
			if (Math.random() > 0.5){
				game.sides[side].bench[i].status = "";
				logMessage(game.sides[side].active.name + " woke up!");
			}
		}
	}
}

var frzEndCheck = function (side){
	if (game.sides[side].active && game.sides[side].active.status === "frz"){
		if (Math.random() > 0.5){
			game.sides[side].active.status = "";
			logMessage(game.sides[side].active.name + " thawed out!");
		}
	}
	for (var i = 0; i < game.sides[side].bench.length; i++){
		if (game.sides[side].bench[i] && game.sides[side].bench[i].status === "frz"){
			if (Math.random() > 0.5){
				game.sides[side].bench[i].status = "";
				logMessage(game.sides[side].active.name + " thawed out!");
			}
		}
	}
}

var selectCard = function (i){
	if (!playingGame){
		return;
	}
	console.log("selecting " + i);
	var side = game.sides[0];
	if (!selected){
		if (i == 0 && side.active){
			selectedIndex = i;
			selected = true;
		}
		if (i > 0 && i <= 5 && side.bench[i-1]){
			selectedIndex = i;
			selected = true;
		}
		if (i > 5 && side.hand[i-6]){
			selectedIndex = i;
			selected = true;
		}
	} else {
		if (i == 0){
			if (selectedIndex == 0){
				//de-select
				selected = false;
			} else if (selectedIndex > 0 && selectedIndex <= 5){
				//switch bench and active
				if (switchActive(0, selectedIndex)){
					selected = false;
				}
			} else if (selectedIndex > 5){
				var selectedCard = side.hand[selectedIndex-6];
				if (selectedCard.type === "poke"){
					if (side.active){
						//evolve
						if (evolve(0, side.active, selectedCard, 0)){
							side.hand.splice(selectedIndex-6, 1);
							selected = false;
						}
					} else {
						//play to active spot
						if (playCard(0, selectedCard, 0)){
							side.hand.splice(selectedIndex-6, 1);
							selected = false;
						}
					}
				} else if (selectedCard.type === "energy"){
					if (side.active){
						//attach energy
						if (attachEnergy(side.active, selectedCard)){
							side.hand.splice(selectedIndex-6, 1);
							selected = false;
						}
					} else {
						//nothing happens
					}
				} else if (selectedCard.type === "item"){
					if (playCard(0, selectedCard, 0)){
						side.hand.splice(selectedIndex-6, 1);
						selected = false;
					}
				} else {
					console.log("wat");
				}
			} else {
				console.log("wat");
			}
		} else if (i > 0 && i <= 5){
			if (selectedIndex == 0){
				//switch bench and active
				if (switchActive(0, i)){
					selected = false;
				}
			} else if (selectedIndex > 0 && selectedIndex <= 5){
				//swap the two bench spots
				var temp = side.bench[selectedIndex-1];
				side.bench[selectedIndex-1] = side.bench[i-1];
				side.bench[i-1] = temp;
				selected = false;
			} else if (selectedIndex > 5){
				var selectedCard = side.hand[selectedIndex-6];
				if (selectedCard.type === "poke"){
					if (side.bench[i-1]){
						//evolve
						if (evolve(0, side.bench[i-1], selectedCard, i)){
							side.hand.splice(selectedIndex-6, 1);
							selected = false;
						}
					} else {
						//play to bench
						if (playCard(0, selectedCard, i)){
							side.hand.splice(selectedIndex-6, 1);
							selected = false;
						}
					}
				} else if (selectedCard.type === "energy"){
					if (side.bench[i-1]){
						//attach energy
						if (attachEnergy(side.bench[i-1], selectedCard)){
							side.hand.splice(selectedIndex-6, 1);
							selected = false;
						}
					} else {
						//nothing happens
					}
				} else if (selectedCard.type === "item"){
					if (playCard(0, selectedCard, i)){
						side.hand.splice(selectedIndex-6, 1);
						selected = false;
					}
				} else {
					console.log("wat")
				}
			} else {
				console.log("wat");
			}
		} else if (i > 5 && side.hand[i-6]){
			if (selectedIndex > 5){
				//swap the hand positions
				switchHand(i-6, selectedIndex-6);
				selected = false;
			}
		} else if (i < 0){
			//this represents selecting an opponent card (not implemented TODO)
			if (selectedIndex > 5){
				var selectedCard = side.hand[selectedIndex-6];
				if (selectedCard === "item"){
					if (playCard(0, selectedCard, i)){
						side.hand.splice(selectedIndex-6, 1);
						selected = false;
					}
				}
			}
		}
	}
	showCardGame();
}

var drawCard = function (side){
	if (playingGame){
		if (game.sides[side].deck.length > 0){
			game.sides[side].hand.push(game.sides[side].deck.splice(Math.floor(Math.random()*game.sides[side].deck.length), 1)[0]);
			if (side){
				logMessage("Your opponent draws a card");
			} else {
				logMessage("You draw a card");
			}
		}
	}
}

var discard = function (side, card){
	if (card){
		if (card.onDiscard){
			card.onDiscard(game, card, side);
		}
		game.sides[side].discard.push(card);
		logMessage((side ? "Opponent's" : "Your") + " " + card.name + " sent to the discard!");
		return true;
	} else {
		return false;
	}
}

var canUseAttack = function (side, attack){
	if (!playingGame || !game.sides[side].active){
		return false;
	}
	var poke = game.sides[side].active;
	if (poke.attacks.length <= attack){
		return false;
	}
	if (poke.status === "slp" || poke.status === "frz"){
		return false;
	}
	var leftovers = 0;
	/*
	for (var type in poke.attacks[attack].cost){
		if (type === "colorless"){
			continue; //we'll check this type after we've seen everything
		}
		var diff = poke.energyTotal[type] - poke.attacks[attack].cost[type];
		if (diff < 0){
			console.log("not enough " + type + " energy to use " + poke.attacks[attack].name);
			return false;
		} else {
			leftovers += diff 
		}
	}
	*/
	for (var i = 0; i < numberToType.length; i++){
		var type = numberToType[i];
		if (poke.attacks[attack].cost[type]){
			if (poke.energyTotal[type]){
				var diff = poke.energyTotal[type] - poke.attacks[attack].cost[type];
				if (diff < 0){
					return false;
				} else {
					leftovers += diff;
				}
			} else {
				return false;
			}
		} else {
			if (poke.energyTotal[type]){
				leftovers += poke.energyTotal[type];
			}
		}
	}
	if (poke.attacks[attack].cost.colorless){
		if (poke.energyTotal["colorless"]){
			leftovers += poke.energyTotal["colorless"];
		}
		if (leftovers < poke.attacks[attack].cost.colorless){
			return false;
		}
	}
	return true;
}

var attack = function (side, attack){
	var otherSide = (side + 1) % 2;
	if (!playingGame || !game.sides[0].active || !game.sides[1].active || game.pokemonAction){
		return false;
	}
	if (canUseAttack(side, attack)){
		if (game.sides[side].active.status === "prz" && Math.random() < 0.5){
			logMessage(game.sides[side].active.name + " is paralyzed! It couldn't move!");
			game.pokemonAction = true;
			return true;
		}
		if (game.sides[side].active.status === "cnf"){
			if (Math.random() > 0.5){
				logMessage(game.sides[side].active.name + " snapped out of confusion!");
				game.sides[side].active.status = "";
			} else {
				if (Math.random() < 0.5){
					logMessage(game.sides[side].active.name + " hurt itself in confusion!");
					game.sides[side].active.health -= 10;
					if (game.sides[side].active.health <= 0){
						fainted(side, 0);
					}
					game.pokemonAction = true;
					return true;
				}
			}
		}
		var attackObj = game.sides[side].active.attacks[attack];
		logMessage(game.sides[side].active.name + " attacks using " + attackObj.name);
		var damage = attackObj.damage;
		if (attackObj.onUse){
			damage = attackObj.onUse(game, game.sides[0].active);
		}
		switch (cardTypeAdvantages[typeToNumber(attackObj.element)][typeToNumber(game.sides[otherSide].active.element)]){
			case 0:
				damage = 0;
				logMessage("It didn't do anything!");
				break;
			case 0.5:
				damage = 10*Math.ceil(damage/20);
				logMessage("It's not very effective...");
				break;
			case 2:
				damage *= 2;
				logMessage("It's super effective!");
				break;
			case 1:
			default:
				break;
		}
		if (damage > 0){
			if (game.sides[otherSide].active.onTakeDamage){
				damage = game.sides[otherSide].active.onTakeDamage(game, game.sides[side].active, game.sides[otherSide].active, damage); 
			}
		}
		if (damage > 0){
			if (game.sides[side].active.onDealDamage){
				game.sides[side].active.onDealDamage(game, game.sides[side].active, game.sides[otherSide].active, damage);
			}
		}
		if (damage > 0){
			logMessage(game.sides[otherSide].active.name + " takes " + damage + " damage!");
		}
		game.sides[otherSide].active.health -= damage;
		if (game.sides[otherSide].active.health <= 0){
			fainted(otherSide, 0);
		}
		//This is where recoil damage would go. I'm thinking about an afterDamage(game, side, attacker, defender, damage) function for attacks TODO
		if (attackObj.afterDamage){
			attackObj.afterDamage(game, side, game.sides[side].active, game.sides[otherSide].active, damage);
		}
		game.pokemonAction = true;
		showCardGame();
		return true;
	} else {
		return false;
	}
}

var fainted = function (side, index){
	if (index == 0){
		var poke = game.sides[side].active;
		game.sides[side].active = null;
	} else if (index > 0 && index <= 5){
		var poke = game.sides[side].bench[index-1];
		game.sides[side].bench[index-1] = null;
	}
	for (var i = 0; i < poke.energy.length; i++){
		discard(side, poke.energy[i]);
	}
	poke.energy = [];
	poke.energyTotal = {};
	game.sides[side].defeated++;
	logMessage(poke.name + " fainted!");
	if (game.sides[side].defeated >= stopAfter){
		endGame(side);
		return;
	}
	discard(side, poke); //Need to have onDiscard trigger after the end game check
	//Actually the position of discard causes a confusing logMessage order...
}

var switchActive = function (side, index){
	//index is the index of the benched pokemon we're switching with
	if (!game.sides[side].bench[index-1] || (game.sides[side].active && game.pokemonAction)){
		return false;
	} else {
		var temp = game.sides[side].active;
		game.sides[side].active = game.sides[side].bench[index-1];
		game.sides[side].bench[index-1] = temp;
		if (side){
			if (game.sides[side].bench[index-1]){
				logMessage("Opponent switches its " + game.sides[side].bench[index-1].name + " and " + game.sides[side].active.name);
			} else {
				logMessage("Opponent siwtches its " + game.sides[side].active.name + " to active");
			}
		} else {
			if (game.sides[side].bench[index-1]){
				logMessage("You switch your " + game.sides[side].bench[index-1].name + " and " + game.sides[side].active.name);
			} else {
				logMessage("You switch your " + game.sides[side].active.name + " to active");
			}
		}
		if (game.sides[side].bench[index-1] && game.sides[side].bench[index-1].onBench){
			game.sides[side].bench[index-1].onBench(game, game.sides[side].bench[index-1], side);
		}
		if (game.sides[side].active.onActivate){
			game.sides[side].active.onActivate(game, game.sides[side].active, side);
		}
		if (game.sides[side].bench[index-1]){
			//Only prevent the team from attacking if they've switched two pokemon
			//Instead of if they're moving in a new poke
			game.pokemonAction = true;
			//Also take this opportunity to cure confusion
			if (game.sides[side].bench[index-1].status === "cnf"){
				game.sides[side].bench[index-1].status = "";
			}
		}
		return true;
	}
}

var switchHand = function (index1, index2){
	//this only will happen for player since this is an aesthetic change
	var hand = game.sides[0].hand;
	if (index1 < hand.length && index2 < hand.length){
		var temp = hand[index1];
		hand[index1] = hand[index2];
		hand[index2] = temp;
	}
}

var playCard = function (side, card, index){
	if (!card || index < 0 || index > 5){
		return false;
	}
	if (card.type === "poke"){
		if (card.stage != 0){
			return false;
		} else {
			if (index == 0){
				if (game.sides[side].active){
					return false;
				} else {
					game.sides[side].active = card;
					logMessage((side ? "Your opponent plays " : "You play ") + game.sides[side].active.name + " to active!");
					if (card.onPlay){
						card.onPlay(game, side);
					}
					if (card.onActivate){
						card.onActivate(game, card, side);
					}
				}
			} else if (index > 0 && index <= 5){
				if (game.sides[side].bench[index-1]){
					return false;
				} else {
					game.sides[side].bench[index-1] = card;
					logMessage((side ? "Your opponent plays " : "You play ") + game.sides[side].bench[index-1].name + " to the bench!");
					if (card.onPlay){
						card.onPlay(game, side);
					}
				}
			} else {
				return false;
			}
		}
	} else if (card.type === "item"){
		if (card.onTarget){
			if (index == 0){
				if (game.sides[side].active){
					card.onTarget(game, game.sides[side].active, side);
				} else {
					return false;
				}
			} else if (index > 0 && index <= 5){
				if (game.sides[side].bench[index-1]){
					card.onTarget(game, game.sides[side].bench[index-1], side);
				} else {
					return false;
				}
			} else { //TODO, target opponent cards
				return false;
			}
		}
		if (card.onPlay){
			card.onPlay(game, side);
		}
	} else {
		return false;
	}
	return true;
}

var evolve = function (side, base, evo, index){
	if (base.stage + 1 != evo.stage){
		return false;
	}
	if (index > 5 || index < 0){
		return false;
	}
	if (getPokemonByName(base.species).evolution && getPokemonByName(base.species).evolution.indexOf(evo.species) >= 0){
		while (base.energy.length > 0){
			evo.energy.push(base.energy.pop());
		}
		for (var key in base.energyTotal){
			evo.energyTotal[key] = base.energyTotal[key];
		}
		base.energy = [];
		base.energyTotal = {};
		//should we keep this as full heal? or should we only heal the difference in maxHealth?
		if (index == 0){
			game.sides[side].active = evo;
		} else {
			game.sides[side].bench[index-1] = evo;
		}
		//The base is being discarded, but we don't want to actually treat it as such
		//which is why discard() isn't called here
		game.sides[side].discard.push(base);
	} else {
		return false;
	}
	logMessage((side ? "Opponent's " : "Your ") + base.name + " evolved into " + evo.name + "!");
	return true;
}

var attachEnergy = function (poke, energy){
	if (!poke || !energy || game.energyAction){
		return false;
	} else {
		poke.energy.push(energy);
		var type = energy.element;
		if (poke.energyTotal[type]){
			poke.energyTotal[type] += energy.value;
		} else {
			poke.energyTotal[type] = energy.value;
		}
		logMessage(energy.name + " attached to " + poke.name + "!");
		if (poke.onAttachEnergy){
			poke.onAttachEnergy(game, poke, energy);
		}
		game.energyAction = true;
	}
	return true;
}

var opponentTurn = function (){
	if (!game.sides[1].active){
		//console.log("no active (search 1)");
		//If we don't have an active pokemon search for one to put in
		//First search the bench
		for (var i = 0; i < game.sides[1].bench.length; i++){
			if (game.sides[1].bench[i]){
				switchActive(1, i+1);
				break;
			}
		}
		//Then search our hand (if we still haven't found one)
		if (!game.sides[1].active){
			//console.log("no active (search 2)");
			for (var i = 0; i < game.sides[1].hand.length; i++){
				var card = game.sides[1].hand[i];
				if (card.type === "poke" && card.stage == 0){
					if (playCard(1, card, 0)){
						game.sides[1].hand.splice(i, 1);
						break;
					}
				}
			}
		}
	}
	if (game.sides[1].active){
		//console.log("stage 0 poke search");
		//If we have any stage 0 pokes in our hand, let's play them to the bench if there's room
		for (var i = 0; i < game.sides[1].hand.length; i++){
			var card = game.sides[1].hand[i];
			if (card.type === "poke" && card.stage == 0){
				//console.log("found 1 at index " + i);
				for (var j = 0; j < game.sides[1].bench.length; j++){
					if (!game.sides[1].bench[j]){
						//console.log("open space at bench " + j);
						if (playCard(1, card, j+1)){
							//console.log("card played");
							game.sides[1].hand.splice(i, 1);
							i--; // because we want to check the next card in the hand but we just removed one
							break;
						}
					}
				}
			}
		}
		//console.log("evo search 1");
		//For every poke we have out, let's see if we have an evolution in our hand, starting with our active poke
		for (var i = 0; i < game.sides[1].hand.length; i++){
			var card = game.sides[1].hand[i];
			var poke = getPokemonByName(game.sides[1].active.species);
			if (card.type === "poke" && poke.evolution && poke.evolution.indexOf(card.species) >= 0){
				//console.log("found 1 at index " + i);
				if (evolve(1, game.sides[1].active, card, 0)){
					//console.log("evo played");
					game.sides[1].hand.splice(i, 1);
					break; //only do one evo per turn (even though there's really nothing stopping you from doing as many as you'd like)
				}
			}
		}
		//console.log("evo search 2");
		for (var i = 0; i < game.sides[1].bench.length; i++){
			var base = game.sides[1].bench[i];
			if (base){
				//console.log("searching for an evo to index " + i + ", name " + base.name);
				for (var j = 0; j < game.sides[1].hand.length; j++){
					var card = game.sides[1].hand[j];
					var poke = getPokemonByName(base.species);
					if (card.type === "poke" && poke.evolution && poke.evolution.indexOf(card.species) >= 0){
						//console.log("found a match");
						if (evolve(1, base, card, i+1)){
							//console.log("evo played");
							game.sides[1].hand.splice(j, 1);
							break;
						}
					}
				}
			}
		}
		//console.log("energy search");
		//If we have an energy in our hand, play it to the active poke
		for (var i = 0; i < game.sides[1].hand.length; i++){
			var card = game.sides[1].hand[i];
			if (card.type === "energy"){
				//console.log("found and attaching energy + " + i);
				if (attachEnergy(game.sides[1].active, card)){
					game.sides[1].hand.splice(i, 1);
					break;
				}
			}
		}
		//console.log("attack search");
		//If our active can use an attack, use one, prioritizing highest damage
		var chosenAttack = -1;
		var chosenDamage = 0;
		for (var i = 0; i < game.sides[1].active.attacks.length; i++){
			var att = game.sides[1].active.attacks[i];
			if (att.damage > chosenDamage && canUseAttack(1, i)){
				chosenAttack = i;
				chosenDamage = att.damage;
			}
		}
		//console.log("attack " + chosenAttack + ", damage " + chosenDamage);
		if (chosenAttack >= 0){
			attack(1, chosenAttack);
		}
	} else {
		//End game (we couldn't find an pokemon to make active)
		logMessage("Your opponent didn't have an active pokemon at the end of the turn");
		endGame(true);
		return;
	}
	startTurn();
}

var addToDeck = function (card){
	console.log("adding " + card);
	if (player.cards.availableCards[card] > 0 && player.cards.deck.length < player.cards.maxDeck){
		player.cards.deck.push(card);
		player.cards.availableCards[card]--;
		player.cards.deck.sort();
	}
	showDeckBuilder();
}

var removeFromDeck = function (i){
	console.log("removing " + i);
	var card = player.cards.deck[i];
	if (player.cards.availableCards[card]){
		player.cards.availableCards[card]++;
	} else {
		player.cards.availableCards[card] = 1;
	}
	player.cards.deck.splice(i, 1);
	showDeckBuilder();
}

var updateAvailableCards = function (){
	if (player.starter === "Bulbasaur"){
		player.cards.availableCards["Bulbasaur"] = 3;
		player.cards.availableCards["Ivysaur"] = 2;
		player.cards.availableCards["Venusaur"] = 1;
		player.cards.availableCards["Grass Energy"] = 6;
	} else if (player.starter === "Charmander"){
		player.cards.availableCards["Charmander"] = 3;
		player.cards.availableCards["Charmeleon"] = 2;
		player.cards.availableCards["Charizard"] = 1;
		player.cards.availableCards["Fire Energy"] = 6;
	} else if (player.starter === "Squirtle"){
		player.cards.availableCards["Squirtle"] = 3;
		player.cards.availableCards["Wartortle"] = 2;
		player.cards.availableCards["Blastoise"] = 1;
		player.cards.availableCards["Water Energy"] = 6;
	} else {
		console.log("We couldn't find your starter, so we couldn't build you a starting deck");
	}
}

//I'm making this separate from the one in types.js because doing 3x damage in a not very effective matchup would be completely broken and impossible to balance for
//I am however going to use the type numbers and numberToType from type.js
var cardTypeAdvantages = [];

for( var i = 0; i<18; i++){
	var row = [];
	for(var j = 0; j<18; j++){
		row.push(1);
	}
	cardTypeAdvantages.push(row);
}


cardTypeAdvantages[NORMAL][ROCK] = 0.5;
cardTypeAdvantages[NORMAL][GHOST] = 0;
cardTypeAdvantages[NORMAL][STEEL] = 0.5;
	
cardTypeAdvantages[FIRE][FIRE] = 0.5;
cardTypeAdvantages[FIRE][WATER] = 0.5;
cardTypeAdvantages[FIRE][GRASS] = 2;
cardTypeAdvantages[FIRE][ICE] = 2;
cardTypeAdvantages[FIRE][BUG] = 2;
cardTypeAdvantages[FIRE][ROCK] = 0.5;
cardTypeAdvantages[FIRE][DRAGON] = 0.5;
cardTypeAdvantages[FIRE][STEEL] = 2;

cardTypeAdvantages[WATER][FIRE] = 2;
cardTypeAdvantages[WATER][WATER] = 0.5;
cardTypeAdvantages[WATER][GRASS] = 0.5;
cardTypeAdvantages[WATER][GROUND] = 2;
cardTypeAdvantages[WATER][ROCK] = 2;
cardTypeAdvantages[WATER][DRAGON] = 0.5;

cardTypeAdvantages[ELECTRIC][WATER] = 2;
cardTypeAdvantages[ELECTRIC][ELECTRIC] = 0.5;
cardTypeAdvantages[ELECTRIC][GRASS] = 0.5;
cardTypeAdvantages[ELECTRIC][GROUND] = 0;
cardTypeAdvantages[ELECTRIC][FLYING] = 2;
cardTypeAdvantages[ELECTRIC][DRAGON] = 0.5;

cardTypeAdvantages[GRASS][FIRE] = 0.5;
cardTypeAdvantages[GRASS][WATER] = 2;
cardTypeAdvantages[GRASS][GRASS] = 0.5;
cardTypeAdvantages[GRASS][POISON] = 0.5;
cardTypeAdvantages[GRASS][GROUND] = 2;
cardTypeAdvantages[GRASS][FLYING] = 0.5;
cardTypeAdvantages[GRASS][BUG] = 0.5;
cardTypeAdvantages[GRASS][ROCK] = 2;
cardTypeAdvantages[GRASS][DRAGON] = 0.5;
cardTypeAdvantages[GRASS][STEEL] = 0.5;

cardTypeAdvantages[ICE][FIRE] = 0.5;
cardTypeAdvantages[ICE][WATER] = 0.5;
cardTypeAdvantages[ICE][GRASS] = 2;
cardTypeAdvantages[ICE][ICE] = 0.5;
cardTypeAdvantages[ICE][GROUND] = 2;
cardTypeAdvantages[ICE][FLYING] = 2;
cardTypeAdvantages[ICE][DRAGON] = 2;
cardTypeAdvantages[ICE][STEEL] = 0.5;

cardTypeAdvantages[FIGHTING][NORMAL] = 2;
cardTypeAdvantages[FIGHTING][ICE] = 2;
cardTypeAdvantages[FIGHTING][POISON] = 0.5;
cardTypeAdvantages[FIGHTING][FLYING] = 0.5;
cardTypeAdvantages[FIGHTING][PSYCHIC] = 0.5;
cardTypeAdvantages[FIGHTING][BUG] = 0.5;
cardTypeAdvantages[FIGHTING][ROCK] = 2;
cardTypeAdvantages[FIGHTING][GHOST] = 0;
cardTypeAdvantages[FIGHTING][DARK] = 2;
cardTypeAdvantages[FIGHTING][STEEL] = 2;
cardTypeAdvantages[FIGHTING][FAIRY] = 0.5;

cardTypeAdvantages[POISON][GRASS] = 2;
cardTypeAdvantages[POISON][POISON] = 0.5;
cardTypeAdvantages[POISON][GROUND] = 0.5;
cardTypeAdvantages[POISON][ROCK] = 0.5;
cardTypeAdvantages[POISON][GHOST] = 0.5;
cardTypeAdvantages[POISON][STEEL] = 0;
cardTypeAdvantages[POISON][FAIRY] = 2;

cardTypeAdvantages[GROUND][FIRE] = 2;
cardTypeAdvantages[GROUND][ELECTRIC] = 2;
cardTypeAdvantages[GROUND][GRASS] = 0.5;
cardTypeAdvantages[GROUND][POISON] = 2;
cardTypeAdvantages[GROUND][FLYING] = 0;
cardTypeAdvantages[GROUND][BUG] = 0.5;
cardTypeAdvantages[GROUND][ROCK] = 2;
cardTypeAdvantages[GROUND][STEEL] = 2;

cardTypeAdvantages[FLYING][ELECTRIC] = 0.5;
cardTypeAdvantages[FLYING][GRASS] = 2;
cardTypeAdvantages[FLYING][FIGHTING] = 2;
cardTypeAdvantages[FLYING][BUG] = 2;
cardTypeAdvantages[FLYING][ROCK] = 0.5;
cardTypeAdvantages[FLYING][STEEL] = 0.5;

cardTypeAdvantages[PSYCHIC][FIGHTING] = 2;
cardTypeAdvantages[PSYCHIC][POISON] = 2;
cardTypeAdvantages[PSYCHIC][PSYCHIC] = 0.5;
cardTypeAdvantages[PSYCHIC][DARK] = 0;
cardTypeAdvantages[PSYCHIC][STEEL] = 0.5;

cardTypeAdvantages[BUG][FIRE] = 0.5;
cardTypeAdvantages[BUG][GRASS] = 2;
cardTypeAdvantages[BUG][FIGHTING] = 0.5;
cardTypeAdvantages[BUG][POISON] = 0.5;
cardTypeAdvantages[BUG][FLYING] = 0.5;
cardTypeAdvantages[BUG][PSYCHIC] = 2;
cardTypeAdvantages[BUG][GHOST] = 0.5;
cardTypeAdvantages[BUG][DARK] = 2;
cardTypeAdvantages[BUG][STEEL] = 0.5;
cardTypeAdvantages[BUG][FAIRY] = 0.5;

cardTypeAdvantages[ROCK][FIRE] = 2;
cardTypeAdvantages[ROCK][ICE] = 2;
cardTypeAdvantages[ROCK][FIGHTING] = 0.5;
cardTypeAdvantages[ROCK][GROUND] = 0.5;
cardTypeAdvantages[ROCK][FLYING] = 2;
cardTypeAdvantages[ROCK][BUG] = 2;
cardTypeAdvantages[ROCK][STEEL] = 0.5;

cardTypeAdvantages[GHOST][NORMAL] = 0;
cardTypeAdvantages[GHOST][PSYCHIC] = 2;
cardTypeAdvantages[GHOST][GHOST] = 2;
cardTypeAdvantages[GHOST][DARK] = 0.5;

cardTypeAdvantages[DRAGON][DRAGON] = 2;
cardTypeAdvantages[DRAGON][STEEL] = 0.5;
cardTypeAdvantages[DRAGON][FAIRY] = 0;

cardTypeAdvantages[DARK][FIGHTING] = 0.5;
cardTypeAdvantages[DARK][PSYCHIC] = 2;
cardTypeAdvantages[DARK][GHOST] = 2;
cardTypeAdvantages[DARK][DARK] = 0.5;
cardTypeAdvantages[DARK][FAIRY] = 0.5;

cardTypeAdvantages[STEEL][FIRE] = 0.5;
cardTypeAdvantages[STEEL][WATER] = 0.5;
cardTypeAdvantages[STEEL][ELECTRIC] = 0.5;
cardTypeAdvantages[STEEL][ICE] = 2;
cardTypeAdvantages[STEEL][ROCK] = 2;
cardTypeAdvantages[STEEL][STEEL] = 0.5;
cardTypeAdvantages[STEEL][FAIRY] = 2;

cardTypeAdvantages[FAIRY][FIRE] = 0.5;
cardTypeAdvantages[FAIRY][FIGHTING] = 2;
cardTypeAdvantages[FAIRY][POISON] = 0.5;
cardTypeAdvantages[FAIRY][DRAGON] = 2;
cardTypeAdvantages[FAIRY][DARK] = 2;
cardTypeAdvantages[FAIRY][STEEL] = 0.5;