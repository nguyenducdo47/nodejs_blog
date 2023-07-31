const newsRouter = require('./news.route');
const adminRouter = require('./admin.route');

const coursesRouter = require('./courses.route');
const siteRouter = require('./site.route')
function route(app) {
    
    app.use('/news', newsRouter);

    app.use('/admin', adminRouter);


    app.use('/courses', coursesRouter);

    
    
    app.use('/', siteRouter);
}

module.exports = route;
