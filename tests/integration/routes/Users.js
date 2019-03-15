import jwt from 'jwt-simple';

describe('Routes Users', () => {
  const jwtSecret = app.config.jwtSecret;

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
      .then(() => Users.create({
        name: 'Test',
        email: 'test@test.com',
        password: 'test',
      }))
      .then((user) => {
        Users.create(defaultUser)
          .then(() => {
            token = jwt.encode({
              id: user.id
            }, jwtSecret)
            done();
          })
      })
  });

  let token;

  describe('Route GET /users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
        .set('Authorization', `Bearer ${token}`)
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
