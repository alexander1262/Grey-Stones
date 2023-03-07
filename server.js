const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars')
const config = require('./config/connection');
const routes = require('./controllers');

const app = express();
const hbs = exphbs.create();
const PORT = process.env.PORT || 3001;

app.use(session(config.expressSessionConfig));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", hbs.engine);
app.set("view engine", 'handlebars')
app.use(routes);

config.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
