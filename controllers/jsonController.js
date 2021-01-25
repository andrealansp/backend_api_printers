import {promises as fs } from 'fs';
import json from "express";

const {writeFile, readFile} = fs

class handlerJson{

    async inicializaJson(){
        try{
            await readFile(global.fileName);
          } catch(err){
            const initialJson = {
              nextId: 1,
              modelos: []
            }
            if(this.escreveJson(initialJson)){
                console.log("Arquivo Iniciado com sucesso");
            }
        }
        finally{
            console.log("Api inicializada sem problemas !")
        }
    }

    async escreveJson(jsonText){
        try{
            await writeFile(global.fileName,JSON.stringify(jsonText)).then(()=>{
                return true;
            }).catch((err)=>{
                console.log(err);
            });
        }catch (err){
            return false;
        }    
    }

    async leJson(){
        const response = JSON.parse(await readFile(global.fileName));
        return response;
    }

} 

export default handlerJson;