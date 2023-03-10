onNet('playerRegisterSkin', async () => {
    reloadSkin(() => {

        SetEntityVisible(GetPlayerPed(-1), false)
        let items = [];
        for (const [key, value] of Object.entries(categories)) {
            items.push({ title: value.name, module: "selector", input: { type: "selector", offset: key, min: value.min, max: value.max, val: value.value, onchange: "ChangeSkin" } })
        }
        const forms = {
            items: items,
            submit: {
                title: "Confirmer mon appareance",
                callback: "playerRegisterSkinCallback"
            }
        }
        FreezeEntityPosition(PlayerPedId(), true);
        emit('axios_menu:open', forms)
    });
})


on('playerRegisterSkinCallback', async () => {
    SetEntityVisible(GetPlayerPed(-1), true)
    FreezeEntityPosition(PlayerPedId(), false);
    emitNet('playerRegisteredSkin', skin);
})



on('ChangeSkin', (data) => {
    console.log(data)
    skin[data.offset] = data.val;
    emit('skinchanger:loadSkin', skin)

})