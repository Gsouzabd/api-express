import books from "../models/Book.js";
import authors from "../models/Author.js";



class BooksController{

  /*
    ** List all books from database
    */
  static getAllBooks = async (req, res, next) =>{

    try {
      const book = await books.find()
        .populate("author")
        .populate("publisher")
        .exec();

      if(book !== null) {
        res.status(200).json(book);
      }
    } catch (error) {
      next(error);
    }     
  };


  /*
    ** Retrieve a book from database
    */
  static retrieveBook = async (req, res, next) =>{

    try {
      const {id} = req.params;

      const book = await books.findById(id)
        .populate("author")
        .populate("publisher")
        .exec();


      if (book !== null) {
        res.status(201).send(book);

      }
    
    } catch (error) {
      next(error);
    }
  };


  /*
    ** Search a book with conditions passed in query 
    */
  static findByParams = async (req, res, next) =>{
 
    try{

      const search = await processSearch(req.query);

      const bookFound = await books.find(search);

      res.status(200).send(bookFound)
    }catch(error){
      console.log(error);
      next(error);
    }
    

  };
  

  /*
    ** Insert a book in database
    */
  static createBook = async (req, res, next) =>{

    try {
      const book =  new books(req.body);

      const bookCreated = await book.save();

      if (bookCreated !== null) {
        res.status(201).send(JSON.stringify(bookCreated));
      }
     
    } catch (error) {
      next(error);
    }

  };

  /*
    ** Update a book by id
    */
  static updateBook = async (req, res, next) =>{

    try {

      let {id} = req.params;

      const book = await books.findByIdAndUpdate(id, {$set: req.body});
      if (book !== null) {
        res.status(201).send({message:"Book successfully updated!"});
      }
      
    } catch (error) {
      next(error);
    }
        
  };


  /*
    ** Delete a book from database
    */
  static deleteBook = async (req, res, next) =>{

    try {
      let {id} = req.params;

      await books.findByIdAndDelete(id);

      res.status(201).send({message:"Book successfully deleted!"});

    } catch (error) {

      next(error);
    }

  };


}


/*
**Function for searching by params passed in req.query
*/
async function processSearch(parameters){

  const {publisher, title, pagesNumber, author} = parameters;

  const search = {}

  if(publisher) search.publisher = publisher;

  if(title) search.title =  {$regex: title, $options: "i"};

  if(author){

    const authorName = {$regex: author, $options: "i"}
    const authorFound = await authors.findOne({name: authorName});

    const authorId = authorFound._id;

    search.author = authorId;
  }

  return search;
}


export default BooksController;