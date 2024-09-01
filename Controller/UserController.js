const { Getusermodal } = require("../modals/UserModal");
const usermodal = Getusermodal();
const dotenv = require("dotenv");
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

dotenv.config(); // Load environment variables

// Function to handle user signup
async function Signup(req, resp) {
  resp.set("json");
  try {
    // Ensure that req.body.password is defined
    const password = req.body.password;

    if (!password) {
      return resp.json({ status: false, msg: "Password is required" });
    }

    // Hash the password before saving (salt rounds: 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user data with the hashed password
    const userData = { ...req.body, password: hashedPassword };

    // Create new user document
    const doc = new usermodal(userData);

    // Save user document to the database
    const retdoc = await doc.save();
    resp.json({ status: true, result: retdoc });
  } catch (error) {
    console.error("Signup Error:", error); // Log the error for debugging
    resp.json({ status: false, msg: "Error occurred during signup" });
  }
}

// Function to handle user login
async function Login(req, resp) {
  resp.set("json");
  try {
    // Find user by email
    const retdoc = await usermodal.findOne({ email: req.body.email });

    if (!retdoc) {
      resp.json({ status: false, msg: "Email not registered" });
      return;
    }

    // Compare entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(req.body.password, retdoc.password);

    if (isPasswordValid) {
      // Optionally return user type or other necessary details (excluding sensitive info)
      resp.json({ status: true, usertype: retdoc.usertype, msg: "Login successful" });
    } else {
      resp.json({ status: false, msg: "Password Incorrect" });
    }
  } catch (error) {
    console.error("Login Error:", error); // Log the error for debugging
    resp.json({ status: false, msg: "Error occurred during login" });
  }
}

module.exports = { Signup, Login };
