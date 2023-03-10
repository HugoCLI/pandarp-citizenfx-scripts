
onNet('concess:payCallback', (model, properties) => {
    const player = GetUserById(source);

    let vehicle;
    for (let i = 0; i < concess_vehicles.length; i++)
        if (concess_vehicles[i].model == model)
            vehicle = concess_vehicles[i]



    if (!vehicle)
        emitNet('notify', source, "error", "unauthorized vehicle : anticheat.out_concess?");
    if (vehicle.price <= 5000)
        emitNet('notify', source, "error", "unauthorized vehicle : anticheat.price?");

    if (player.money.get('bank') >= vehicle.price)
        player.money.remove('bank', vehicle.price)
    else {
        emitNet('notify', source, "error", "Vos fonds sont manquants pour acheter ce véhicule");
        return;
    }


    const plate = generatePlateNumber();
    properties.plate = plate;

    MySQL.fetchAll('INSERT INTO vehicles(matricule, uuid, model, properties) VALUES(@matricule, @uuid, @model, @properties)', {
        '@matricule': plate,
        '@uuid': player.uuid,
        '@model': vehicle.model,
        '@properties': JSON.stringify(properties)

    })
    emitNet('notify', player.id, "success", `Vous avez acheté ${vehicle.name} immatriculé sous ${plate}`);
    users[player.uuid].vehicles[plate] = {
        matricule: plate,
        uuid: player.uuid,
        model: vehicle.model,
        properties,
    };

})