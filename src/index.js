const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const route = require('./routes');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
const app = express();
const port = 3000;

const db = require('./config/db');

db.connect();

app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(methodOverride('_method'));

app.use(SortMiddleware);

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
