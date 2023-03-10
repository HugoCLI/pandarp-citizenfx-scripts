

onNet('traiter:callback', async (item_name) => {
    const player = GetUserById(source);
    const item = items[item_name];
    if (!item.transformable) return;
    const target_item = items[item.transformable];

    if (!player.inventory.has(item.name, 1))
        return emitNet('notify', player.id, "error", `Il vous manque x1 ${item.label}`);

    if (!item || !target_item)
        return emitNet('notify', player.id, "error", `item not found`);

    player.inventory.remove(item.name, 1);
    player.inventory.add(target_item.name, 1);

    emitNet('setInventory', player.id, item.name, player.inventory.get(item.name))
    emitNet('setInventory', player.id, target_item.name, player.inventory.get(target_item.name))

    emitNet('notify', player.id, "success", `Vous avez reçu x1 ${target_item.label}`)
})