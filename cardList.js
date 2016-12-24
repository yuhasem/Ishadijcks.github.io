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
{name: "Hyper Fang", damage: 60, cost: {"normal": 2}, element: "normal"},
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
 }}
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
{id: "Grass Energy", name: "Grass Energy", type: "energy", element: "grass", value: 1},
{id: "Fire Energy", name: "Fire Energy", type: "energy", element: "fire", value: 1},
{id: "Water Energy", name: "Water Energy", type: "energy", element: "water", value: 1},
{id: "Normal Energy", name: "Normal Energy", type: "energy", element: "normal", value: 1},
{id: "Flying Energy", name: "Flying Energy", type: "energy", element: "flying", value: 1},
{}
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
			}
			return temp;
		}
	}
}