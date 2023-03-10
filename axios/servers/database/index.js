
MySQL.fetchAll('SELECT * FROM users', {}).then((result) => {

    console.log('Axios.js:');
    for (let i = 0; i < result.length; i++) {
        const u = result[i];
        MySQL.fetchAll('SELECT * FROM outfits WHERE uuid = @uuid', { '@uuid': u.uuid }).then((outfits) => {
            users[u.uuid] = new User(u.uuid, u.licence, u.skin ? JSON.parse(u.skin) : null, outfits);

            users[u.uuid].money.set("cash", u.cash);
            users[u.uuid].money.set("bank", u.bank);

            users[u.uuid].role = u.role;

            users[u.uuid].prenom = u.prenom
            users[u.uuid].date_de_naissance = u.date_de_naissance
            users[u.uuid].nom = u.nom
            users[u.uuid].taille = u.taille

            users[u.uuid].coords = u.coords ? JSON.parse(u.coords) : null;
            console.log(`[User] Member ${u.uuid} (${u.prenom} ${u.nom}) added.`)
        });
    }

    MySQL.fetchAll('SELECT * FROM items', {}).then((result) => {
        for (let i = 0; i < result.length; i++) {
            const u = result[i];
            items[u.name] = u;
        }
    });

    MySQL.fetchAll('SELECT * FROM inventory', {}).then((result) => {
        for (let i = 0; i < result.length; i++) {
            const u = result[i];
            if (items[u.name] && users[u.uuid])
                users[u.uuid].inventory.init(u.name, u.count);

        }
    });

    MySQL.fetchAll('SELECT * FROM vehicles', {}).then((result) => {
        for (let i = 0; i < result.length; i++) {
            const u = result[i];
            if (users[u.uuid]) {
                users[u.uuid].vehicles[u.matricule] = u;
                users[u.uuid].vehicles[u.matricule].properties = JSON.parse(users[u.uuid].vehicles[u.matricule].properties);
                console.log(`${u.uuid} added vehicle ${u.model} under ${u.matricule}`)
            }

        }
    });

})

MySQL.fetchAll('SELECT * FROM entreprises', {}).then((result) => {
    for (let i = 0; i < result.length; i++) {
        const u = result[i];
        entreprises[u.id] = new Entreprise(u.name, u.owner);
        entreprises[u.id].money.set('cash', u.cash)
        entreprises[u.id].money.set('bank', u.bank)
    }
    MySQL.fetchAll('SELECT * FROM entreprises_roles ORDER BY role ASC', {}).then((result) => {
        for (let i = 0; i < result.length; i++) {
            const u = result[i];
            if (!entreprises[u.entreprise])
                return;
            entreprises[u.entreprise].roles.push({
                name: u.name,
            })
            console.log(`[Entreprise] Role ${u.name} (${u.role}) added in ${u.entreprise}`)
        }
    })


    MySQL.fetchAll('SELECT * FROM entreprises_members', {}).then((result) => {
        for (let i = 0; i < result.length; i++) {
            const u = result[i];
            if (!entreprises[u.entreprise] || !users[u.uuid])
                return;
            const entreprise = u.entreprise;
            const role = entreprises[entreprise].roles[u.role] ? u.role : 0;
            if (!entreprises[entreprise].roles[role])
                return;

            entreprises[entreprise].members[u.uuid] = users[u.uuid];
            users[u.uuid].jobs.push({
                entreprise,
                role,
            });
            console.log(`[Entreprise] Member ${u.uuid} (${users[u.uuid].prenom} ${users[u.uuid].nom}) joined ${entreprise}.`)
        }
    })



})
onNet('SaveCoords', () => {
    const playerId = source;
    const user = GetUserById(source);
    if (!user) return;
    const playerPed = GetPlayerPed(playerId);
    const playerCoords = GetEntityCoords(playerPed);
    const playerHeading = GetEntityHeading(playerPed);
    if (!playerCoords) return;
    user.coords = [playerCoords[0], playerCoords[1], playerCoords[2], playerHeading]
    user.save();
})