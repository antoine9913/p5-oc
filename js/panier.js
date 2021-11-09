//// GESTION DU PANIER////

//RECUPERATION DU PANIER DANS LE LOCAL STORAGE 
const ourson = JSON.parse(localStorage.getItem('panier')) ? JSON.parse(localStorage.getItem("panier")) : [];

//EMPLACEMENT DU HTML
const container = document.getElementById("containerCartBody");

// INITIALISE LE PRIX TOTAL DU PANIER A 0
let prixPanier = 0;

//RECUPERATION ID PRODUIT
let addIdBasket = [];

//FONCTION CALCUL PRIX TOTAL DU PANIER ET ENVOIE AU LOCAL STORAGE

function priceTotalcart(oursons) {
    prixPanier += oursons.quantity * oursons.price / 100;
    //AFFICHE PRIX TOTAL DU PANIER // ENVOI AU LOCALSTORAGE
    let prixTotal = document.getElementById('prixTotal').textContent = prixPanier + "€";
    localStorage.setItem('prixTotal', JSON.stringify(prixTotal));
};

//BOUCLE SUR LE PANIER

ourson.forEach((oursons, i) => {
    container.innerHTML += `
    <tr>
        <td class="srcimage"><img src="${oursons.imageUrl}" alt="" /></td>
        <td>${oursons.name}</td>
        <td>${oursons.price / 100} €</td>
        <td>${oursons.quantity}</td>
        <td><div class="add-and-remove"><a href="#" class="addOursons" data-id="${i}"> <p class="add-oursons-logo">+</p> </a> <p class="add-oursons-logo">/</p> <a href="#" class="deleteOursons" data-id="${i}"> <p class="add-oursons-logo">-</p> </a></div></td>
        <td >${oursons.quantity * oursons.price / 100} €</td>
        <td><a href="#" class="deleteLineOursons" data-id="${i}"> <i class="fas fa-trash-alt"></i></a></td>
    </tr>
    `
    //APPEL FONCTION

    priceTotalcart(oursons);

    // BOUCLE INCREMENT ID PRODUIT

    for (let i = 0; i < oursons.quantity; i++) {
        addIdBasket.push(oursons._id);
    }
});

// AJOUTER 1 PRODUIT DU PANIER

function addOursons(id) {
    let oursons = ourson[id];
    if (oursons.quantity >= 1) {
        oursons.quantity++;
    } else {
        oursons.splice(id, 1);
    }
    localStorage.setItem('panier', JSON.stringify(ourson));
    window.location.reload()
};

document.querySelectorAll('.addOursons').forEach(delBtn => {
    delBtn.addEventListener('click', () => addOursons(delBtn.dataset.id))
});

// ENLEVER 1 PRODUIT DU PANIER

function deleteOursons(id) {
    let oursons = ourson[id];
    if (oursons.quantity > 1) {
        oursons.quantity--;
    } else {
        oursons.splice(id, 1);
    }
    localStorage.setItem('panier', JSON.stringify(ourson));
    window.location.reload()
};

document.querySelectorAll('.deleteOursons').forEach(delBtn => {
    delBtn.addEventListener('click', () => deleteOursons(delBtn.dataset.id))
});

// SUPPRIMER 1 PRODUIT DU PANIER

function deleteLineOursons(e, ourson) {
    let index = e.target.classList[1].slice(-1);
    ourson.splice(index, 1);
    localStorage.setItem('panier', JSON.stringify(ourson));

    if (ourson.length === 0) {
        localStorage.removeItem('panier');
    }
    window.location.reload()
}

document.querySelectorAll(".deleteLineOursons").forEach((btn) => {
    btn.addEventListener('click', e => { deleteLineOursons(e, ourson) });
});


//FONCTION SUPPRIME TOUT LE PANIER

let viderPanier = document.getElementById('viderPanier')
viderPanier.addEventListener('click', deleteBasket);


function deleteBasket() {
    if (ourson == null) {
    } else {
        container.remove();
        localStorage.clear();
        window.location.reload();
    }
};

//// GESTION DU FORMULAIRE ////

function sendOrder() {
    let form = document.getElementById("form");
    if (form.reportValidity() === true && addIdBasket.length > 0) {
        let contact = {
            'firstName': document.getElementById("nom").value,
            'lastName': document.getElementById("prenom").value,
            'address': document.getElementById("adresse").value,
            'city': document.getElementById("ville").value,
            'email': document.getElementById("email").value
        };

        let products = addIdBasket;

        let formulaireClient = JSON.stringify({
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
            body: formulaireClient
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

let envoiFormulaire = document.getElementById("envoiFormulaire");

envoiFormulaire.addEventListener('click', function (event) {
    event.preventDefault();
    sendOrder();
});