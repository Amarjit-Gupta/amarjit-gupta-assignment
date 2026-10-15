import express from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/userController.js';


const userRoute = express.Router();

userRoute.post("/createUser",createUser);
userRoute.get("/allUser",getUsers);
userRoute.get("/getSingleUser/:id",getUserById);
userRoute.put("/updateUser/:id",updateUser);
userRoute.delete("/deleteUser/:id",deleteUser);

export default userRoute;
