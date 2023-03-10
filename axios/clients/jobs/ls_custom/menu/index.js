
onNet('ls_custom:open', () => {
    ls_custom_open();
})

const ls_custom_open = () => {
    const ped = GetPlayerPed(-1);

    if (!IsPedInAnyVehicle(ped))
        return emit('notify', "error", "Vous n'êtes pas dans un véhicule");

    const veh = GetVehiclePedIsIn(ped);
    if (GetPedInVehicleSeat(veh, -1) != ped)
        return emit('notify', "error", "Vous n'êtes pas le conducteur");

    const properties = GetVehicleProperties(veh);
    if (!Profiler.vehicles[properties.plate])
        return emit('notify', "error", "Vous n'êtes pas le propriétaire");


    let items = [];

    items.push({ title: "Modifier le véhicule", module: "button", input: { type: "button", onenter: "ls_custom:edit_vehicle" } })


    const forms = {
        items,
    }
    emit('axios_menu:open', forms)
}