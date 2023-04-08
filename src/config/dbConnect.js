import mongoose from "mongoose";

mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://gabriel:gl110401@cluster0.d2abby1.mongodb.net/api-express")

let db = mongoose.connection;

export default db;