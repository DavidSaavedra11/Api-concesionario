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
    // implementar código para crear vehículo en la BD
    baseDeDatos.collection("vehiculo").insertOne(datosVehiculo, callback);
  } else {
    return "error";
  }
};
export { queryAllVehicles, crearVehiculo };
