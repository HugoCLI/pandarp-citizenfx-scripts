onNet('vehicleSpawn', (model, properties) => {
    const hash = GetHashKey(model)
    RequestModel(hash)
    let tryLoad = 0;
    const loop = () => {
        tryLoad += 1;
        setTimeout(() => {
            if (HasModelLoaded(hash)) {
                const heading = GetEntityHeading(PlayerPedId());


                const coords = GetEntityCoords(GetPlayerPed(-1));
                const veh = CreateVehicle(hash, coords[0], coords[1], coords[2], heading, true, false)


                SetPedIntoVehicle(GetPlayerPed(-1), veh, -1)
                const id = NetworkGetNetworkIdFromEntity(veh)
                SetNetworkIdCanMigrate(id, true)
                SetNetworkEnableVehiclePositionCorrection(veh, true)
                SetModelAsNoLongerNeeded(hash)

                if (properties)
                    SetVehicleProperties(veh, properties);

            } else {
                if (tryLoad < 500)
                    loop();

            }

        }, 10)
    }
    loop();

})