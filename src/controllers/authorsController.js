import authors from "../models/Author.js";

class authorsController{

    /*
    ** List all authors from database
    */
    static getAllAuthors = (req,res) =>{

        authors.find((error,authors)=>{
            res.status(200).json(authors);
    
        });
        
    }


    /*
    ** Retrieve a author from database
    */
    static retrieveAuthor = (req,res) =>{

        const {id} = req.params;

        authors.findById(id, (error, authors)=>{
            if(error){
                res.status(400).send({message: `${error.message} - Author not found`})
            }else{
                res.status(200).json(authors)
            }
        })
    }


    /*
    ** Insert a author in database
    */
    static createAuthor = (req,res) =>{

        const author = new authors(req.body);

        author.save(((error)=>{
            if(error){
                res.status(500).send({message: `${error.message} - fail trying to create author`})
            }else{
                res.status(201).send(JSON.stringify(author));
            }
        }))

    }

    /*
    ** Update a author by id
    */
    static updateAuthor = (req,res) =>{

        let {id} = req.params;

        authors.findByIdAndUpdate(id, {$set: req.body}, (error) =>{
            if(!error){
                res.status(201).send({message:`Author successfully updated!`});
            }else{
                res.status(500).send({message: `${error.message} - fail trying to create author`})
            }
        })
        
    }


    /*
    ** Delete a author from database
    */
    static deleteAuthor = (req,res) =>{

        let {id} = req.params;

        authors.findByIdAndDelete(id, (error) =>{
            if(!error){
                res.status(200).send({message: 'Author succesfully deleted'})

            }else{
                res.status(400).send({message: `${error.message} - Author not found`})
            }

        })
    }


}


export default authorsController