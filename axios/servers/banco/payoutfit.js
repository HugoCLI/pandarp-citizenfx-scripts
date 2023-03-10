
onNet('banco:payoutfit', (data) => {
    const { price, name, outfit } = data;
    const player = GetUserById(source);

    if (player.money.get('cash') >= price)
        player.money.remove('cash', price)
    else if (player.money.get('bank') >= price)
        player.money.remove('cash', price)
    else {
        emitNet('notify', source, "error", "Vous n'avez pas assez d'argent")
        return;
    }
    player.outfit.add(name, outfit);
    player.save();
    emitNet('notify', source, "success", `Vous avez acheté une nouvelle tenue`);

})

onNet('clothes:outfits', () => {
    const player = GetUserById(source);
    emitNet('clothes:outfitsCallback', source, player.outfit.outfits)
})

onNet('clothes:loadOutfit', (idx) => {
    const player = GetUserById(source);
    player.outfit.active(idx);

    let skin = JSON.parse(JSON.stringify(player.skin));
    if (player.outfit.getActive()) {

        for (const [key, value] of Object.entries(player.outfit.getActive().outfit))
            skin[key] = value;
    }
    emitNet('notify', source, "success", `Vous avez revêtu une tenue`);
    emitNet('skinchanger:loadSkin', source, skin)
})