export default {
  database: 'books',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'books.sqlite',
    logging: false,
    define: {
      underscored: true,
    },
  },
};
