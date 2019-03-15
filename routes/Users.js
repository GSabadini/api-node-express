import UsersController from '../controllers/Users';

export default (app) => {
  const usersController = new UsersController(app.datasource.models.Users);

  app.get('/users', (req, res) => {
    usersController.getAll()
      .then(({
        data,
        statusCode,
      }) => {
        res.status(statusCode);
        res.json(data);
      });
  });

  app.get('/users/:id', (req, res) => {
    usersController.getById(req.params)
      .then(({
        data,
        statusCode,
      }) => {
        res.status(statusCode);
        res.json(data);
      });
  });

  app.delete('/users/:id', (req, res) => {
    usersController.destroy(req.params)
      .then(({
        statusCode,
      }) => {
        res.sendStatus(statusCode);
      });
  });

  app.put('/users/:id', (req, res) => {
    usersController.update(req.body, req.params)
      .then(({
        data,
        statusCode,
      }) => {
        res.status(statusCode);
        res.json(data);
      });
  });

  app.post('/users', (req, res) => {
    usersController.create(req.body)
      .then(({
        data,
        statusCode,
      }) => {
        res.status(statusCode);
        res.json(data);
      });
  });
};
