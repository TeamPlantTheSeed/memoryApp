import express from "express";
import card from "../controllers/cardsController"

const router = express.Router();

// Route to get list of crypto currencies for drop down.
router.get("/", card.findAll);
router.get("/:id", card.findByCardId);
router.get("/:userID/:iteration/:since", card.findCardsForUser);
router.get("/user/:userID", card.findAllForUser);
router.post("/user/:userID", card.create);
router.put("/:id", card.update);
router.delete("/:id", card.remove);

// Export routes for server.js to use.
export default router;
