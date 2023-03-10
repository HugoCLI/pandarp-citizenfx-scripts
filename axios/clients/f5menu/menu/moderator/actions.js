


f5menu_menu_moderator_actions = (cursor) => {
    let items = []

    if (!Profiler.staff.noclip)
        items.push({ title: "Activer le noclip", module: "button", input: { type: "button", onenter: "f5menu:action:staff:noclip:enable" } })
    else
        items.push({ title: "Désactiver le noclip", module: "button", input: { type: "button", onenter: "f5menu:action:staff:noclip:disable" } })

    if (!Profiler.staff.revid)
        items.push({ title: "Activer le revid", module: "button", input: { type: "button", onenter: "f5menu:action:staff:revid:enable" } })
    else
        items.push({ title: "Désactiver le revid", module: "button", input: { type: "button", onenter: "f5menu:action:staff:revid:disable" } })


    let forms = {
        items,
        cursor,
        cancel: {
            callback: "f5menu:menu:moderator"
        }
    }
    emit('axios_menu:open', forms)
}



