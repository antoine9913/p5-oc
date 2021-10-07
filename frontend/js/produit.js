window.onload = () => {
    const getIdFromUrl = () => {
        // Recuperer l'ID du produit dans l'URL
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const product_id = urlParams.get("id");
        return product_id;
    };

    let container = document.getElementById("containerProduct");

    const contentProduct = oursons => {
        container.innerHTML += `
    <div id="cardsPorduct" class="oursons">
            <img src="${oursons.imageUrl}" alt="" />
            <div class="description">
                <h3>${oursons.name}</h3>
                <p>${oursons.description}</p>
                <select class="options" id="option">
                    <option>Choix options<option>
                </select>
                <p class="prix"> Prix Unitaire : ${oursons.price / 100}€</p>
                <select class="quantite" id="quantity">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <a herf="../html/panier.html"><button type="submit" id="panier" value="submit"> Ajouter au panier </button></a>
            </div>
    </div> `
    };

    let product_id = getIdFromUrl();
    const getProductAttributeList = fetch(
        "http://localhost:3000/api/teddies/" + product_id,
        {
            method: "GET",
        }
    )
        .then((response) => {
            return response.json();
        })
        .then(function (product) {
            console.log(product)
            let oursons = new Oursons(product)
            contentProduct(oursons)
        })

        .catch(function (err) {
            console.log("Fetch Error")
            alert("Veuillez nous excuser le produit n'est pas disponible pour le moment")
        })
};