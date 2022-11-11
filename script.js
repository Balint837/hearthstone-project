class Card {
    constructor(atk, def, mana_cost, on_turnend=()=>{}, on_death=()=>{}, on_play=()=>{}, on_attack=()=>{}, on_spell=()=>{}, is_taunt=false, instant_atk=false, show_stats=true){
        this.atk = atk // int
        this.def = def // int
        this.mana_cost = mana_cost // int
        this.on_turnend = on_turnend // function
        this.on_death = on_death // function
        this.on_play = on_play // function
        this.on_attack = on_attack // function
        this.on_spell = on_spell // function
        this.is_taunt = is_taunt // bool
        this.instant_atk = instant_atk // bool
        this.show_stats = show_stats // bool
    }
};