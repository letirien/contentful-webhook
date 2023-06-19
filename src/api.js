const express = require("express");
const serverless = require("serverless-http");
const app = express();
const router = express.Router();

const algoliasearch = require('algoliasearch');
// const Contentful = require('contentful') 
const algoliaApiKey = process.env.ALGOLIA_API_KEY;
// const contentfulApiKey = process.env.CONTENTFUL_API_KEY;

// const contentfulClient = clientContentFul
// Créez une instance Algolia en utilisant votre identifiant et votre clé d'API
const client = algoliasearch('X3LOXZO0EA', algoliaApiKey);

// Spécifiez le nom de l'index dans lequel vous souhaitez indexer vos projets
const index = client.initIndex('dev_JIBOIANA');
const indexArticle = client.initIndex('dev_JiboianaArticle');
router.get("/", (req, res) => {
  res.json({
    hello: "Welcome I use this small app as webhook handler"
  });
});

app.use(express.json())
// index for projects
router.post('/contentful-webhook/indexProject/:data', (req, res)=>{
  const objectID = req.body.id;
  const title  = req.body.title;
  const subtitle  = req.body.subtitle;
  const hook  = req.body.hook;

  const object = { objectID: objectID, title, subtitle, hook/* autres champs */ };
  if (req.body) {
    index.saveObject(object)
      .then(content => {
        console.log('Objet indexé avec succès :', content);
        res.sendStatus(200);
      })
      .catch(err => {
        console.error('Erreur lors de l\'indexation de l\'objet :', err);
        res.sendStatus(500);
      });
  }
})

//INDEX EVENT

router.post('/contentful-webhook/indexArticle/:data', (req, res)=>{
  const objectID = req.body.id;
  const title  = req.body.title;
  const richText  = req.body.richText;
  const tags  = req.body.tags;
  const author  = req.body.author;
  const createdDate  = req.body.createdDate;

  const object = { objectID: objectID, title, richText, tags, author, createdDate/* autres champs */ };
  if (req.body) {
    indexArticle.saveObject(object)
      .then(content => {
        console.log('Objet indexé avec succès :', content);
        res.sendStatus(200);
      })
      .catch(err => {
        console.error('Erreur lors de l\'indexation de l\'objet :', err);
        res.sendStatus(500);
      });
  }
})

router.get("*", (req, res) => {
  res.status(404).send("404 not found");
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);
