describe('Routes Books', () => {
  const {
    Books,
  } = app.datasource.models;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description',
  };

  beforeEach((done) => {
    Books
      .destroy({
        where: {},
      })
      .then(() => Books.create(defaultBook))
      .then(() => done());
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      const booksList = Joi.array().items(Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      }));

      request
        .get('/books')
        .expect(200)
        .end((err, res) => {
          joiAssert(res.body, booksList);

          done(err);
        });
    });
  });

  describe('Route GET /books/:id', () => {
    it('should return a book', (done) => {
      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .get(`/books/${defaultBook.id}`)
        .expect(200)
        .end((err, res) => {
          joiAssert(res.body, book);

          done(err);
        });
    });
  });

  describe('Route DELETE /books/:id', () => {
    it('should delete book', (done) => {
      request
        .delete(`/books/${defaultBook.id}`)
        .expect(204, done);
    });
  });

  describe('Route PUT /books/:id', () => {
    it('should update a book', (done) => {
      const updateBook = {
        id: 1,
        name: 'Updated book',
        description: 'Updated description',
      };

      const updatedCount = Joi.array().items(1);

      request
        .put(`/books/${defaultBook.id}`)
        .send(updateBook)
        .expect(200)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);

          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', (done) => {
      const newBook = {
        id: 2,
        name: 'New Book',
        description: 'New description',
      };

      const book = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        description: Joi.string(),
        created_at: Joi.date().iso(),
        updated_at: Joi.date().iso(),
      });

      request
        .post('/books')
        .send(newBook)
        .expect(201)
        .end((err, res) => {
          joiAssert(res.body, book);

          done(err);
        });
    });
  });
});
