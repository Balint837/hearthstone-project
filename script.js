class Card {
    constructor(atk=0, def=0, mana_cost, on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description){
        this.atk = atk; // int
        this.def = def; // int
        this.mana_cost = mana_cost; // int
        this.on_play = on_play; // list of functions
        this.on_turnend = on_turnend; // list of functions
        this.on_death = on_death; // list of functions
        this.on_attack = on_attack; // list of functions
        this.on_spell = on_spell; // list of functions
        this.on_damage = on_damage; // list of functions
        this.is_taunt = is_taunt; // bool
        this.instant_atk = instant_atk; // bool
        this.is_spell = is_spell; // bool
        this.is_protected = is_protected; // bool
        this.description = description; // string
    }
};


class Hero{
    constructor(hero_power=(target)=>{}){
        this.hp = 30
    }
    /*hero_power is prob an instance for now, can't think of anything yet*/
}

function summonCardToHand(kwargs){
    card_idx = kwargs["card_idx"]
}
function summonCardToDeck(kwargs){
    card_idx = kwargs["card_idx"]
}
function ForceDrawCard(kwargs){
    count = kwargs["count"]
}
function ForceDrawType(kwargs){
    cards = kwargs["cards"]
    count = kwargs["count"]
}
function ForceDrawCondition(kwargs){
    count = kwargs["count"]
}
function returnToDeck(kwargs){
    targetID = kwargs["targetID"]
}
function returnToHand(kwargs){
    targetID = kwargs["targetID"]
}
function DamageObjects(kwargs){
    targets = kwargs["targets"]
    initiator = kwargs["thisID"]
}


function GetCardBySelector(selector){
    t = selector.split(".")
    switch (t[0]) {
        case "hand":
            switch (t[1]){
                case "0":
                    return hands[+player][+t[2]];
                case "1":
                    return hands[+!player][+t[2]];
            }
            break;
        case "table":
            switch (t[1]){
                case "0":
                    return table[+player][+t[2]];
                case "1":
                    return table[+!player][+t[2]];
            }
        case "hero":
            break;
        default:
            break;
    }
}


()=>{
    DamageObjects({"thisID": card.id})
}

