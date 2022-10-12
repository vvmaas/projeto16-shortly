import { Router } from "express";
import { signUp, signIn } from "../controllers/auth.controller.js";
import checkValuesSignIn from "../middlewares/check.signin.js";
import checkValuesSignUp from "../middlewares/check.signup.js";

const authRouter = Router()

authRouter.post('/signup', checkValuesSignUp, signUp)
authRouter.post('/signin', checkValuesSignIn, signIn)

export default authRouter