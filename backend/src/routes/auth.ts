import { Router } from "express";
import { authLogin, authSignup } from "../controllers/auth";

const router = Router();


// # user signup route

router.post("/signup", authSignup);

// # user login route

router.post("/login", authLogin);

export default router;
