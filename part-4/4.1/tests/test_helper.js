const Blog = require('../models/blog')
const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const initialBlogs = [
    { 'title': 'test' },
    { 'title': 'test', 'author': 'test', 'url': 'test', 'likes': 150 },
    { 'title': 'test', 'author': 'test', 'url': 'test1', 'likes': 111 }
]

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb
}
