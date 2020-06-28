const isEmpty = string => {
    return string.trim() === ''
}

exports.validateCategoryData = data => {
    let errors = {}

    if (isEmpty(data.name)) errors.name = 'Must not be empty'
    if (isEmpty(data.description)) errors.description = 'Must not be empty'
    if (isEmpty(data.avatar)) errors.avatar = 'Must not be empty'
    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
}

exports.validateCourseData = data => {
    let errors = {}
    if (isEmpty(data.name)) errors.name = 'Must not be empty'
    if (isEmpty(data.description)) errors.description = 'Must not be empty'
    if (isEmpty(data.avatar)) errors.avatar = 'Must not be empty'
    if (isEmpty(data.courseLink)) errors.courseLink = 'Must not be empty'
    if (isEmpty(data.rating)) errors.rating = 'Must not be empty'
    if (isEmpty(data.certification.toString())) errors.certification = 'Must not be empty'
    if (isEmpty(data.fee.toString())) errors.fee = 'Must not be empty'
    if (isEmpty(data.duration.toString())) errors.duration = 'Must not be empty'
    if (isEmpty(data.provider)) errors.provider = 'Must not be empty'
    return {
        errors,
        valid: Object.keys(errors).length === 0
    }
}
