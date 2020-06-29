const Profile = require('../models/profileModel')

exports.editProfile = async (req, res) => {
    const profile = {
        user: req.user._id,
        name: req.body.name,
        institution: req.body.institution,
        skills: req.body.skills,
        interests: req.body.interests,
        bio: req.body.bio
    }
    /**
     Check if current user already has an existing profile. If profile exists, proceed
     to update profile with incoming request otherwise create a new profile
     */
    const existingProfile = await Profile.findOne({user: req.user._id})
    if (existingProfile) {
        let newUpdate = {}
        if (profile.name) {
            newUpdate.name = profile.name
        }
        if (profile.institution) {
            newUpdate.institution = profile.institution
        }
        if (profile.skills) {
            newUpdate.skills = profile.skills
        }
        if (profile.interests) {
            newUpdate.interests = profile.interests
        }
        if (profile.bio) {
            newUpdate.bio = profile.bio
        }
        await Profile.findByIdAndUpdate({_id: existingProfile._id}, newUpdate, {
            new: true
        }, (err, doc) => {
            if (err) return res.status(500).json({error: err})
            const updatedUser = {
                _id: doc.id,
                name: doc.name,
                institution: doc.institution,
                skills: doc.skills,
                interests: doc.interests,
                bio: doc.bio,
                updatedAt: doc.updatedAt
            }
            return res.status(200).json(updatedUser)
        })
    } else {
        const newProfile = await new Profile(profile).save()
        return res.status(201).json({
            _id: newProfile._id,
            name: newProfile.name,
            institution: newProfile.institution,
            skills: newProfile.skills,
            interests: newProfile.interests,
            bio: newProfile.bio,
            updatedAt: newProfile.updatedAt,
        })
    }
}

exports.getUserProfile = async (req, res) => {
    const userProfile = await Profile.findOne({user: req.user._id})
    if (!userProfile) return res.status(404).json({general: 'Profile not found'})
    return res.status(200).json(userProfile)
}

exports.deleteUserProfile = async (req, res) => {
    const userProfile = await Profile.findOne({user: req.user._id})
    if (userProfile === null) return res.status(500).json({general: 'Course not found'})
    userProfile.remove(err => {
        if (err) return res.status(400).json({err})
        return res.json({message: 'Profile deleted successfully'})
    })
}
