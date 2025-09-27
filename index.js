const cart = {
    "1" : 1,
    "2" : 2,
    "3" : 4,
};

const goods = {
    "1" : {
        "id" : "1",
        "title" : "sth1",
        "price" : 100,
        "image" : "/components/..."
    },
    "2" : {
        "id" : "2",
        "title" : "sth2",
        "price" : 200,
        "image" : "/components/..."
    },
    "3" : {
        "id" : "3",
        "title" : "sth3",
        "price" : 300,
        "image" : "/components/..."
    },
};
 
function isValid(event, id) {
  const validChars = ["Digit1", "Digit2", "Digit3", "Digit4", "Digit5", "Digit6", "Digit7", "Digit8",
  "Digit9", "Digit0", "Numpad1", "Numpad2", "Numpad3", "Numpad4", "Numpad5", "Numpad6", "Numpad7",
  "Numpad8", "Numpad9", "Numpad0"];
  
//   let element = getElementById(id);
//   var t_value = Number(text.value);
//   text.setAttribute("value", "\!");
//   text.dispatchEvent(event);
  
  return validChars.includes(event.code);
}


function increase(id){
    return null;
}

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
}

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
}

function cartIncrease(id){
    cart[id]++;
    // showCart();
}

function cartRemove(id){
    delete cart[id];
    // showCart();
}

showCart();
