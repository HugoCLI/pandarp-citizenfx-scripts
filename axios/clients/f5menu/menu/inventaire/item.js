
on('f5menu:menu:inventaire:item', (data) => {
    if (!Profiler.inventory[data.item]) return;
    const item = Profiler.inventory[data.item];

    let items = [];
    items.push({ title: `Donner`, module: "button", input: { type: "button", item: data.item, onenter: "f5menu:menu:inventaire:item:donner" } })
    items.push({ title: `Utiliser`, module: "button", input: { type: "button", item: data.item, onenter: "f5menu:menu:inventaire:item:utiliser" } })

    const forms = {
        items,
        title: `${item.label} • Quantité : x${item.count}`,
        cancel: {
            callback: 'f5menu:menu:inventaire',
        },
    }
    emit('axios_menu:open', forms)
})