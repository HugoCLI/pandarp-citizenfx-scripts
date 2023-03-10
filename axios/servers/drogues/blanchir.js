

onNet('blanchir:callback', async () => {
    const player = GetUserById(source);
    const item = items["dirty_money"];
    if (!player.inventory.has(item.name, 100))
        return emitNet('notify', player.id, "error", `Il vous manque x1 ${item.label}`);

    if (!item)
        return emitNet('notify', player.id, "error", `item not found`);

    let price = 100 * 0.90;

    player.inventory.remove("dirty_money", 100);
    player.money.add("cash", price);
    player.save();

    emitNet('setInventory', player.id, "dirty_money", player.inventory.get("dirty_money"))
    emitNet('set', source, "money", player.money);


    emitNet('notify', player.id, "success", `Vous avez reçu ${price} $`);

})