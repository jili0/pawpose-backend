import { Router } from "express";
import { Animal } from "../models/Animal.js";

export const router = Router();

router.post("/post/single", async (req, res, next) => {
  try {
    const newAnimal = req.body;
    const createdAnimal = await Animal.create(newAnimal);
    if (!createdAnimal) {
      return res
        .status(500)
        .json({ message: "There is an error by creating new animal" });
    }
    res.status(201).json(createdAnimal);
  } catch (e) {
    next(e);
  }
});

router.post("/post/many", async (req, res, next) => {
  try {
    const newAnimals = req.body;
    const createdAnimals = await Animal.insertMany(newAnimals);
    if (!createdAnimals.length) {
      return res
        .status(500)
        .json({ message: "There is an error by creating new animals" });
    }
    res.status(201).json(createdAnimals);
  } catch (e) {
    next(e);
  }
});
