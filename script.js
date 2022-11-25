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
        //Battlecry = onplay
        //Deathrattle = ondeath
        //Taunt = istaunt
        //Charge = instantattack
        //Divine shield = isprotected
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
            return +t[1]
        case "weapon":
            if (t.length > 1) {
                return weapons[+t[1]]
            }
            return weapons[+player]
        case "ID":
            return id_dict[+t[1]]
        default:
            return null;
    }
}

function GetIdFromIdSelector(selector){
    return +selector.split(".")[1]
}


let IdSearchFunction = (array)=>{return Array.prototype.findIndex.call(array, (element)=>{element.id == ID})}
function GetSelectorFromId(ID, prefer_index=true){
    
    t = IdSearchFunction(weapons)
    if (t != -1) {
        if (t == +player) {
            if (prefer_index) {
                return `weapon.${t}`
            }
            return "weapon"
        }
        else{
            return `weapon.${t}`
        }
    }


    for (let i = 0; i < 2; i++) {
        t = IdSearchFunction(table[i])
        if (t != -1) {
            return `table.${i}.${t}`
        }
    }
    

    return null
}


function end_turn(){
    gameObj = document.querySelector("body #game");
    rotateObj = document.querySelector("body #rotation");
    playerTurnObj = document.querySelector("body #rotation .center_row :first-child");
    gameObj.style.display = "none";
    rotateObj.style.display = "unset";
    player = !player
    playerTurnObj.innerText = `Player ${+player+1}'s turn!`
    console.log(playerTurnObj)
    rotating = true

}

function start_turn(){
    gameObj = document.querySelector("body #game");
    rotateObj = document.querySelector("body #rotation");
    console.log("what")
    gameObj.style.display = "unset";
    rotateObj.style.display = "none";
    rotating = false
}


()=>{
    DamageObjects({"thisID": card.id})
}

let rotating = false
let max_mana = 10
let current_mana = [0, 0]
let player = false
let max_id = 0;
let id_dict = {};
let card_types = [
    new Card(atk=0,def=0,mana_cost=max_mana+1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description),
    new Card(atk=0,def=0,mana_cost=max_mana+1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description),

];
let heroes = []
let weapons = [0, 0]
let table = [[], []]
let hands = [[], []]
let decks = [[], []]
let selected = ["heropower", "null"] // SelectedID, TargetID
let selected_heroes = [0, 0]


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