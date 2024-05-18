import express from "express";
import { saveCart, getCarts, getCartDetails, addProduct, deleteProduct, empty, deleteCart, updateQuantity, findById} from "../controllers/cart.controller.js";
import authUser from "../middlewares/authUser.js";
import authUserorAdmin from "../middlewares/authUserorAdmin.js";

const cartsRouter = express.Router();

cartsRouter.post("/", saveCart);
cartsRouter.get("/:cid", getCartDetails);
cartsRouter.get("/:cartId", findById);
cartsRouter.get("/", getCarts);
cartsRouter.post("/:cid/product", authUserorAdmin, addProduct);
cartsRouter.delete("/:cid/product/:productEntryId", authUserorAdmin, deleteProduct);
cartsRouter.delete("/:cid/empty", authUserorAdmin, empty);
cartsRouter.delete("/:cid", deleteCart)
cartsRouter.put("/:cid/product/:productId/quantity", authUserorAdmin, updateQuantity);

export default cartsRouter;

