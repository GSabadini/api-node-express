import app from './app';

app.listen(app.get('port'), () => {
  console.log(`App is running in port ${app.get('port')}`);
});
