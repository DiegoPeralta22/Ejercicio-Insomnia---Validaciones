//IMPORTAMOS LAS FUNCIONES GENERADAS EN EL MODELO
const User = require("../models/user.model");

//FUNCIÓN GET
function findAll(req, res) {
  const data = User.findAll();
  res.status(200).json(data);
}

//FUNCIÓN GET ID
function findById(req, res) {
  const { id } = req.params;
  const user = User.findById(id);
  if (!user) return res.status(404).json({ message: "usuario no encontrado" });
  res.status(200).json(user);
}

//FUNCIÓN POST
function addUser(req, res) {
  const errors = validateUserData(req.body, true);

  if (errors) {
    return res
      .status(400)
      .json({ message: "Datos de usuario inválidos", errors });
  }

  const newUser = User.addUser(req.body);
  res.status(201).json(newUser);
}

//FUNCIÓN PUT
function updateUser(req, res) {
  const { id } = req.params;

  const errors = validateUserData(req.body, false);

  if (errors) {
    return res
      .status(400)
      .json({ message: "Datos de actualización inválidos", errors });
  }
  const updated = User.updateUser(id, req.body);

  if (!updated)
    return res.status(404).json({ message: "usuario no encontrado" });

  res.status(200).json(updated);
}

module.exports = { findAll, findById, addUser, updateUser };

//FUNCIÓN DE VALIDACIÓN
const validateUserData = (data, isNew = true) => {
  const errors = {};

  //VALIDACIÓN DE NOMBRE (REQUERIDO Y SIN NÚMEROS)
  if (isNew || data.name !== undefined) {
    if (!data.name || typeof data.name !== "string" || /\d/.test(data.name)) {
      errors.name = "El nombre es requerido y no debe contener números.";
    }
  }

  //VALIDACIÓN DE EDAD (1-100)
  const age = Number(data.age);
  if (isNew || data.age !== undefined) {
    if (isNaN(age) || age <= 0 || age > 100) {
      errors.age = "La edad debe ser un número válido entre 1 y 100.";
    }
  }

  //VALIDACIÓN DE EMAIL CON FORMATO @
  if (isNew || data.email !== undefined) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
      errors.email = "El formato del email es inválido (debe contener @ y .).";
    }
  }

  //ARREGLO DE ERRORES
  return Object.keys(errors).length > 0 ? errors : null;
};
