// Handle Add to Cart Form Submission
document.getElementById("addToCartForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get selected size and color
    const size = document.getElementById("size").value;
    const color = document.getElementById("color").value;

    // Validate selectionsif (!size || !color) {   alert("Please select both size and color!");     return;}
    
     
    // Show confirmation message
    const cartMessage = document.getElementById("cartMessage");
    cartMessage.textContent = `Added to cart: Elegant High-Heel Shoes (Size: ${size}, Color: ${color})`;

    // Clear form after adding to cart
    document.getElementById("addToCartForm").reset();
});
