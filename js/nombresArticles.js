numberOfArticleInCart()

function numberOfArticleInCart() {
    div = document.querySelector(".number-cart")
    let number = 0;

    if (localStorage.getItem("cart") !== null) {
        let keyNumber = JSON.parse(localStorage.getItem("cart"));

        keyNumber.forEach((products) => {
            number = number + products.quantity;
        });
    }
    div.textContent = number;
};