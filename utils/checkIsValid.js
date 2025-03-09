import mongoose from "mongoose";

export const checkIsValid = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid MongoDB ObjectId" });
  }
  next();
};
