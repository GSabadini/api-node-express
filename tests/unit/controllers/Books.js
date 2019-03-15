import BooksController from '../../../controllers/Books';

describe('Book Controller', () => {
  describe('Get all books: getAll()', () => {
    it('Should return a list of books', () => {
      const Books = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '',
        updated_at: '',
      }];

      td.when(Books.findAll({})).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController
        .getAll()
        .then(({
          data,
        }) => expect(data).to.be.eql(expectedResponse));
    });
  });

  describe('Get book a id: getById()', () => {
    it('Should return a book', () => {
      const Books = {
        findOne: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '',
        updated_at: '',
      }];

      td.when(Books.findOne({
        where: {
          id: 1,
        },
      })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController
        .getById({
          id: 1,
        })
        .then(({
          data,
        }) => expect(data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a book: create()', () => {
    it('Should create a book', () => {
      const Books = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Test Book',
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '',
        updated_at: '',
      }];

      td.when(Books.create(
        requestBody,
      )).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController
        .create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a book: update()', () => {
    it('Should update a book', () => {
      const Books = {
        update: td.function(),
      };

      const requestBody = {
        id: '1',
        name: 'Test Book Updated',
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book Updated',
        created_at: '',
        updated_at: '',
      }];

      td.when(Books.update(
        requestBody, {
          where: {
            id: 1,
          },
        },
      )).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController
        .update(requestBody, {
          id: 1,
        })
        .then((response) => {
          expect(response.statusCode).to.be.eql(200);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Destroy a book: destroy()', () => {
    it('Should destroy a book', () => {
      const Books = {
        destroy: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Test Book',
        created_at: '',
        updated_at: '',
      }];

      td.when(Books.destroy({
        where: {
          id: 1,
        },
      })).thenResolve(expectedResponse);

      const booksController = new BooksController(Books);

      return booksController
        .destroy({
          id: 1,
        })
        .then((response) => {
          expect(response.statusCode).to.be.eql(204);
        });
    });
  });
});
