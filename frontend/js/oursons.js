class Oursons {
    constructor({
        name,
        imageUrl,
        price,
        _id,
        description,
        color,
        quantity
    }) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.price = price;
        this.id = _id;
        this.description = description;
        this.color = color;
        this.quantity = parseInt(quantity, 10);
    }
};