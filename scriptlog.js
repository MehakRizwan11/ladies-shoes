// Generate CAPTCHA when the page loads
document.addEventListener("DOMContentLoaded", () => {
    generateCaptcha("captcha");
    generateCaptcha("captcha-signup");
  });
  
  // Function to switch between Login and Sign Up forms
  function switchForm(form) {
    const loginForm = document.getElementById("login");
    const signupForm = document.getElementById("signup");
  
    if (form === "login") {
      loginForm.style.display = "block";
      signupForm.style.display = "none";
      generateCaptcha("captcha"); // Reset CAPTCHA for login
    } else {
      loginForm.style.display = "none";
      signupForm.style.display = "block";
      generateCaptcha("captcha-signup"); // Reset CAPTCHA for sign-up
    }
  }
  
  // Generate CAPTCHA
  function generateCaptcha(elementId) {
    const randomNumber = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit number
    document.getElementById(elementId).textContent = randomNumber;
  }
  
  // Validate CAPTCHA
  function validateCaptcha(form) {
    const captchaValue = form === "login" 
      ? document.getElementById("captcha").textContent 
      : document.getElementById("captcha-signup").textContent;
  
    const inputCaptcha = form === "login" 
      ? document.getElementById("login-captcha").value 
      : document.getElementById("signup-captcha").value;
  
    if (captchaValue === inputCaptcha) {
      alert(`${form === "login" ? "Login" : "Sign Up"} Successful!`);
    } else {
      alert("Invalid CAPTCHA. Please try again.");
      generateCaptcha(form === "login" ? "captcha" : "captcha-signup");
    }
  }
  const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Dummy CAPTCHA logic for validation
function validateCaptcha(input, captcha) {
    return input === captcha;
}

// Sign-Up Route
router.post('/signup', async (req, res) => {
    const { name, email, password, captchaInput, captchaServer } = req.body;

    if (!validateCaptcha(captchaInput, captchaServer)) {
        return res.status(400).json({ message: 'Invalid CAPTCHA' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already in use' });

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password, captchaInput, captchaServer } = req.body;

    if (!validateCaptcha(captchaInput, captchaServer)) {
        return res.status(400).json({ message: 'Invalid CAPTCHA' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
