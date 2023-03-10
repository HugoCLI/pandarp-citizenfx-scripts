

let banco_price_change = 0
on("banco:payment", async () => {
    let changes = [];
    for (const [key, value] of Object.entries(categories)) {
        if (banco_list.includes(key)) {
            if (skin[key] != skin_withoutsave[key])
                changes.push(key);
        }
    }
    const price = changes.length * 50;
    banco_price_change = price;
    if (price == 0) {
        notify("~g~Votre tenue n'a pas changé")
        return;
    }


    const forms = {
        items: [
            { title: "Nom de la tenue", module: "button", input: { type: "alpha", label: "Veuillez entrer un nom de tenue", min: 3, max: 32 } }
        ],
        cancel: {
            callback: 'banco:open'
        },
        submit: {
            title: `Payer ${price} $`,
            callback: "banco:validpayment",
        }
    }
    emit('axios_menu:open', forms)


})