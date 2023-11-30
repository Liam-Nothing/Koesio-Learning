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

test('a valid blog can be added ', async () => {
    const newBlog = {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: '-',
        likes: 5,
    }


    console.log(newBlog)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)


    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)


    const contents = blogsAtEnd[blogsAtEnd.length - 1]
    expect(contents).toEqual(expect.objectContaining({
        author: 'Edsger W. Dijkstra',
        likes: 5,
        title: 'Go To Statement Considered Harmful',
        url: '-'
    }))

})


afterAll(async () => {
    await mongoose.connection.close()
})