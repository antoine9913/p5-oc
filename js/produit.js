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

    const addLocalStorage = cart => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    //-------------------inclus HTML---------------------------------------

    const contentProduct = bears => {
        container.innerHTML += `
        <div id="cardsProduct" class="oursons">
                <img src="${bears.imageUrl}" alt="" />
                <div class="description">
                    <h3>${bears.name}</h3>
                    <p>${bears.description}</p>
                    <select class="color" id="colors">
                    </select>
                    <p class="prix"> Prix Unitaire : ${bears.price / 100}€</p>
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
                    <button type="submit" id="cart" value="submit"> Ajouter au panier </button>
                    <a/>
                    </div>
        </div> `;

        //----------------------Options-----------------------

        for (const colors of bears.colors) {
            document.getElementById('colors').innerHTML +=
                `<option value="1">${colors}</option>`
        }

        //------------------ecoute l'evenement au click---------------

        document.getElementById('cart').addEventListener('click', function () {
            addProductCart(bears)
            window.location.reload()
        });
    };

    //------------------------------------Ajouter au panier-------------------------------
    const addProductCart = bears => {
        bears.quantity = parseInt(document.getElementById('quantity').value);

        //------------------------recuperation du panier-------------------------------
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

        //-----------------------parcourir le panier-------------------------------
        let bearsExistInCart = false;
        for (let i = 0; i < cart.length; i++) {
            let product = cart[i];
            //--------------------------------si un produit existe--------------------------------
            if (product._id === bears._id) {
                bearsExistInCart = i;
            }
        };
        //--------------------------oursons existe dans le panier---------------------------------
        if (false !== bearsExistInCart) {
            cart[bearsExistInCart].quantity = parseInt(cart[bearsExistInCart].quantity) + bears.quantity;
        } else {
            cart.push(bears);
        };
        addLocalStorage(cart);
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