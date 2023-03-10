

onNet('playerRegister', async () => {

    SetEntityVisible(GetPlayerPed(-1), false)
    // Configuration du formulaire à afficher dans le menu (titre, type, label, regex, etc.)
    const forms = {
        items: [
            { title: "Nom", module: "button", input: { type: "alpha", label: "Veuillez entrer votre nom", min: 3, max: 32 } },
            { title: "Prénom", module: "button", input: { type: "alpha", label: "Veuillez entrer votre prénom", min: 3, max: 32 } },
            { title: "Date de naissance", module: "button", input: { type: "date", label: "Veuillez entrer votre date de naissance (JJ/MM/AAAA)" } },
            { title: "Taille", module: "button", input: { type: "number", label: "Veuillez entrer votre taille (en cm)", regex: "number", min: 140, max: 200 } }
        ],
        submit: {
            title: "Confirmer mon identité",
            require: true, // Indique si tous les champs doivent être remplis pour valider le formulaire
            callback: "playerRegisterCallback" // Nom de la fonction à appeler lorsque le formulaire est soumis
        }
    }
    // Empêche le personnage de bouger pendant que le formulaire est ouvert
    FreezeEntityPosition(PlayerPedId(), true);
    // Émet l'événement 'axios_menu:open' pour ouvrir le menu avec le formulaire spécifié

    emit('skinchanger:loadDefaultModel', true)
    emit('axios_menu:open', forms)
})

// Lorsque la fonction 'playerRegisterCallback' est appelée côté client (lorsque le formulaire est soumis)
on('playerRegisterCallback', async (data) => {
    // Récupère les valeurs soumises dans le formulaire
    let values = {}
    for (let i = 0; i < data.length; i++)
        values[data[i].title.toLowerCase()] = data[i].value;

    // Permet au personnage de bouger à nouveau
    FreezeEntityPosition(PlayerPedId(), false);
    SetEntityVisible(GetPlayerPed(-1), true)
    // Émet l'événement 'playerRegistered' pour indiquer que le joueur a été enregistré
    emitNet('playerRegistered', values);
    // Émet l'événement 'playerSpawned' pour faire apparaître le joueur à un endroit donné
    emitNet('playerSpawned');
})
