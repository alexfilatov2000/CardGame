const socket = io();

let startCards = {};
startCards.attack = document.getElementById('startLeftCards')
    .children[0].children[0].children[1].innerText;
startCards.health = document.getElementById('startLeftCards')
    .children[0].children[0].children[2].innerText;
startCards.price = document.getElementById('startLeftCards')
    .children[0].children[0].children[3].innerText;
startCards.name = document.getElementById('startLeftCards')
    .children[0].children[0].children[4].innerText;

socket.emit('create', room, {
    card: startCards
});
socket.on('startCards', data => {

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
        card.attack = document.getElementById('FinishLeftCards')
            .children[evt.newIndex].children[0].children[1].innerText;
        card.health = document.getElementById('FinishLeftCards')
            .children[evt.newIndex].children[0].children[2].innerText;
        card.price = document.getElementById('FinishLeftCards')
            .children[evt.newIndex].children[0].children[3].innerText;
        card.name = document.getElementById('FinishLeftCards')
            .children[evt.newIndex].children[0].children[4].innerText;

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

    //insert card data (attack, health, price, name)
    document.getElementById('FinishLeftCards').children[data.newIndex]
        .insertAdjacentHTML("beforeend", `<div class="attack">${data.card.attack}</div>`);
    document.getElementById('FinishLeftCards').children[data.newIndex]
        .insertAdjacentHTML("beforeend", `<div class="health">${data.card.price}</div>`);
    document.getElementById('FinishLeftCards').children[data.newIndex]
        .insertAdjacentHTML("beforeend", `<div class="price">${data.card.health}</div>`);
    document.getElementById('FinishLeftCards').children[data.newIndex]
        .insertAdjacentHTML("beforeend", `<div class="cardName">${data.card.name}</div>`);

    //remove old card
    document.getElementById('startLeftCards').children[data.oldIndex].remove();
});
