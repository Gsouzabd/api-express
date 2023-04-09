import authors from "../models/Author.js";

class authorController{

  /*
    ** List all author from database
    */
  static getAllauthors = async (req,res) =>{

    try {   
      const author = await authors.find();

      res.status(200).json(author);
      
    } catch (error) {
      res.status(500).json({message: `${error.message}`});
    }
        
  };


  /*
    ** Retrieve a author from database
    */
  static retrieveAuthor = async (req,res) =>{

    const {id} = req.params;

    try{
      const author = await authors.findById(id);
      res.status(200).json(author);
      
    } catch (error) {
      res.status(400).json({message: `${error.message}`});
    }
  };



  /*
    ** Insert a author in database
    */
  static createAuthor = async (req,res) =>{

    try{
      const author = await new authors(req.body);

      authors.save();
      res.status(201).json(author);
      
    } catch (error) {
      res.status(500).json({message: `${error.message}`});
    }
  };

  /*
    ** Update a author by id
    */
  static updateAuthor = async (req,res) =>{

    let {id} = req.params;
    try{
      const author = await authors.findByIdAndUpdate(id, {$set: req.body});
      res.status(201).json(author);
      
    } catch (error) {
      res.status(400).json({message: `${error.message}`});
    }
        
  };


  /*
    ** Delete a author from database
    */
  static deleteAuthor = async (req,res) =>{

    let {id} = req.params;
    try{
      await authors.findByIdAndDelete(id);
      res.status(201).send({message: "Author succesfully deleted"});
      
    } catch (error) {
      res.status(400).json({message: `${error.message}`});
    }

  };


}


export default authorController;