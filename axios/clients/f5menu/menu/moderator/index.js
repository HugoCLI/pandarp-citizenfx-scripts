


const f5menu_menu_moderator = (cursor = 0) => {
    /* position: menu cursor position */

    let items = [];
    if (!Profiler.staff)
        Profiler.staff = { enable: false };



    if (Profiler.staff.enable) {
        items.push({ title: "Actions", module: "button", input: { type: "button", onenter: "f5menu:menu:moderator:actions" } })
        items.push({ title: "Joueurs", module: "button", input: { type: "button", onenter: "f5menu:menu:moderator:members" } })
        items.push({ title: "Désactiver le mode staff", module: "button", input: { type: "button", onenter: "f5menu:action:staff:disable" } })

    }
    else
        items.push({ title: "Activer le mode staff", module: "button", input: { type: "button", onenter: "f5menu:action:staff:enable" } })




    const forms = {
        items,
        cancel: {
            callback: 'f5menu',
        },
        cursor,
    }
    emit('axios_menu:open', forms)
}

on('f5menu:menu:moderator', () => f5menu_menu_moderator());
on('f5menu:menu:moderator:actions', () => f5menu_menu_moderator_actions());
