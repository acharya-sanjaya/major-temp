const express = require("express");
const registerUser = require("../controllers/user/register.js");
const loginUser = require("../controllers/user/login.js");
const changeProfileImage = require("../controllers/user/changeProfileImage.js");
const configureUploadMiddleware = require("../middlewares/fileUpload.js");
const validateToken = require("../middlewares/validateToken");
const changePassword = require("../controllers/user/changePassword.js");
const {addMembership, removeMembership} = require("../controllers/user/changeMembership.js");
const {suspendUser, removeSuspension} = require("../controllers/user/suspension.js");
const changeFullName = require("../controllers/user/changeFullName.js");
const addBalance = require("../controllers/user/addBalance.js");
const {getAllUsers, getUserById, getUserByRole} = require("../controllers/user/getUser.js");

const router = express.Router();

// Configure the upload middleware for profile images
const uploadProfileImage = configureUploadMiddleware({
  fileFields: [{name: "profileImage", maxCount: 1}],
  destinationPaths: {
    profileImage: "uploads/profile-image/",
  },
  allowedTypes: {
    profileImage: ["image/jpeg", "image/png", "image/gif"],
  },
  maxSizes: {
    profileImage: 5 * 1024 * 1024,
  },
});

const registerWithRole = (role) => async (req, res) => {
  try {
    const profileImage =
      req.files && req.files.profileImage ? req.files.profileImage[0].path : null;
    const {email, password, fullName} = req.body;
    const result = await registerUser(role, {email, password, fullName, profileImage});
    res.status(201).json(result);
  } catch (error) {
    console.error(`Error registering ${role}:\n`, error);
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const loginWithRole = (role) => async (req, res) => {
  try {
    const {email, password} = req.body;
    const result = await loginUser(role, {email, password});
    res.status(201).json(result);
  } catch (error) {
    console.error(`Error logging in ${role}:\n`, error);
    res.status(500).json({message: "Server error", error: error.message});
  }
};

// Register
router.post("/register-admin", uploadProfileImage, registerWithRole("admin"));
router.post("/register-author", uploadProfileImage, registerWithRole("author"));
router.post("/register-reader", uploadProfileImage, registerWithRole("reader"));

// Login
router.post("/login-admin", loginWithRole("admin"));
router.post("/login-author", loginWithRole("author"));
router.post("/login-reader", loginWithRole("reader"));

// Get user
router.get("/get-all-users", getAllUsers);
router.get("/get-user-by-id/:userId", getUserById);
router.get("/get-user-by-role/:role", getUserByRole);

// Update user profile
router.patch("/change-fullname", validateToken, changeFullName);
router.patch("/change-password", validateToken, changePassword);
router.patch("/change-profile-image", validateToken, uploadProfileImage, changeProfileImage);

router.patch("/add-membership", validateToken, addMembership);
router.patch("/remove-membership", validateToken, removeMembership);

// Suspension
router.patch("/suspend-user/:userId", validateToken, suspendUser);
router.patch("/remove-suspension/:userId", validateToken, removeSuspension);

// Balance
router.patch("/add-balance", validateToken, addBalance);

module.exports = router;
