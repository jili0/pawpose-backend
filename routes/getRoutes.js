import { Router } from "express";
import { Animal } from "../models/Animal.js";
import { checkIsValid } from "../utils/checkIsValid.js";

export const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({ message: "welcome!" });
});

router.get("/get/:id", checkIsValid, async (req, res, next) => {
  try {
    const { id } = req.params;
    const animals = await Animal.findById(id);
    if (!animals) {
      return res.status(404).json({ message: "Animals not found" });
    }
    res.status(200).json(animals);
  } catch (e) {
    next(e);
  }
});

router.get("/get", async (req, res, next) => {
  try {
    let query;
    if (req.query.include === "deleted") {
      query = Animal.find({});
    } else {
      query = Animal.find({ deletedAt: null });
    }

    if (req.query.page) {
      const page = parseInt(req.query.page);
      query = query.skip((page - 1) * 10).limit(10);
    } else {
      query = query.limit(10);
    }

    const animals = await query.exec();

    if (!animals.length) {
      return res.status(404).json({ message: "Animals not found" });
    }
    res.status(200).json(animals);
  } catch (e) {
    next(e);
  }
});

router.get("/count", async (req, res, next) => {
  try {
    const animalsCount = await Animal.countDocuments({ deletedAt: null });

    if (!animalsCount) {
      return res.status(404).json({ message: "Animals not found" });
    }
    res.status(200).json(animalsCount);
  } catch (e) {
    next(e);
  }
});
