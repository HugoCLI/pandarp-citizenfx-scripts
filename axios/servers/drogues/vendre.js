

onNet('vendre:callback', async (item_name) => {
    const player = GetUserById(source);
    const item = items[item_name];
    if (!player.inventory.has(item.name, 1))
        return emitNet('notify', player.id, "error", `Il vous manque x1 ${item.label}`);

    if (!item)
        return emitNet('notify', player.id, "error", `item not found`);

    let price = 0;
    if (item.name === "methamphetamine_pouch")
        price = 8;
    else if (item.name === "ecstasy_pouch")
        price = 10;
    else
        return emitNet('notify', player.id, "error", `Veuillez contacter un administrateur : vendre:callback:item:not_found`);

    player.inventory.remove(item.name, 1);
    player.inventory.add("dirty_money", price);


    emitNet('setInventory', player.id, item.name, player.inventory.get(item.name))
    emitNet('setInventory', player.id, "dirty_money", player.inventory.get("dirty_money"))

    emitNet('notify', player.id, "success", `Vous avez reçu x${price} Argent Sale`);

})