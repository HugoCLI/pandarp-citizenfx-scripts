
let last_modifier;
let new_modifier;
let veh_cache;
onNet('ls_custom:edit_vehicle', () => {
    const ped = GetPlayerPed(-1);
    if (!IsPedInAnyVehicle(ped))
        return emit('notify', "error", "Vous n'êtes pas dans un véhicule");


    const veh = GetVehiclePedIsIn(ped);
    veh_cache = veh;
    if (GetPedInVehicleSeat(veh, -1) != ped)
        return emit('notify', "error", "Vous n'êtes pas le conducteur");

    const properties = GetVehicleProperties(veh);
    if (!Profiler.vehicles[properties.plate])
        return emit('notify', "error", "Vous n'êtes pas le propriétaire");

    last_modifier = properties;

    let items = [];
    items.push({ title: "Moteur", module: "selector", input: { type: "selector", offset: 11, min: 0, max: 4, val: 0, onchange: "ls_custom:modify" } })
    items.push({ title: "Turbo", module: "selector", input: { type: "selector", offset: 18, min: 0, max: 1, val: 0, onchange: "ls_custom:modify" } })
    items.push({ title: "Frein", module: "selector", input: { type: "selector", offset: 12, min: 0, max: 1, val: 0, onchange: "ls_custom:modify" } })
    items.push({ title: "Transmission", module: "selector", input: { type: "selector", offset: 13, min: 0, max: 1, val: 0, onchange: "ls_custom:modify" } })
    items.push({ title: "Suspension", module: "selector", input: { type: "selector", offset: 15, min: 0, max: 1, val: 0, onchange: "ls_custom:modify" } })

    const forms = {
        items,
        cancel: {
            close: true,
            callback: "ls_custom:cancel"
        },
        submit: {
            callback: "ls_custom:valid",
            title: "Acheter les changements"
        }
    }
    emit('axios_menu:open', forms)
})
on('ls_custom:cancel', () => {
    SetVehicleProperties(veh_cache, last_modifier)
    emit("notify", "error", "Vos modifications ont été annulées")
})

on('ls_custom:modify', (data) => {
    ls_custom_modifier_veh(parseInt(data.offset), parseInt(data.val))
})

const ls_custom_modifier_veh = (offset, mod) => {
    const ped = GetPlayerPed(-1);
    const veh = GetVehiclePedIsIn(ped);
    veh_cache = veh;
    SetVehicleModKit(veh, 0)
    SetVehicleMod(veh, offset, mod, false);
    if (offset == 11) {
        const multiplier = 1 + (0.0625 * mod);

        let basespeed = GetVehicleModelEstimatedMaxSpeed(GetEntityModel(veh));
        let highspeed = (basespeed * multiplier) - 26
        ModifyVehicleTopSpeed(veh, highspeed)
    }
}

on('ls_custom:valid', (data) => {
    const ped = GetPlayerPed(-1);
    const veh = GetVehiclePedIsIn(ped);
    new_modifier = GetVehicleProperties(veh);

    for (const [key, value] of Object.entries(last_modifier)) {

        if (new_modifier[key] != value)
            console.log(key, value)
    }
})