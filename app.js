import express from "express";
import handlerJson from "./controllers/jsonController.js";
import tonnersRoutes from "./routes/tonners.js";

const app = express();
app.use(express.json());
const handler = new handlerJson();
const port = 3000;

global.fileName = "tonners.json";

app.use("/tonners",tonnersRoutes);

app.get('/', async (_, res) => {
    const data = await handler.leJson();
    res.send({"Modelos Cadastrados:" : data.modelos});
  })
  
  app.listen(port, () => {   
    handler.inicializaJson();
  })