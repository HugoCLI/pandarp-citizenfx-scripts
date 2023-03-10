
onNet('concess:category:open', (data) => {
    concess_vehicles_open(data.category);
})

const concess_vehicles_open = (category) => {

    let items = [];
    // only display categories
    for (const [key, value] of Object.entries(concess_vehicles)) {
        if (value.category == category)
            items.push({ title: `${value.name} - ${formatPrice(value.price)} $`, module: "button", input: { type: "button", model: value.model, onenter: "concess:category:vehicle:buy" } })
    }

    // items.push({})

    const forms = {
        cancel: {
            callback: "concess:open"
        },
        title: category,
        items,
    }

    emit('axios_menu:open', forms)
}