const express = require("express");
const router = express.Router();
const {getAllPayments, getPaymentByUserId} = require("../controllers/payment/getPayment");
const {makePayment} = require("../controllers/payment/makePayment");
const validateToken = require("../middlewares/validateToken");

router.use(validateToken);
// Route to get all payments
router.get("/get-all-payments", getAllPayments);

// Route to get payments by user ID
router.get("/get-payments-by-user-id/:userId", getPaymentByUserId);

// Route to create a new payment
router.post("/make-payment", makePayment);

module.exports = router;
