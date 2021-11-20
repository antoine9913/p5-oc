const allProducts = document.getElementById("allproducts");

const contentProduct = products => {
    allproducts.innerHTML += `
    <article id="cardsProducts" class="product">
        <a href="html/product.html?id=${products._id}">
            <img src="${products.imageUrl}" alt="photos produits" />
            <div class="descriptionBloc">
                <h3> ${products.name}</h3>
                <p>${products.price / 100}€</p>
            </div>
            <p>${products.description}</p>
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
        console.error("Fetch Error")
        alert("Veuillez nous excuser les produits ne sont pas disponible pour le moment")
    });