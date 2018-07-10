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

const show = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  models.Post.findOne({ where: {id} })
      .then(post => {
        res.json(post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).end();
      });
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

const update = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  const title = req.body.title;
  if (!title) {
    return res.status(400).end();
  }
  const body = req.body.body;
  const author = req.body.author;
  models.Post
    .findOne({ where: {id} })
    .then(post => {
      post.title = title;
      post.body = body;
      post.author = author;
      post.save()
          .then( _ => {
            res.json(post);
          })
          .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
              return res.status(409).end();
            }
          })
    })
}

const destroy = (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).end();
  }
  models.Post
      .destroy({ where: {id} })
      .then(() => {
        res.status(204).end();
      });
}

module.exports = {index, show, create, update, destroy}