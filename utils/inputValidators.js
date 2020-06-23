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
