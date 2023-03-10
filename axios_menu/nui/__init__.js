
const d = document; // Shortcut

let Menu = {
    Active: 0,
    inputBoxOpen: false,
    List: []
}

const send = (data) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://${GetParentResourceName()}/action`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}


document.querySelector("fixed input").addEventListener("keydown", (event) => {

    if (event.key === "Enter")
        ItemOpen();

    if (event.key === "Escape")
        ItemClose();
});

const isEligible = (item, val) => {
    const { type } = item;
    if (type === "alpha") {
        const case_min = item.min && item.min > val.length ? `Veuillez saisir au moins ${item.min} caractères` : null;
        const case_max = item.max && item.max < val.length ? `Veuillez saisir au maximums ${item.max} caractères` : null;

        if (case_min)
            return case_min;
        if (case_max)
            return case_max;
    }
    if (type === "number") {
        const num = parseInt(val);
        const case_min = item.min && item.min > num ? `Le minimum requis est de ${item.min}` : null;
        const case_max = item.max && item.max < num ? `Le maximum est de ${item.max}` : null;

        if (case_min)
            return case_min;
        if (case_max)
            return case_max;
    }

}



function validateInput(inputNode, pattern, errormessage, item) {
    // Ajouter un écouteur d'événement pour la validation en temps réel
    inputNode.addEventListener('input', () => {
        const val = inputNode.value;

        const error = isEligible(item, val);
        if (error) {
            inputNode.classList.add('error')
            document.querySelector('p.error').innerText = error;
            return;
        }


        if (!inputNode.value.match(new RegExp(pattern))) {
            inputNode.classList.add('error')
            document.querySelector('p.error').innerText = errormessage
            return;
        }

        inputNode.classList.remove('error')
        document.querySelector('p.error').innerText = ""
    })
}



