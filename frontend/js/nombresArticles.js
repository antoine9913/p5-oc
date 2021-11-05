numberOfArticleInCart()

function numberOfArticleInCart() {
    div = document.querySelector(".number-cart")
    let number = 0;

    if (localStorage.getItem("panier") !== null) {
        let keyNumber = JSON.parse(localStorage.getItem("panier"));

        keyNumber.forEach((oursons) => {
            number = number + oursons.quantity;
        });
    }
    div.textContent = number;
};