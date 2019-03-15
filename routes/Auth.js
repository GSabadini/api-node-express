import HttpStatus from 'http-status';
import jwt from 'jwt-simple';
import bcrypt from 'bcrypt';

export default (app) => {
  const config = app.config;
  const {
    Users
  } = app.datasource.models;

  const isPassword = (encodedPassword, password) => bcrypt.compareSync(password, encodedPassword)

  app.post('/auth', (req, res) => {
    if (req.body.email && req.body.password) {
      const {
        email,
        password
      } = req.body

      Users.findOne({
          where: {
            email,
          },
        })
        .then((user) => {
          if (isPassword(user.password, password)) {
            const payload = {
              id: user.id,
            };
            res.json({
              token: jwt.encode(payload, config.jwtSecret),
            });

            return
          }

          return res.sendStatus(HttpStatus.UNAUTHORIZED);
        })
        .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));

      return
    }
    return res.sendStatus(HttpStatus.UNAUTHORIZED);
  });
};
