import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { conectarBD } from "./db/db.js";
import rutasVehiculo from "./views/vehiculos/rutas.js";


dotenv.config({ path: "./.env" });

const app = Express();

app.use(Express.json());
app.use(Cors());
app.use(rutasVehiculo);


const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto ${process.env.PORT}`);
  });
};
conectarBD(main);
