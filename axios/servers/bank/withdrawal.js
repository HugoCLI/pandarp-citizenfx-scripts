
onNet('bank:action:withdrawal', (val) => {
    const player = GetUserById(source);
    if (!player) return;
    if (player.money.get('bank') >= val) {
        player.money.remove('bank', val);
        player.money.add('cash', val);
        player.save()
        emitNet('set', source, "money", player.money);
        emitNet('notify', source, "success", `Vous avez retiré ${val} $`);
        return;
    }
    emitNet('notify', source, "error", `Vous n'avez pas les fonds en banque`);
})

onNet('bank:action:deposit', (val) => {
    const player = GetUserById(source);
    if (!player) return;
    if (player.money.get('cash') >= val) {
        player.money.remove('cash', val);
        player.money.add('bank', val);
        player.save();
        emitNet('set', source, "money", player.money);
        emitNet('notify', source, "success", `Vous avez déposé ${val} $`);
        return;
    }
    emitNet('notify', source, "error", `Vous n'avez pas les fonds en liquide`);
})