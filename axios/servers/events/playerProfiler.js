
onNet('playerProfiler', () => {
    const playerId = source;
    if (!ids[source]) return initPlayer(playerId);
    const user = GetUserById(source);

    emitNet('Profiler', source, {
        role: user.role,
        uuid: user.uuid,
        money: user.money
    })


    let skin = user.skin;
    if (user.outfit.getActive()) {
        for (const [key, value] of Object.entries(user.outfit.getActive().outfit))
            skin[key] = value;
    }
    emitNet('skinchanger:loadSkin', source, skin)

    if (user.inventory.inventory) {
        for (const [key, value] of Object.entries(user.inventory.inventory))
            emitNet('setInventory', playerId, key, value)
    }

    emitNet('addMember', -1, user.uuid, {
        active: true,
        name: user.prenom + " " + user.nom,
        uuid: user.uuid,
        id: user.id ? user.id : null,
        jobs: user.jobs
    })

    emitNet('set', source, "vehicles", user.vehicles)
})