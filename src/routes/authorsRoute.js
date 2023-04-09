import express from "express";
import AuthorsController from "../controllers/authorsController.js";

const router = express.Router();

router
  .get("/authors", AuthorsController.getAllauthors)
  .get("/authors/:id", AuthorsController.retrieveAuthor)
  .post("/authors", AuthorsController.createAuthor)
  .put("/authors/:id", AuthorsController.updateAuthor)
  .delete("/authors/:id", AuthorsController.deleteAuthor);

    
export default router;