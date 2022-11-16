class Card {
    constructor(atk=0, def=0, mana_cost, on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, show_stats=true){
        // default lambdas: (card)=>{}
        this.atk = atk; // int
        this.def = def; // int
        this.mana_cost = mana_cost; // int
        this.on_play = on_play; // list of functions
        this.on_turnend = on_turnend; // list of functions
        this.on_death = on_death; // list of functions
        this.on_attack = on_attack; //  list of functions
        this.on_spell = on_spell; //  list of functions
        this.on_damage = on_damage; //  list of functions
        this.is_taunt = is_taunt; // bool
        this.instant_atk = instant_atk; // bool
        this.show_stats = show_stats; // bool
    }
};



class Hero{
    constructor(hero_power=(target)=>{}){
        this.hp = 30
    }
    /*hero_power is prob an instance for now, can't think of anything yet*/
}


let max_hand = [10, 10] // 
let max_id = 0; // DON'T YOU DARE FUCKING TOUCH THIS
let id_dict = {}; // integers/ids
let card_types = [new Card(mana_cost=max_mana+1)]; // cards
let hero_types = [] // heroes
let heroes = [0, 0] // indexes
let weapons = [0, 0] // indexes

let spent_corpses = [0, 0]
let corpses = [0, 0]

last_spell = 0

class PlacedCard{
    constructor(card_idx) {
        this.id = max_id++;
        this.card = card_idx;
        this.hp = this.get_card().def
        this.atk = this.get_card().atk
        this.may_attack = this.get_card().instant_atk
    }

    get_card() {
        return card_types[this.card];
    }
}




new PlacedCard(0)