on('f5menu:menu:moderator:members:member', (data) => {
    open_member(data.uuid);
})

const open_member = (uuid, cursor = 0) => {
    if (!uuid) return;
    let items = [];
    const m = users[uuid];

    items.push({ title: "Se téléporter sur lui", module: "button", input: { type: "button", id: m.id, onenter: "f5menu:moderator:members:member:teleport_to_player" } });
    items.push({ title: "Se téléporter sur moi", module: "button", input: { type: "button", id: m.id, uuid: m.uuid, onenter: "f5menu:moderator:members:member:teleport_to_me" } });

    items.push({ title: "Bloquer/Débloquer la position", module: "button", input: { type: "button", id: m.id, uuid: m.uuid, onenter: "f5menu:moderator:members:member:freeze_player" } });
    let forms = {
        items,
        cursor,
        title: `${uuid} - ${m.name}`,
        cancel: {
            callback: "f5menu:menu:moderator:members"
        }
    }
    emit('axios_menu:open', forms)
}


onNet('f5menu:moderator:members:member:teleport_to_player', (data) => {
    emitNet('teleport_to_player', data.id)
    open_member(data.uuid, 0)
})

onNet('f5menu:moderator:members:member:teleport_to_me', (data) => {
    emitNet('teleport_to_me', data.id)
    open_member(data.uuid, 1)
})


onNet('f5menu:moderator:members:member:freeze_player', (data) => {
    emitNet('freeze_player', data.id)
    open_member(data.uuid, 2)
})