// Example of dynamically filling order details
document.addEventListener("DOMContentLoaded", () => {
    const orderNumber = "#12345";
    const item = "Elegant High-Heel Shoes";
    const size = "7";
    const price = "$120.00";
    const address = "123 Fashion Street, Style City";

    document.querySelector(".order-details").innerHTML = `
        <h2>Order Summary</h2>
        <p><strong>Order Number:</strong> ${orderNumber}</p>
        <p><strong>Item:</strong> ${item}</p>
        <p><strong>Size:</strong> ${size}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Shipping Address:</strong> ${address}</p>
    `;
});
