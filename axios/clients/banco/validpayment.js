
on('banco:validpayment', (data) => {
    const name = data[0].value;

    let outfit = {};
    for (const [key, value] of Object.entries(categories)) {
        if (banco_list.includes(key)) {
            outfit[key] = skin[key];
        }
    }

    emitNet('banco:payoutfit', { name, outfit, price: banco_price_change })
})