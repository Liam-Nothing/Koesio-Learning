const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    const existingUser = await User.findOne({ username })
    console.log('existingUser', existingUser)

    if (existingUser) {
        return response.status(401).json({ error: 'Username already exists' })
    }

    if (!password || password.length < 3) {
        return response.status(401).json({ error: 'Password must be at least 3 characters long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {

    const users = await User.find({})

    response.status(201).json(users)
})

module.exports = usersRouter