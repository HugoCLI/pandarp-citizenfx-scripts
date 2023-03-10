
onNet('f5menu:action:moderator:members:list', () => {
    const player = GetUserById(source);

    let callback = {};

    for (const [key, value] of Object.entries(users)) {
        callback[value.uuid] = {
            active: value.id && value.ped ? true : false,
            name: value.prenom + " " + value.nom,
            uuid: value.uuid,
            id: value.id ? value.id : null,
            jobs: value.jobs
        }
    }
    emitNet('f5menu:action:moderator:members:list:callback', source, callback)

})