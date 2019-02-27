import BooksController from '../controllers/books';

export default (app, Books) => {
  app.get('/books', (req, res) => {
    Books.findAll({})
      .then(result => res.json(result))
      .catch(() => res.status(412));
  });

  app.get('/books/:id', (req, res) => {
    Books.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then(result => res.json(result))
      .catch(() => res.status(412));
  });

  app.delete('/books/:id', (req, res) => {
    Books.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.sendStatus(204))
      .catch(() => res.status(412));
  });

  app.put('/books/:id', (req, res) => {
    Books.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then(result => res.json(result))
      .catch(() => res.status(412));
  });

  app.post('/books', (req, res) => {
    Books.create(req.body)
      .then(result => res.status(201).json(result))
      .catch(() => res.status(412));
  });
};
