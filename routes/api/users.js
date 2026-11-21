const User = require('../../db').User
const route = require('express').Router()

// returns user with username, password, if exists
route.get('/', (req, res) => {
    User.findAll({
        where: {
            name: req.query.username,
            password: req.query.password
        }
    })
        .then((user) => {
            res.status(200).send(user)
        })
        .catch((err) => {
            res.status(500).send({
                error: 'could not retreive users'
            })
        })
})

route.post('/', async (req, res) => {
    console.log('going to create user')

    try {
        const existingUsers = await User.findAll({
            where: {
                name: req.body.username,
                password: req.body.password
            }
        })

        if (existingUsers.length === 0) {
            const newUser = await User.create({
                name: req.body.username,
                password: req.body.password
            })
            return res.status(201).send(newUser)
        }

        return res.status(500).send({
            error: 'user already exists'
        })
    } catch (err) {
        return res.status(500).send({
            error: 'could not retreive users'
        })
    }
})

exports = module.exports = route