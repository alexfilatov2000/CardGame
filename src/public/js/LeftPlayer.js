const socket = io();

socket.emit('create', room);

startGame.onclick = async () => {
    let response = await fetch('/startThreeCards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
    let result = await response.json();

    socket.emit('setStartThreeCards', room, {
        result: result
    });
}

socket.on('getStartThreeCards', (data) => {
    console.log(data.result[0]);

    for (let i = 0; i < 3; i++) {
        document.getElementById('startLeftCards')
            .insertAdjacentHTML("beforeend", `
            <li class="card-placeholder">
                <div class="card">
                    <img src="${data.result[i].img}" alt="">
                    <h3 class="cardName">${data.result[i].name}</h3>
                    <div class="attack">${data.result[i].attack}</div>
                    <div class="health">${data.result[i].health}</div>
                    <div class="price">${data.result[i].price}</div>
                </div>
            </li>
        `);
    }
});



let leftItems = document.getElementById('startLeftCards');
let sortableLeft = new Sortable(leftItems, {
    group: 'shared',
    animation: 150,
    swap: true,
});

let example2Right = document.getElementById('FinishLeftCards');
let sortableRight = new Sortable(example2Right, {
    group: 'shared',
    animation: 150,
    // filter: '.filtered',
    swap: true,

    onAdd: function (/**Event*/evt) {
        let card = {};
        card.img = document.getElementById('FinishLeftCards')
            .children[evt.newIndex].children[0].children[0].getAttribute('src');
        card.name = document.getElementById('FinishLeftCards')
            .children[evt.newIndex].children[0].children[1].innerText;
        card.attack = document.getElementById('FinishLeftCards')
            .children[evt.newIndex].children[0].children[2].innerText;
        card.health = document.getElementById('FinishLeftCards')
            .children[evt.newIndex].children[0].children[3].innerText;
        card.price = document.getElementById('FinishLeftCards')
            .children[evt.newIndex].children[0].children[4].innerText;

        console.log(card);

        document.getElementById('startLeftCards').children[evt.oldIndex].remove();
        socket.emit('move', room,{
            oldIndex: evt.oldIndex,
            newIndex: evt.newIndex,
            card: card
        });
    },
});


socket.on('moveall',function(data){
    //insert card class
    document.getElementById('FinishLeftCards')
        .children[data.newIndex]
        .setAttribute('class', 'card-placeholder');
    console.log(data.img);

    //insert card data (attack, health, price, name)
    document.getElementById('FinishLeftCards').children[data.newIndex].children[0]
        .insertAdjacentHTML("beforeend", `<img src="..${data.card.img}" alt="">`);
    document.getElementById('FinishLeftCards').children[data.newIndex].children[0]
        .insertAdjacentHTML("beforeend", `<h3 class="cardName">${data.card.name}</h3>`);
    document.getElementById('FinishLeftCards').children[data.newIndex].children[0]
        .insertAdjacentHTML("beforeend", `<div class="attack">${data.card.attack}</div>`);
    document.getElementById('FinishLeftCards').children[data.newIndex].children[0]
        .insertAdjacentHTML("beforeend", `<div class="health">${data.card.health}</div>`);
    document.getElementById('FinishLeftCards').children[data.newIndex].children[0]
        .insertAdjacentHTML("beforeend", `<div class="price">${data.card.price}</div>`);

    //remove old card
    document.getElementById('startLeftCards').children[data.oldIndex].remove();
});

endTurn.onclick = async () => {
    let response = await fetch('/getRandCard', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    });
    let result = await response.json();

    socket.emit('setRandCard', room, {
        result: result
    });
}

socket.on('getRandCard', (data) => {
    document.getElementById('startLeftCards')
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