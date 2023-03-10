
onNet('concess:category:vehicle:buy', (data) => {
    concess_vehicle_buy(data.model);
})

const concess_vehicle_buy = (model) => {

    let items = [];
    let vehicle;

    // only display categories
    for (const [key, value] of Object.entries(concess_vehicles)) {
        if (value.model == model) {
            vehicle = value;
            break;
        }
    }

    if (!vehicle) return;
    items.push({ title: `Annuler l'opération`, module: "button", input: { type: "button", category: vehicle.category, model: vehicle.model, onenter: "concess:category:open" } })

    const forms = {
        cancel: {
            callback: "concess:category:open"
        },
        submit: {
            title: `Acheter ${vehicle.name} à ${formatPrice(vehicle.price)} $`,
            callback: "concess:payTraitement",
            vehicle: vehicle.model,
        },
        title: `Acheter le véhicule ?`,
        items,
    }

    emit('axios_menu:open', forms)
}