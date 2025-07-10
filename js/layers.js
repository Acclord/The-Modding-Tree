addLayer("L", {
    name: "Watering", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "L", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Leaves", // Name of prestige currency
    baseResource: "Water", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        if (hasUpgrade('L', 14)) mult = mult.times(upgradeEffect('L', 14))
        if (hasUpgrade('L', 15)) mult = mult.pow(1.1)
        if (hasUpgrade('L', 21)) mult = mult.times(3)
        if (hasUpgrade('L', 22)) mult = mult.times(10)
        if (hasUpgrade('S', 11)) mult = mult.times(2)
        if (hasUpgrade('S', 12)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
        title: "L1: First upgrade!",
        description: "Multiplies your water gain by 1.5",
        cost: new Decimal(1),
    },
        12: {
        title: "L2: More water!",
        description: "Multiplies your water gain by 3",
        cost: new Decimal(2),
    },
        13: {
        title: "L3: Guess what? More water!",
        description: "Multiplies your water based on the number of leaves you have",
        cost: new Decimal(5),
        effect() {
            return player[this.layer].points.add(1).pow(0.6)
        },
        effectDisplay() { 
            return format(upgradeEffect(this.layer, this.id))+"x" }, 
            // Add formatting to the effect
    },
        14: {
        title: "L4: The more the merrier!",
        description: "Multiplies your leaves based on the amount of water you have",
        cost: new Decimal(15),
        effect() {
        return player.points.add(1).pow(0.2)
        },
        effectDisplay() { 
            return format(upgradeEffect(this.layer, this.id))+"x" }, 
            // Add formatting to the effect
    },
        15: {
        title: "L5: Better water quality!",
        description: "^1.1 water and leaves",
        cost: new Decimal(100),
    },
        21: {
        title: "L6: Would you rather?",
        description: "Halves your water but triples your leaves",
        cost: new Decimal(250),
    },
        22: {
        title: "L7: Preparation",
        description: "x10 both of your water and leaves",
        cost: new Decimal(1000),
    },
        23: {
        title: "L8: Well...",
        description: "Your leaves boost your water significantly",
        cost: new Decimal(10),
        effect() {
            return player[this.layer].points.add(1).pow(0.8)
        },
        effectDisplay() { 
            return format(upgradeEffect(this.layer, this.id))+"x" }, 
            // Add formatting to the effect
    },
},

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true}
})

addLayer("S", {
    name: "Rebirth", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 10, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#C6803B",
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "Seeds", // Name of prestige currency
    baseResource: "Water", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    upgrades: {
        11: {
        title: "S1: A little boost!",
        description: "Multiplies your leaves gain by 2",
        cost: new Decimal(1),
    },
        12: {
        title: "S2: Another little boost!",
        description: "Multiplies your leaves gain by 2... again",
        cost: new Decimal(5),
    },
        13: {
        title: "S3: Nutritious water!",
        description: "Multiplies your waters gain by 10",
        cost: new Decimal(10),
    },
        
},

    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true}
})

