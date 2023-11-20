import { renameSync} from "fs";
import getPrismaInstance from "../utils/PrismaClient.js";

export const addMessage = async (req, res, next) => {
  try {
    const { message, from, to } = req.body;
    const getUser = onlineUsers.get(to);

    const prisma = getPrismaInstance();
    
    if(message && from && to) {

      const newMessage = await prisma.messages.create({ 
        data: { 
          message,
          sender: { connect: { id: parseInt(from) }}, 
          receiver: { connect: { id: parseInt(to) }},
          messageStatus: getUser ? "delivered" : "sent",
        },
        include: { sender: true, receiver: true },
      });

      return res.status(200).send({ message: newMessage, success: true });
    }

    return res.status(400).send({ msg: "From, To and Message is required!", success: false });
  } catch (err) {
    next(err);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();
    const { from, to } = req.params;

    const messages = await prisma.messages.findMany({ 
      where: {
        OR: [
          {
            senderId: parseInt(from),
            receiverId: parseInt(to),
          },
          {
            senderId: parseInt(to),
            receiverId: parseInt(from),
          },
        ]
      },
      orderBy: { id: "asc" },
    });

    const unreadMessages = [];

    messages.forEach((message, index) => {
                
      if(message.messageStatus !== "read" && message.senderId === parseInt(to)) {
        messages[index].messageStatus = "read";
        unreadMessages.push(message.id);
      }
    });

    await prisma.messages.updateMany({
      where: {
        id: { in: unreadMessages },
      }, 
      data: {
        messageStatus: "read",
      }
    });

    return res.status(200).json({ msg: "Messages fetched successfully!", success: true, messages });
  } catch (err) {
    next(err);
  }
};

export const addImageMessage = async (req, res, next) => {
  try {

    if(req.file) {
      const date = Date.now();
      let fileName = "uploads/images/" + date + req.file.originalname;
      renameSync(req.file.path, fileName);

      const prisma = getPrismaInstance();
      const { from, to } = req.query;

      if(from && to) {
        const message = await prisma.messages.create({ 
          data: { 
            message: fileName,
            sender: { connect: { id: parseInt(from) }}, 
            receiver: { connect: { id: parseInt(to) }},
            type: "image",
          },
        });

        return res.status(201).json({ message, success: true });
      }

      return res.status(400).send({ msg: "From, To and Message is required!", success: false });
    }

    return res.status(400).send({ msg: "Image is required!", success: false });
  } catch (err) {
    next(err);
  }
};
