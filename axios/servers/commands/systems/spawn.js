

    RegisterCommand('spawn', async (source) => {
        const player = GetUserById(source);

        const spawn = Coordinates['spawn'];
        player.teleport(spawn);

    });