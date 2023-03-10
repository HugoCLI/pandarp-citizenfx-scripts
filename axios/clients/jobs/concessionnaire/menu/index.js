
on('concess:open', () => {
    concess_open();
})

const concess_open = () => {

    let items = [];

    // only display categories
    let categories = [];
    for (const [key, value] of Object.entries(concess_vehicles)) {
        if (!categories.includes(value.category)) {
            categories.push(value.category);
            items.push({ title: value.category, module: "button", input: { type: "button", category: value.category, onenter: "concess:category:open" } })
        }
    }

    // items.push({})

    const forms = {
        items,
    }

    emit('axios_menu:open', forms)
}