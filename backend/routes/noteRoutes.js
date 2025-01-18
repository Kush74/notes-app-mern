const express = require("express");
const Note = require("../models/Note");
const mongoose = require("mongoose");
const authMiddleware = require("../lib/middlewares/auth-middleware");

const noteRouter = express.Router();

/** middleware to Validate ID */
const idValidator = (req, res, next) => {
  const { id } = req.params;
  // Id validation
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID format" });
  }
  next();
};

/**
 * get all notes
 */
noteRouter.get("/get-all", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const notes = await Note.find();
    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(400).send(error);
  }
});

/**
 * Create New Note
 */
noteRouter.post("/", async (req, res) => {
  // get title & description from body
  const { title, description } = req.body;
  console.log(title, description);

  if (!(title && description)) {
    res.status(400).send("Bad request");
  }

  try {
    const newNote = await Note.create({ title, description });
    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating Note", details: err.message });
  }
});

/**
 * Get a note
 */
noteRouter.get("/:id", idValidator, async (req, res) => {
  const { id } = req.params;

  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ note });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching note", details: err.message });
  }
});

/**
 * Update Note
 */
noteRouter.put("/:id", idValidator, async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  // Params Validation, i.e., not empty
  if (!(title && description)) {
    return res.status(400).json({ message: "Invalid Note Params" });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res
      .status(200)
      .json({ message: "Note updated succesfully", note: updatedNote });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating note", details: err.message });
  }
});

/**
 * Delete a Note
 */
noteRouter.delete("/:id", idValidator, async (req, res) => {
  const { id } = req.params;

  try {
    // get deleted note from ID
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res
      .status(200)
      .json({ message: "Note deleted successfully", note: deletedNote });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting note", details: err.message });
  }
});

module.exports = noteRouter;
