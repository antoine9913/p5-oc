const allProducts = document.getElementById("allproducts");

const contentProduct = bears => {
    allproducts.innerHTML += `
    <article id="cardsProducts" class="product">
        <a href="html/produit.html?id=${bears._id}">
            <img src="${bears.imageUrl}" alt="photos produits" />
            <div class="descriptionBloc">
                <h3> ${bears.name}</h3>
                <p>${bears.price / 100}€</p>
            </div>
            <p>${bears.description}</p>
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

    .catch(function (error) {
        console.log("Fetch Error")
        alert("Veuillez nous excuser les produits ne sont pas disponible pour le moment")
    });