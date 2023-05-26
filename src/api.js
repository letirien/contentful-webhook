const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

const algoliasearch = require('algoliasearch');
const Contentful = require('contentful') 

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

// post for projects
router.post('/contentful-webhook/index/:data', (req, res)=>{
  // const projet = req.body;
  // Extrait les informations nécessaires du projet
  const objectID = req.body.id;
  const title  = req.body.title;
  const subtitle  = req.body.subtitle;
  const hook  = req.body.hook;

  const object = { objectID, title, subtitle, hook/* autres champs */ };
  if(req.body){
    index.saveObject(object);
  }else{
    res.sendStatus(500);
  }
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
