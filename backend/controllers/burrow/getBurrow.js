const Burrow = require("../../models/burrow");

const getAllBurrows = async (req, res) => {
  try {
    const burrows = await Burrow.find()
      .populate("userId", "fullName")
      .populate("bookId", "title coverImageUrl");

    if (!burrows.length) {
      return res.status(404).json({message: "No burrow records found"});
    }

    // Sort burrows: Not returned first, then sort by dueDate (older first)
    const sortedBurrows = burrows
      .map((burrow) => ({
        burrowId: burrow._id,
        userId: burrow.userId._id,
        userName: burrow.userId.fullName,
        bookId: burrow.bookId._id,
        bookTitle: burrow.bookId.title,
        coverImage: burrow.bookId.coverImageUrl,
        dueDate: burrow.dueDate,
        returnedAt: burrow.returnedAt,
        createdAt: burrow.createdAt,
        updatedAt: burrow.updatedAt,
      }))
      .sort((a, b) => {
        // Prioritize burrows that are not returned
        if (a.returnedAt === null && b.returnedAt !== null) return -1;
        if (a.returnedAt !== null && b.returnedAt === null) return 1;

        // Sort by dueDate (older burrows first)
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

    res.status(200).json(sortedBurrows);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

const getBurrowByUserId = async (req, res) => {
  const {userId} = req.user;

  try {
    const burrows = await Burrow.find({userId}).populate("bookId", "title coverImageUrl");

    if (!burrows.length) {
      return res.status(404).json({message: "No burrow records found for this user"});
    }

    // Sort burrows: Not returned first, then sort by dueDate (older first)
    const sortedBurrows = burrows
      .map((burrow) => ({
        burrowId: burrow._id,
        userId: burrow.userId._id,
        bookId: burrow.bookId._id,
        bookTitle: burrow.bookId.title,
        coverImage: burrow.bookId.coverImageUrl,
        dueDate: burrow.dueDate,
        returnedAt: burrow.returnedAt,
        createdAt: burrow.createdAt,
        updatedAt: burrow.updatedAt,
      }))
      .sort((a, b) => {
        // Prioritize burrows that are not returned
        if (a.returnedAt === null && b.returnedAt !== null) return -1;
        if (a.returnedAt !== null && b.returnedAt === null) return 1;

        // Sort by dueDate (older burrows first)
        return new Date(a.dueDate) - new Date(b.dueDate);
      });

    res.status(200).json(sortedBurrows);
  } catch (error) {
    res.status(500).json({message: "Server error", error: error.message});
  }
};

module.exports = {getAllBurrows, getBurrowByUserId};
