import { Router } from "express";
import { signUp, login, createProfile, getProfile } from "../controller/auth";
import { checkAuth } from "../midlleware/check_auth";
import { checkBearer } from "../midlleware/check_bearer";
import { handleMediaFilesLocal } from "../utils/multipart";


const router = Router();

router.post("/signup", checkBearer, signUp);
router.post("/login", checkBearer, login);
router.post("/create-profile", checkAuth, createProfile);
router.get("/get-profile", checkAuth, getProfile)
export default router;
