import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";


/*
**Inicializa conexão com banco utilizando let "db" (mongoose)
*/
db.on("error", console.log.bind(console, 'Connection failed'));
db.once("open", ()=>{
    console.log('Connection with database successfully completed')
})

const app = express();

app.use(express.json());

/*
**Rotas express
*/
routes(app);

export default app