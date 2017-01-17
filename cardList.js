var attacks = [
{name: "Tackle", damage: 10, cost: {}, element: "normal"},
{name: "Scratch", damage: 10, cost: {}, element: "normal"},
{name: "Tackle", damage: 20, cost: {}, element: "normal"},
{name: "Scratch", damage: 30, cost: {}, element: "normal"},
{name: "Body Slam", damage: 30, cost: {"colorless": 1}, element: "normal"},
{name: "Headbutt", damage: 40, cost: {"colorless": 1}, element: "normal"},
{name: "Slash", damage: 50, cost: {"colorless": 2}, element: "normal"},
{name: "Vine Whip", damage: 20, cost: {"grass": 1}, element: "grass"},
{name: "Razor Leaf", damage: 40, cost: {"grass": 2}, element: "grass"},
{name: "Solar Beam", damage: 70, cost: {"grass": 3}, element: "grass"},
{name: "Ember", damage: 20, cost: {"fire": 1}, element: "fire"},
{name: "Flamethrower", damage: 50, cost: {"fire": 2}, element: "fire"},
{name: "Fire Blast", damage: 90, cost: {"fire": 3}, element: "fire"},
{name: "Water Gun", damage: 20, cost: {"water": 1}, element: "water"},
{name: "Surf", damage: 40, cost: {"water": 2}, element: "water"},
{name: "Hydro Pump", damage: 80, cost: {"water": 3}, element: "water"},
{name: "Hyper Fang", damage: 60, cost: {"colorless": 2}, element: "normal"},
{name: "Peck", damage: 20, cost: {"flying": 1}, element: "flying"},
{name: "Wing Attack", damage: 50, cost: {"flying": 2}, element: "flying"},
{name: "Rage", damage: 10, cost: {"colorless": 2}, element: "normal",
 onUse: function (game, card) {
	 var damage = 10;
	 if (card.rageCounter){
		 damage += 10*card.rageCounter;
		 card.rageCounter++;
	 } else {
		 card.rageCounter = 1;
	 }
	 logMessage(card.name + "'s Rage is building!");
	 return damage;
 }},
{name: "Thunderbolt", damage: 40, cost: {"colorless": 1, "electric": 1}, element: "electric"},
{name: "Recover", damage: 0, cost: {"colorless": 3}, element: "normal",
 onUse: function (game, card){
	 //can we discard an energy here?
	 card.health += 40;
	 if (card.health > card.maxHealth){
		 card.health = card.maxHealth;
	 }
	 logMessage(card.name + " was healed!");
	 return 0;
 }},
{name: "Submission", damage: 50, cost: {"colorless": 1, "fighting": 1}, element: "fighting",
 afterDamage: function (game, side, attacker, defender, damage){
	 if (damage > 0){
		 attacker.health -= 20;
		 if (attacker.health <= 0){
			 fainted(side, 0);
		 }
	 }
 }
},
{name: "Sludge", damage: 50, cost: {"colorless": 1, "poison": 1}, element: "poison"},
{name: "Thunder Wave", damage: 0, cost: {"electric": 2}, element: "electric",
 onUse: function (game, card){
	 if (game.sides[0].active == card){
		 game.sides[1].active.status = "prz";
		 console.log("prz applies to " + game.sides[1].active.name); //Needs logMessage()
	 } else {
		 game.sides[0].active.status = "prz";
		 console.log("prz applies to " + game.sides[0].active.name); //Needs logMessage()
	 }
	 return 0;
 }
},
{name: "Foul Gas", damage: 0, cost: {"poison": 2, "colorless": 1}, element: "poison",
 onUse: function (game, card){
	 if (game.sides[0].active == card){
		 if (Math.random() > 0.5){
			 game.sides[1].active.status = "psn";
			 console.log("psn applies to " + game.sides[1].active.name); //Needs logMessage()
		 } else {
			 game.sides[1].active.status = "slp";
			 console.log("slp applies to " + game.sides[1].active.name); //Needs logMessage()
		 }
	 } else {
		 if (Math.random() > 0.5){
			 game.sides[0].active.status = "psn";
			 console.log("psn applies to " + game.sides[0].active.name); //Needs logMessage()
		 } else {
			 game.sides[0].active.status = "slp";
			 console.log("skp applies to " + game.sides[0].active.name); //Needs logMessage()
		 }
	 }
	 return 0;
 }
},
{name: "Will-O-Wisp", damage: 0, cost: {"fire": 2}, element: "fire",
 onUse: function (game, card){
	 if (game.sides[0].active == card){
		 game.sides[1].active.status = "brn";
		 console.log("brn applies to " + game.sides[1].active.name); //Needs logMessage()
	 } else {
		 game.sides[0].active.status = "brn";
		 console.log("brn applies to " + game.sides[0].active.name); //Needs logMessage()
	 }
	 return 0;
 }
},
{name: "Powder Snow", damage: 20, cost: {"ice": 2}, element: "ice",
 onUse: function (game, card) {
	 if (Math.random() > 0.5){
		 if (game.sides[0].active == card){
			 game.sides[1].active.status = "frz";
			 console.log("frz applies to " + game.sides[1].active.name); //Needs logMessage()
		 } else {
			 game.sides[0].active.status = "frz";
			 console.log("frz applies to " + game.sides[0].active.name); //Needs logMessage()
		 }
	 }
	 return this.damage;
 }
}
];

