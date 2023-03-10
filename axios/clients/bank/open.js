




on('bank:open', async (coords) => {
    if (!Profiler)
        emitNet('playerProfiler')
    const forms = {
        items: [
            { title: "Compte personnel", module: "button", input: { type: "button", onenter: "bank:openMyAccount" } },
        ],

    }
    emit('axios_menu:open', forms)
})


on('bank:openMyAccount', async () => {

    const forms = {
        items: [
            { title: "Banque : " + Profiler.money.bank + " $ ", module: "button", input: { type: "number", label: "Transférer sur le portefeuille : saisir le montant", min: 0, onsubmit: "bank:withdrawal" } },
            { title: "Portefeuille : " + Profiler.money.cash + " $ ", module: "button", input: { type: "number", label: "Transférer à la banque : saisir le montant", min: 0, onsubmit: "bank:deposit" } },
        ],

    }
    emit('axios_menu:open', forms)
})


on('bank:withdrawal', (data) => {
    if (isNaN(data))
        return;
    const val = parseInt(data);
    emitNet('bank:action:withdrawal', val)
})

on('bank:deposit', (data) => {
    if (isNaN(data))
        return;
    const val = parseInt(data);
    emitNet('bank:action:deposit', val)
})