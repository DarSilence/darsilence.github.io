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

upborder = 500;

const goods = {
    "1" : {
        "id" : "1",
        "title" : "Алхимическая паста",
        "price" : 100,
        "image" : "components/1.jpg",
        "block" : "block1"
    },
    "2" : {
        "id" : "2",
        "title" : "Костный мозг Альгула",
        "price" : 200,
        "image" : "components/2.jpg",
        "block" : "block2"
    },
    "3" : {
        "id" : "3",
        "title" : "Коготь Альгула",
        "price" : 300,
        "image" : "components/3.jpg",
        "block" : "block3"
    },
    "4" : {
        "id" : "4",
        "title" : "Корень душистого переца",
        "price" : 130,
        "image" : "components/4.jpg",
        "block" : "block4"
    },
    "5" : {
        "id" : "5",
        "title" : "Плоды берберского сорта",
        "price" : 230,
        "image" : "components/5.jpg",
        "block" : "block5"
    },
    "6" : {
        "id" : "6",
        "title" : "Бизонья трава",
        "price" : 330,
        "image" : "components/6.jpg",
        "block" : "block6"
    },
    "7" : {
        "id" : "7",
        "title" : "Кровавый мох",
        "price" : 150,
        "image" : "components/7.jpg",
        "block" : "block7"
    },
    "8" : {
        "id" : "8",
        "title" : "Одуванчик",
        "price" : 250,
        "image" : "components/8.jpg",
        "block" : "block8"
    },
    "9" : {
        "id" : "9",
        "title" : "Яд василиска",
        "price" : 350,
        "image" : "components/9.jpg",
        "block" : "block9"
    },
    "10" : {
        "id" : "10",
        "title" : "Кортинарий",
        "price" : 170,
        "image" : "components/10.jpg",
        "block" : "block10"
    },
    "11" : {
        "id" : "11",
        "title" : "Темная сущность",
        "price" : 270,
        "image" : "components/11.jpg",
        "block" : "block11"
    },
    "12" : {
        "id" : "12",
        "title" : "Герцогская вода",
        "price" : 370,
        "image" : "components/12.jpg",
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
    console.log(`hid ${reflink}`);
    if (state != 'none') elem.style.display='none'; //если включен, то выключаем
};

function showElement(reflink, new_disp='') {
    elem = document.getElementById(reflink);
    state = elem.style.display;
    console.log(`show ${reflink} state:${state}`);
    if (state == 'none') elem.style.display=new_disp; //если выключен, то включаем
    else elem.style.display=new_disp;
};

function isValid(event, id) {
    const validChars = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8",
    "Digit9", "Digit0", "Numpad1", "Numpad2", "Numpad3", "Numpad4", "Numpad5", "Numpad6", "Numpad7",
    "Numpad8", "Numpad9", "Numpad0"];
    elem = document.getElementById(id);
    if (elem.style.color == 'red'){
        elem.style.color = "black";
        elem.value = "";
    }
    return validChars.includes(event.code);
};

function changeInput(event, id) {
    if (event.code == "Enter" || event.code == "NumpadEnter") {
        elem = document.getElementById(id);
        elem.value = Number(elem.value);
        numEl = parseInt(id.match(/\d+/))
        if (numEl > upborder) numEl = upborder;
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
    if (cart[`${numId}`] < upborder) cart[`${numId}`]++;
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
            out += `<td><button class="but_del" id="${id}" name=zero type=button  onclick="zero(this.id)">X</button></td>`
            out += `<td>${goods[id].title}</td>`;
            out += `<td><button class="but_inc" id="${id}" name=decrease type=button  onclick="decrease(this.id)">-</button></td>`;
            out += `<td>${cart[id]}</td>`;
            out += `<td><button class="but_dec" id="${id}" name=decrease type=button  onclick="increase(this.id)">+</button></td>`;
            out += `<td>${goods[id].price * cart[id]} р</td>`
            out += "</tr>";
            total += goods[id].price * cart[id];
        }
    }
    total_out = "";
    if (total > 0){
        total_out = `Итого: ${total} р`;
    }
    out += "</table>";

    document.querySelector('.basket_block__main').innerHTML = out;
    document.querySelector('.basket_block__sum').innerHTML = total_out;
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

function styleInput(id){
    elem = document.getElementById(id);
    if (elem.style.color == 'red'){
        elem.style.color = "black";
        elem.value = "";
    }
}

function clearInput(id){
    elem = document.getElementById(id);
    elem.style.color = 'black';
    elem.value = "";
}

function checkInput(id, string, cond){
    elem = document.getElementById(id);
    console.log(elem.value, elem.style.color);
    if (elem.value == "" || elem.style.color == 'red'){
        ready = false;
        elem.value = string;
        elem.style.color = 'red';
        return false;
    }
    return cond;
}

function makeOrder(f_id, s_id){
    ready = true;
    ready = checkInput("order_name", "Введите имя", ready);
    ready = checkInput("order_surname", "Введите фамилию", ready);
    ready = checkInput("order_address", "Введите адрес", ready);
    ready = checkInput("order_phone", "Введите номер телефона", ready);
    if (ready){
        console.log("order made");
        hidElement(f_id);
        clearInput("order_name");
        clearInput("order_surname");
        clearInput("order_address");
        clearInput("order_phone");
        hidElement("basket_block");
        for (const id in cart) {zero(id)};
        showElement(s_id, 'block');
    }
};
