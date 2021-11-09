const allProducts = document.getElementById("allproducts");

const contentProduct = oursons => {
    allproducts.innerHTML += `
    <article id="cardsProducts" class="product">
        <a href="html/produit.html?id=${oursons._id}">
            <img src="${oursons.imageUrl}" alt="photos produits" />
            <div class="descriptionBloc">
                <h3> ${oursons.name}</h3>
                <p>${oursons.price / 100}€</p>
            </div>
            <p>${oursons.description}</p>
        </a>
    </article> `
};

fetch("http://localhost:3000/api/teddies")
    .then(Response => Response.json())
    .then(function (productList) {
        for (let product of productList) {
            contentProduct(product);
        }
    })

    .catch(function (err) {
        console.log("Fetch Error")
        alert("Veuillez nous excuser les produits ne sont pas disponible pour le moment")
    });