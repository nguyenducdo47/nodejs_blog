const Course = require('../models/Course');

class SiteController {
    home(req, res,next) {
        Course.find({}).lean()
            .then((course) => res.render('home',{course}))
            .catch(next);
        // res.render('home');
    }

    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
