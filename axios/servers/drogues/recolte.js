

onNet('recolte:callback', async (item_name) => {
    const player = GetUserById(source);
    const item = items[item_name];
    if (!item)
        return emitNet('notify', player.id, "error", `item.${item.label} not found`);

    const random = rand(1, 2);

    player.inventory.add(item_name, random);
    emitNet('setInventory', player.id, item_name, player.inventory.get(item_name))
    player.save();
    emitNet('notify', player.id, "success", `Vous avez récolte x${random} ${item.label}`)
})