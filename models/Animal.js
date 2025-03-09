import { Schema, model } from "mongoose";

const animalSchema = new Schema({
  name: { type: String, required: true },
  desc: { type: String, required: false },
  hearts: { type: String, default: 0 },
  reserved: { type: Boolean, default: false },
  deletedAt: { type: Date, default: null },
}, {
  versionKey: false, timestamps: true
});

export const Animal = model("Animal", animalSchema);
