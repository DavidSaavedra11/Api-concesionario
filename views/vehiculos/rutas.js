import Express from "express";
import { getDB } from "../../db/db.js";

const rutasVehiculo = Express.Router();

rutasVehiculo.route("/productos").get((req, res) => {
  console.log("alguien hizo get en la ruta /vehiculos");
  const baseDeDatos = getDB();
  baseDeDatos
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

rutasVehiculo.route("/productos/nuevo").post((req, res) => {
  console.log(req);
  const datosVehiculo = req.body;
  console.log("llaves: ", Object.keys(datosVehiculo));
  try {
    if (
      Object.keys(datosVehiculo).includes("nombre") &&
      Object.keys(datosVehiculo).includes("marca") &&
      Object.keys(datosVehiculo).includes("modelo")
    ) {
      const baseDeDatos = getDB();
      // implementar código para crear vehículo en la BD
      baseDeDatos
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

rutasVehiculo.route("/productos/editar").patch((req, res) => {
  const edicion = req.body;
  console.log(edicion);
  const filtroVehiculo = { _id: new ObjectId(edicion.id) };
  delete edicion.id;
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  baseDeDatos
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

rutasVehiculo.route("/productos/eliminar").delete((req, res) => {
  const filtroVehiculo = { _id: new ObjectId(req.body.id) };
  const baseDeDatos = getDB();
  baseDeDatos
    .collection("vehiculo")
    .deleteOne(filtroVehiculo, (err, result) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    });
});

export default rutasVehiculo;
