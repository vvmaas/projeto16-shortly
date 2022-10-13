import { Router } from "express";
import { getMe, getRanking } from "../controllers/users.controller.js";
import checkHeader from "../middlewares/check.header.js";

const usersRouter = Router()

usersRouter.get('/users/me', checkHeader, getMe)
usersRouter.get('/ranking', getRanking)

export default usersRouter