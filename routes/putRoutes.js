import { Router } from "express";
import { Animal } from "../models/Animal.js";
import { checkIsValid } from "../utils/checkIsValid.js";

export const router = Router();

router.put("/put/:id", checkIsValid, async (req, res, next) => {
  try {
    const { id } = req.params;
    const originalAnimal = await Animal.findById(id).lean();
    const newAnimal = req.body;
    let fieldToUnset = {};
    Object.keys(originalAnimal).forEach((key) => {
      if (
        !newAnimal.hasOwnProperty(key) &&
        key !== "_id" &&
        key !== "updatedAt" &&
        key !== "createdAt"
      ) {
        fieldToUnset[key] = "";
      }
    });
    const updatedAnimal = await Animal.findByIdAndUpdate(
      id,
      {
        $set: newAnimal,
        $unset: fieldToUnset,
      },
      { new: true, runValidators: true }
    );

    if (!updatedAnimal) {
      return res.status(404).json({ message: "Animal not found" });
    }
    res.status(200).json(updatedAnimal);
  } catch (e) {
    next(e);
  }
});

router.put("/remove-version-key", async (req, res, next) => {
  try {
    const animals = await Animal.find(); 
    const operations = animals.map((animal) => ({
      updateOne: {
        filter: { _id: animal._id },
        update: { $unset: { __v: "" } }
      }
    }));

    const result = await Animal.bulkWrite(operations); 

    res.status(200).json({
      message: `${result.modifiedCount} documents updated.`,
    });
  } catch (e) {
    next(e);
  }
});
