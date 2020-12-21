const router = require('express').Router()
let Post = require('../../models/post')
const UserSession = require('../../models/userSession')
let User = require('../../models/user')
const user = require('../../models/user')

//Get all posts
router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err))
})

//create a post
router.route('/add').post((req, res) => {
    console.log('add post')
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

    newPost.save((err, post) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: server error'
            })
        }
        return res.send({
            success: true,
            message: 'Signed up'
        })
    })
})

//Like a post
router.route('/like/:id').patch((req, res) => {
    //Making sure user has session token
    let verified = verifyUser(req.body.token)
    if (!verified) {
        return res.send({
            success: false,
            message: 'Invalid Token'
        })
    }

    let likedPost = req.params.id

    //Finding the users likes
    let likedPosts = []
    User.findById(req.body.userId)
        .then(user => {
            console.log('likedposts', user.likedPosts)
            likedPosts = user.likedPosts
        })

    //Finding like count for the post
    let likeCount = 0
    Post.findById(likedPost)
        .then(post => {
            likeCount = post.likes
        })

    //Updating values in Post and User database
    let arrayIndex = likedPosts.indexOf(likedPost)
    // console.log('liked post', likedPost)
    // console.log('liked posts', likedPosts)
    console.log(likedPosts)
    console.log(likedPost)
    console.log('index', likedPosts.indexOf(likedPost))
    if (likedPosts.indexOf(likedPost) < 0) {
        Post.findByIdAndUpdate(likedPost, { likes: likeCount + 1 })
        User.findByIdAndUpdate(req.body.userId, { likedPosts: [...likedPosts, likedPost] },
            function (err, docs) {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    })
                }
                else {
                    return res.send({
                        success: true,
                        message: 'Post Liked!'
                    })
                }
            });
    } else {
        Post.findByIdAndUpdate(likedPost, { likes: likeCount - 1 })
        User.findByIdAndUpdate(req.body.userId, { likedPosts: likedPosts.splice(arrayIndex, 1) },
            function (err, docs) {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    })
                }
                else {
                    return res.send({
                        success: true,
                        message: 'Liked Revoked!'
                    })
                }
            });
    }

})

const verifyUser = (token) => {
    return UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            console.log(err)
            return false
        }
        if (sessions.length != 1) {
            console.log('too many sessions')
            return false
        } else {
            console.log('valid')
            return true
        }
    })
}



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