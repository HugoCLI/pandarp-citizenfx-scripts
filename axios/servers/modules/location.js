

onNet('playerRequestLocation', () => {
    const player = GetUserById(source);


    console.log(player)
    if (player.money.get('cash') >= 40)
        player.money.remove('cash', 40)
    else if (player.money.get('bank') >= 40)
        player.money.remove('bank', 40)
    else {
        emitNet('notify', source, "error", "Vous n'avez pas assez d'argent")
        return;
    }

    if (player.readyPlayerLocation) {
        emitNet('notify', source, "error", "Vous avez déjà sortie un véhicule")
        return;
    }

    player.readyPlayerLocation = true;

    console.log(source, "panto")
    emitNet('vehicleSpawn', source, "panto")
    emitNet('notify', source, "success", "Vous avez loué un véhicule")
})