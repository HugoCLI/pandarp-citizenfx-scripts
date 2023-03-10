

onNet('garages:requestingEnter', (ped, properties) => {
    const player = GetUserById(source);
    if (!ped || !properties) return;

    const plate = properties.plate;

    if (!player.vehicles[plate])
        return emitNet('notify', player.id, "error", "Le véhicule ne vous appartient pas")

    player.vehicles[plate].properties = properties;
    player.vehicles[plate].out = 0;

    DeleteEntity(GetVehiclePedIsIn(GetPlayerPed(player.id)))
    emitNet('set', source, "vehicles", player.vehicles)
    emitNet('notify', player.id, "success", "Votre véhicule personnel a été rentré")
})

onNet('garage:requestingExitVehicle', (plate) => {
    const player = GetUserById(source);

    if (!player.vehicles[plate])
        return emitNet('notify', player.id, "error", "Le véhicule ne vous appartient pas")

    const veh = player.vehicles[plate];
    if (veh.out == 1)
        return emitNet('notify', player.id, "error", "Le véhicule est déjà sortie")

    emitNet('vehicleSpawn', player.id, veh.model, veh.properties);
    player.vehicles[plate].out = 1;
    emitNet('notify', player.id, "success", "Votre véhicule personnel a été sortie")
    emitNet('set', source, "vehicles", player.vehicles)
})