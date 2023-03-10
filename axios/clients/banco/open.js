

const banco_list = ["tshirt_1", "tshirt_2", "torso_1", "torso_2", "pants_1", "pants_2", "shoes_1", "shoes_2", "decals_1", "decals_2", "arms"]




on('banco:open', async (coords) => {
    reloadSkin(() => {
        const forms = {
            items: [
                { title: "Ouvrir le magasin", module: "button", input: { type: "button", onenter: "banco:openShop" } },
                { title: `Ouvrir mes tenues `, module: "button", input: { type: "button", onenter: "banco:openOutfits" } }
            ],

        }
        emit('axios_menu:open', forms)
    })
})


on('banco:openShop', () => {
    let items = [];
    skin_withoutsave = JSON.parse(JSON.stringify(skin));


    for (const [key, value] of Object.entries(categories)) {
        if (banco_list.includes(key))
            items.push({ title: value.name, module: "selector", input: { type: "selector", offset: key, min: value.min, max: value.max, val: value.value, onchange: "ChangeSkin" } })
    }
    const forms = {
        items: items,
        cancel: {
            callback: 'banco:open',
        },
        submit: {
            title: "Continuer",
            callback: "banco:payment",
        }
    }
    emit('axios_menu:open', forms)
})

on('banco:openOutfits', () => {

    let items = [];
    for (const [key, value] of Object.entries(outfits)) {
        console.log(value.name, value.idx)
        items.push({ title: value.name, module: "button", input: { type: "button", val: value.idx.toString(), onenter: "banco:requestOutfit" } })
    }
    const forms = {
        items: items,
        cancel: {
            callback: 'banco:open',
        }
    }
    emit('axios_menu:open', forms)
})



on('banco:requestOutfit', (data) => {
    emitNet('clothes:loadOutfit', parseInt(data.val))
})