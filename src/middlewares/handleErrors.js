import mongoose from "mongoose";


function handleErrors(error, req, res, next) {
    if(error instanceof mongoose.Error.CastError){
        res.status(400).send({message: "One or more datas are incorrects"});
      } else if (error instanceof mongoose.Error.ValidationError) {
        const mensagensErro = Object.values(error.errors)
            .map(error => error.message)
            .join("; ")
            res.status(400).send({message: `Os seguintes erros foram encontrados: ${mensagensErro}`});

      }else{
        
        res.status(500).send({message: `${error}`});
    
      }
}

export default handleErrors