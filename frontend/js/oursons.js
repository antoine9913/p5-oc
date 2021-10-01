class Oursons {
    constructor({
        name,
        _id,
        imageUrl,
        price,
        description,
        color,
        quantity
    }) {
        this.name = name;
        this.id = _id;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
        this.color = color;
        this.quantity = parseInt(quantity, 10);
    }
};