import express from "express";
import changeRole from "../controllers/user.controller.js";
import { uploadUserDocuments, handlePostUpload } from "../middlewares/multerConfig.js";
import authAdmin from "../middlewares/authAdmin.js";
import authUserOrPremium from "../middlewares/authUserOrPremium.js";

const usersRouter = express.Router();

usersRouter.put("/premium/:uid", authAdmin, changeRole );
usersRouter.post('/:uid/documents', authUserOrPremium, uploadUserDocuments, handlePostUpload);


export default usersRouter;