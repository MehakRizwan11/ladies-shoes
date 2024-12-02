// Adding to cart functionality
document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".add-to-cart");
  
    buttons.forEach(button => {
      button.addEventListener("click", event => {
        const productId = button.dataset.productId;
        alert(`Product ID ${productId} added to cart!`);
        // Add additional cart handling logic here
      });
    });
  });
  const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const orderRoutes = require('./routes/order');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/shoesDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/orders', orderRoutes);

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    orderNumber: { type: String, required: true },
    item: { type: String, required: true },
    size: { type: String, required: true },
    price: { type: String, required: true },
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);

const express = require('express');
const Order = require('../models/Order');

const router = express.Router();

// Handle Order Submission
router.post('/', async (req, res) => {
    const { orderNumber, item, size, price, name, email, address, phone } = req.body;

    try {
        const newOrder = new Order({
            orderNumber,
            item,
            size,
            price,
            customerName: name,
            email,
            address,
            phone,
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order confirmed successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to process order', error: err.message });
    }
});

module.exports = router;

document.getElementById('orderForm').addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = {
      orderNumber: document.getElementById('orderNumber').value,
      item: document.getElementById('item').value,
      size: document.getElementById('size').value,
      price: document.getElementById('price').value,
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value,
      phone: document.getElementById('phone').value,
  };

  try {
      const response = await fetch('/api/orders', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
          alert(result.message);
          window.location.href = 'home3.html'; // Redirect to a success page
      } else {
          alert(result.message || 'Error confirming order');
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting the form');
  }
});
