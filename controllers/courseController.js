const Course = require('../models/courseModel')
const {validateCourseData} = require('../utils/inputValidators')

/** @namespace params.courseId **/
exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        return res.status(200).json(courses)
    } catch (e) {
        return res.status(500).json({error: e.code})
    }
}

exports.getCoursesByCategoryId = async (req, res) => {
    try {
        await Course.find({category: req.params.categoryId})
            .select(
                '_id name category description avatar courseLink rating certification fee duration provider' +
                ' progLanguages created'
            )
            .sort('_created')
            .exec((err, courses) => {
                if (err) {
                    return res.status(400).json({general: 'Invalid category selected'})
                }
                res.json(courses)
            })
    } catch (e) {
        return res.status(500).json({error: e.code})
    }
}

exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findOne({_id: req.params.courseId})
        if (!course) return res.status(404).json({general: 'Course not found'})
        return res.status(200).json(course)
    } catch (e) {
        res.status(500).json({error: e.code})
    }
}

function valuesInput(req) {
    return {
        name: req.body.name,
        category: req.params.categoryId,
        description: req.body.description,
        avatar: req.body.avatar,
        courseLink: req.body.courseLink,
        rating: req.body.rating,
        certification: req.body.certification,
        fee: req.body.fee,
        duration: req.body.duration,
        provider: req.body.provider,
        progLanguages: req.body.progLanguages
    }
}

exports.addCourse = async (req, res) => {
    const newCourse = valuesInput(req)
    if (req.user.role === 'admin') {
        const {valid, errors} = validateCourseData(newCourse)
        if (!valid) return res.status(400).json(errors)
        const course = new Course(newCourse)
        const saveCourse = await course.save()
        return res.status(201).json(saveCourse)
    } else {
        return res.status(403).json({general: 'Unauthorized request'})
    }
}

exports.updateCourse = async (req, res) => {
    const inputUpdate = valuesInput(req)
    await Course.findOne({_id: req.params.courseId}, (err, doc) => {
        if (err) return res.status(500).json({general: 'Course not found'})
        let update = {}
        if (inputUpdate.name) {
            update.name = inputUpdate.name
        }
        //Obtain the categoryId from the response and populate the category field
        update.category = doc.category

        if (inputUpdate.description) {
            update.description = inputUpdate.description
        }
        if (inputUpdate.avatar) {
            update.avatar = inputUpdate.avatar
        }
        if (inputUpdate.courseLink) {
            update.courseLink = inputUpdate.courseLink
        }

        if (inputUpdate.rating) {
            update.rating = inputUpdate.rating
        }
        if (inputUpdate.certification) {
            update.certification = inputUpdate.certification
        }
        if (inputUpdate.fee) {
            update.fee = inputUpdate.fee
        }
        if (inputUpdate.rating) {
            update.duration = inputUpdate.duration
        }
        if (inputUpdate.provider) {
            update.provider = inputUpdate.provider
        }
        if (inputUpdate.progLanguages) {
            update.progLanguages = inputUpdate.progLanguages
        }

        Course.findByIdAndUpdate({_id: doc._id}, update, {
            new: true
        }, (err, doc) => {
            if (err) return res.status(500).json({error: err})
            return res.status(200).json(doc)
        })
    })
}

exports.deleteCourse = async (req, res) => {
    const course = await Course.findOne({_id: req.params.courseId})
    if (course === null) return res.status(500).json({general: 'Course not found'})
    course.remove(err => {
        if (err) return res.status(400).json({error: err.code})
        return res.json({general: 'Course deleted successfully'})
    })
}
