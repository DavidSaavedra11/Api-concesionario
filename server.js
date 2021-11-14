import Express from "express";
import Cors from "cors";
import dotenv from "dotenv";
import { conectarBD, getDB } from ".db/db.js";
import { MongoClient, ObjectId } from "mongodb";


dotenv.config({ path: "./.env" });

const app = Express();

app.use(Express.json());
app.use(Cors());

app.get("/productos", (req, res) => {
  console.log("alguien hizo get en la /productos");
  const conexion = getDB();
  conexion
    .collection("vehiculo")
    .find()
    .limit(50)
    .toArray((err, result) => {
      if (err) {
        res.status(500).send("Error consultando los vehiculos");
      } else {
        res.json(result);
      }
    });
});

app.post("/productos/nuevo", (req, res) => {
  console.log(req);
  const datosVehiculo = req.body;
  console.log("Llaves: ", Object.keys(datosVehiculo));
  try {
    if (
      Object.keys(datosVehiculo).includes("nombre") &&
      Object.keys(datosVehiculo).includes("marca") &&
      Object.keys(datosVehiculo).includes("modelo")
    ) {
      const conexion = getDB();
      // implementar codigo para crear vehiculo
      conexion
        .collection("vehiculo")
        .insertOne(datosVehiculo, (err, result) => {
          if (err) {
            console.error(err);
            res.sendStatus(500);
          } else {
            console.log(result);
            res.sendStatus(200);
          }
        });
    } else {
      res.sendStatus(500);
    }
  } catch {
    res.sendStatus(500);
  }
});

app.patch("/vehiculo/editar", (req, res) => {
  const edicion = req.body;
  console.log(edicion);
  const filtroVehiculo = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  const conexion = getDB();
  conexion
    .collection("vehiculo")
    .findOneAndUpdate(
      filtroVehiculo,
      operacion,
      { upsert: true, returnOriginal: true },
      (err, result) => {
        if (err) {
          console.error("error actualizando el vehiculo: ", err);
          res.sendStatus(500);
        } else {
          console.log("actualizado con exito");
          res.sendStatus(200);
        }
      }
    );
});

app.delete("/vehiculo/eliminar", (req, res) => {
  const filtroVehiculo = { _id: new ObjectId(req.body.id) };
  const conexion = getDB();
  conexion.collection("vehiculo").deleteOne(filtroVehiculo, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

const main = () => {
  return app.listen(process.env.PORT, () => {
    console.log(`escuchando puerto 5000 ${process.env.PORT}`);
  });
};

conectarBD(main);
