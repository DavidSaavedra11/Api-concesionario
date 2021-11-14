import Express from "express";
import {
  queryAllVehicles,
  crearVehiculo,
  editarVehiculo,
  eliminarVehiculo,
} from "../../controllers/vehiculos/controller.js";


const rutasVehiculo = Express.Router();

const genercCallback = (res) =>(err,result)=> {
    if (err) {
      res.status(500).send("Error consultando los vehiculos");
    } else {
      res.json(result);
    }
  };


rutasVehiculo.route("/productos").get((req, res) => {
  console.log("alguien hizo get en la ruta /vehiculos");
  queryAllVehicles(genercCallback(res));
});

rutasVehiculo.route("/productos/nuevo").post((req, res) => {
    crearVehiculo(req.body,genercCallback(res));
});

rutasVehiculo.route("/productos/editar").patch((req, res) => {
    editarVehiculo(req.body,genercCallback(res))
});

rutasVehiculo.route("/productos/eliminar").delete((req, res) => {
    eliminarVehiculo(req.body.id, genercCallback(res));
});

export default rutasVehiculo;
