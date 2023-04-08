import publishers from "../models/Publisher.js";

class publishersController{

    /*
    ** List all publishers from database
    */
    static getAllPublishers = (req,res) =>{

        publishers.find((error,publishers)=>{
            res.status(200).json(publishers);
    
        });
        
    }


    /*
    ** Retrieve a publisher from database
    */
    static retrievePublisher = (req,res) =>{

        const {id} = req.params;

        publishers.findById(id, (error, publishers)=>{
            if(error){
                res.status(400).send({message: `${error.message} - Publisher not found`})
            }else{
                res.status(200).json(publishers)
            }
        })
    }


    /*
    ** Insert a publisher in database
    */
    static createPublisher = (req,res) =>{

        const publisher = new publishers(req.body);

        publisher.save(((error)=>{
            if(error){
                res.status(500).send({message: `${error.message} - fail trying to create publisher`})
            }else{
                res.status(201).send(JSON.stringify(publisher));
            }
        }))

    }

    /*
    ** Update a publisher by id
    */
    static updatePublisher = (req,res) =>{

        let {id} = req.params;

        publishers.findByIdAndUpdate(id, {$set: req.body}, (error) =>{
            if(!error){
                res.status(201).send({message:`Publisher successfully updated!`});
            }else{
                res.status(500).send({message: `${error.message} - fail trying to create publisher`})
            }
        })
        
    }


    /*
    ** Delete a publisher from database
    */
    static deletePublisher = (req,res) =>{

        let {id} = req.params;

        publishers.findByIdAndDelete(id, (error) =>{
            if(!error){
                res.status(200).send({message: 'Publisher succesfully deleted'})

            }else{
                res.status(400).send({message: `${error.message} - Publisher not found`})
            }

        })
    }


}


export default publishersController