
let queue = [];
let start = false;


const send = (data) => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", `https://${GetParentResourceName()}/action`, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}



window.addEventListener('message', function (event) {
    const action = event.data;
    if (action.type === "message") {
        queue.push({ message: action.message, mode: action.mode });
        if (!start)
            startNotify();
    }
    if (action.type === "interact") {

        document.querySelector('.barnui').style.display = "flex";
        const callback = action.callback;
        const timeout = action.timeout ? action.timeout : 10000;
        document.querySelector('section .barnui span').style.animation = `barnui ${timeout}ms 1`;
        setTimeout(() => {
            send({ type: "interact", callback })
            document.querySelector('.barnui').style.display = "none";
        }, timeout)
    }

});

const d = document;
const startNotify = () => {
    start = true;
    const element = queue.shift();
    if (element) {
        d.querySelector('.notify').style.opacity = 1;
        d.querySelector('.notify .text').innerText = element.message;

        if (element.mode === "success" || !element.mode)
            d.querySelector('.notify .icon').style.backgroundColor = "#1b8748";
        else if (element.mode === "error")
            d.querySelector('.notify .icon').style.backgroundColor = "#951924";
        else if (element.mode === "error")
            d.querySelector('.notify .icon').style.backgroundColor = "#9f5819";

        setTimeout(() => d.querySelector('.notify').style.width = `calc(80px + ${element.message.length * 9}px)`, 250)
        const timeout = element.mode && element.mode === "announce" ? 6000 : 3000;
        setTimeout(() => {
            d.querySelector('.notify').style.width = '60px';
            setTimeout(() => d.querySelector('.notify').style.opacity = 0, 250)
            setTimeout(() => startNotify(), 750)
        }, timeout)
    }
    else
        start = false;

}