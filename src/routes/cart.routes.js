import express from "express";
import { saveCart, getCarts, getCartDetails, addProduct, deleteProduct, empty, deleteCart, updateQuantity, findById} from "../controllers/cart.controller.js";
import authUser from "../middlewares/authUser.js";
import authUserOrAdmin from "../middlewares/authUserOrAdmin.js";

const cartsRouter = express.Router();

cartsRouter.post("/", saveCart);
cartsRouter.get("/:cid", getCartDetails);
cartsRouter.get("/:cartId", findById);
cartsRouter.get("/", getCarts);
cartsRouter.post("/:cid/product", authUserOrAdmin, addProduct);
cartsRouter.delete("/:cid/product/:productEntryId", authUserOrAdmin, deleteProduct);
cartsRouter.delete("/:cid/empty", authUserOrAdmin, empty);
cartsRouter.delete("/:cid", deleteCart)
cartsRouter.put("/:cid/product/:productId/quantity", authUserOrAdmin, updateQuantity);

export default cartsRouter;

