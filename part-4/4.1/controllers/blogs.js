const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})


blogsRouter.post('/', async (request, response) => {
    const body = request.body

    try {

        if (!request.token) {
            return response.status(401).json({ error: 'token missing' })
        }

        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        const user = await User.findById(decodedToken.id)

        if (!user) {
            return response.status(401).json({ error: 'user not found' })
        }

        user.blogs = user.blogs || []

        if (!body.title || !body.url) {
            return response.status(400).json({ error: 'content missing' })
        }

        const blog = new Blog({
            title: body.title,
            author: body.author || 'Unknown',
            url: body.url,
            likes: body.likes || 0,
            user: user._id
        })

        const savedBlog = await blog.save()
        // console.log('savedBlog', savedBlog._id.toString())

        user.blogs = user.blogs || []
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

        response.status(201).json(savedBlog)
    } catch (error) {
        console.error(error)
        response.status(400).json({ error: 'bad request' })
    }
})

blogsRouter.delete('/:id', async (request, response) => {

    console.log(request.user)

    const user = request.user

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
        return response.status(401).json({ error: 'Blog not found' })
    }

    if (blog.user.toString() === user.id.toString()) {
        // Blog.findByIdAndRemove(request.params.id)
        //     .then(() => {
        //         response.status(204).end()
        //     })
        //     .catch(() => {
        //         response.status(400).json('Bad request')
        //     })
        return response.status(401).json({ error: 'azerhjksfghb' })
    } else {
        return response.status(401).json({ error: 'user not authorized' })
    }

})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const updatedBlog = {
        likes: body.likes
    }

    try {
        const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true })
        response.json(updated)
    } catch (error) {
        response.status(400).json('Bad request')
    }
})

blogsRouter.get('/:id', (request, response) => {
    const blogId = request.params.id

    Blog.findById(blogId)
        .then(blog => {
            if (blog) {
                response.json(blog)
            } else {
                response.status(404).json({ error: 'Blog not found' })
            }
        })
        .catch(() => {
            response.status(400).json('Bad request')
        })
})

module.exports = blogsRouter

