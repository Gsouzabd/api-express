import authors from "../models/Author.js";

class authorController{

  /*
    ** List all author from database
    */
  static getAllauthors = async (req, res, next) =>{

    try {   
      const author = await authors.find();

      res.status(200).json(author);
      
    } catch (error) {
      next(error);
    }
        
  };


  /*
    ** Retrieve a author from database
    */
  static retrieveAuthor = async (req, res, next) =>{

    const {id} = req.params;

    try{
      const author = await authors.findById(id);
      res.status(200).json(author);
      
    } catch (error) {
      next(error);
    }
  };



  /*
    ** Insert a author in database
    */
  static createAuthor = async (req, res, next) =>{

    try{
      const author = await new authors(req.body);

      const authorCreated = await authors.save();
      
      if (authorCreated !== null) {
        res.status(201).json(authorCreated);
      }
      
    } catch (error) {
      next(error);
    }
  };

  /*
    ** Update a author by id
    */
  static updateAuthor = async (req, res, next) =>{

    let {id} = req.params;
    try{
      const author = await authors.findByIdAndUpdate(id, {$set: req.body});
      res.status(201).json(author);
      
    } catch (error) {
      next(error);
    }
        
  };


  /*
    ** Delete a author from database
    */
  static deleteAuthor = async (req, res, next) =>{

    let {id} = req.params;
    try{
      await authors.findByIdAndDelete(id);
      res.status(201).send({message: "Author succesfully deleted"});
      
    } catch (error) {
      next(error);
    }

  };


}


export default authorController;