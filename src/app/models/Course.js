const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const CourseSchema = new Schema(
    {
        // _id: { type: Number },
        name: { type: String, required: true },
        decription: { type: String },
        image: { type: String },
        videoID: { type: String, required: true },
        level: { type: String },
        slug: { type: String, slug: 'name', unique: true },
    },
    {
        // _id: false,
        timestamps: true,
    },
);
//Custom query helpers
CourseSchema.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

//Add plugins
mongoose.plugin(slug);
// CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', CourseSchema);
