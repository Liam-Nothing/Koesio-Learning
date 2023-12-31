const supertest = require('supertest')

const config = require('../utils/config')
const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const User = require('../models/user')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

// console.log(config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error.message)
    })


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('testpassword', 10)
    const user = new User({ username: 'testuser', passwordHash })

    await user.save()

    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})




describe('when logging in a user', () => {

    test('a user can log in with valid credentials', async () => {
        const user = {
            username: 'testuser',
            password: 'testpassword'
        }

        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        expect(response.body.token).toBeDefined()
    })

    test('a user cannot log in with invalid credentials', async () => {
        const user = {
            username: 'testuser',
            password: 'wrongpassword'
        }

        await api
            .post('/api/login')
            .send(user)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })
})



describe('when there is initially some blogs saved', () => {

    let token = null

    beforeEach(async () => {
        const user = {
            username: 'testuser',
            password: 'testpassword'
        }

        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        token = response.body.token
    })


    // test('console log every user', async () => {
    //     const users = await User.find({})
    //     // console.log(users)
    // })

    test('blogs are returned as json with log user', async () => {

        // console.log('token', token)

        await api
            .get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)


        // console.log(rep.text)

    }, 1000)

    test('unique identifier property of the blog post is named id', async () => {
        const response = await api.get('/api/blogs')
            .set('Authorization', `Bearer ${token}`)

        // console.log(response.body)


        expect(response.body[0].id).toBeDefined()
    })

    test('a valid blog can be added ', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: '-',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
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

    test('a valid blog without likes can be added ', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: '-'
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)


        const contents = blogsAtEnd[blogsAtEnd.length - 1]
        expect(contents).toEqual(expect.objectContaining({
            likes: 0
        }))

    })

    test('a invalid blog can t be create', async () => {
        const newBlog = {
            author: 'Edsger W. Dijkstra',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(400)

    })

    test('a blog can be deleted', async () => {
        // Create a new blog
        const newBlog = {
            title: 'Test Blog',
            author: 'John Doe',
            url: 'https://example.com',
            likes: 10,
        }

        const response = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
        const createdBlog = response.body

        // console.log(await helper.blogsInDb())

        // Delete the created blog
        await api
            .delete(`/api/blogs/${createdBlog.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        // console.log(resp.text)

        // console.log(await helper.blogsInDb())

        // Verify that the blog is deleted
        const blogsAtEnd = await helper.blogsInDb()
        const blogIds = blogsAtEnd.map(blog => blog.id)
        expect(blogIds).not.toContain(createdBlog.id)
    })

    test('update the information of a blog post', async () => {
        // Create a new blog
        const newBlog = {
            title: 'Test Blog',
            author: 'John Doe',
            url: 'https://example.com',
            likes: 10
        }

        const response = await api
            .post('/api/blogs').send(newBlog)
            .set('Authorization', `Bearer ${token}`)
        const createdBlog = response.body

        // Update the number of likes for the blog post
        const updatedBlog = {
            ...createdBlog,
            likes: 20
        }

        await api
            .put(`/api/blogs/${createdBlog.id}`).send(updatedBlog).expect(200)
            .set('Authorization', `Bearer ${token}`)

        // Verify that the blog post is updated
        const updatedResponse = await api
            .get(`/api/blogs/${createdBlog.id}`)
            .set('Authorization', `Bearer ${token}`)
        const updatedBlogPost = updatedResponse.body
        expect(updatedBlogPost.likes).toBe(updatedBlog.likes)
    })

})

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen',
        }

        await api
            .post('/api/users')
            // .set('Authorization', `Bearer ${token}`)
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    // test('creation fails with proper statuscode and message if username already taken', async () => {
    //     const usersAtStart = await helper.usersInDb()

    //     const newUser = {
    //         username: 'root',
    //         name: 'Superuser',
    //         password: 'salainen',
    //     }

    //     const result = await api
    //         .post('/api/users')
    //         .send(newUser)
    //         .expect(400)
    //         .expect('Content-Type', /application\/json/)

    //     expect(result.body.error).toContain('expected `username` to be unique')

    //     const usersAtEnd = await helper.usersInDb()
    //     expect(usersAtEnd).toEqual(usersAtStart)
    // })
})

afterAll(async () => {
    await mongoose.connection.close()
})
