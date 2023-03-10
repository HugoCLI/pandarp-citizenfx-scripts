

let member_init = null;
on('f5menu:menu:moderator:members', () => {
    if (member_init)
        return open_moderator_members_list()

    emitNet('f5menu:action:moderator:members:list');
})

onNet('f5menu:action:moderator:members:list:callback', (members_obj) => {
    for (const [key, value] of Object.entries(members_obj)) {
        if (!users[key])
            users[key] = value
    }
    member_init = true;
    open_moderator_members_list()
})

const open_moderator_members_list = () => {
    let items = []

    for (const [key, m] of Object.entries(users)) {
        if (m.active) {
            items.push({
                title: m.uuid + " - " + m.name, module: "button", input: { type: "button", uuid: key, onenter: "f5menu:menu:moderator:members:member" }
            })
        }
    }
    let forms = {
        items,
        cancel: {
            callback: "f5menu:menu:moderator"
        }
    }
    emit('axios_menu:open', forms)
}