var cardList = [
{id: "Bulbasaur", name: "Bulbasaur", type: "poke", species: "Bulbasaur", stage: 0, maxHealth: 40, attacks: [attacks[0], attacks[7]], element: "grass"},
{id: "Ivysaur", name: "Ivysaur", type: "poke", species: "Ivysaur", stage: 1, maxHealth: 70, attacks: [attacks[2], attacks[8]], element: "grass"},
{id: "Venusaur", name: "Venusaur", type: "poke", species: "Venusaur", stage: 2, maxHealth: 100, attacks: [attacks[4], attacks[9]], element: "grass"},
{id: "Charmander", name: "Charmander", type: "poke", species: "Charmander", stage: 0, maxHealth: 50, attacks: [attacks[1], attacks[10]], element: "fire"},
{id: "Charmeleon", name: "Charmeleon", type: "poke", species: "Charmeleon", stage: 1, maxHealth: 60, attacks: [attacks[3], attacks[11]], element: "fire"},
{id: "Charizard", name: "Charizard", type: "poke", species: "Charizard", stage: 2, maxHealth: 70, attacks: [attacks[6], attacks[12]], element: "fire"},
{id: "Squirtle", name: "Squirtle", type: "poke", species: "Squirtle", stage: 0, maxHealth: 40, attacks: [attacks[0], attacks[13]], element: "water"},
{id: "Wartortle", name: "Wartortle", type: "poke", species: "Wartortle", stage: 1, maxHealth: 70, attacks: [attacks[2], attacks[14]], element: "water"},
{id: "Blastoise", name: "Blastoise", type: "poke", species: "Blastoise", stage: 2, maxHealth: 100, attacks: [attacks[5], attacks[15]], element: "water"},
{id: "Rattata", name: "Rattata", type: "poke", species: "Rattata", stage: 0, maxHealth: 30, attacks: [attacks[0]], element: "normal"},
{id: "Raticate", name: "Raticate", type: "poke", species: "Raticate", stage: 1, maxHealth: 50, attacks: [attacks[4], attacks[16]], element: "normal"},
{id: "Spearow", name: "Spearow", type: "poke", species: "Spearow", stage: 0, maxHealth: 40, attacks: [attacks[17]], element: "flying"},
{id: "Fearow", name: "Fearow", type: "poke", species: "Fearow", stage: 1, maxHealth: 70, attacks: [attacks[18]], element: "flying"},
{id: "Ragemander", name: "Wild Charmander", type: "poke", species: "Charmander", stage: 0, maxHealth: 40, attacks: [attacks[19]], element: "fire"},
{id: "Electabuzz", name: "Electabuzz", type: "poke", species: "Electabuzz", stage: 0, maxHealth: 60, attacks: [attacks[20], attacks[24]], element: "electric",
 onAttachEnergy: function (game, poke, energy) {
	 if (energy.element === "electric"){
		 poke.health += 10;
		 if (poke.health > poke.maxHealth){
			 poke.health = poke.maxHealth;
		 }
		 logMessage(poke.name + "'s Charge used the electric energy to heal!");
	 }
 }},
{id: "Mr. Mime", name: "Mr. Mime", type: "poke", species: "Mr. Mime", stage: 0, maxHealth: 40, attacks: [attacks[0]], element: "psychic",
 onTakeDamage: function (game, attacker, defender, damage) {
	 if (damage > 20){
		 logMessage(defender.name + "'s ability allowed it to negate all damage!");
		 return 0;
	 } else {
		 return damage;
	 }
 }},
{id: "Chansey", name: "Chansey", type: "poke", species: "Chansey", stage: 0, maxHealth: 100, attacks: [attacks[21]], element: "normal",
 onBench: function (game, card, side){
	 card.health = card.maxHealth;
	 logMessage(card.name + "'s Regeneration healed it to full health!");
 }},
//This next one is in the top percentage of all cards
{id: "JoeyRattata", name: "Joey's Rattata", type: "poke", species: "Rattata", stage: 0, maxHealth: 40, attacks: [attacks[3], attacks[16]], element: "normal",
 onActivate: function (game, card, side){
	 var otherSide = (side + 1) % 2;
	 if (game.sides[otherSide].active){
		 var poke = game.sides[otherSide].active;
		 poke.health -= 10;
		 logMessage(card.name + "'s Quick Attack dealt damage to " + poke.name + "!");
		 if (poke.health <= 0){
			 fainted(otherSide, 0);
		 }
	 }
 }},
{id: "Machop", name: "Machop", type: "poke", species: "Machop", stage: 0, maxHealth: 50, attacks: [attacks[22]], element: "fighting"/*,
 onDealDamage: function (game, attacker, defender, damage){
	 attacker.health -= 20;
	 logMessage(attacker.name + "'s Reckless hurt itself in the attack!");
	 if (attacker.health <= 0){
		 if (game.sides[0].active == attacker){ //Does this actually work? I might have to triple equals here...
			 fainted(0, 0);
		 } else {
			 fainted(1, 0);
		 }
	 }
 }*/},
{id: "KogaIvy", name: "Koga's Ivysaur", type: "poke", species: "Ivysaur", stage: 1, maxHealth: 60, attacks: [attacks[4],attacks[23]], element: "poison",
 onDiscard: function (game, card, side){
	 var otherSide = (side + 1) % 2;
	 if (game.sides[otherSide].active){
		 var poke = game.sides[otherSide].active;
		 poke.health -= 20;
		 logMessage(card.name + "'s Poison Trail hurt the opposing " + poke.name + "!");
		 if (poke.health <= 0){
			 fainted(otherSide, 0);
		 }
	 }
 }},
{id: "Growlithe", name: "Growlithe", type: "poke", species: "Growlithe", stage: 0, maxHealth: 50, attacks: [attacks[3], attacks[26]], element: "fire"},
{id: "Koffing", name: "Koffing", type: "poke", species: "Koffing", stage: 0, maxHealth: 40, attacks: [attacks[23], attacks[25]], element: "poison"},
{id: "Jynx", name: "Jynx", type: "poke", species: "Jynx", stage: 0, maxHealth: 60, attacks: [attacks[27]], element: "ice"},
{id: "Grass Energy", name: "Grass Energy", type: "energy", element: "grass", value: 1},
{id: "Fire Energy", name: "Fire Energy", type: "energy", element: "fire", value: 1},
{id: "Water Energy", name: "Water Energy", type: "energy", element: "water", value: 1},
{id: "Colorless Energy", name: "Colorless Energy", type: "energy", element: "colorless", value: 1},
{id: "Flying Energy", name: "Flying Energy", type: "energy", element: "flying", value: 1},
{id: "Electric Energy", name: "Electric Energy", type: "energy", element: "electric", value: 1},
{id: "Fighting Energy", name: "Fighting Energy", type: "energy", element: "fighting", value: 1},
{id: "Poison Energy", name: "Poison Energy", type: "energy", element: "poison", value: 1},
{id: "Psychic Energy", name: "Psychic Energy", type: "energy", element: "psychic", value: 1},
{id: "Ice Energy", name: "Ice Energy", type: "energy", element: "ice", value: 1},
{id: "Potion", name: "Potion", type: "item",
 onTarget: function(game, target, side) {
	 if (target.type === "poke"){
		 target.health += 20;
		 logMessage(target.name + " was healed!");
		 if (target.health > target.maxHealth){
			 target.health = target.maxHealth;
		 }
	 }
 }},
{id: "Bill", name: "Bill", type: "item",
 onPlay: function (game, side) {
	 drawCard(side);
	 drawCard(side);
 }}
];

