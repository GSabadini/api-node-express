import BooksController from '../../../controllers/books';

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
        .then(({ data }) => expect(data).to.be.eql(expectedResponse));
    });
  });
});
