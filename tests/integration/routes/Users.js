describe('Routes Users', () => {
  const {
    Users,
  } = app.datasource.models;

  const defaultUser = {
    id: 1,
    name: 'Default Name',
    email: 'default@default.com',
    password: 'default',
  };

  beforeEach((done) => {
    Users
      .destroy({
        where: {},
      })
      .then(() => Users.create(defaultUser))
      .then(() => done());
  });

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .expect(200)
        .end((err, res) => {
          const [resultUser] = res.body;

          expect(resultUser.id).to.be.equal(defaultUser.id);
          expect(resultUser.name).to.be.equal(defaultUser.name);
          expect(resultUser.email).to.be.equal(defaultUser.email);

          done(err);
        });
    });
  });

  describe('Route GET /users/:id', () => {
    it('should return a user', (done) => {
      request
        .get(`/users/${defaultUser.id}`)
        .expect(200)
        .end((err, res) => {
          expect(res.body.id).to.be.equal(defaultUser.id);
          expect(res.body.name).to.be.equal(defaultUser.name);
          expect(res.body.email).to.be.equal(defaultUser.email);

          done(err);
        });
    });
  });

  describe('Route DELETE /users/:id', () => {
    it('should delete users', (done) => {
      request
        .delete(`/users/${defaultUser.id}`)
        .expect(204, done);
    });
  });

  describe('Route PUT /users/:id', () => {
    it('should update a user', (done) => {
      const updatedUser = {
        id: 1,
        name: 'Updated User',
        email: 'updated@updated.com',
        password: 'updated',
      };

      request
        .put(`/users/${defaultUser.id}`)
        .send(updatedUser)
        .expect(200)
        .end((err, res) => {
          const [result] = res.body;

          expect(result).to.be.equal(1);

          done(err);
        });
    });
  });

  describe('Route POST /users', () => {
    it('should create a user', (done) => {
      const newUser = {
        name: 'New User',
        email: 'newuser@newuser.com',
        password: 'newuser',
      };

      request
        .post('/users')
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          expect(res.body.name).to.be.equal(newUser.name);
          expect(res.body.email).to.be.equal(newUser.email);

          done(err);
        });
    });
  });
});
