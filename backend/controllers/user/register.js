const bcrypt = require("bcryptjs");
const User = require("../../models/user.js");
const {hash} = bcrypt;

const register = async (role, userData) => {
  const {email, password, fullName, profileImage} = userData;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({email});
    if (existingUser) {
      throw new Error("User already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Create a new user document
    const newUser = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      fullName,
      role,
      profileImageUrl: profileImage,
    });

    // Save the newUser document to the database
    await newUser.save();

    return {message: `${role} registered successfully`};
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = register;
