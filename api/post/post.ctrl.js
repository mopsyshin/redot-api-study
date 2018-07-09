const models = require('../../models');

const index = (req, res) => {
  req.query.limit = req.query.limit || 30;
  const limit = parseInt(req.query.limit, 10);
  if (Number.isNaN(limit)) {
    return res.status(400).end();
  }
  models.Post
    .findAll({limit})
    .then(posts => {
      res.json(posts);
    })
}


const create = (req, res) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;
  if (!author) {
    return res.status(400).end();
  }
  models.Post.create({
    title,
    body,
    author
  }).then(title => {
    res.status(201).json(title)
  }).catch(err => {
    console.log(err);
    res.status(500).end();
  })
}
module.exports = {index, create}