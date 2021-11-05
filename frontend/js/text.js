function addOursonsCart(oursons) {

    // variable tableaux
    let cartOursons = []

    // stockage dans un objet
    let saveOursonsCart = {
        id: oursons.id,
        imageUrl: oursons.imageUrl,
        name: oursons.name,
        price: oursons.price,
        quantity: oursons.quantity,
        colors: oursons.colors
    }
    let otherOursons = true;
    // Si sessionStorage est vide elle crée un nouveau tableau cartItem et l'enregistre dans le sessionStorage
    if (sessionStorage.getItem('panier') === null) {
        cartOursons.push(saveOursonsCart);
        sessionStorage.setItem('panier', JSON.stringify(cartOursons));
    }
    // Sinon elle récupère le tableau du sessionStorage, ajoute le nouveau produit, et enregistre le nouveau tableau.
    else {
        cartOursons = JSON.parse(sessionStorage.getItem('panier'));

        cartOursons.forEach((prod) => {
            if (oursons.id === prod.id && ourons.colors === prod.colors) {
                oursons.quantity++;
                otherOursons = false;
            }
        })
        if (otherOursons) cartOursons.push(saveOursonsCart);
        sessionStorage.setItem('panier', JSON.stringify(cartOursons));
    }
};