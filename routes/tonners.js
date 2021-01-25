import express from "express";
import {promises as fs} from "fs";
import handlerJson from "../controllers/jsonController.js";

const tonnersRoutes = express.Router();
const {readFile, writeFile} = fs; 
const handler = new handlerJson();

tonnersRoutes.post("/addmodel",async (req,res,next)=>{
    try{
        let dadostonners = req.body;
        const jsonTonners = await handler.leJson();
        dadostonners = {id: jsonTonners.nextId++,
            type: dadostonners.type,
            printer: dadostonners.printer,
            cor: dadostonners.cor,
            quantidade: 0}
            // Grava os dados da API no JSON.
            jsonTonners.modelos.push(dadostonners);
            if(!handler.escreveJson(jsonTonners)){
                throw "Falha na Escrita do Arquivo."
            }
            res.send(jsonTonners);
    }
    catch(err){
        next(err);
    }
});

tonnersRoutes.delete("/deletemodel/:id",async(req, res,next )=>{
    console.log(req.params.id);
    try{
      const jsonTonners = JSON.parse(await readFile(global.fileName));
      jsonTonners.modelos = jsonTonners.modelos.filter(
        modelo => modelo.id !== parseInt(req.params.id)
      ); 
      console.log(jsonTonners);
      await writeFile(global.fileName, JSON.stringify(jsonTonners,null,2));
      res.end();
    }catch(err){
      next(err);
    }
  });

export default tonnersRoutes;