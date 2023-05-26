const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

const algoliasearch = require('algoliasearch');
// const Contentful = require('contentful') 


// const contentfulClient = clientContentFul
// Créez une instance Algolia en utilisant votre identifiant et votre clé d'API
const client = algoliasearch('X3LOXZO0EA', algoliaApiKey);

// Spécifiez le nom de l'index dans lequel vous souhaitez indexer vos projets
const index = client.initIndex('dev_JIBOIANA');
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
    res.sendStatus(200)
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
