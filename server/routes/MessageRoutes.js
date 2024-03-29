import multer from 'multer';
import { Router } from "express";

import { 
  addMessage, 
  getMessages, 
  addImageMessage, 
  addAudioMessage,
  getInitialContactsWithMessages
} from "../controllers/MessageController.js";

const router = Router();
const uploadImage = multer({ dest: "uploads/images"});
const uploadAudio = multer({ dest: "uploads/recordings"});

router.post("/add-message", addMessage);
router.get("/get-messages/:from/:to", getMessages);
router.get("/get-initial-contacts/:from", getInitialContactsWithMessages);

router.post("/add-image-message", uploadImage.single("image"), addImageMessage);
router.post("/add-audio-message", uploadAudio.single("audio"), addAudioMessage);

export default router;