let max_mana = 10
let current_mana = [0, 0]
let player = false
let max_id = 0;
let id_dict = {};
let card_types = [
 /*nullcard */   
        new Card(atk=0,def=0,mana_cost=max_mana+1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description=""),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="For the rest of the game your Hero Power deals +1 damage."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 2 damage to an enemy minion twice."),
    new Card(atk=2,def=2,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description=""),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deals 2 damage and put a copy of this card into your deck."),
    new Card(atk=2,def=2,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Next spell you play does +2 damage."),
    new Card(atk=2,def=3,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Draw a spell."),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Your hero can only take 1 damage at a time until your next turn."),
    new Card(atk=0,def=0,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 5 damage to all enemy minions."),
    new Card(atk=8,def=8,mana_cost=8,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="If you dealt 10 damage with your hero power, deal 10 damage to all enemys."), // Legendary
    new Card(atk=5,def=7,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="If you cast a spell add a '4 mana, deal 6 damage' card to your hand."),
    new Card(atk=0,def=0,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 6 damage."),
    new Card(atk=0,def=0,mana_cost=10,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 10 damage"),
    new Card(atk=4,def=5,mana_cost=6,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Recast the last spell you've cast."),
    new Card(atk=0,def=0,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Transform a minion into a 1/1 sheep."),
    new Card(atk=3,def=6,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Freeze any character damaged by this minion."),
    new Card(atk=3,def=5,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Cast your hero power on all enemy minions."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 2 damage."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Set a minion's health to 1."),
    new Card(atk=1,def=1,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Summon a copy of this on the board."),
    new Card(atk=0,def=0,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Destroy a random enemy minion."),
    new Card(atk=2,def=4,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="If your hand dosent have any duplicates, summon an 8/8 with Charge."),
    new Card(atk=3,def=4,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Your spells are Poisonous."),
    new Card(atk=8,def=8,mana_cost=8,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=true, is_spell=false, is_protected=false, description="Charge"),
    new Card(atk=5,def=5,mana_cost=8,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Summon 3 minions from your hand."),
    new Card(atk=0,def=0,mana_cost=10,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Summon four 3/5 minions they have Charge."),
    new Card(atk=0,def=0,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Summon two minions from your deck that cost 5 or less."),
    new Card(atk=0,def=0,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 6 damage to a minion, access damage hits the enemy."),
    new Card(atk=3,def=3,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Summon two 1/1 minions."),
    new Card(atk=0,def=0,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deals 3 damage to two random enemy minions."),
    new Card(atk=0,def=0,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 3 damage, your next hero power deals 2 more damage."),
    new Card(atk=1,def=2,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Summon a 4/4 minion."),
    new Card(atk=2,def=5,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description=""),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Gives a minion +1/+1, summon a 1/1 minion and give a '1 mana 1/1' minion into your hand"),
    new Card(atk=1,def=1,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=true, description="Divine Shield"),
    new Card(atk=1,def=1,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Draw a card."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Heal 2. Repetable this turn."),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Set all minions health to 1."),
    new Card(atk=2,def=3,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="If you cast a spell on this minion, recast it on a friendly minion."),
    new Card(atk=3,def=3,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Deathrattle: Give a friendly minion +3/+3, and this Deathrattle."),
    new Card(atk=0,def=0,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Give a minion +4/+4."),
    new Card(atk=0,def=0,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Summon five 1/1 minion."),
    new Card(atk=5,def=5,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Summon another 5/5 if you dont have any other minions."),
    new Card(atk=8,def=8,mana_cost=8,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Whenever this minion attacks, summon a 5/5 minion with taunt."),
    new Card(atk=5,def=5,mana_cost=9,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Give you 1 mana, for all spells you'va cast this game."),
    new Card(atk=0,def=0,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Summon two 1/1 minions and than give your minions +1/+1 (including this one)."),
    new Card(atk=3,def=3,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Lifesteal"),
    new Card(atk=2,def=5,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="If you have a spell in your hand, gain taunt."),
    new Card(atk=4,def=4,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Transform your minions into 3/3 and give them Deathrattle: summon a 1/1."),
    new Card(atk=3,def=5,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Taunt. Add this to your hand, but it costs health instead."),
    new Card(atk=7,def=7,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="For the rest of the game, deal 3 damage to the opponent at the end of your turns."),
    new Card(atk=5,def=5,mana_cost=8,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Destroy all other minions."),
    new Card(atk=5,def=2,mana_cost=6,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Lifesteal. Can only take 1 damage at a time. Damage taken damages your hero instead."),
    new Card(atk=0,def=0,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Lifesteal. Deal 6 damage to a minion. "),
    new Card(atk=1,def=2,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Deal 2 damage to an enemy and your hero."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 3 damage to a minion."),
    new Card(atk=0,def=0,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Give your minions +1 attack. If you can spend 5 corpses, give +3 attack instead."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Gain 4 corpses, shuffle four '2 mana 2/2' minions into your deck."),
    new Card(atk=3,def=3,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Taunt. If you can spend 3 corpses, summon 3/3 with Taunt."),
    new Card(atk=3,def=3,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Give all enemy minions Deathrattle: Summon a 2/2 with Taunt for your opponent."),
    new Card(atk=1,def=2,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Give a friendly minion +2 attack."),
    new Card(atk=4,def=6,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Destroy a random minion from your opponents hand, deck and board."),
    new Card(atk=2,def=2,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="spend one corpse to gain +1/+2"),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Destroy a minion and yout hero takes damage equal to its health."),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Give ur hero +5 health. Spend 3 corpses to gain 5 more and draw a card."),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Draw a card. Spend two corpses to draw another."),
    new Card(atk=3,def=2,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Deal 3 damage to your hero."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Destroy a friendly minion and deal 2 damage to all enemy minions."),
    new Card(atk=0,def=0,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Destroy an enemy minion, and restore 3 health to your hero."),
    new Card(atk=0,def=0,mana_cost=8,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Destroy all minions."),
    new Card(atk=0,def=0,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Draw 3 cards and deal 3 damage to your hero."),
    new Card(atk=3,def=4,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Shuffle two soul fragments into your deck. Draw a card."),
    new Card(atk=1,def=5,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Taunt"),
    new Card(atk=6,def=4,mana_cost=6,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Deathrattle: Summon two 3/2 minions to your board."),
    new Card(atk=5,def=5,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="For each soul fragment in your deck summon a 3/3 minion with Charge."),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 3 damage to a minion shuffle two soul fragments into your deck"),
    new Card(atk=0,def=0,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 2 damage to all minions, shuffle two soul fragments into your deck."),
    new Card(atk=1,def=3,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Shuffle two soul fragments into your deck."),
    new Card(atk=4,def=4,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Increase your max hand size to 12. Draw 4 cards."),
    new Card(atk=1,def=1,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Summon a copy of this."),
    new Card(atk=3,def=9,mana_cost=9,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Summon 3 1/3 minions with Taunt."),
    new Card(atk=8,def=6,mana_cost=6,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Restore 5 mana, if you have 9 cards in your hand."),
//83:1 fog jönni

    //minta
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description=""),



];
let heroes = []
let weapons = [0, 0]
let table = [[], []]
let hands = [[], []]
let decks = [[], []]
let selected = ["heropower", "null"] // SelectedID, TargetID
let selected_heroes = []


class PlacedCard{
    constructor(card_idx) {
        this.id = max_id++;
        this.card_idx = card_idx;
        this.card = this.get_card_type()
        this.hp = this.card.def
        this.atk = this.card.atk
        this.may_attack = this.card.instant_atk
    }

    get_card_type() {
        return card_types[this.card_idx];
    }
}




new PlacedCard(0)