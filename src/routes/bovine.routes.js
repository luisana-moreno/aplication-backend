import { Router } from "express";
import { getBovines, getBovinesid, postBovines, putBovinesid, deleteBovinesid, getFilteredBovines } from "../controllers/bovine.controllers.js";

const router = Router();

router.get("/bovine", getBovines);
router.get("/bovine/:id", getBovinesid);
router.post("/bovine", postBovines);
router.put("/bovine/:id", putBovinesid);
router.delete("/bovine/:id", deleteBovinesid);
router.get("/bovine/filter", getFilteredBovines);

export default router;