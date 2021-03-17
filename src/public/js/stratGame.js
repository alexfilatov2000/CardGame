import socket from "./LeftPlayer.js";

startGame.onclick = async () => {
    startCnt++;
    //firstPlayer start 3 cards
    let response = await fetch('/startThreeCards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
    let result1 = await response.json();
    socket.emit('setStartThreeCards1', room, {
        result: result1,
        startCnt: startCnt
    });

    //secondPlayer start 3 cards
    let response2 = await fetch('/startThreeCards', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
    })
    let result2 = await response2.json();
    socket.emit('setStartThreeCards2', room, {
        result: result2,
        startCnt: startCnt
    });

}

//firstPlayer start 3 cards
socket.on('getStartThreeCards1', (data) => {
    if(data.startCnt >= 2){
        return;
    }
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

//secondPlayer start 3 cards
socket.on('getStartThreeCards2', (data) => {
    if(data.startCnt >= 2){
        return;
    }
    for (let i = 0; i < 3; i++) {
        document.getElementById('startRightCards')
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
