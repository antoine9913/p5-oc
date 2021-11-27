//// gestion du panier////

//récupération du panier dans le local storage
const pickCart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem("cart")) : [];

//Emplacement du html
const container = document.getElementById("containerCartBody");

//Récupération ID produit
let addIdBasket = [];

//fonction calcul prix total du panier et envoie au local storage

let priceCart = 0;

function priceTotalcart(products) {
    priceCart += products.quantity * products.price / 100;
    //Affiche prix total du panier // Envoi au localstorage
    const totalPrice = document.getElementById('totalPrice').textContent = priceCart + "€";
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
};

//boucle sur le panier

pickCart.forEach((products, i) => {
    container.innerHTML += `
    <tr>
        <td class="srcimage"><img src="${products.imageUrl}" alt="" /></td>
        <td>${products.name}</td>
        <td>${products.price / 100} €</td>
        <td>${products.quantity}</td>
        <td><div class="add-and-remove"><a href="#" class="addBears" data-id="${i}"> <p class="add-oursons-logo">+</p> </a> <p class="add-oursons-logo">/</p> <a href="#" class="deleteBears" data-id="${i}"> <p class="add-oursons-logo">-</p> </a></div></td>
        <td >${products.quantity * products.price / 100} €</td>
        <td><a href="#" class="deleteLineBears" data-id="${i}"> <i class="fas fa-trash-alt"></i></a></td>
    </tr>
    `
    //Appel de la fonction

    priceTotalcart(products);

    // Boucle increment ID produit

    for (let i = 0; i < products.quantity; i++) {
        addIdBasket.push(products._id);
    }
});

// Ajoute 1 produit du panier

function addBears(id) {
    const products = pickCart[id];
    if (products.quantity >= 1) {
        products.quantity++;
    } else {
        products.splice(id, 1);
    }
    localStorage.setItem('cart', JSON.stringify(pickCart));
    window.location.reload()
};

document.querySelectorAll('.addBears').forEach(delBtn => {
    delBtn.addEventListener('click', () => addBears(delBtn.dataset.id))
});

// Enlever 1 produit du panier

function deleteBears(id) {
    const products = pickCart[id];
    if (products.quantity > 1) {
        products.quantity--;
    } else {
        products.splice(id, 1);
    }
    localStorage.setItem('cart', JSON.stringify(pickCart));
    window.location.reload()
};

document.querySelectorAll('.deleteBears').forEach(delBtn => {
    delBtn.addEventListener('click', () => deleteBears(delBtn.dataset.id))
});

// Supprime 1 produit du panier

function deleteLineBears(e, pickCart) {
    const index = e.target.classList[1].slice(-1);
    pickCart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(pickCart));

    if (pickCart.length === 0) {
        localStorage.removeItem('cart');
    }
    window.location.reload()
}

document.querySelectorAll(".deleteLineBears").forEach((btn) => {
    btn.addEventListener('click', e => { deleteLineBears(e, pickCart) });
});


//Fonction supprime tout le panier

const emptyCart = document.getElementById('emptyCart')
emptyCart.addEventListener('click', deleteBasket);


function deleteBasket() {
    if (pickCart === null) {
        return
    } else {
        container.remove();
        localStorage.clear();
        window.location.reload();
    }
};

//// Gestion du formulaire ////

function sendOrder() {
    const form = document.getElementById("form");
    if (form.reportValidity() === true && addIdBasket.length > 0) {
        const contact = {
            'firstName': document.getElementById("nom").value,
            'lastName': document.getElementById("prenom").value,
            'address': document.getElementById("adresse").value,
            'city': document.getElementById("ville").value,
            'email': document.getElementById("email").value
        };

        const products = addIdBasket;

        const custommerForm = JSON.stringify({
            contact,
            products,
        });

        // Appel API avec FETCH // Envoie des données avec POST 
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            mode: "cors",
            body: custommerForm
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (r) {
                localStorage.setItem("contact", JSON.stringify(r.contact));
                window.location.assign("confirmation.html?orderId=" + r.orderId);
            })
            //Si probleme API
            .catch(function (err) {
                console.log("fetch Error");
            });
    }
    else {
        alert(" Une erreur est survenue votre panier est  peux étre vide ou le formulaire n'a pas été correctement rempli!")
    };
}

const sendForm = document.getElementById("sendForm");

sendForm.addEventListener('click', function (event) {
    event.preventDefault();
    sendOrder();
});