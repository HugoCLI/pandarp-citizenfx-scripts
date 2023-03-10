
    onNet('playerRegistered', async (data) => {
        const player = GetUserById(source);

        if (data['nom'])
            player.nom = data['nom'];
        if (data['prénom'])
            player.prenom = data['prénom'];    
        if (data['date de naissance'])
            player.date_de_naissance = data['date de naissance'];
        if (data['taille'])
            player.taille = parseInt(data['taille']);

        player.save();
    })

    onNet('playerRegisteredSkin', async(data) => {
        const player = GetUserById(source);
        player.skin = data;
        player.save();
    })