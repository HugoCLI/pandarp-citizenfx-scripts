

onNet('garage:open', () => {
    garage_open();
})


const garage_open = () => {
    let items = [];

    const ped = GetPlayerPed(-1);

    if (IsPedInAnyVehicle(ped)) {
        items.push({ title: "Rentrer le véhicule", module: "button", input: { type: "button", onenter: "garage:enter_vehicle_menu" } });
    } else {
        items.push({ title: "Sortir un véhicule", module: "button", input: { type: "button", onenter: "garage:exit_vehicle_menu" } });
    }
    const forms = {
        "items": items,
    }

    emit('axios_menu:open', forms)
}

