const cart = {
    "1" : 0,
    "2" : 0,
    "3" : 0,
    "4" : 0,
    "5" : 0,
    "6" : 0,
    "7" : 0,
    "8" : 0,
    "9" : 0,
    "10" : 0,
    "11" : 0,
    "12" : 0,
};

const goods = {
    "1" : {
        "id" : "1",
        "title" : "Товар 1",
        "price" : 100,
        "image" : "/components/...",
        "block" : "block1"
    },
    "2" : {
        "id" : "2",
        "title" : "Товар 2",
        "price" : 200,
        "image" : "/components/...",
        "block" : "block2"
    },
    "3" : {
        "id" : "3",
        "title" : "Товар 3",
        "price" : 300,
        "image" : "/components/...",
        "block" : "block3"
    },
    "4" : {
        "id" : "4",
        "title" : "Товар 4",
        "price" : 130,
        "image" : "/components/...",
        "block" : "block4"
    },
    "5" : {
        "id" : "5",
        "title" : "Товар 5",
        "price" : 230,
        "image" : "/components/...",
        "block" : "block5"
    },
    "6" : {
        "id" : "6",
        "title" : "Товар 6",
        "price" : 330,
        "image" : "/components/...",
        "block" : "block6"
    },
    "7" : {
        "id" : "7",
        "title" : "Товар 7",
        "price" : 150,
        "image" : "/components/...",
        "block" : "block7"
    },
    "8" : {
        "id" : "8",
        "title" : "Товар 8",
        "price" : 250,
        "image" : "/components/...",
        "block" : "block8"
    },
    "9" : {
        "id" : "9",
        "title" : "Товар 9",
        "price" : 350,
        "image" : "/components/...",
        "block" : "block9"
    },
    "10" : {
        "id" : "10",
        "title" : "Товар 10",
        "price" : 170,
        "image" : "/components/...",
        "block" : "block10"
    },
    "11" : {
        "id" : "11",
        "title" : "Товар 11",
        "price" : 270,
        "image" : "/components/...",
        "block" : "block11"
    },
    "12" : {
        "id" : "12",
        "title" : "Товар 12",
        "price" : 370,
        "image" : "/components/...",
        "block" : "block12"
    },
};

function updatePage() {
    getStorage();
    for (const id in goods){
        updateInput(id);
        updateImage(id);
        updateTitle(id);
        updatePrice(id);
        updateAmount(id);
    };
    updateBasket();
};

function updateImage(id) {
    reflink = "good_img" + id;
    elem = document.getElementById(reflink);
    elem.src = goods[id].image;
    elem.alt = `Здесь товар ${id}`;
};

function updateTitle(id) {
    reflink = "good_name" + id;
    elem = document.getElementById(reflink);
    const textNode = document.createTextNode(goods[id].title);
    elem.appendChild(textNode);
};

function updatePrice(id) {
    reflink = "good_price" + id;
    elem = document.getElementById(reflink);
    const textNode = document.createTextNode(`Цена: ${goods[id].price} р`);
    elem.appendChild(textNode);
};

function updateAmount(id){
    if (cart[id] == 0){
        showElement(`buy_but${id}`)
        hidElement(`decr_but${id}`);
        hidElement(`amount_input${id}`);
        hidElement(`incr_but${id}`);
    }
    else{
        hidElement(`buy_but${id}`)
        showElement(`decr_but${id}`);
        showElement(`amount_input${id}`);
        showElement(`incr_but${id}`);
    }
};

function hidElement(reflink) {
    elem = document.getElementById(reflink);
    state = elem.style.display;
    if (state != 'none') elem.style.display='none'; //если включен, то выключаем
    else elem.style.display='';
};

function showElement(reflink) {
    elem = document.getElementById(reflink);
    state = elem.style.display;
    if (state == 'none') elem.style.display=''; //если выключен, то включаем
};

function isValid(event) {
  const validChars = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8",
  "Digit9", "Digit0", "Numpad1", "Numpad2", "Numpad3", "Numpad4", "Numpad5", "Numpad6", "Numpad7",
  "Numpad8", "Numpad9", "Numpad0"];
  return validChars.includes(event.code);
};

function changeInput(event, id) {
    if (event.code == "Enter" || event.code == "NumpadEnter") {
        elem = document.getElementById(id);
        elem.value = Number(elem.value);
        numEl = parseInt(id.match(/\d+/))
        cart[numEl] = Number(elem.value);
        updateBasket();
        saveStorage();
        if (elem.value == 0){
            updateAmount(numEl);
        }
    }
}

function increase(id){
    numId = parseInt(id.match(/\d+/))
    cart[`${numId}`]++;
    updateInput(numId);
    updateBasket();
    saveStorage();
    if (cart[`${numId}`] == 1){
        updateAmount(numId);
    }
};

function decrease(id){
    numId = parseInt(id.match(/\d+/))
    cart[`${numId}`]--;
    updateInput(numId);
    updateBasket();
    saveStorage();
    if (cart[`${numId}`] == 0){
        updateAmount(numId);
    }
};

function zero(id){
    numId = parseInt(id.match(/\d+/))
    cart[`${numId}`] = 0;
    updateInput(numId);
    updateBasket();
    updateAmount(numId);
    saveStorage();
};

function updateInput(id) {
    elem = document.getElementById(`amount_input${id}`);
    elem.value = cart[id];
}

function useBasket(){
    elem = document.getElementById("basket_block");
    state = elem.style.display;
    if (state != 'none') elem.style.display='none';
    if (state == 'none') elem.style.display='block';
};

function updateBasket(){
    out = `<table style="width: 100%">`;
    total = 0;
    for (const id in cart){
        if (cart[id] > 0){
            out += `<tr>`;
            out += `<td><button id="${id}" name=zero type=button  onclick="zero(this.id)">X</button></td>`
            out += `<td>${goods[id].title}</td>`;
            out += `<td><button id="${id}" name=decrease type=button  onclick="decrease(this.id)">-</button></td>`;
            out += `<td>${cart[id]}</td>`;
            out += `<td><button id="${id}" name=decrease type=button  onclick="increase(this.id)">+</button></td>`;
            out += `<td>${goods[id].price * cart[id]} р</td>`
            out += "</tr>";
            total += goods[id].price * cart[id];
        }
    }
    if (total > 0){
        out += `<tr><td colspan=5 style="text-align: right;">Итого:</td><td>${total} р</td></tr>`
    }
    out += "</table>";

    document.querySelector('.basket_block__main').innerHTML = out;
};

function showOrder(){
    total = 0;
    for (const id in cart){ total += cart[id];}
    if (total > 0) {        
        console.log(total);
        elem = document.getElementById("order_block");
        console.log(elem);
        state = elem.style.display;
        console.log(state);
        elem.style.display='block';
    }
}

function saveStorage(){
    try{
        for (const id in cart){
            localStorage.setItem(`${id}`, `${cart[id]}`);
        }
    } catch {
        return;
    }
}

function getStorage(){
    try{
        for (const id in cart){
            cart[id] = Number(localStorage.getItem(`${id}`));
        }
    } catch {
        return;
    }
}

// function makeOrder(){

// }
