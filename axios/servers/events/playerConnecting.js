
// Ce code est un gestionnaire d'événement qui est déclenché lorsque qu'un joueur tente de se connecter au serveur de jeu.
// Il récupère l'identifiant du joueur et recherche son numéro de licence dans la liste des identifiants du joueur.
// Si le joueur est un nouvel utilisateur, le code traite sa demande d'inscription.

on('playerConnecting', async (name, setKickReason, deferrals) => {
    const _source = source;


    // Récupérer le numéro de licence de l'utilisateur
    let licence;
    for (let i = 0; i < GetNumPlayerIdentifiers(_source); i++) {
        const identifier = GetPlayerIdentifier(_source, i).split(':');
        if (identifier[0] == "license")
            licence = identifier[1]
    }

    // Recherche de l'utilisateur dans la liste des utilisateurs existants
    let player = null;
    for (const [key, value] of Object.entries(users)) {
        if (value.licence == licence)
            player = value;
    }
    // Si l'utilisateur est nouveau, le code traite sa demande d'inscription
    if (player == null) {
        let uuid = generateUUID();
        while (users[uuid])
            uuid = generateUUID();

        users[uuid] = new User(uuid, licence);
        player = users[uuid];
        player.money.add('bank', 500)
        MySQL.fetchScalar(`INSERT INTO users(uuid, licence, cash, bank) VALUES(@uuid, @licence, @cash, @bank)`, {
            '@bank': player.money.get('bank'),
            '@cash': player.money.get('cash'),
            '@uuid': player.uuid,
            '@licence': player.licence
        });
        // log ... viens d'être register
    }
    ids[licence] = player.uuid;
    player.username = name;

    // Log .. connecté au serveur

});

