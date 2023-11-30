const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then(blogs => {
        response.json(blogs)
    })
})

blogsRouter.post('/api/blogs', (request, response) => {
    const body = request.body

    // Check if title and url are provided
    if (!body.title || !body.url) {
        return response.status(400).json({ error: 'Title and URL are required' });
    }

    const blog = new Blog({
        title: body.title,
        author: body.author || null,
        url: body.url,
        likes: body.likes || 0
    })

    blog.save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => {
            response.status(400).json('Bad request')
        })
})

module.exports = blogsRouter
