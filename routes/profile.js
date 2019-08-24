const { Router } = require('express')
const auth = require('../middleware/auth')
const User = require('../models/user')
const router = Router()

router.get('/', auth, async (req, res) => {
  res.render('profile', {
    title: 'Профиль',
    isProfile: true,
    user: req.user.toObject()
  })
})

router.post('/', auth, async (req, res) => {
  // console.log(req.user.id)

  try {
    const user = await User.findById(req.user.id)
    // console.log('user', user)

    const toChange = {
      name: req.body.name
    }

    // console.log(req.file)

    const imageUrl =  req.file.path.replace(/\\/g, "/")
    console.log('imageUrl', imageUrl)

    if (req.file) {
      toChange.avatarUrl = imageUrl
    }

    Object.assign(user, toChange)
    await user.save()
    res.redirect('./profile')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
