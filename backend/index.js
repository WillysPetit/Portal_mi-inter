import express from "express";
import connection from "./db.js";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("¡Backend funcionando!");
});

app.get("/Cliente", (req, res) => {
  connection.query("SELECT * FROM usuarios", (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error en la consulta" });
      return;
    }
    res.json(results);
  });
});

// Endpoint para registrar un nuevo cliente
app.post("/registro-cliente", (req, res) => {
  let { Correo, Nombre, Password, Apellido, Cedula, Usuario } = req.body;
  if (!Correo || !Nombre || !Password || !Apellido || !Cedula || !Usuario) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }
  // No convertir Cedula a número, mantener como string
  // Validación de duplicados
  const checkSql =
    "SELECT * FROM cliente WHERE Correo = ? OR Usuario = ? OR Cedula = ?";
  connection.query(checkSql, [Correo, Usuario, Cedula], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la validación: " + err.message });
    }
    if (results.length > 0) {
      return res.status(409).json({
        error: "Ya existe un cliente con el mismo correo, usuario o cédula.",
      });
    }
    // Si no hay duplicados, insertar
    const sql =
      "INSERT INTO cliente (Correo, Nombre, Password, Id_Reporte, Apellido, Cedula, Usuario) VALUES (?, ?, ?, ?, ?, ?, ?)";
    connection.query(
      sql,
      [Correo, Nombre, Password, 0, Apellido, Cedula, Usuario],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error al registrar cliente: " + err.message });
        }
        res.json({ mensaje: "Cliente registrado exitosamente" });
      }
    );
  });
});

// Endpoint para login de cliente
app.post("/login-cliente", (req, res) => {
  const { Correo, Password } = req.body;
  if (!Correo || !Password) {
    return res.status(400).json({ error: "Correo y contraseña requeridos" });
  }
  const sql = "SELECT * FROM cliente WHERE Correo = ? AND Password = ?";
  connection.query(sql, [Correo, Password], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error en la consulta" });
    }
    if (results.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }
    res.json({ mensaje: "Login exitoso", cliente: results[0] });
  });
});

// Endpoint para registrar un pago en la pasarela
app.post("/pago-pasarela", (req, res) => {
  const { Correo, Plan, Monto, Banco } = req.body;
  if (!Correo || !Plan || !Monto || !Banco) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }
  // Buscar el id_Clientes a partir del nombre o correo
  const buscarCliente =
    "SELECT id_Clientes FROM cliente WHERE Correo = ? OR Nombre = ?";
  connection.query(buscarCliente, [Correo, Nombre], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al buscar cliente: " + err.message });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró un cliente con ese correo o nombre." });
    }
    const id_Clientes = results[0].id_Clientes;
    const sql =
      "INSERT INTO pasarela (id_Clientes, Plan, Monto, Banco) VALUES (?, ?, ?, ?)";
    connection.query(sql, [id_Clientes, Plan, Monto, Banco], (err, result) => {
      if (err) {
        return res
          .status(500)
          .json({ error: "Error al registrar pago: " + err.message });
      }
      res.json({ mensaje: "Pago registrado exitosamente" });
    });
  });
});

// Endpoint para obtener plan y monto según nombre o correo
app.get("/cliente-plan", (req, res) => {
  const identifier = req.query.identifier;
  if (!identifier) {
    return res
      .status(400)
      .json({ error: "Falta el identificador (nombre o correo)" });
  }
  // Buscar por correo o nombre
  const sql =
    "SELECT Plan, Monto FROM cliente WHERE Correo = ? OR Nombre = ? LIMIT 1";
  connection.query(sql, [identifier, identifier], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la consulta: " + err.message });
    }
    if (results.length === 0) {
      return res
        .status(404)
        .json({ error: "No se encontró un cliente con ese correo o nombre." });
    }
    res.json({ plan: results[0].Plan, monto: results[0].Monto });
  });
});

// Endpoint para registrar un nuevo administrador
app.post("/registro-admin", (req, res) => {
  const { Nombre, Apellido, Cedula, Correo, Usuario, Password, Rol } = req.body;
  if (
    !Nombre ||
    !Apellido ||
    !Cedula ||
    !Correo ||
    !Usuario ||
    !Password ||
    !Rol
  ) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  // Determinar la tabla según el rol
  let tabla = "";
  let mensaje = "";
  if (Rol === "Administrador") {
    tabla = "administradores";
    mensaje = "Administrador registrado exitosamente";
  } else if (Rol === "2" || Rol === "Supervisor") {
    tabla = "supervisores";
    mensaje = "Supervisor registrado exitosamente";
  } else if (Rol === "3" || Rol === "Soporte") {
    tabla = "soporte";
    mensaje = "Soporte registrado exitosamente";
  } else {
    return res.status(400).json({ error: "Rol no válido" });
  }

  // Validación de duplicados en la tabla correspondiente
  const checkSql = `SELECT * FROM ${tabla} WHERE Correo = ? OR Usuario = ? OR Cedula = ?`;
  connection.query(checkSql, [Correo, Usuario, Cedula], (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error en la validación: " + err.message });
    }
    if (results.length > 0) {
      return res
        .status(409)
        .json({
          error: `Ya existe un registro con el mismo correo, usuario o cédula en ${tabla}.`,
        });
    }
    // Si no hay duplicados, insertar
    const sql = `INSERT INTO ${tabla} (Nombre, Apellido, Cedula, Correo, Usuario, Password, Rol) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    connection.query(
      sql,
      [Nombre, Apellido, Cedula, Correo, Usuario, Password, Rol],
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ error: `Error al registrar en ${tabla}: ` + err.message });
        }
        res.json({ mensaje });
      }
    );
  });
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
