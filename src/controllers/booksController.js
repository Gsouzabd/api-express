import books from "../models/Book.js";

class BooksController{

    /*
    ** List all books from database
    */
    static getAllBooks = (req,res) =>{

        books.find()
        .populate('author')
        .populate('publisher')
        .exec((error,books)=>{
            res.status(200).json(books);
    
        });
        
    }


    /*
    ** Retrieve a book from database
    */
    static retrieveBook = (req,res) =>{

        const {id} = req.params;

        books.findById(id)
        .populate('author')
        .populate('publisher')
        .exec((error, books)=>{
            if(error){
                res.status(400).send({message: `${error.message} - Book not found`})
            }else{
                res.status(200).json(books)
            }
        })
    }


    /*
    ** Search a book with conditions passed in query 
    */
    static findByParams = (req, res) =>{

        const publisher = req.query.publisher;
        const author = req.query.author;

        if(publisher && author){
            books.find({'author': author, 'publisher': publisher}, {}, (error, book)=>{
                    res.status(200).send(book);

            })
        }

        else if(author){
            books.find({'author': author}, {}, (error, book) =>{
                if(!error){
                    res.status(200).send(book);
                }else{
                    res.status(400).send({message: `${error.message} - Book not found by author`})
                }
            })
        }

        else if(publisher){
            books.find({'publisher': publisher}, {}, (error, book) =>{
                if(!error){
                    res.status(200).send(book);
                }else{
                    res.status(400).send({message: `${error.message} - Book not found by publisher`})
                }
            })
        }




    }


    /*
    ** Insert a book in database
    */
    static createBook = (req,res) =>{

        const book = new books(req.body);

        book.save(((error)=>{
            if(error){
                res.status(500).send({message: `${error.message} - fail trying to create book`})
            }else{
                res.status(201).send(JSON.stringify(book));
            }
        }))

    }

    /*
    ** Update a book by id
    */
    static updateBook = (req,res) =>{

        let {id} = req.params;

        books.findByIdAndUpdate(id, {$set: req.body}, (error) =>{
            if(!error){
                res.status(201).send({message:`Book successfully updated!`});
            }else{
                res.status(500).send({message: `${error.message} - fail trying to create book`})
            }
        })
        
    }


    /*
    ** Delete a book from database
    */
    static deleteBook = (req,res) =>{

        let {id} = req.params;

        books.findByIdAndDelete(id, (error) =>{
            if(!error){
                res.status(200).send({message: 'Book succesfully deleted'})

            }else{
                res.status(400).send({message: `${error.message} - Book not found`})
            }

        })
    }


}


export default BooksController