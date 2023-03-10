

const fixed = d.querySelector('fixed');
const items = d.getElementById('items');
const submit = d.querySelector('.nav-submit');

const resetItem = () => {
    Menu.Count = 0;
    Menu.List = [];
    delete Menu.Submit;
    items.innerHTML = "";
}

const addItem = (title, data) => {
    const navItem = document.createElement("div");
    navItem.classList.add("nav-item");

    const header = document.createElement("header");
    header.textContent = title;
    navItem.appendChild(header);
    if (data.type !== "button") {
        const div = document.createElement("div");
        navItem.appendChild(div);
    }
    const footer = document.createElement("footer");

    const chevronRight = document.createElement("i");
    chevronRight.classList.add("bx", "bx-chevron-right");
    footer.appendChild(chevronRight);

    navItem.appendChild(footer);

    items.appendChild(navItem);
    Menu.Count += 1;
    Menu.List.push({ title, data });
};
const addVoid = () => {
    const navItem = document.createElement("div");
    navItem.classList.add("nav-item");

    items.appendChild(navItem);

    Menu.Count += 1;
    Menu.List.push({});
};
const addSelector = (title, data) => {
    const navItem = document.createElement("div");
    navItem.classList.add("nav-item");

    const header = document.createElement("header");
    header.textContent = title;
    navItem.appendChild(header);

    const footer = document.createElement("footer");

    const chevronLeft = document.createElement("i");
    chevronLeft.classList.add("bx", "bx-chevron-left");
    footer.appendChild(chevronLeft);

    if (!data.val)
        if (data.min)
            data.val = data.min;
        else
            data.val = 0;

    const numberSpan = document.createElement("span");
    numberSpan.textContent = data.val;
    footer.appendChild(numberSpan);


    const chevronRight = document.createElement("i");
    chevronRight.classList.add("bx", "bx-chevron-right");
    footer.appendChild(chevronRight);

    navItem.appendChild(footer);

    items.appendChild(navItem);
    Menu.Count += 1;
    Menu.List.push({ title, data });
    Menu.List[Menu.List.length - 1].value = data.val

}

const setActiveItem = (num) => {
    const lists = items.querySelectorAll('.nav-item');
    const numLists = lists.length;

    console.log(Menu.Submit, num, numLists)
    if (num < 0)
        return setActiveItem(Menu.Count - 1);
    if (Menu.Submit) {
        if (num > numLists)
            return setActiveItem(0);
    }
    else if (num > numLists - 1)
        return setActiveItem(0);

    for (let i = 0; i < numLists; i++) {

        lists[i].classList.toggle('active', i === num);
        if (i === num)
            lists[i].scrollIntoView();
    }

    submit.classList.toggle('active', num === numLists);
    Menu.Active = num;

    let ratio = 0;
    if (Menu.Submit)
        ratio += 1;

    d.querySelector('#page').innerText = `${Menu.Active + 1}/${Menu.Count + ratio}`;
}

const setActiveSelector = (number) => {
    const item = items.querySelectorAll('.nav-item')[Menu.Active];

    if (Menu.List[Menu.Active].data.type !== "selector")
        return;
    const min = Menu.List[Menu.Active].data.min ? Menu.List[Menu.Active].data.min : 0;
    const max = Menu.List[Menu.Active].data.max;
    let val = Menu.List[Menu.Active].data.val;
    if (val + number < min) return;
    if (val + number > max) return;

    Menu.List[Menu.Active].data.val = val + number;
    item.querySelector('footer span').innerText = Menu.List[Menu.Active].data.val;
    if (Menu.List[Menu.Active].data.onchange)
        send({ type: "execute", execute: { callback: Menu.List[Menu.Active].data.onchange, data: Menu.List[Menu.Active].data } })
}


const ItemOpen = (number = Menu.Active) => {
    if (!Menu.List[number]) return;

    const Item = Menu.List[number].data;

    if (Item.type === "button") {
        if (Item.onenter) {
            console.log(Menu.List[Menu.Active])
            send({ type: "execute", execute: { callback: Menu.List[Menu.Active].data.onenter, close: true, data: Menu.List[Menu.Active].data } })
            return;
        }
    }

    if (Menu.inputBoxOpen) {
        ItemClose(true)
        if (Item.onsubmit)
            send({ type: "execute", execute: { callback: Item.onsubmit, close: true, data: Menu.List[Menu.Active].value } })
        return;
    }



    if (Item.type === "alpha" || Item.type === "number" || Item.type === "date") {
        fixed.style.visibility = "visible";
        fixed.querySelector('header h3').innerText = Item.label
        fixed.querySelector('input').value = "";
        if (Item.type === "alpha") {
            validateInput(fixed.querySelector('input'), '^[A-Za-z -]+$', "Veuillez uniquement saisir des lettres", Item);
        } else if (Item.type === "number") {
            validateInput(fixed.querySelector('input'), '^[0-9]+$', "Veuillez uniquement saisir des chiffres", Item);
        } else if (Item.type === "date") {
            validateInput(fixed.querySelector('input'), '^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\\d{4}$', "La date ne correspond pas au modèle demandé", Item);
        }


        fixed.querySelector('input').focus();

        send({ type: "fullscreen", fullscreen: true });
        Menu.inputBoxOpen = true;
    }


}

const addSubmit = (obj) => {
    Menu.Submit = obj
    d.querySelector('.nav-submit').style.display = "flex";
    d.querySelector('#submit-title').innerText = "S'enregistrer"
    if (obj.title)
        d.querySelector('#submit-title').innerText = obj.title
}

const ItemClose = (oninputenter = false) => {

    if (oninputenter) {

        const val = fixed.querySelector('input').value;
        if (document.querySelector('p.error').innerText != "")
            return;


        const nav_item = items.querySelectorAll('.nav-item')[Menu.Active];

        Menu.List[Menu.Active].value = val;
        nav_item.querySelector('div').innerText = val;
    }

    fixed.style.visibility = "hidden";
    Menu.inputBoxOpen = false;
    send({ type: "fullscreen", fullscreen: false });
}

const SubmitForm = () => {
    if (Menu.Submit) {
        if (Menu.Submit.require) {
            for (let i = 0; i < Menu.List.length; i++)
                if (!Menu.List[i].value)
                    return;
        }
    }
    send({ type: "submit", callback: Menu.Submit.callback, items: Menu.List });
}

