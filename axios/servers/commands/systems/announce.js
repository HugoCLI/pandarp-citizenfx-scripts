
RegisterCommand('announce', async (source, args) => {
    emitNet('notify', -1, "announce", args.join(" "));
});

