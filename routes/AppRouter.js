import { Router } from "express";
import { router as getRoutes } from "./getRoutes.js";
import { router as postRoutes } from "./postRoutes.js";
import { router as putRoutes } from "./putRoutes.js";
import { router as patchRoutes } from "./patchRoutes.js";
import { router as deleteRoutes } from "./deleteRoutes.js";

export const AppRouter = Router();

AppRouter.use("/", getRoutes);
AppRouter.use("/", postRoutes);
AppRouter.use("/", putRoutes);
AppRouter.use("/", patchRoutes);
AppRouter.use("/", deleteRoutes);

/*
/
/get/:id
/get/
/post/single
/post/many
/put/:id/
/patch/:id
/delete/:id
*/
