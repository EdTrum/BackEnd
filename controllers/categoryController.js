const Category = require('../models/categoryModel')
const {validateCategoryData} = require("../utils/inputValidators")

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
        if (nameExists) return res.status(403).json({name: 'Already exists'})

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

exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) return res.status(404).json({general: 'Category not found'})
        return res.status(200).json(category)
    } catch (e) {
        res.status(500).json({error: e.code})
    }
}

exports.updateCategory = async (req, res) => {
    if (req.user.role === 'admin') {
        const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        })
        if (!category) return res.status(500).json({general: 'Category not found'})
        return res.status(200).json(category)
    } else {
        return res.status(403).json({general: 'Unauthorized request'})
    }
}

exports.deleteCategory = async (req, res) => {
    if (req.user.role === 'admin') {
        const category = await Category.findByIdAndDelete(req.params.id)
        if (!category) return res.status(500).json({general: 'Category not found'})
        return res.status(204).json({general: 'Category deleted successfully'})
    } else {
        return res.status(403).json({general: 'Unauthorized request'})
    }
}
