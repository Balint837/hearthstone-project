class Card {
    constructor(atk=0, def=0, mana_cost, on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="", is_weapon=false){
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
        this.is_weapon = is_weapon; // bool
        this.description = description; // string
        //Battlecry = onplay
        //Deathrattle = ondeath
        //Taunt = istaunt
        //Charge = instantattack
        //Divine shield = isprotected
        //Poisonous = instakill when damaged
    }
};


class Hero{
    constructor(hero_power=(target)=>{}, hp_description="Placeholder description"){
        this.hp = 30;
        this.max_hp = 30;
        this.weapon = null;
        this.fatigue = 0;
        this.hero_power = hero_power;
        this.description = hp_description;
        this.may_attack = true;
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
    try {
        t = selector.split(".")
        switch (t[0]) {
            case "hand":
                return hands[+t[1]][+t[2]];
            case "table":
                return table[+t[1]][+t[2]];
            case "heropower":
                return selector
            case "hero":
                return selector
            case "weapon":
                // if (t.length > 1) {
                //     return weapons[+t[1]]
                // }
                return weapons[+player]
            case "ID":
                return id_dict[+t[1]]
            default:
                return null;
        }
    } catch (error) {
        return null;
    }
}

// ID.<id>
// weapon
// table.<player>.<idx>
// hand.<player>.<idx>
// hero.<player>
// heropower.<player>

function GetIdFromIdSelector(selector){
    return +selector.split(".")[1]
}

function AttackWithCard(attacker, target){
    console.log(attacker, target)
    splitAttacker = attacker.split(".")
    splitTarget = target.split(".")
    attackerCard = GetCardBySelector(attacker);
    console.log(attackerCard.may_attack, splitAttacker[1], splitTarget[1])
    if (!attackerCard.may_attack || splitAttacker[1] == splitTarget[1] || +splitAttacker[1] != +player) {
        console.log("disallowed attack");
        selected = [null, null];
        updateAll();
        allow_table = true;
        return;
    }
    switch (splitTarget[0]) {
        case "hero":
            heroes[selected_heroes[+splitTarget[1]]].hp -= attackerCard.atk;
            attackerCard.may_attack = false;
            selected = [null, null];
            return updateAll();
        case "weapon":
            selected = [null, null];
            return updateAll();
        default:
            break;
    }
    targetCard = GetCardBySelector(target);
    console.log(targetCard.hp, attackerCard.atk)
    console.log(attackerCard, targetCard)
    targetCard.hp -= attackerCard.atk;
    attackerCard.may_attack = false;
    console.log("attacked with card");
    selected = [null, null];
    updateAll();
    allow_table = true;
}

function DamageAnything(target, damage){
    splitTarget = target.split(".")
    console.log(splitTarget)
    if (target[0] == "random") {
        if (table[+!player].length == 0) {
            return false;
        }
        table[+!player][exclusiveRandRange(0, table[+!player].length)].hp -= damage;
        updateAll();
        return true;
    }
    targetCard = GetCardBySelector(target)
    switch (typeof targetCard) {
        case typeof card_types[0]:
            targetCard.hp -= damage;
            selected = [null, null]
            updateAll();
            return true;
        case typeof "":
            switch (splitTarget[0]) {
                case "hero":
                    if (+splitTarget[1] != NaN) {
                        heroes[selected_heroes[+splitTarget[1]]].hp -= damage;
                    }
                    else{
                        heroes[selected_heroes[+!player]].hp -= damage;
                    }
                    selected = [null, null]
                    updateAll();
                    return true;
                default:
                    break;
            }
        default:
            break;
    }
    selected = [null, null]
    updateAll();
    return false

}

function UseHeroPower(target){
    if (current_mana[+player] < 2){
        console.log("not enough mana for hp")
        selected = [null, null];
        return updateAll();
    }
    current_hero = heroes[selected_heroes[+player]]
    if (!current_hero.may_attack) {
        selected = [null, null]
        return updateAll();
    }
    if (!current_hero.hero_power(target)) {
        selected = [null, null]
        return updateAll();
    }
    current_hero.may_attack = false;
    updateAll();
}


function SummonMinion(idx){
    if (table[+current_player].length >= max_table) {
        console.log("max table reached")
        selected = [null, null];
        return updateAll();
    }
    new_card = new PlacedCard(idx);
    table[+current_player].push(new_card)
    selected = [null, null]
    console.log("summoned card")
    updateAll();
}


function TransformMinion(target, idx){
    splitTarget = target.split(".")
    if (splitTarget[0] != "table") {
        console.log("disallowed transform")
        selected = [null, null];
        return updateAll();
    }
    table[+splitTarget[1]][+splitTarget[2]] = new PlacedCard(idx);
    selected = [null, null]
    console.log("transformed card")
    updateAll();
}


function CopyBySelectorToHand(target, current_player=player){
    temp = GetCardBySelector(target)
    splitTarget = target.split(".");
    switch (typeof temp) {
        case typeof card_types[0]:
            hands[+current_player].push(temp.card_idx)
            return true;
        case typeof 0:
            hands[+current_player].push(temp)
            return true;
        default:
            return false;
    }
}




let IdSearchFunction = (array, ID)=>{return Array.prototype.findIndex.call(array, (element)=>{console.log(element.id);return element.id == ID})}
function GetSelectorFromId(ID, prefer_index=true, default_return=null){
    
    t = IdSearchFunction(weapons, ID)
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


    // console.log("searching")
    for (let i = 0; i < 2; i++) {
        t = IdSearchFunction(table[i], ID)
        // console.log(table[i])
        // console.log(t)
        if (t != -1) {
            return `table.${i}.${t}`
        }
    }
    
    // console.log(default_return)
    return default_return
}

function selectCardbySelector(selector){
    // console.log(selected, selector)
    splitSelector = selector.split(".");
    if (splitSelector[0] == "ID"){
        selector = GetSelectorFromId(+splitSelector[1], true, selector)
        splitSelector = selector.split(".");
    }
    console.log(selected, selector, splitSelector)
    if (selector == "table" && !allow_table){
        console.log("disallowed table")
        allow_table = true
        return updateAll();
    }
    switch (selected[0]) {
        case null:
            selected[0] = selector;
            if (splitSelector[0] == "table") {
                allow_table = false;
            }
            return updateAll();

        case selector:
            console.log("unselected card")
            selected = [null, null];
            if (splitSelector[0] == "table") {
                allow_table = false;
            }
            return updateAll();

        default:
            splitSelected = selected[0].split(".");
            switch (splitSelected[0]) {
                case "hand":
                    switch (splitSelector[0]) {
                        case "hand":
                            selected[0] = selector;
                            return updateAll();
                        
                        case "table":
                            return PlaceCard(selected[0]); //selected = [null, null]
                        default:
                            return;
                    }
                case "table":
                    if (+splitSelected[1] != NaN && +splitSelected[2] != NaN && splitSelected[1] != undefined && splitSelected[2] != undefined) {
                        switch (splitSelector[0]) {
                            case "table":
                                if (+splitSelector[1] != NaN && +splitSelector[2] != NaN && splitSelector[1] != undefined && splitSelector[2] != undefined) {
                                    return AttackWithCard(selected[0], selector) //selected = [null, null]
                                }
                                else {
                                    selected = [null, null];
                                    return updateAll();
                                }
                            case "hand":
                                selected[0] = selector;
                                return updateAll();
                            case "hero":
                                if (+splitSelector[1] != NaN && splitSelector[1] != undefined) {
                                    return AttackWithCard(selected[0], selector) //selected = [null, null]
                                }
                                else {
                                    selected = [null, null];
                                    return updateAll();
                                }
                            case "weapon":
                                if (+splitSelector[1] != NaN && splitSelector[1] != undefined) {
                                    return AttackWithCard(selected[0], selector) //selected = [null, null]
                                }
                                else {
                                    selected = [null, null];
                                    return updateAll();
                                }
                            default:
                                return;
                        }
                    }
                    else {
                        selected[0] = selector;
                        return updateAll();
                    }
                case "heropower":
                    switch (splitSelector[0]) {
                        case "table":
                            if (+splitSelector[1] != NaN && +splitSelector[2] != NaN) {
                                return UseHeroPower(selector) //selected = [null, null]
                            }
                            else {
                                selected = [null, null];
                                return updateAll();
                            }
                        case "hero":
                            return UseHeroPower(selector);
                        default:
                            selected = [null, null];
                            return updateAll();
                    }
                default:
                    selected[0] = selector;
                    return updateAll();
            }
    }
}

function PlaceCard(selector, current_player=player){
    splitSelector = selector.split(".");
    idx = GetCardBySelector(selector)
    queryMana = card_types[idx].mana_cost
    if (current_mana[+current_player] < queryMana){
        console.log("not enough mana")
        selected = [null, null];
        return updateHands();
    }
    if (table[+current_player].length > max_table) {
        console.log("max table surpassed")
        selected = [null, null];
        return updateHands();
    }
    else if (table[+current_player].length == max_table){
        if (!card_types[idx].is_spell) {
            console.log("max table reached")
            selected = [null, null];
            return updateHands();
        }
    }
    new_card = new PlacedCard(idx);
    console.log(idx, card_types[idx].is_weapon)
    if (card_types[idx].is_weapon) {

        heroes[selected_heroes[+current_player]].weapon = new_card
        removeMana(queryMana, current_player)
        hands[+current_player].splice(+splitSelector[splitSelector.length-1], 1)
        selected = [null, null]
        console.log("placed weapon")
    }
    else{
        new_card.card.on_play.forEach(
            onplay_function =>
            {
            onplay_function()
            }
        );
        table[+current_player].push(new_card)
        removeMana(queryMana, current_player)
        hands[+current_player].splice(+splitSelector[splitSelector.length-1], 1)
        selected = [null, null]
        console.log("placed card")
    }
    updateAll();
}

function selectCardbyId(){

}

function updateAll(){
    updateHands();
    updateTable();
    updateDecks();
    updateMana();
    updateHero();
}

function removeMana(card_cost, current_player=player) {
    current_mana[+current_player] -= card_cost;
    updateMana()
}

function updateWeapon(){

}

function updateMana(){
    for (let playerIdx = 0; playerIdx < 2; playerIdx++) {
        const manaCounter = document.getElementById(`p${playerIdx+1}Mana`)
        manaCounter.innerHTML = `${current_mana[playerIdx]}/${max_mana[playerIdx]}`
        for (let i = 0; i < current_mana[playerIdx]; i++){
            const mana = document.createElement('div')
            mana.className = 'mana'
            manaCounter.appendChild(mana)
        }
        
    }
}

function updateDecks(){
    for (let index = 0; index < 2; index++) {
        deckElem = document.getElementById(`p${index+1}Deck`)
        deckElem.innerText = "Cards: " + decks[index].length
        
    }
}

function setHero(){
    heroIdxs = [
        ["Mage", "mage.png"],
        ["Hunter", "hunter.png"],
        ["Paladin", "paladin.png"],
        ["Death Knight", "deathknight.png"],
        ["Warlock", "warlock.png"],
        ["Priest", "priest.png"],
        ["Norbert", "norbert.png"],
    ]
    for (let index = 0; index < 2; index++) {
        document.querySelector(`#p${index+1}Hero`).innerHTML = 
        `<div class="playCard">
            <div class="inner-row">
                <div>
                    <img src="heroes/${heroIdxs[selected_heroes[+index]][1]}" alt="${heroIdxs[selected_heroes[+index]][0]}">
                </div>
            </div>
            <div class="inner-row">
                <div class="defdisplay">
                    ${heroes[selected_heroes[+index]].hp}/${heroes[selected_heroes[index]].max_hp}
                </div>
            </div>
        </div>`
        
        document.querySelector(`#p${index+1}HeroPower`).innerHTML = 
        `<div class="playCard" style="${(selected[0] == `heropower.${index}` || selected[0] == "heropower")?"background-color: rgb(100, 255, 100)":""}">
            <div class="inner-row">
                <div class="description">
                    ${heroes[selected_heroes[+index]].description}
                </div>
            </div>
            <div class="inner-row">
                <div class="manadisplay">
                    2
                </div>
            </div>
        </div>`
        
    }
    updateWeapon();
}

function updateHero(){
    for (let index = 0; index < 2; index++) {
        setHero();
        if (heroes[selected_heroes[index]].hp <= 0) {
            current_scene = 4
        }
    }
    if (current_scene == 4){
        end_game();
    }
}

function updateHands(){
    updateDecks()
    for (let playerIdx = 0; playerIdx < 2; playerIdx++) {
        handElem = document.getElementById(`p${playerIdx+1}Hand`)
        handElem.innerHTML = ""
        for (let cardIdx = 0; cardIdx < hands[playerIdx].length; cardIdx++) {
            value = hands[playerIdx][cardIdx]
            // console.log(value)
            if (playerIdx == +player) {
                handElem.innerHTML += `<div class="playCard" style="z-index: ${cardIdx+1};${selected[0] == `hand.${playerIdx}.${cardIdx}`?"background-color: rgb(100, 255, 100)":""}" onclick="selectCardbySelector('hand.${playerIdx}.${cardIdx}')">
                                        <div class="inner-row">
                                            <div class="description">${card_types[value].description}</div>
                                        </div>
                                        <div class="inner-row">
                                            <div class="atkdisplay">
                                                ${card_types[value].atk}
                                            </div>
                                            <div class="manadisplay">
                                                ${card_types[value].mana_cost}
                                            </div>
                                            <div class="defdisplay">
                                                ${card_types[value].def}
                                            </div>
                                        </div>
                                    </div>`
            }
            else{
                handElem.innerHTML += `<div class="playCard" style="z-index: ${cardIdx+1};" onclick="selectCardbySelector('hand.${playerIdx}.${cardIdx}')">
                                        <div class="inner-row">
                                            <div class="description"></div>
                                        </div>
                                        <div class="inner-row">
                                            <div class="atkdisplay">
                                            </div>
                                            <div class="manadisplay">
                                            </div>
                                            <div class="defdisplay">
                                            </div>
                                        </div>
                                    </div>`
            }
            
            
        }
        
    }
}

function updateTable(){
    for (let playerIdx = 0; playerIdx < 2; playerIdx++) {
        for (let cardIdx = 0; cardIdx < table[playerIdx].length; cardIdx++){
            if (table[playerIdx][cardIdx].hp <= 0){
                table[playerIdx].splice(cardIdx);
                cardIdx--;
            }
        }
    }

    for (let playerIdx = 0; playerIdx < 2; playerIdx++) {
        TableElem = document.getElementById(`p${playerIdx+1}Table`)
        TableElem.innerHTML = ""
        for (let cardIdx = 0; cardIdx < table[playerIdx].length; cardIdx++) {
            value = table[playerIdx][cardIdx]
            TableElem.innerHTML += `<div class="playCard" style="z-index: ${cardIdx+1};${(selected[0] == `table.${playerIdx}.${cardIdx}` || selected[0] == `ID.${table[playerIdx][cardIdx].id}`) && playerIdx == +player?"background-color: rgb(100, 255, 100)":""}" onclick="selectCardbySelector('ID.${value.id}')">
                                        <div class="inner-row">
                                            <div class="description">${value.card.description}</div>
                                        </div>
                                        <div class="inner-row">
                                            <div class="atkdisplay">
                                                ${value.atk}
                                            </div>
                                            <div class="manadisplay">
                                                ${value.card.mana_cost}
                                            </div>
                                            <div class="defdisplay">
                                                ${value.hp}
                                            </div>
                                        </div>
                                    </div>`
        }
        
    }
}

function overdraw(){
        index = exclusiveRandRange(0, decks[+player].length);
        decks[+player].splice(index, 1);
        updateHands();
        updateDecks();
        return;
}

function fatigue(){
    heroes[selected_heroes[+player]].fatigue+=1;
    heroes[selected_heroes[+player]].hp -= heroes[selected_heroes[+player]].fatigue;
    console.log(heroes[selected_heroes[+player]].hp)
    updateAll();
    return;
}

function pullCard(){
    if (decks[+player].length == 0) {
        return fatigue()
    }
    if (hands[+player].length >= max_hand[+player]) {
        return overdraw()
    }
    index = exclusiveRandRange(0, decks[+player].length);
    value = decks[+player][index];
    decks[+player].splice(index, 1);
    hands[+player].push(value);
    updateHands();
    updateDecks()
    return;
}

function mustPullCard(targetPlayer){
    if (decks[+targetPlayer].length == 0) {
        return fatigue()
    }
    if (hands[+targetPlayer].length >= max_hand[+targetPlayer]) {
        return overdraw()
    }
    index = exclusiveRandRange(0, decks[+targetPlayer].length);
    value = decks[+targetPlayer][index];
    decks[+targetPlayer].splice(index, 1);
    hands[+targetPlayer].push(value);
    updateHands();
    updateDecks()
    return;
}

function HeroSelect(player, hero){
    selected_heroes[player] = hero
}

function shuffleArray(arr){
    return [...arr].sort((a,b)=>0.5-Math.random())
}

function exclusiveRandRange(a, b){
    return Math.floor(Math.random()*(b-a)+a)
}

function start_game(){
    heroSelectObj = document.querySelector("body #heroSelect");
    rotateObj = document.querySelector("body #rotation");
    playerTurnObj = document.querySelector("body #rotation .center_row :first-child");
    playerTurnObj.innerText = `Player ${+player+1}'s turn!`;
    heroSelectObj.style.display = "none";
    rotateObj.style.display = "unset";
    current_scene = 2
    for (let index = 0; index < selected_heroes.length; index++) {
        console.log("---------------", index)
        SelectedHero = +document.querySelector(`body #heroSelect .row:nth-child(${index+1}) select`).value;
        selected_heroes[index] = SelectedHero;
        decks[index] = shuffleArray(starter_decks[SelectedHero])
    }
    for (let index = 0; index < 3; index++) {
        mustPullCard(0)
        mustPullCard(1)
    }
    mustPullCard(1)
    setHero()
}

function end_game(){
    document.querySelector("body #heroSelect").style.display = "none";
    document.querySelector("body #game").style.display = "none";
    document.querySelector("body #rotation").style.display = "none";
    gameOverObj = document.querySelector("body #gameOver");
    if (heroes[selected_heroes[+player]].hp <= 0) {
        if (heroes[selected_heroes[+!player]].hp <= 0) {
            gameOverObj.innerHTML = `<div class="center_row">
        <div>Game Over!</div>
        <div>Draw!</div>
        </div>`
        }
        else{
            gameOverObj.innerHTML = `<div class="center_row">
        <div>Game Over!</div>
        <div>Winner: Player ${!player+1}</div>
        </div>`
        }
    }
    else if (heroes[selected_heroes[+!player]].hp <= 0){
        gameOverObj.innerHTML = `<div class="center_row">
        <div>Game Over!</div>
        <div>Winner: Player ${player+1}</div>
        </div>`
        
    }
    else{
        gameOverObj.innerHTML = `<div class="center_row">
        <div>No idea how you got here...</div>
        <div>I guess it's cool tho.</div>
        </div>`
    }
    gameOverObj.style.display = "unset";
}

function end_turn(){
    gameObj = document.querySelector("body #game");
    rotateObj = document.querySelector("body #rotation");
    playerTurnObj = document.querySelector("body #rotation .center_row :first-child");
    gameObj.style.display = "none";
    rotateObj.style.display = "unset";
    player = !player;
    playerTurnObj.innerText = `Player ${+player+1}'s turn!`;
    current_scene = 2;
    selected = [null, null];
}

function start_turn(){
    gameObj = document.querySelector("body #game");
    rotateObj = document.querySelector("body #rotation");
    gameObj.style.display = "unset";
    rotateObj.style.display = "none";
    current_scene = 1
    may_pull = true;
    pullCard();
    AddMana();
    resetSleep();
    updateAll();
}

function resetSleep(){
    for (let playerIdx = 0; playerIdx < 2; playerIdx++) {
        for (let cardIdx = 0; cardIdx < table[playerIdx].length; cardIdx++) {
            table[playerIdx][cardIdx].may_attack = true;
            
        }
        heroes[selected_heroes[playerIdx]].may_attack = true;
    }
}

function generateDeck(nArr, legendArr){
    return nArr.concat(nArr).concat(legendArr)
}


()=>{
    DamageObjects({"thisID": card.id})
}

let may_pull = true;
let current_scene = 3 // 1: currently playing, 2: currently rotating, 3: hero selection (default), 4: game over
let mana_cap = 10
let max_mana = [0, 0]
let current_mana = [0, 0]
let player = false
let max_id = 0;
let id_dict = {};
let spell_bonus = 0;
let card_types = [
 /*nullcard */   
        new Card(atk=0,def=0,mana_cost=mana_cap+1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description=""),
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
    new Card(atk=4,def=4,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Taunt. Transform your minions into 3/3 and give them Deathrattle: summon a 1/1."),
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
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Destroy a minion and your hero takes damage equal to its health."),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Give ur hero +5 health. Spend 3 corpses to gain 5 more and draw a card."),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Draw a card. Spend two corpses to draw another."),
    new Card(atk=3,def=2,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Deal 3 damage to your hero."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Destroy a friendly minion and deal 2 damage to all enemy minions."),
    new Card(atk=0,def=0,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Destroy an enemy minion, and restore 3 health to your hero."),
    new Card(atk=0,def=0,mana_cost=8,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Destroy all minions."),
    new Card(atk=0,def=0,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Draw 3 cards and deal 3 damage to your hero."),
    new Card(atk=3,def=4,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Shuffle two soul fragments into your deck. Draw a card."),
    new Card(atk=1,def=5,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Taunt"),
    new Card(atk=6,def=4,mana_cost=6,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Taunt. Deathrattle: Summon two 3/2 minions to your board."),
    new Card(atk=5,def=5,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="For each soul fragment in your deck summon a 3/3 minion with Charge."),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 3 damage to a minion shuffle two soul fragments into your deck"),
    new Card(atk=0,def=0,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 2 damage to all minions, shuffle two soul fragments into your deck."),
    new Card(atk=1,def=3,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Shuffle two soul fragments into your deck."),
    new Card(atk=4,def=4,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Increase your max hand size to 12. Draw 4 cards."),
    new Card(atk=1,def=1,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Summon a copy of this."),
    new Card(atk=3,def=9,mana_cost=9,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Taunt. Summon 3 1/3 minions with Taunt."),
    new Card(atk=8,def=6,mana_cost=6,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Restore 5 mana, if you have 9 cards in your hand."),
    new Card(atk=0,def=0,mana_cost=0,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Heal 4 health to all minions."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Set attack of all enemy minions to 1 until your next turn."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Deal 3 damage to a minion."),
    new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Copy a card from opponents hand."),
    new Card(atk=0,def=0,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Copy two cards from your opponents deck add it to your hand"),
    new Card(atk=0,def=0,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Summon a copy of a friendly minion with 5/5 stats"),
    new Card(atk=0,def=0,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Give a minion +1/+2 then copy the minion"),
    new Card(atk=4,def=6,mana_cost=7,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Shuffle a copy of your opponents deck into your deck"),
    new Card(atk=0,def=0,mana_cost=9,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Summon a 1/1 copy of minions from your deck to the board until its full"),
    new Card(atk=2,def=6,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Deathrattle: Destroy a random enemy minion"),
    new Card(atk=5,def=4,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="After you cast a spell, deal 4 dmg to both heroes"),
    new Card(atk=0,def=0,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Put a copy of an enemy minion on your board from the enemy's deck"),
    new Card(atk=5,def=5,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="At the end of your turn, Restore 5 health to a damaged friendly minion"),
    new Card(atk=2,def=3,mana_cost=2,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Give +0/+2 to a friendly minion"),
    new Card(atk=4,def=3,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Deathrattle: Deal 3 dmg to enemy hero"),
    new Card(atk=6,def=6,mana_cost=6,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="Deathrattle: Restore 8 health to all friendly characters"),
    new Card(atk=0,def=3,mana_cost=6,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="At the end of your turn, draw 3 cards, until your hand is full."),
    new Card(atk=0,def=3,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="At the end of your turn, summon a minion from your hand."),
    new Card(atk=0,def=3,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description="After you cast 3 spells in a turn, summon a 5/5 Dragon"),
    new Card(atk=1,def=1,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description=""),
    new Card(atk=3,def=5,mana_cost=0,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Taunt. Battlecry: Take 5 health from hero. Deathrattle: Return this to your hand"),
    new Card(atk=3,def=5,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=true, is_spell=false, is_protected=false, description="Charge"),
    new Card(atk=4,def=4,mana_cost=4,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description=""),
    new Card(atk=3,def=3,mana_cost=3,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Taunt. Deathrattle: Summon a 1/1 minion"),
    new Card(atk=2,def=2,mana_cost=0,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description=""),
    new Card(atk=0,def=0,mana_cost=0,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=true, is_protected=false, description="Heal 2 health to your hero"),
    new Card(atk=1,def=3,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=true, instant_atk=false, is_spell=false, is_protected=false, description="Taunt"),
    new Card(atk=5,def=5,mana_cost=5,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description=""),
    new Card(atk=1,def=1,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=true, is_spell=false, is_protected=false, description="Charge")







    
    
    //minta
    // new Card(atk=0,def=0,mana_cost=1,on_play=[], on_turnend=[], on_death=[], on_attack=[], on_spell=[], on_damage=[], is_taunt=false, instant_atk=false, is_spell=false, is_protected=false, description=""),



];
allow_table = true;
let heroes = [
    new Hero(hero_power=(target)=>{return DamageAnything(target, 1)}, "Deal 1 damage to anything."), //Mage
    new Hero(), //Hunter
    new Hero(), //Paladin
    new Hero(), //Death Knight
    new Hero(), //Warlock
    new Hero(), //Priest
    new Hero()  //norbi Xd
]
let table = [[], []]
let hands = [[], []]
let decks = [[], []]
let weapons = [0, 0]
let max_hand = [10, 10]
let max_table = 7
let starter_decks = [
    generateDeck([1,2,3,4,5,6,7,8,11,12,13,14,15,16], [9,10,99]),
    generateDeck([17,18,19,20,25,26,27,28,29,30,31,32,33], [21,22,23,24]),
    generateDeck([34,35,36,37,38,39,41,42,43,44,45,46,47,48], [40,49]),
    generateDeck([52,53,54,55,56,57,58,59,61,63,64,65,66], [50,51,60,62]),
    generateDeck([67,68,69,70,71,72,73,74,76,77,78,80,81], [75,79,82,100]),
    generateDeck([83,84,85,86,87,88,89,92,93,94,95,96,97,98], [90,91,101]),
]
let selected = [null, null] // SelectedID, TargetID
let selected_heroes = [0, 0]

function AddMana() {
    if (max_mana[+player] < mana_cap){
        max_mana[+player]++
    }
    current_mana[+player] = max_mana[+player]
    updateMana();
}

class PlacedCard{
    constructor(card_idx) {
        this.id = max_id++;
        this.card_idx = card_idx;
        this.card = this.get_card_type()
        // console.log(this.card, this.card_idx)
        this.hp = this.card.def
        this.atk = this.card.atk
        this.may_attack = this.card.instant_atk
    }

    get_card_type() {
        return card_types[this.card_idx];
    }
}


// player1 starts with 3 cards, player2 starts with 4

new PlacedCard(0)