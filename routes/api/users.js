const route = require('express').Router()
const Users = require('../../db').Users // ya tumhara jo bhi DB model path hai

// Login / Fetch user ke liye (GET /api/users?username=...&password=...)
route.get('/', async (req, res) => {
  try {
    const users = await Users.findAll({
      where: {
        username: req.query.username,
        password: req.query.password
      }
    })
    res.status(200).send(users)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Failed to fetch users' })
  }
})

// Sign up ke liye (POST /api/users)
route.post('/', async (req, res) => {
  try {
    const user = await Users.create({
      username: req.body.username,
      password: req.body.password
    })
    res.status(201).send(user)
  } catch (err) {
    console.error(err)
    res.status(500).send({ error: 'Failed to create user' })
  }
})

exports = module.exports = route