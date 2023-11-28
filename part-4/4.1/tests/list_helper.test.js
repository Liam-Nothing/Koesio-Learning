const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: '-',
            likes: 5,
            __v: 0
        }
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('favorite blog', () => {
    const listWithBlogs = [
        {
            _id: '5a422aa71b54a676234d17f1',
            title: 'Go To Statement Considered Harmful 0',
            author: 'Edsger W. Dijkstra',
            likes: 7, // Random value
            // __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f2',
            title: 'Go To Statement Considered Harmful 2',
            author: 'Edsger W. Dijkstra',
            likes: 12, // Random value
            // __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f3',
            title: 'Go To Statement Considered Harmful 3',
            author: 'Edsger W. Dijkstra',
            likes: 5, // Random value
            // __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f4',
            title: 'Go To Statement Considered Harmful 4',
            author: 'Edsger W. Dijkstra',
            likes: 3, // Random value
            // __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f5',
            title: 'Go To Statement Considered Harmful 5',
            author: 'Edsger W. Dijkstra',
            likes: 12, // Random value
            // __v: 0
        }
    ]

    test('when list has multiple blogs, equals the blog with most likes', () => {
        const result = listHelper.favoriteBlog(listWithBlogs)
        expect(result).toEqual(listWithBlogs[4])
        // console.log(result)
    })
})