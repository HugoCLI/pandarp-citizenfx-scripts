


const f5_menu = () => {
    if (!Profiler)
        return emitNet('playerProfiler')

    let items = [];
    items.push({ title: "Inventaire", module: "button", input: { type: "button", onenter: "f5menu:menu:inventaire" } });

    if (roles[Profiler.role].mod) {
        items.push({ title: "Modérateur", module: "button", input: { type: "button", onenter: "f5menu:menu:moderator" } });
    }
    const forms = {
        "items": items,
    }

    emit('axios_menu:open', forms)
}

on('f5menu', () => f5_menu())
RegisterCommand('+f5menu', () => f5_menu());


