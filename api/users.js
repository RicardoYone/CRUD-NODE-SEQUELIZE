const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hola");
});

router.post("/new", (req, res) => {
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;

  try {
    db.User.create({
      name,
      email,
      password,
    });
    res.status(200).send("Usuario creado");
  } catch (error) {
    res.status(400).send("NO se pudo crear el usuario");
  }
});

router.get("/all", async (req, res) => {
  try {
    let users = await db.User.findAll();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send("NO se pudieron obtener los usuarios");
  }
});

router.get("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let user = await db.User.findByPk(id);
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send("NO se pudieron obtener los usuarios");
  }
});

router.put("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { name, email, password } = req.body;
    await db.User.update(
      { name, email, password },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).send("Usuario actualizado");
  } catch (error) {
    res.status(400).send("NO se pudo actualizar el usuario");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await db.User.destroy({
      where: {
        id,
      },
    });
    res.status(200).send("Usuario eliminado");
  } catch (error) {
    res.status(400).send("NO se pudo eliminar el usuario");
  }
});

module.exports = router;
