const Course = require('../models/Course');

class AdminController {
    //[GET] /admin/stored/course
    storedCourses(req, res, next) {
        Promise.all([Course.find({}).lean().sortable(req), Course.countWithDeleted({ deleted: true })])
            .then(([course, deletedCount]) => res.render('admin/stored-courses', { course, deletedCount }))
            .catch(next);
    }
    //[GET] /admin/trash/course
    trashCourses(req, res, next) {
        Course.findWithDeleted({ deleted: true })
            .sortable(req)
            .lean()
            .then((course) => {
                res.render('admin/trash-courses', { course });
            })
            .catch(next);
    }
}

module.exports = new AdminController();
