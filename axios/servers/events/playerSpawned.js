
onNet('playerSpawned', (args) => {
    const playerId = source;
    if (!ids[source]) return initPlayer(playerId);
    const user = GetUserById(source);

    const spawn = Coordinates['spawn'];
    const register = Coordinates['register'];

    if (!user.prenom || !user.nom || !user.date_de_naissance || !user.taille) {
        user.teleport(register);
        emitNet('playerRegister', source)
        return;
    }

    if (!user.skin || Object.keys(user.skin).length == 0) {
        user.teleport(register);
        emitNet('playerRegisterSkin', source)
        return;
    }

    const spawnDist = Math.sqrt(Math.pow(user.coords[0] - register[0], 2) + Math.pow(user.coords[1] - register[1], 2) + Math.pow(user.coords[2] - register[2], 2));
    if (spawnDist < 5)
        user.teleport(spawn);
    else if (user.coords)
        user.teleport(user.coords)
    else
        user.teleport(spawn);

    let skin = user.skin;
    if (user.outfit.getActive()) {
        for (const [key, value] of Object.entries(user.outfit.getActive().outfit))
            skin[key] = value;
    }
    emitNet('skinchanger:loadSkin', playerId, skin)
    setTimeout(() => {
        emitNet('Profiler', playerId, {
            role: user.role,
            uuid: user.uuid,
            money: user.money
        })
    }, 100)

});