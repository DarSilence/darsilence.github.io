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


// id="block1"
// id="good_img1"
// id="good_name1"
// id="good_price1"
// id="buy_but1"
// id="decr_but1"
// id="amount_input1"
// id="incr_but1"

function updatePage() {
    for (const id in goods){
        updateImage(id);
        updateTitle(id);
    }
};

function updateImage(id) {
    let reflink = "good_img" + id;
    console.log(reflink);
    let pool = document.getElementById(reflink);
    pool.src = goods[id].image;
    pool.alt = `Здесь товар ${id}`;
};

function updateTitle(id) {
    let reflink = "good_name1";
    console.log(reflink);
    let pool = document.getElementById(name);
    pool.innerHTML = goods[id].title;
};
 
function isValid(event, id) {
  const validChars = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8",
  "Digit9", "Digit0", "Numpad1", "Numpad2", "Numpad3", "Numpad4", "Numpad5", "Numpad6", "Numpad7",
  "Numpad8", "Numpad9", "Numpad0"];
  
  return validChars.includes(event.code);
};


function increase(id){
    return null;
};

function showCart() {
    let out = '<table>';
    out += `<tr><td colspan="2"></td><td>Title</td><td>Quantity</td><td>Price</td></tr>`
    let total = 0;
    for (const id in cart) {
        out += '<tr>';
        out += `<td><button class="cart__remove_good" data-id="${id}">X</button></td>`;
        out += `<td><img scr="${goods[id].image}" style="max-width:64px"></td>`;
        out += `<td>${goods[id].title}</td>`;
        out += `<td><button class="cart__decrease_amount" data-id="${id}">-</button>${cart[id]}<button class="cart__increase_amount" data-id="${id}">+</button></td>`;
        out += `<td>${goods[id].price * cart[id]}</td>`;
        out += '</tr>';
        total += goods[id].price * cart[id];
    }
    if (total != 0)
    {
        out += `<tr><td colspan="4">Total: </td><td>${total}</td></tr>`;
    }
    out += '</table>';
    
    document.querySelector('.cart-field').innerHTML = out;
};

document.querySelector('.cart-field').addEventListener('click', (event)=> {
    const item = event.target;
    if (item.classList.contains('cart__remove_good')){ cartRemove(item.dataset.id);}
    if (item.classList.contains('cart__increase_amount')){ cartIncrease(item.dataset.id);}
    if (item.classList.contains('cart__decrease_amount')){ cartDecrease(item.dataset.id);}
    showCart();
});

function cartDecrease(id){
    cart[id]--;
    if (cart[id] == 0)
    {
        cartRemove(id);
    }
    // showCart();
};

function cartIncrease(id){
    cart[id]++;
    // showCart();
};

function cartRemove(id){
    delete cart[id];
    // showCart();
};

showCart();
updatePage();
