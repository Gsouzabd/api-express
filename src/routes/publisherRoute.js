import express from "express";
import PublishersController from "../controllers/publishersController.js";

const router = express.Router();

router
  .get("/publishers", PublishersController.getAllPublishers)
  .get("/publishers/:id", PublishersController.retrievePublisher)
  .post("/publishers", PublishersController.createPublisher)
  .put("/publishers/:id", PublishersController.updatePublisher)
  .delete("/publishers/:id", PublishersController.deletePublisher);

    
export default router;