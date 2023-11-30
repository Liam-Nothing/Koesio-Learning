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
        .catch(() => {
            response.status(400).json('Bad request')
        })
})

blogsRouter.delete('/api/blogs/:id', (request, response) => {
    Blog.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(() => {
            response.status(400).json('Bad request')
        })
})

blogsRouter.put('/api/blogs/:id', async (request, response) => {
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



blogsRouter.get('/api/blogs/:id', (request, response) => {
    const blogId = request.params.id;

    Blog.findById(blogId)
        .then(blog => {
            if (blog) {
                response.json(blog);
            } else {
                response.status(404).json({ error: 'Blog not found' });
            }
        })
        .catch(() => {
            response.status(400).json('Bad request');
        });
});

module.exports = blogsRouter;

