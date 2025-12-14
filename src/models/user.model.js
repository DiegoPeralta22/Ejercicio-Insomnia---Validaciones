//DEFINIMOS LA CONSTANTE PARA ENCRIPTAR LA IP POR MEDIO DE UUID
const { randomUUID } = require("node:crypto");

//ARREGLO DE VALORES
let users = [
  {
    id: randomUUID(),
    name: "Diego",
    email: "Diego@gmail.com",
    active: true,
    age: 42,
  },
  {
    id: randomUUID(),
    name: "Luis",
    email: "bachira@a.com",
    active: true,
    age: 23,
  },
];

//FUNCIÓN GET
function findAll() {
  return users;
}

//FUNCIÓN GET ID
function findById(id) {
  return users.find((u) => u.id === id) || null;
}

//FUNCIÓN POST
function addUser(item) {
  const user = {
    id: randomUUID(),
    age: item.age,
    name: item.name,
    email: item.email,
    active: true,
  };
  users.push(user);
  return user;
}

//FUNCIÓN PUT
function updateUser(id, data) {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = {
    ...users[index],
    name: data.name === undefined ? users[index].name : data.name,
    age: data.age === undefined ? users[index].age : Number(data.age),
    email: data.email === undefined ? users[index].email : data.email,
    active:
      data.active === undefined ? users[index].active : Boolean(data.active),
  };
  return users[index];
}

//EXPORTAMOS LAS FUNCIONES
module.exports = { findAll, findById, addUser, updateUser };
