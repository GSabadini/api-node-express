import BooksController from '../controllers/Books';

export default (app) => {
  const booksController = new BooksController(app.datasource.models.Books);

  app.get('/books', (req, res) => {
    booksController.getAll()
      .then(({
        data,
        statusCode,
      }) => {
        res.status(statusCode);
        res.json(data);
      });
  });

  app.get('/books/:id', (req, res) => {
    booksController.getById(req.params)
      .then(({
        data,
        statusCode,
      }) => {
        res.status(statusCode);
        res.json(data);
      });
  });

  app.delete('/books/:id', (req, res) => {
    booksController.destroy(req.params)
      .then(({
        statusCode,
      }) => {
        res.sendStatus(statusCode);
      });
  });

  app.put('/books/:id', (req, res) => {
    booksController.update(req.body, req.params)
      .then(({
        data,
        statusCode,
      }) => {
        res.status(statusCode);
        res.json(data);
      });
  });

  app.post('/books', (req, res) => {
    booksController.create(req.body)
      .then(({
        data,
        statusCode,
      }) => {
        res.status(statusCode);
        res.json(data);
      });
  });
};
