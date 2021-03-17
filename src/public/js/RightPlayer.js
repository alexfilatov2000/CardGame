import socket from "./LeftPlayer.js";

let leftItems = document.getElementById('startRightCards');
let sortableLeft = new Sortable(leftItems, {
    group: 'shared2',
    animation: 150,
    swap: true,
});

let example2Right = document.getElementById('FinishRightCards');
let sortableRight = new Sortable(example2Right, {
    group: 'shared2',
    animation: 150,
    swap: true,

    onAdd: function (/**Event*/evt) {
        let card = {};
        card.img = document.getElementById('FinishRightCards')
            .children[evt.newIndex].children[0].children[0].getAttribute('src');
        card.name = document.getElementById('FinishRightCards')
            .children[evt.newIndex].children[0].children[1].innerText;
        card.attack = document.getElementById('FinishRightCards')
            .children[evt.newIndex].children[0].children[2].innerText;
        card.health = document.getElementById('FinishRightCards')
            .children[evt.newIndex].children[0].children[3].innerText;
        card.price = document.getElementById('FinishRightCards')
            .children[evt.newIndex].children[0].children[4].innerText;

        document.getElementById('startRightCards').children[evt.oldIndex].remove();
        socket.emit('move', room,{
            oldIndex: evt.oldIndex,
            newIndex: evt.newIndex,
            card: card
        });
    },
});


socket.on('moveall',function(data){
    //insert card class
    document.getElementById('FinishRightCards')
        .children[data.newIndex]
        .setAttribute('class', 'card-placeholder');
    console.log(data.img);

    //insert card data (attack, health, price, name)
    document.getElementById('FinishRightCards').children[data.newIndex].children[0]
        .insertAdjacentHTML("beforeend", `<img src="..${data.card.img}" alt="">`);
    document.getElementById('FinishRightCards').children[data.newIndex].children[0]
        .insertAdjacentHTML("beforeend", `<h3 class="cardName">${data.card.name}</h3>`);
    document.getElementById('FinishRightCards').children[data.newIndex].children[0]
        .insertAdjacentHTML("beforeend", `<div class="attack">${data.card.attack}</div>`);
    document.getElementById('FinishRightCards').children[data.newIndex].children[0]
        .insertAdjacentHTML("beforeend", `<div class="health">${data.card.health}</div>`);
    document.getElementById('FinishRightCards').children[data.newIndex].children[0]
        .insertAdjacentHTML("beforeend", `<div class="price">${data.card.price}</div>`);

    //remove old card
    document.getElementById('startRightCards').children[data.oldIndex].remove();
});

endTurnSec.onclick = async () => {
    let response = await fetch('/getRandCard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    });
    let result = await response.json();

    socket.emit('setRandCard2', room, {
        result: result,
    });
}

socket.on('getRandCard2', (data) => {
    document.getElementById('startRightCards')
        .insertAdjacentHTML("beforeend", `
            <li class="card-placeholder">
                <div class="card">
                    <img src="${data.result.img}" alt="">
                    <h3 class="cardName">${data.result.name}</h3>
                    <div class="attack">${data.result.attack}</div>
                    <div class="health">${data.result.health}</div>
                    <div class="price">${data.result.price}</div>
                </div>
            </li>
        `);
})
