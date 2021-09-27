let allProducts = document.getElementById("allproducts");

const display = oursons => {
    allproducts.innerHTML += `
    <article id="cardsProducts" class="produit">
        <a href="frontend/produit.html?id=${oursons._id}">
            <img src="${oursons.imageUrl} alt="photos produits" />
            <div class="descriptionBloc">
                <h3> ${oursons.name}</h3>
                <p>${oursons.price}</p>
            </div>
            <p>${oursons.description}</p>
        </a> `
};

fetch("http://localhost:3000/api/teddies")
    .then(Response => Response.json())
    .then(function (productList) {
        for (let product of productList) {
            let oursons = new Oursons(product)
            display(oursons);
        }
    })

    .catch(function (err) {
        console.log("Fetch Error")
        alert("Veuillez nous excuser les produits ne sont pas disponible pour le moment")
    });