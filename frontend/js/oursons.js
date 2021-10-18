class Oursons {
    constructor({
        name,
        _id,
        imageUrl,
        price,
        description,
        colors,
        quantity
    }) {
        this.name = name;
        this.id = _id;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.colors = colors;
        this.quantity = parseInt(quantity, 10);
    }
};