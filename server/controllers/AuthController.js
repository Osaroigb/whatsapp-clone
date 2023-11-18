import getPrismaInstance from "../utils/PrismaClient.js";

export const checkUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if(!email) return res.json({ msg: "Email is required!", success: false, status: 401 });

    const prisma = getPrismaInstance();
    const user = await prisma.user.findUnique({ where: { email } });

    if(!user) {
      return res.json({ msg: "User not found!", success: false, status: 404 });
    } else {
      return res.json({ msg: "User found!", success: true, status: 200, data: user });  
    }

  } catch (err) {
    next(err);
  }
};

export const onBoardUser = async (req, res, next) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;
    console.info({ email, name, profilePicture, about });

    if(!email || !name || !profilePicture) return res.send("Email, Name and Image are required!");

    const prisma = getPrismaInstance();

    const user = await prisma.user.create({ 
      data: { email, name, profilePicture, about } 
    });

    return res.json({ msg: "User onboarded successfully!", success: true, status: 201, user });
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const prisma = getPrismaInstance();

    const users = await prisma.user.findMany({ 
      orderBy: { name: "asc" },
      select: {
        id: true,
        email: true,
        name: true,
        profilePicture: true,
        about: true,
      }
    });

    const usersGroupedByInitialLetter = {};

    users.forEach(user => {
      const initialLetter = user.name.charAt(0).toUpperCase();
      
      if(!usersGroupedByInitialLetter[initialLetter]) {
        usersGroupedByInitialLetter[initialLetter] = [];
      }

      usersGroupedByInitialLetter[initialLetter].push(user);
    });

    return res.status(200).send({ msg: "All users fetched successfully!", success: true, users: usersGroupedByInitialLetter });
  } catch (err) {
    next(err);
  }
};
