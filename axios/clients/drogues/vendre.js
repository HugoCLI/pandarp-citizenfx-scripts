
on('vendre:ecstasy', () => {
    if (ratelimit) return;
    ratelimit = true;

    emit('interact', "vendre:callback", 3500);

    setTimeout(async () => {
        emitNet('vendre:callback', "ecstasy_pouch")
        ratelimit = false
    }, 3500)

})

on('vendre:methamphetamine', () => {
    if (ratelimit) return;
    ratelimit = true;

    emit('interact', "vendre:callback", 3500);

    setTimeout(async () => {
        emitNet('vendre:callback', "methamphetamine_pouch")
        ratelimit = false
    }, 3500)

})

