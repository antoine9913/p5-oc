

// AFFICHAGE HTML
function display() {
    //RECUPERATION DES DONNEES DE L URL
    let paramsUrl = new URL(window.location).searchParams;

    let orderId = paramsUrl.get("orderId");

    //RECUPERATION DES DONNEES CONTACT
    let contact = JSON.parse(localStorage.getItem("contact"));


    // RECUPERATION DU PRIX TOTAL
    let totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

    let confirm = document.getElementById("confirm");

    confirm.innerHTML += `
        <p>
        Merci  ${contact.firstName} ${contact.lastName} 
        </p>
        <hr>
        <p>Nous avons bien reçu votre commande N° ${orderId} </br>
        D'un montant de :${totalPrice}  </br>
        </p>
        Un email vous sera envoyer à l'adresse : </br> ${contact.email} a l'envoi de votre commande  
    `
};
display();