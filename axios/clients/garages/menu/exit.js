onNet('garage:exit_vehicle_menu', () => {
    exit_vehicle_menu();
})


const exit_vehicle_menu = () => {
    let items = [];

    for (const [key, value] of Object.entries(Profiler.vehicles)) {
        if (value.out == 0)
            items.push({ title: `${value.matricule} - ${value.model}`, module: "button", input: { type: "button", matricule: value.matricule, onenter: "garage:exit_vehicle_spawn" } });
    }

    const forms = {
        "items": items,
    }
    emit('axios_menu:open', forms)

}

on('garage:exit_vehicle_spawn', (data) => {
    const plate = data.matricule;
    emitNet('garage:requestingExitVehicle', plate);
})