var newCard = function (id){
	for (var i = 0; i < cardList.length; i++){
		if (cardList[i].id === id){
			var temp = {};
			for (var key in cardList[i]){
				temp[key] = cardList[i][key];
			}
			if (cardList[i].type === "poke"){
				temp.health = temp.maxHealth;
				temp.energy = []
				temp.energyTotal = {};
				temp.status = "";
			}
			return temp;
		}
	}
}

//"API" of useable functions for cards:
//onPlay - base: card
//	signature: null onPlay(game, side)
//		game is the game object,
//		side is the side (0 or 1) it was played from
//	gets called when the card enters the field (whether by playing it as an item or by placing it (bench or active) as a pokemon)
//onDiscard - base: card
//	signature: null onDiscard(game, card, side)
//		game is the game object,
//		card is the card which is being sent to the discard
//		side is the side (0 or 1) it was discarded from
//	gets called only when a card is discarded from play. A card discarded from the hand should not activate this effect
//onDealDamage - base: poke
//	signature: null onDealDamage(game, attacker, defender, damage)
//		game is the game object,
//		attacker is the card which used an attack to deal damage
//		defender is the card which is taking damage from the attack
//		damage is the amount of damage the attack will do
//	gets called after onUse and onTakeDamage. The damage passed to this function is final and will not change.
//onTakeDamage - base: poke
//	signature: int onTakeDamage(game, attacker, defender, damage)
//		game is the game object,
//		attacker is the card which used an attack to deal damage
//		defender is the card which is taking damage from the attack
//		damage is the amount of damage the attack will do
//		return is the amount of damage the attack should do after this effect
//	gets called after onUse and before onDealDamage. The damage returned from this function is final and will not be modified by any other effects.
//onAttachEnergy - base: poke
//	signature: null onAttachEnergy(game, poke, energy)
//		game is the game object,
//		poke is the pokemon card getting energy attached
//		energy is the energy card being attached
//	gets called whenever an energy is attached to a pokemon
//onBench - base: poke
//	signature: null onBench(game, card, side)
//		game is the game object,
//		card is the card that was just sent to the bench,
//		side is the side (0 or 1) which had performed the action
//	gets called when a pokemon is switched from active to the bench. It does NOT get called if a pokemon is played directly to the bench or the bench switches order.
//	this effect takes place after the benching has already happened.
//onActivate - base: poke
//	signature: null onActivate(game, card, side)
//		game is the game object,
//		card is the card that was just activated,
//		side is the side (0 or 1) which just performed the action
//	gets called whenever a pokemon is placed in the active slot, regardless if it's from the hand or the bench.
//	this effect takes place after the pokemon has already been placed (after onPlay or after the switch).
//onUse - base: attack
//	signature: int onUse(game, card)
//		game is the game object,
//		card is the card that used the moveAbove,
//		return is the amount of damage that should be done
//	gets called first when an attack happens, even before type calculations. This should be used to calculate the base damage for moves that stack like Rage or Fury Cutter, or to implement coin flip, dice rolls that affect damage
//	This effect can also be used to discard energy from the base pokemon.
//onTarget - base: item
//	signature: null onTarget(game, target, side)
//		game is the game object,
//		card is the card that is being targeted,
//		side is the side (0 or 1) that played the item.
//	gets called when an item is targeting a card. This can be used for potions and other healing items to restore health.
//	NOTE: targerting opponent cards is not yet implemented, this effect cannot be used to debuff opponent cards
//afterDamage - base: attack
//	signature: null afterDamage(game, side, attacker, defender, damage)
//		game is the game object,
//		side is the side that made the attack
//		attacker is the card that attacked
//		defender is the card that defended the attack, it could be null if damage was lethal
//		damage is the amount of damage done to defender on this attack
//	gets called after an attack deals damage
//	This is the best effect to use for recoil damage