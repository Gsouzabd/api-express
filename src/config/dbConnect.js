import mongoose from "mongoose";

mongoose.set("strictQuery", true);
mongoose.connect(process.env.CONNECTION_DB_STRING);

let db = mongoose.connection;

export default db;