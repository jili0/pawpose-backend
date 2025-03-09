import { Router } from "express";
import { router as getRoutes } from "./getRoutes.js";
import { router as postRoutes } from "./postRoutes.js";
import { router as putRoutes } from "./putRoutes.js";
import { router as patchRoutes } from "./patchRoutes.js";
import { router as deleteRoutes } from "./deleteRoutes.js";

export const AppRouter = Router();

AppRouter.use("/admin", getRoutes);
AppRouter.use("/admin", postRoutes);
AppRouter.use("/admin", putRoutes);
AppRouter.use("/admin", patchRoutes);
AppRouter.use("/admin", deleteRoutes);

/*
/admin/
/admin/get/:id
/admin/get/
/admin/post/single
/admin/post/many
/admin/put/:id/
/admin/patch/:id
/admin/delete/:id
*/
