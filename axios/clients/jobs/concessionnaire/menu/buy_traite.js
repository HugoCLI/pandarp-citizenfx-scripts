

on('concess:payTraitement', (data) => {
    if (!data[0].data.model) return;


    const model = data[0].data.model;


    const hash = GetHashKey(model)
    RequestModel(hash)
    let tryLoad = 0;
    const loop = () => {
        tryLoad += 1;
        console.log(model);
        setTimeout(() => {
            if (HasModelLoaded(hash)) {
                const heading = GetEntityHeading(PlayerPedId());


                const coords = GetEntityCoords(GetPlayerPed(-1));
                const veh = CreateVehicle(hash, -36.06593322753906, -1117.912109375, 191.4088134765625, 0.0, true, false)
                FreezeEntityPosition(veh, true);



                const id = NetworkGetNetworkIdFromEntity(veh)
                SetNetworkIdCanMigrate(id, true)
                SetNetworkEnableVehiclePositionCorrection(veh, true)
                SetModelAsNoLongerNeeded(hash)
                const properties = GetVehicleProperties(veh);

                DeleteVehicle(veh)
                emitNet('concess:payCallback', data[0].data.model, properties)

            } else {
                if (tryLoad < 500)
                    loop();
                else
                    return console.log("cancel");
            }

        }, 10)
    }
    loop();


})