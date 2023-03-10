

let ratelimit = false;

on('recolte:ecstasy', () => {
    if (ratelimit) return;
    ratelimit = true;

    emit('interact', "recolte:callback", 10000);
    emit('notify', "success", "Récolte d'ecstasy en cours")

    setTimeout(async () => {
        ratelimit = false
        emitNet('recolte:callback', "ecstasy_plant")
    }, 10000)

})

on('recolte:methamphetamine', () => {
    if (ratelimit) return;
    ratelimit = true;

    emit('interact', "recolte:callback", 10000);
    emit('notify', "success", "Récolte de Méthamphetamine en cours")

    setTimeout(async () => {
        ratelimit = false
        emitNet('recolte:callback', "methamphetamine_crystal")
    }, 10000)
})
