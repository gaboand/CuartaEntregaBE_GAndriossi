import express from "express";
import { saveCart, getCarts, getCartDetails, addProduct, deleteProduct, empty, deleteCart, updateQuantity, findById} from "../controllers/cart.controller.js";
import authUser from "../middlewares/authUser.js";
import authUserOrPremium from "../middlewares/authUserOrPremium.js";

const cartsRouter = express.Router();

cartsRouter.post("/", saveCart);
cartsRouter.get("/:cid", getCartDetails);
cartsRouter.get("/:cartId", findById);
cartsRouter.get("/", getCarts);
cartsRouter.post("/:cid/product", authUserOrPremium, addProduct);
cartsRouter.delete("/:cid/product/:productEntryId", authUserOrPremium, deleteProduct);
cartsRouter.delete("/:cid/empty", authUserOrPremium, empty);
cartsRouter.delete("/:cid", deleteCart)
cartsRouter.put("/:cid/product/:productId/quantity", authUserOrPremium, updateQuantity);

export default cartsRouter;

