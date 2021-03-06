// Affichage HTML
function display() {
    //Récuperation des données de L URL
    const paramsUrl = new URL(window.location).searchParams;

    const orderId = paramsUrl.get("orderId");

    //Récupération des données contact
    const contact = JSON.parse(localStorage.getItem("contact"));

    // Récupération du prix total
    const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));

    const confirm = document.getElementById("confirm");

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