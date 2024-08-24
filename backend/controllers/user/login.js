const bcrypt = require("bcryptjs");
const User = require("../../models/user.js");
const {generateToken} = require("./accessToken.js");

const login = async (role, userData) => {
  const {email, password} = userData;

  try {
    // Check if the user exists
    const existingUser = await User.findOne({email: email.toLowerCase()});
    if (!existingUser) {
      throw new Error("User does not exist");
    }

    // Check if the user is has appropriate role
    if (role !== existingUser.role) {
      throw new Error(`You can't login as ${role}`);
    }

    // Compare the provided password with the stored hash
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    if (!existingUser.isActive) {
      throw new Error("Your account has been suspended", existingUser.remarks);
    }

    // Generate JWT token with the payload
    const token = generateToken({
      id: existingUser._id,
      role: existingUser.role,
      profileImageUrl: existingUser.profileImageUrl,
      email: existingUser.email,
      fullName: existingUser.fullName,
      proExpiry: existingUser.proExpiry,
      balance: existingUser.balance,
    });

    // Return user data and token
    return {
      message: `${role} logged in successfully`,
      token,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = login;
