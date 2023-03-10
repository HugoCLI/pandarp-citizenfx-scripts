


const f5menu_menu_inventaire = (cursor = 0) => {

    let items = [];

    if (!Profiler.inventory)
        Profiler.inventory = {}


    for (const [key, value] of Object.entries(Profiler.inventory)) {
        if (value.count && value.count > 0)
            items.push({ title: `${value.label} (x${value.count})`, module: "button", input: { type: "button", item: key, onenter: "f5menu:menu:inventaire:item" } })
    }


    const forms = {
        items,
        cancel: {
            callback: 'f5menu',
        },
        cursor,
    }
    emit('axios_menu:open', forms)
}
on('f5menu:menu:inventaire', () => f5menu_menu_inventaire());
