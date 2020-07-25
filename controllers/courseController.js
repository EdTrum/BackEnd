const Course = require('../models/courseModel')
const {validateCourseData} = require('../utils/inputValidators')

exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        return res.status(200).json(courses)
    } catch (e) {
        return res.status(500).json({error: e.code})
    }
}

exports.getCoursesByCatId = async (req, res) => {
    try {
        await Course.find({categoryId: req.params.id})
            .select(
                '_id name category description avatar courseLink rating certification fee duration provider' +
                ' progLanguages created'
            )
            .sort('_created')
            .exec((err, courses) => {
                if (err) {
                    return res.status(400).json({general: 'Invalid category selected'})
                }
                if (courses.length > 0) return res.status(200).json(courses)
                else return res.status(200).json({message: 'No Courses found'})
            })
    } catch (e) {
        return res.status(500).json({error: e.code})
    }
}

exports.getCourse = async (req, res) => {
    try {
        const course = await Course.findOne({_id: req.params.id})
        if (!course) return res.status(404).json({general: 'Course not found'})
        return res.status(200).json(course)
    } catch (e) {
        res.status(500).json({error: e.code})
    }
}

exports.addCourse = async (req, res) => {
    const newCourse = valuesInput(req.body)
    if (req.user.role === 'admin') {
        const {valid, errors} = validateCourseData(newCourse)
        if (!valid) return res.status(400).json(errors)

        const nameExists = await Course.findOne({name: newCourse.name})
        if (nameExists) return res.status(403).json({name: 'Already exists'})

        newCourse.categoryId = req.params.id
        const course = await Course.create(newCourse)
        return res.status(201).json(course)
    } else {
        return res.status(403).json({general: 'Unauthorized request'})
    }
}

exports.updateCourse = async (req, res) => {
    if (req.user.role === 'admin') {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!course) return res.status(500).json({general: 'Category not found'})
        return res.status(200).json(course)
    } else {
        return res.status(403).json({general: 'Unauthorized request'})
    }
}

exports.deleteCourse = async (req, res) => {
    if (req.user.role === 'admin') {
        const course = await Course.findByIdAndDelete(req.params.id)
        if (!course) return res.status(500).json({general: 'Course not found'})
        return res.status(204).json({general: 'Course deleted successfully'})
    } else {
        return res.status(403).json({general: 'Unauthorized request'})
    }
}

const valuesInput = data => {
    return {
        name: data.name,
        description: data.description,
        avatar: data.avatar,
        courseLink: data.courseLink,
        rating: data.rating,
        certification: data.certification,
        fee: data.fee,
        duration: data.duration,
        provider: data.provider,
        progLanguages: data.progLanguages
    }
}
