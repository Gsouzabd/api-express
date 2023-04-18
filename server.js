import "dotenv/config";
import app from "./src/app.js";

const port= process.env.PORT || 3000;

app.listen((process.env.PORT || 3000), ()=>{
  console.log(`Server listening to port: http://localhost:${port}`);
});
