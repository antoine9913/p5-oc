//// GESTION DU PANIER////

//RECUPERATION DU PANIER DANS LE LOCAL STORAGE 
const pickCart = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem("cart")) : [];
//EMPLACEMENT DU HTML
const container = document.getElementById("containerCartBody");

// INITIALISE LE PRIX TOTAL DU PANIER A 0
let priceCart = 0;

//RECUPERATION ID PRODUIT
let addIdBasket = [];

//FONCTION CALCUL PRIX TOTAL DU PANIER ET ENVOIE AU LOCAL STORAGE

function priceTotalcart(bears) {
    priceCart += bears.quantity * bears.price / 100;
    //AFFICHE PRIX TOTAL DU PANIER // ENVOI AU LOCALSTORAGE
    const totalPrice = document.getElementById('totalPrice').textContent = priceCart + "€";
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
};

//BOUCLE SUR LE PANIER

pickCart.forEach((bears, i) => {
    container.innerHTML += `
    <tr>
        <td class="srcimage"><img src="${bears.imageUrl}" alt="" /></td>
        <td>${bears.name}</td>
        <td>${bears.price / 100} €</td>
        <td>${bears.quantity}</td>
        <td><div class="add-and-remove"><a href="#" class="addBears" data-id="${i}"> <p class="add-oursons-logo">+</p> </a> <p class="add-oursons-logo">/</p> <a href="#" class="deleteBears" data-id="${i}"> <p class="add-oursons-logo">-</p> </a></div></td>
        <td >${bears.quantity * bears.price / 100} €</td>
        <td><a href="#" class="deleteLineBears" data-id="${i}"> <i class="fas fa-trash-alt"></i></a></td>
    </tr>
    `
    //APPEL FONCTION

    priceTotalcart(bears);

    // BOUCLE INCREMENT ID PRODUIT

    for (let i = 0; i < bears.quantity; i++) {
        addIdBasket.push(bears._id);
    }
});

// AJOUTER 1 PRODUIT DU PANIER

function addBears(id) {
    const bears = pickCart[id];
    if (bears.quantity >= 1) {
        bears.quantity++;
    } else {
        bears.splice(id, 1);
    }
    localStorage.setItem('cart', JSON.stringify(pickCart));
    window.location.reload()
};

document.querySelectorAll('.addBears').forEach(delBtn => {
    delBtn.addEventListener('click', () => addBears(delBtn.dataset.id))
});

// ENLEVER 1 PRODUIT DU PANIER

function deleteBears(id) {
    const bears = pickCart[id];
    if (bears.quantity > 1) {
        bears.quantity--;
    } else {
        bears.splice(id, 1);
    }
    localStorage.setItem('cart', JSON.stringify(pickCart));
    window.location.reload()
};

document.querySelectorAll('.deleteBears').forEach(delBtn => {
    delBtn.addEventListener('click', () => deleteBears(delBtn.dataset.id))
});

// SUPPRIMER 1 PRODUIT DU PANIER

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


//FONCTION SUPPRIME TOUT LE PANIER

const emptyCart = document.getElementById('emptyCart')
emptyCart.addEventListener('click', deleteBasket);


function deleteBasket() {
    if (pickCart == null) {
    } else {
        container.remove();
        localStorage.clear();
        window.location.reload();
    }
};

//// GESTION DU FORMULAIRE ////

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

        const summonerForm = JSON.stringify({
            contact,
            products,
        });

        // APEL API AVEC FETCH // ENVOIE DES DONNEES AVEC POST 
        fetch('http://localhost:3000/api/teddies/order', {
            method: 'POST',
            headers: {
                'content-type': "application/json"
            },
            mode: "cors",
            body: summonerForm
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (r) {
                localStorage.setItem("contact", JSON.stringify(r.contact));
                window.location.assign("confirmation.html?orderId=" + r.orderId);
            })
            //SI PROBLEME API
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