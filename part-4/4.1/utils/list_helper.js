const _ = require('lodash')

// Example helper function
const dummy = () => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
}

const mostBlogs = (blogs) => {
    // Count the number of blogs for each author
    const blogCounts = _.countBy(blogs, 'author')

    // Convert the object to an array of [author, count] pairs
    const authorBlogPairs = _.toPairs(blogCounts)

    // Find the pair with the highest count
    const [author, count] = _.maxBy(authorBlogPairs, 1)

    // Return the result in the desired format
    return {
        author,
        blogs: count
    }
}

const mostLikes = (blogs) => {

    const blogsByAuthor = _.groupBy(blogs, 'author')

    // Sum the likes for each author
    const likesByAuthor = _.mapValues(blogsByAuthor, (authorBlogs) => {
        return _.sumBy(authorBlogs, 'likes')
    })

    // Convert the object to an array of [author, totalLikes] pairs
    const authorLikesPairs = _.toPairs(likesByAuthor)

    // Find the pair with the highest total likes
    const [author, totalLikes] = _.maxBy(authorLikesPairs, pair => pair[1])

    // Return the result in the desired format
    return {
        author,
        likes: totalLikes
    }
}


// const mostBlogs = (blogs) => {
//     const temp_most_blog = {}
//     for (const [, blog] of Object.entries(blogs)) {
//         if (temp_most_blog[blog.author]) {
//             temp_most_blog[blog.author]++
//         } else {
//             temp_most_blog[blog.author] = 1
//         }
//     }
// }

// const mostBlogsCORR = (blogs) => {
//     const authors = blogs.reduce((authors, blog) => {
//         if (authors[blog.author]) {
//             authors[blog.author]++
//         } else {
//             authors[blog.author] = 1
//         }
//         return authors
//     }, {})
//     return Object.keys(authors).reduce((max, author) => authors[max] > authors[author] ? max : author)
// }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
