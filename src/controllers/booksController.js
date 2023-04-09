import books from "../models/Book.js";

class BooksController{

  /*
    ** List all books from database
    */
  static getAllBooks = async (req,res) =>{

    try {
      const book = await books.find()
        .populate("author")
        .populate("publisher")
        .exec();

      if(book !== null) {
        res.status(200).json(book);
      }
    } catch (error) {
      res.status(500).json({message: `${error.message} `});
    }     
  };


  /*
    ** Retrieve a book from database
    */
  static retrieveBook = async (req,res) =>{

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
      res.status(404).json({message: "Not Found"});
    }
  };


  /*
    ** Search a book with conditions passed in query 
    */
  static findByParams = async (req, res) =>{

    const publisher = req.query.publisher;
    const author = req.query.author;
  
    if(publisher && author){
      try {
        const book = await books.find({"author": author, "publisher": publisher});

        if (book !== null) {
          res.status(200).send(book);
        }
  
      }catch (error) {
        res.status(404).json({message: "Book not found"});
      }
    }
  
    else if(author){
      try{
        const book = await books.find({"author": author});

        if (book !== null) {
          res.status(200).send(book);
        }
      }catch(error){
        res.status(404).send({message: `${error.message} - Book not found by author`});

      }
    }
  
    else if(publisher){
      try {
        const book = await books.find({"publisher": publisher});
          
        if (book !== null) {
          res.status(200).send(book);
        }
          
      } catch (error) {
        res.status(404).send({message: `${error.message} - Book not found by publisher`});

      }
    }

  }; 


  /*
    ** Insert a book in database
    */
  static createBook = async (req,res) =>{

    try {
      const book = await new books(req.body);

      book.save();

      if (book !== null) {
        res.status(201).send(JSON.stringify(book));
      }
     
    } catch (error) {
      res.status(500).json({message: `${error.message}`});
    }

  };

  /*
    ** Update a book by id
    */
  static updateBook = async (req,res) =>{

    try {

      let {id} = req.params;

      const book = await books.findByIdAndUpdate(id, {$set: req.body});
      if (book !== null) {
        res.status(201).send({message:"Book successfully updated!"});
      }
      
    } catch (error) {
      res.status(404).json({message: `Book not found. ${error.message}`});
    }
        
  };


  /*
    ** Delete a book from database
    */
  static deleteBook = async (req,res) =>{

    try {
      let {id} = req.params;

      await books.findByIdAndDelete(id);

      res.status(201).send({message:"Book successfully deleted!"});

    } catch (error) {
      res.status(404).json({message: `Book not found. ${error.message}`});
    }

  };


}


export default BooksController;