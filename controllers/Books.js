import HttpStatus from 'http-status';

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  message,
}, statusCode);

class BooksController {
  constructor(Books) {
    this.Books = Books;
  }

  getAll() {
    return this
      .Books
      .findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this
      .Books
      .findOne({
        where: params,
      })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(params) {
    return this
      .Books
      .create(params)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this
      .Books
      .update(data, {
        where: params,
      })
      .then(result => defaultResponse(result, HttpStatus.OK))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this
      .Books
      .destroy({
        where: params,
      })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default BooksController;
