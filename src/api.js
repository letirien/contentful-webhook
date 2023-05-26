const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});
router.post('/contentful-webhook/index/:id', (req, res)=>{
  const projet = req.body;
  // Extrait les informations nécessaires du projet
  const { sys, fields } = projet;
  const { id } = sys;
  const { title, /* autres champs */ } = fields;
  // Mettez à jour ou ajoutez l'enregistrement correspondant dans l'index Algolia
  const object = { objectID: id, title /* autres champs */ };
  res.json({
    index: object
  })
})

router.get("/diogo", (req, res) => {
  res.json({
    hello: "diogo"
  });
});

router.get("*", (req, res) => {
  res.status(404).send("404 not found");
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
