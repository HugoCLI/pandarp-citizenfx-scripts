
on('playerSpawned', () => {
    console.log('ok');
    emitNet('playerSpawned');
});

on("respawnPlayerPedEvent", (player, content) => {
    console.log(player, content);
});

RegisterCommand('spawn', async (source) => {
    emitNet('playerSpawned');
});



