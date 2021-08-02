import { Router } from "express";
import AuthController from "../controller/Auth.Controller";

// Router
const router = Router();

router.post("/register", AuthController.registerPlayer);
router.post("/login", AuthController.loginPlayer);

export default router;