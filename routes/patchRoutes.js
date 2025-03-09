import { Router } from "express";
import { Animal } from "../models/Animal.js";
import { checkIsValid } from "../utils/checkIsValid.js";

export const router = Router();

router.patch("/patch/:id", checkIsValid, async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedAnimal = await Animal.findByIdAndUpdate(
        id,
        req.body,
        { new: true, runValidators: true }
      )

    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.status(200).json(updatedAnimal);
  } catch (e) {
    next(e);
  }
});
