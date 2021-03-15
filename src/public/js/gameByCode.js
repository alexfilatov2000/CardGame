const socket = io();

socket.emit('create', room);


let leftItems = document.getElementById('startLeftCards');

sortableLeft = new Sortable(leftItems, {
    group: 'shared',
    animation: 150,
    swap: true,
    // swapClass: 'highlighted',
});

let example2Right = document.getElementById('FinishLeftCards');
let sortableRight = new Sortable(example2Right, {
    group: 'shared', // set both lists to same group
    animation: 150,
    // filter: '.filtered',
    swap: true,
    // swapClass: 'highlighted',

    onAdd: function (/**Event*/evt) {
        console.log('ok');
        var itemEl = evt.item;  // dragged HTMLElement
        console.dir(itemEl);
        // items2.children[evt.newIndex].style.backgroundColor = 'red';
        // items2.children[evt.newIndex].setAttribute('class', 'filtered');

        socket.emit('move', room,{
            li: itemEl.innerText,
            oldIndex: evt.oldIndex,
            newIndex: evt.newIndex
        });
    },
});




socket.on('moveall',function(data){
    let newLi = document.createElement('li');
    newLi.innerHTML = data.li;
    items2.insertBefore(newLi, items2.children[data.newIndex]);
    // items2.children[data.newIndex].style.backgroundColor = 'red';
    // items2.children[data.newIndex].setAttribute('class', 'filtered');

    let oldLi = document.querySelectorAll('#items li');
    oldLi.forEach((item, i, arr) => {
        arr[data.oldIndex].remove();
    })
});


// var box=document.getElementById('box');
// // Define global variables
// var divX = 0; // abscissa of div
// var divY = 0; // The vertical coordinate of div
// var mouseX = 0; // Mouse abscissa
// var mouseY = 0; // Mouse vertical coordinate
// var sw = false; // means switch
// // Binding mousedown event, mouse down, get the coordinate information of the element
// box.onmousedown=function(evt){
//     var e = evt || window.event; // Compatible with ie and common browsers
//     // Get the div position
//     divX = this.offsetLeft; // Get the value without unit
//     divY=this.offsetTop;
//     // Get the mouse position
//     mouseX= e.clientX;//e.pageX
//     mouseY= e.clientY;//e.pageY
//     // Turn on the switch
//     sw=true;
// };
// // Bind the mousemove event
// box.onmousemove=function(evt){
//     var e=evt || window.event;
//     // If the switch sw is on
//     if(sw){
//         // dis coordinate change value
//         var disX= e.clientX-mouseX;
//         var disY= e.clientY-mouseY;
//         box.style.left=divX+disX+'px';
//         box.style.top=divY+disY+'px';
//     }
//     // Send a move event to the server, and send the location information of the box in the past
//     socket.emit('move', room,{
//         x:box.offsetLeft,
//         y:box.offsetTop
//     });
// };
// // Binding mouseup event
// document.onmouseup=function(){
//     sw=false;
// }
//
// // Register the moveall event in response to the moveall event sent back by the server
// socket.on('moveall',function(data){
//     // Set the box coordinate value
//     box.style.left=data.x+"px";
//     box.style.top=data.y+"px";
//
// });
