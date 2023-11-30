const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB')
})



beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    await api
        .get('/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 1000)

test('unique identifier property of the blog post is named id', async () => {
    const response = await api.get('/')
    expect(response.body[0].id).toBeDefined()
})

afterAll(async () => {
    await mongoose.connection.close()
})