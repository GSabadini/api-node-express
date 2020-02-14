import jwt from 'jwt-simple';

describe('Routes Books', () => {
  const { jwtSecret } = app.config;

  const {
    Books,
    Users,
  } = app.datasource.models;

  const defaultBook = {
    id: 1,
    name: 'Default Book',
    description: 'Default description',
  };

  const defaultUser = {
    id: 1,
    name: 'Default Name',
    email: 'default@default.com',
    password: 'default',
  };

  let token;
  beforeEach((done) => {
    Users.destroy({
      where: {},
    })
      .then(() => Users.create(defaultUser))
      .then((user) => {
        Books.destroy({
          where: {},
        })
          .then(() => Books.create(defaultBook))
          .then(() => {
            token = jwt.encode({
              id: user.id,
            }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /books', () => {
    it('should return a list of books', (done) => {
      request
        .get('/books')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          const [resultBook] = res.body;

          expect(resultBook.name).to.be.equal(defaultBook.name);
          expect(resultBook.id).to.be.equal(defaultBook.id);
          expect(resultBook.description).to.be.equal(defaultBook.description);

          done(err);
        });
    });
  });

  describe('Route GET /books/:id', () => {
    it('should return a book', (done) => {
      request
        .get(`/books/${defaultBook.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.name).to.be.equal(defaultBook.name);
          expect(res.body.id).to.be.equal(defaultBook.id);
          expect(res.body.description).to.be.equal(defaultBook.description);

          done(err);
        });
    });
  });

  describe('Route DELETE /books/:id', () => {
    it('should delete book', (done) => {
      request
        .delete(`/books/${defaultBook.id}`)
        .set('Authorization', `Bearer ${token}`)
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

      request
        .put(`/books/${defaultBook.id}`)
        .set('Authorization', `Bearer ${token}`)
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
        description: 'New description',
      };

      request
        .post('/books')
        .set('Authorization', `Bearer ${token}`)
        .send(newBook)
        .expect(201)
        .end((err, res) => {
          expect(res.body.name).to.be.equal(newBook.name);
          expect(res.body.description).to.be.equal(newBook.description);

          done(err);
        });
    });
  });
});
