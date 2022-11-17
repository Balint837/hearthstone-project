class Card {
    constructor({atk=0, def=0, mana_cost, on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false}){
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
function summonCardToDeck(card_idx){
    card_idx = kwargs["card_idx"]
}
function ForceDrawCard(count){
    count = kwargs["count"]
}
function ForceDrawType(cards, count){
    cards = kwargs["cards"]
    count = kwargs["count"]
}
function ForceDrawCondition(condition, count){
    count = kwargs["count"]
}
function returnToDeck(){
    targetID = kwargs["targetID"]
}
function returnToHand(){
    targetID = kwargs["targetID"]
}
function DamageObjects(){
    targets = kwargs["targets"]
    initiator = kwargs["thisID"]
}


()=>{
    DamageObjects({"thisID": card.id})
}

let max_mana = 10
let max_id = 0;
let id_dict = {};
let card_types = [
    new Card(mana_cost=max_mana+1),
    
];
let heroes = []
let weapons = [0, 0]
table = [[], []]
hands = [[], []]

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