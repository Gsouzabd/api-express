import express from "express";
import books from "./booksRoutes.js"
import authors from "./authorsRoute.js";
import publishers from "./publisherRoute.js";
const routes = (app) =>{
    app.get('/',(req, res) =>{
        res.status(200).send({title: "Books api nodejs"});
    })

    app.use(
        express.json(),
        books,
        authors,
        publishers
    )
}

export default routes