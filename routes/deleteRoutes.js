import { Router } from "express";
import { Animal } from "../models/Animal.js";
import { checkIsValid } from "../utils/checkIsValid.js";

export const router = Router();

router.delete("/delete/:id", checkIsValid, async (req, res, next) => {
  try {
    const { id } = req.params;
    const animalToDelete = await Animal.findByIdAndUpdate(
      id,
      { deletedAt: new Date() },
      { new: true, runValidators: true }
    );
    if (!animalToDelete) {
      return res
        .status(404)
        .json({ message: "Animal with the provided Id is not found" });
    }
    res.status(200).json({ message: `Animal deleted: ${animalToDelete}` });
  } catch (e) {
    next(e);
  }
});
