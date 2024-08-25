const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const burrowSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returnedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Burrow = mongoose.model("Burrow", burrowSchema);
module.exports = Burrow;
