const express = require("express");
const serverless = require("serverless-http");

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});
router.post('/contentful-webhook/index/:data', (req, res)=>{
  const projet = req.body;
  if(req.body){
    res.sendStatus(200);
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
