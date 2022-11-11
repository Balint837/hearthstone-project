class Card {
    constructor(atk=0, def=0, mana_cost, on_play=(card)=>{}, on_turnend=(card)=>{}, on_death=(card)=>{}, on_attack=(card)=>{}, on_spell=(card)=>{}, on_damage=(card)=>{}, is_taunt=false, instant_atk=false, show_stats=true){
        this.atk = atk; // int
        this.def = def; // int
        this.mana_cost = mana_cost; // int
        this.on_play = on_play; // function
        this.on_turnend = on_turnend; // function
        this.on_death = on_death; // function
        this.on_attack = on_attack; // function
        this.on_spell = on_spell; // function
        this.on_damage = on_damage; // function
        this.is_taunt = is_taunt; // bool
        this.instant_atk = instant_atk; // bool
        this.show_stats = show_stats; // bool
    }
};



class Hero{
    constructor()
}

let max_id = 0;
let dict = {};
let card_types = [new Card(mana_cost=max_mana+1)];
let weapons = [0, 0]

class PlacedCard{
    constructor(card_idx) {
        this.id = max_id++;
        this.card = card_idx;
        this.hp = this.get_card().def
        this.atk = this.get_card().atk
        this.may_attack = this.get_card().instant_atk
        this.get_card().on_play()
    }

    get_card() {
        return card_types[this.card];
    }
}
new PlacedCard(1)