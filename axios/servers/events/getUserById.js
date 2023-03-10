
    onNet('getUserById', (source, cb) => {
        const player = getUserById(source);
        cb(player);
    })