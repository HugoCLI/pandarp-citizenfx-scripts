
onNet('teleport_to_player', (id) => {
    const player = GetUserById(source);
    const target = GetUserById(id);

    if (!roles[player.role].mod) return;

    const coords = GetEntityCoords(target.ped);
    if (!coords)
        return emitNet('notify', source, "error", "Impossible de se téléporter");

    player.teleport(coords);
    emitNet('notify', source, "success", `Vous avez été téléporté sur ${target.prenom} ${target.nom}`);
})



onNet('teleport_to_me', (id) => {
    const player = GetUserById(source);
    const target = GetUserById(id);

    if (!roles[player.role].mod) return;

    const coords = GetEntityCoords(player.ped);
    if (!coords)
        return emitNet('notify', source, "error", "Impossible de téléporter se joueur");

    target.teleport(coords);
    emitNet('notify', source, "success", `Vous avez téléporté ${target.prenom} ${target.nom} sur vous`);
})

let freeze_data = [];
onNet('freeze_player', (id) => {
    const player = GetUserById(source);
    const target = GetUserById(id);

    if (!roles[player.role].mod) return;

    if (freeze_data.includes(target.uuid)) {
        freeze_data.splice(freeze_data.indexOf(target.uuid), 1);
        FreezeEntityPosition(target.ped, false);
        emitNet('notify', source, "success", `Vous avez débloqué ${target.prenom} ${target.nom}`);
    } else {
        freeze_data.push(target.uuid);
        FreezeEntityPosition(target.ped, true);
        emitNet('notify', source, "success", `Vous avez bloqué ${target.prenom} ${target.nom}`);
    }
})