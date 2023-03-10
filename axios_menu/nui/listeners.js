
console.log('loaded')
window.addEventListener('message', function (event) {
    const action = event.data;

    if (action.type === "keypress") {
        if (action.keypress == "down")
            return setActiveItem(Menu.Active + 1);
        if (action.keypress == "up")
            return setActiveItem(Menu.Active - 1);

        if (action.keypress == "right")
            return setActiveSelector(1);
        if (action.keypress == "left")
            return setActiveSelector(-1);

        if (action.keypress == "cancel") {
            console.log(Menu)
            if (Menu.Cancel && Menu.Cancel.callback) {
                send({ type: "execute", execute: { callback: Menu.Cancel.callback, close: true, data: Menu.List[Menu.Active].data } })
                return;
            }
            send({ type: "execute", execute: { close: true } })

        }

        if (action.keypress == "enter") {
            if (Menu.Active !== Menu.Count)
                return ItemOpen();
            return SubmitForm();
        }
    }

    if (action.type === "display") {
        if (action.display)
            d.querySelector('section').style.display = "inherit";
        else
            d.querySelector('section').style.display = "none";
    }

    if (action.type === "formCreate") {
        d.querySelector('section').style.display = "inherit";
        const data = action.formCreate;
        resetItem();

        for (let i = 0; i < data.items.length; i++) {
            if (data.items[i].module == "button")
                addItem(data.items[i].title, data.items[i].input);
            else if (data.items[i].module == "void")
                addVoid();
            else if (data.items[i].module === "selector")
                addSelector(data.items[i].title, data.items[i].input);
        }
        Menu.Cancel = null;

        d.querySelector('#title').innerText = "Menu de sélection";
        if (data.title)
            d.querySelector('#title').innerText = data.title;


        d.querySelector('.nav-submit').style.display = "none";
        if (data.cancel)
            Menu.Cancel = data.cancel
        if (data.submit)
            addSubmit(data.submit)

        let cursor = 0;
        if (data.cursor)
            cursor = data.cursor;
        setActiveItem(cursor);
    }
});