import mongoose from "mongoose";

const publisherSchema = new mongoose.Schema(
  {
    id: {type: String},
    name: {type: String, required: true},
    country: {type: String}

  }
);

const publishers = mongoose.model("publishers", publisherSchema);

export default publishers;
