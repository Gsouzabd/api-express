import express from "express";
import BooksController from "../controllers/booksController.js";

const router = express.Router();

router
  .get("/books", BooksController.getAllBooks)
  .get("/books/searchby", BooksController.findByParams)
  .get("/books/:id", BooksController.retrieveBook)
  .post("/books", BooksController.createBook)
  .put("/books/:id", BooksController.updateBook)
  .delete("/books/:id", BooksController.deleteBook);

    
export default router;