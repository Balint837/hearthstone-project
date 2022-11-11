class Card {
    constructor(atk, def, mana, on_turnend, on_death, on_play, on_attack, is_taunt, instant_atk, on_spell, show_stats){
        // onturnend --> function
        // ondeath --> function
        // onplay (place) --> function
        // onattack --> function
        // is_taunt --> bool
        // instant_attack --> bool
        // onspell --> function()
        // atk --> int
        // def --> int
        // mana --> int
        // show_stats --> bool
        this.atk = atk
        this.def = def
        this.mana = mana
        this.on_turnend = on_turnend
        this.on_death = on_death
        this.on_play = on_play
        this.on_attack = on_attack
        this.is_taunt = is_taunt
        this.instant_atk = instant_atk
        this.on_spell = on_spell
        this.show_stats = show_stats
    }
};


()=>{};