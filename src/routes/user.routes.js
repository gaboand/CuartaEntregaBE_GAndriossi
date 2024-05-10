import express from "express";
import { getAllUsers, deleteInactiveUsers, changeRole, deleteUser } from "../controllers/user.controller.js";
import { uploadUserDocuments, handlePostUpload } from "../middlewares/multerConfig.js";
import authAdmin from "../middlewares/authAdmin.js";
import authUserOrPremium from "../middlewares/authUserOrPremium.js";

const usersRouter = express.Router();

usersRouter.put("/premium/:uid", authAdmin, changeRole );
usersRouter.post('/:uid/documents', authUserOrPremium, uploadUserDocuments, handlePostUpload);
usersRouter.get("/", authAdmin, getAllUsers);
usersRouter.delete("/", authAdmin, deleteInactiveUsers);
usersRouter.delete("/:uid", authAdmin, deleteUser);

export default usersRouter;