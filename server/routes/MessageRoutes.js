import multer from 'multer';
import { Router } from "express";
import { addMessage, getMessages, addImageMessage } from "../controllers/MessageController.js";

const router = Router();
const uploadImage = multer({ dest: "uploads/images"});

router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessages);
router.post("/add-image-message", uploadImage.single("image"), addImageMessage);

export default router;
