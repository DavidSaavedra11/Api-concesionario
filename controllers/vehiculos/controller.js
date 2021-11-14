import { ObjectId } from "mongodb";
import { getDB } from "../../db/db.js";

const queryAllVehicles = async (callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos.collection("vehiculo").find().limit(50).toArray(callback);
};

const crearVehiculo = async (datosVehiculo, callback) => {
  if (
    Object.keys(datosVehiculo).includes("nombre") &&
    Object.keys(datosVehiculo).includes("marca") &&
    Object.keys(datosVehiculo).includes("modelo")
  ) {
    const baseDeDatos = getDB();
    await baseDeDatos.collection("vehiculo").insertOne(datosVehiculo, callback);
  } else {
    return "error";
  }
};

const consultarVehiculo = async (id, callback) => {
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("vehiculo")
    .findOne({ _id: new ObjectId(id) }, callback);
};

const editarVehiculo = async (id, edicion, callback) => {
  const filtroVehiculo = { _id: new ObjectId(id) };
  const operacion = {
    $set: edicion,
  };
  const baseDeDatos = getDB();
  await baseDeDatos
    .collection("vehiculo")
    .findOneAndUpdate(
      filtroVehiculo,
      operacion,
      { upsert: true, returnOriginal: true },
      callback
    );
};

const eliminarVehiculo = async (id, callback) => {
  const filtroVehiculo = { _id: new ObjectId(id) };
  const baseDeDatos = getDB();
  await baseDeDatos.collection("vehiculo").deleteOne(filtroVehiculo, callback);
};

export {
  queryAllVehicles,
  crearVehiculo,
  editarVehiculo,
  eliminarVehiculo,
  consultarVehiculo,
};
