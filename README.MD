# Hearthstone
- Turn system
    - Sleep on newly summoned (unless special)
- ~~AI Enemy~~ --> PVP
- Deck, Pulling
- Placement
- Max hand (10)
- Mana System --> Only on placement
    - Refills per turn
    - +1 to max
    - 10 max
- Rotation system between players
- Extra power / Hero Power
    - Buffs (Atk / def)
    - Heals
    - DMG
    - New card / semi-random Summon (some type)
    - Complex
- Card buffs / relations
- Minimal animation




# Planning

## Format
- Can multiply --> List
    - Cards in hand/deck
- Unique --> Dictionary
    - Card types

## Functions
- Turn system --> Negate boolean
- Deck --> List of card types
- Max hand --> Array (hand.length < max+1)
- Mana System
```

mana_cap = 10
max_mana = 1
current = max_mana


increment(){
    if max_mana < mana_cap:
        max_mana += 1
    current = max_mana
}
```
