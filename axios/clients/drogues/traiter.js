
on('traiter:ecstasy', () => {
    if (ratelimit) return;
    ratelimit = true;

    emit('interact', "traiter:callback", 7500);
    emit('notify', "success", "Traitement d'une Plante d'ecstasy en cours")

    setTimeout(async () => {
        ratelimit = false;
        emitNet('traiter:callback', "ecstasy_plant")
    }, 7500)

})

on('traiter:methamphetamine', () => {
    if (ratelimit) return;
    ratelimit = true;

    emit('interact', "traiter:callback", 7500);
    emit('notify', "success", "Traitement d'un Cristal de méthamphétamine en cours")

    setTimeout(async () => {
        ratelimit = false;
        emitNet('traiter:callback', "methamphetamine_crystal")
    }, 7500)

})


