import express from "express";
import handlerJson from "./controllers/jsonController.js";

const app = express();
app.use(express.json());
const handler = new handlerJson();
const port = 3000;

global.fileName = "tonners.json";


app.get('/', (req, res) => {
    res.send({message: "Sistema de controle de estoque para insumos de impressoras HP."})
  })
  
  app.listen(port, () => {   
    handler.inicializaJson();
  })