const { Getusermodal } = require("../modals/UserModal");
const usermodal = Getusermodal();
const dotenv = require("dotenv");
// No need to import bcrypt since we are not using it

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

    // Create new user data with the plaintext password
    const userData = { ...req.body, password: password };

    // Create new user document
    const doc = new usermodal(userData);

    // Save user document to the database
    const retdoc = await doc.save();
    resp.json({ status: true, result: retdoc });
  } catch (error) {
    console.error(error); // Log the error for debugging
    resp.json({ status: false, msg: "Already have an Account, Login there" });
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

    // Compare entered password with the stored plaintext password
    // Note: No comparison needed if passwords are stored in plaintext
    const isPasswordValid = req.body.password === retdoc.password;

    if (isPasswordValid) {
      // Optionally return user type or other necessary details (excluding sensitive info)
      resp.json({ status: true, usertype: retdoc.usertype, msg: "Login successful" });
    } else {
      resp.json({ status: false, msg: "Password Incorrect" });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    resp.json({ status: false, msg: "Error occurred during login" });
  }
}

module.exports = { Signup, Login };
