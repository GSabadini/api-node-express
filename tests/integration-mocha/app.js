describe('Routes Books', () => {
  const { Books } = app.datasource.models;
  const defaultBook = {
    id: 1,
    name: 'Default Book',
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
      request
        .get('/books')
        .expect(200)
        .end((err, res) => {
          const [resultBook] = res.body;

          expect(resultBook.name).to.be.equal(defaultBook.name);
          expect(resultBook.id).to.be.equal(defaultBook.id);

          done(err);
        });
    });
  });

  describe('Route GET /books/:id', () => {
    it('should return a book', (done) => {
      request
        .get(`/books/${defaultBook.id}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.name).to.be.equal(defaultBook.name);
          expect(res.body.id).to.be.equal(defaultBook.id);

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
      };

      request
        .put(`/books/${defaultBook.id}`)
        .send(updateBook)
        .expect(200)
        .end((err, res) => {
          const [result] = res.body;

          expect(result).to.be.equal(1);

          done(err);
        });
    });
  });

  describe('Route POST /books', () => {
    it('should create a book', (done) => {
      const newBook = {
        name: 'New Book',
      };

      request
        .post('/books')
        .send(newBook)
        .expect(201)
        .end((err, res) => {
          expect(res.body.name).to.be.equal(newBook.name);

          done(err);
        });
    });
  });
});
