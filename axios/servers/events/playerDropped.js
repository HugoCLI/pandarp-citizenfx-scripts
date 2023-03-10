
on('playerDropped', (reason) => {
    const playerId = source;
    const user = GetUserById(source);
    if (!user) return;
    const playerPed = GetPlayerPed(playerId);
    const playerCoords = GetEntityCoords(playerPed);
    const playerHeading = GetEntityHeading(playerPed);
    if (!playerCoords) return;
    user.coords = [playerCoords[0], playerCoords[1], playerCoords[2], playerHeading]
    user.save();
    emitNet('removeMember', -1, user.uuid, user.ped, user.id)
});
