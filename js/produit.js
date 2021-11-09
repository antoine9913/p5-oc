window.onload = () => {

    //-------------- Récuperation de l'url et stockage ----------------

    const getIdFromUrl = () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const product_id = urlParams.get("id");
        return product_id;
    };
    const product_id = getIdFromUrl();

    //-------------------Emplacement HTML--------------------------------

    const container = document.getElementById("containerProduct");

    //-------------------fonction d'envoie au local storage-----------------

    const addLocalStorage = panier => {
        localStorage.setItem('panier', JSON.stringify(panier));
    };

    //-------------------inclus HTML---------------------------------------

    const contentProduct = oursons => {
        container.innerHTML += `
        <div id="cardsProduct" class="oursons">
                <img src="${oursons.imageUrl}" alt="" />
                <div class="description">
                    <h3>${oursons.name}</h3>
                    <p>${oursons.description}</p>
                    <select class="color" id="colors">
                    </select>
                    <p class="prix"> Prix Unitaire : ${oursons.price / 100}€</p>
                    <select class="quantite" id="quantity">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <a href="panier.html">
                    <button type="submit" id="panier" value="submit"> Ajouter au panier </button>
                    <a/>
                    </div>
        </div> `;

        //----------------------Options-----------------------

        for (const colors of oursons.colors) {
            document.getElementById('colors').innerHTML +=
                `<option value="1">${colors}</option>`
        }

        //------------------ecoute l'evenement au click---------------

        document.getElementById('panier').addEventListener('click', function () {
            addProductPanier(oursons)
            window.location.reload()
        });
    };

    //------------------------------------Ajouter au panier-------------------------------
    const addProductPanier = oursons => {
        oursons.quantity = parseInt(document.getElementById('quantity').value);

        //------------------------recuperation du panier-------------------------------
        const panier = localStorage.getItem('panier') ? JSON.parse(localStorage.getItem('panier')) : [];

        //-----------------------parcourir le panier-------------------------------
        let oursonsExistInCart = false;
        for (let i = 0; i < panier.length; i++) {
            let product = panier[i];
            //--------------------------------si un produit existe--------------------------------
            if (product._id === oursons._id) {
                oursonsExistInCart = i;
            }
        };
        //--------------------------oursons existe dans le panier---------------------------------
        if (false !== oursonsExistInCart) {
            panier[oursonsExistInCart].quantity = parseInt(panier[oursonsExistInCart].quantity) + oursons.quantity;
        } else {
            panier.push(oursons);
        };
        addLocalStorage(panier);
    };

    fetch("http://localhost:3000/api/teddies/" + product_id,
        {
            method: "GET",
        }
    )
        .then((response) => {
            return response.json();
        })
        .then(function (product) {
            contentProduct(product);
        })

        .catch(function (err) {
            console.log("Fetch Error")
            alert("Veuillez nous excuser le produit n'est pas disponible pour le moment")
        })
};