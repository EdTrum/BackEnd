const Category = require('../models/categoryModel')
const {validateCategoryData} = require("../utils/inputValidators")
/**@namespace params.categoryId **/
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find()
        return res.status(200).json(categories)
    } catch (e) {
        return res.status(500).json({error: e.code})
    }
}

exports.addCategory = async (req, res) => {
    const newCategory = {
        name: req.body.name,
        description: req.body.description,
        avatar: req.body.avatar,
    }
    if (req.user.role === 'admin') {
        const {valid, errors} = validateCategoryData(newCategory)
        if (!valid) return res.status(400).json(errors)

        const nameExists = await Category.findOne({name: newCategory.name})
        if (nameExists) return res.json(403).json({name: 'Already exists'})

        try {
            const cat = new Category(newCategory)
            const saveCategory = await cat.save()
            return res.status(201).json(saveCategory)
        } catch (e) {
            return res.status(400).json({error: e})
        }
    } else {
        return res.status(403).json({general: 'Unauthorized request'})
    }
}

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Category.findOne({_id: req.params.categoryId})
        if (!category) return res.status(404).json({general: 'Category not found'})
        return res.status(200).json(category)
    } catch (e) {
        res.status(500).json({error: e.code})
    }
}

exports.updateCategory = async (req, res) => {
    const update = {
        name: req.body.name,
        description: req.body.description,
        avatar: req.body.avatar,
    }
    await Category.findOne({_id: req.params.categoryId}, (err, doc) => {
        if (err) return res.status(500).json({general: 'Category not found'})
        let newUpdate = {}
        if (update.name) {
            newUpdate.name = update.name
        }
        if (update.description) {
            newUpdate.description = update.description
        }
        if (update.avatar) {
            newUpdate.avatar = update.avatar
        }
        Category.findByIdAndUpdate({_id: doc._id}, newUpdate, {
            new: true
        }, (err, doc) => {
            if (err) return res.status(500).json({error: err})
            return res.status(200).json(doc)
        })
    })
}

exports.deleteCategory = async (req, res) => {
    await Category.findOne({_id: req.params.categoryId}, (err, doc) => {
        if (err) return res.status(500).json({general: 'Category not found'})
        doc.remove(err => {
            if (err) return res.status(400).json({err})
            return res.json({general: 'Category deleted successfully'})
        })
    })
}
