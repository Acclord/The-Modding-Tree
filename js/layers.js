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
    },
        gainMult() {
        let mult = new Decimal(1)
        if (hasUpgrade('L', 14)) mult = mult.times(upgradeEffect('L', 14))
        return mult
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

    layerShown(){return true}
})
