const Profile = require('../models/profileModel')
const User = require('../models/userModel')

exports.createProfile = async (req, res) => {
    /*
     Check if current user already has an existing profile. If profile exists, proceed
     to update profile with incoming request otherwise create a new profile
     */
    const profile = req.body
    const existingProfile = await Profile.findOne({userId: req.user._id})
    if (existingProfile) {
        const profile = await Profile.findByIdAndUpdate(existingProfile._id, req.body, {
            new: true
        })
        return res.status(200).json(profile)
    } else {
        profile.userId = req.user._id
        const newProfile = await Profile.create(profile)
        return res.status(201).json(newProfile)
    }
}

exports.getProfiles = async (req, res) => {
    const users = await User.find()
    return res.status(200).json(users)
}

exports.getProfile = async (req, res) => {
    const profile = await Profile.findOne({userId: req.params.id})
    if (!profile) return res.status(404).json({general: 'Profile not found'})
    return res.status(200).json(profile)
}

exports.deleteProfile = async (req, res) => {
    const profile = await Profile.findByIdAndDelete(req.params.id)
    if (!profile) return res.status(500).json({general: 'Profile not found'})
    return res.status(204).json({general: 'Profile deleted successfully'})
}
