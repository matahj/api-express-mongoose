require("dotenv").config();

////////////////////////////////////////////
const { connect, Schema, model } = require("mongoose");

connect(process.env.MONGO_LOCAL_URL)
.then(() => console.log("Conectado a MongoDB."))
.catch(e=>{
    console.error("ERROR al conectarse a MongoDB: ", e);
});

const TerminalSchema = new Schema(
    {
        nombre: { type: String, required: true, maxlength: 50 },
        direccion: { type: String, required: true, maxlength: 50 },
        estado: { type: String, required: true, maxlength: 50 }
    },
    {
        timestamps: true
    }
)

const AutobusSchema = new Schema(
    {
        matricula: { type: String, required: true, unique: true, maxlength: 10 },
        modelo: { type: String, required: true, maxlength: 50 },
        anio: { type: String, required: true, maxlength: 10 },
        activo: { type: Boolean, default: true },
        terminal: { type: Schema.Types.ObjectId, ref: "terminales", required: true }
    },
    {
        timestamps: true
    }
)

const ConductorSchema = new Schema(
    {
        nombres: { type: String, required: true, maxlength: 50 },
        apellidos: { type: String, required: true, maxlength: 50 },
        genero: { type: String, maxlength: 15 },
        correo: { type: String, required: true, unique: true, maxlength: 50 },
        telefono: { type: String, required: true, maxlength: 50 },
        direccion: { type: String, required: true, maxlength: 50 },
        fecha_nacimiento: { type: Date, required: true },
        terminal: { type: Schema.Types.ObjectId, ref: "terminales", required: true }
    },
    {
        timestamps: true
    }
)

const AdministradorSchema = new Schema(
    {
        nombres: { type: String, required: true, maxlength: 50 },
        apellidos: { type: String, required: true, maxlength: 50 },
        correo: { type: String, required: true, unique: true, maxlength: 50 },
        password: { type: String, required: true, maxlength: 100 }
    },
    {
        timestamps: true
    }
)

const ClienteSchema = new Schema(
    {
        nombres: { type: String, required: true, maxlength: 50 },
        apellidos: { type: String, required: true, maxlength: 50 },
        correo: { type: String, required: true, unique: true, maxlength: 50 },
        fecha_nacimiento: { type: Date },
        password: { type: String, required: true, maxlength: 100 }
    },
    {
        timestamps: true
    }
)

const BoletoSchema = new Schema(
    {
        numero_asiento: { type: Number, required: true, min: 1, max: 40 },
        cliente: { type: Schema.Types.ObjectId, ref: "clientes", required: true },
        viaje: { type: Schema.Types.ObjectId, ref: "viajes", required: true }
    },
    {
        timestamps: true
    }
)

const ViajeSchema = new Schema(
    {
        asientos_disponibles: { type: Number, required: true, min: 0, max: 40, default: 40 },
        fecha_salida: { type: Date, required: true },
        hora_salida: { type: Date, required: true },
        precio: { type: Number, required: true, min: 0 },
        terminal_origen: { type: Schema.Types.ObjectId, ref: "terminales", required: true },
        terminal_destino: { type: Schema.Types.ObjectId, ref: "terminales", required: true },
        autobus: { type: Schema.Types.ObjectId, ref: "autobuses", required: true },
        conductor: { type: Schema.Types.ObjectId, ref: "conductores", required: true },
        administrador: { type: Schema.Types.ObjectId, ref: "administradores", required: true }
    },
    {
        timestamps: true
    }
)

//Definición de modelos
const TerminalModel = model("terminales", TerminalSchema);
const AutobusModel = model("autobuses", AutobusSchema);
const ConductorModel = model("conductores", ConductorSchema);
const ClienteModel = model("clientes", ClienteSchema);
const BoletoModel = model("boletos", BoletoSchema);
const ViajeModel = model("viajes", ViajeSchema);
const AdministradorModel = model("administradores", AdministradorSchema);

////////////////////////////////////////////

const express = require("express");
const app = express();

app.get("/hola", function (req, res) {
  res.send("Hola desde Express.");
});

app.listen(process.env.PORT_SERVER, function () {
  console.log("Servidor de Express en el puerto " + process.env.PORT_SERVER);
});
