onNet('garage:enter_vehicle_menu', () => {
    enter_vehicle_menu();
})


const enter_vehicle_menu = () => {
    const ped = GetPlayerPed(-1);
    const veh = GetVehiclePedIsIn(ped);
    if (GetPedInVehicleSeat(veh, -1) != ped)
        return emit('notify', "error", "Vous n'êtes pas le conducteur");

    const properties = GetVehicleProperties(veh);
    emitNet('garages:requestingEnter', ped, properties);
}