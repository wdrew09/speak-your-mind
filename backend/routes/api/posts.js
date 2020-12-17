const router = require('express').Router()
const { deleteOne } = require('../../models/post')
let Post = require('../../models/post')

//Get all posts
router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err))
})

//create a post
router.route('/add').post((req, res) => {
    const username = req.body.username
    const userId = req.body.userId
    const title = req.body.title
    const content = req.body.content

    const newPost = new Post({
        username,
        userId,
        title,
        content
    })

    newPost.save()
        .then(() => res.json('Post added!'))
        .catch(err => res.status(400).json('Error: ' + err))
})

//delete a post
router.route('/delete/:id').delete((req, res) => {
    // const postId = req.body.postId

    const deletedPost = new Post()
    deletedPost._id = req.params.id

    deletedPost.deleteOne((err, doc) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server error 2:'
            })
        }

        return res.send({
            success: true,
            message: 'Post Removed',
        })
    })
})


module.exports = router;