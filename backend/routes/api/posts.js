const router = require('express').Router()
let Post = require('../../models/post')
const UserSession = require('../../models/userSession')
let User = require('../../models/user')

//Get all posts
router.route('/').get((req, res) => {
    Post.find()
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json('Error: ' + err))
})

//create a post
router.route('/add').post((req, res) => {

    let verified = verifyUser(req.body.token)
    if (!verified) {
        return res.send({
            success: false,
            message: 'Invalid Token'
        })
    }

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
            likedPosts = user.likedPosts

            //Finding like count for the post and then calling updateForLikes
            let likeCount = 0
            Post.findById(likedPost)
                .then(post => {
                    likeCount = post.likes
                    updateForLikes(likedPosts, likedPost, req.body.userId, likeCount, req, res)
                })
        })

})

//Updating values in Post and User database
const updateForLikes = (likedPosts, likedPost, userId, likeCount, req, res) => {
    let success = false
    let message = ''
    let index = likedPosts.indexOf(likedPost)
    if (index < 0) {
        Post.findByIdAndUpdate(likedPost, { likes: likeCount + 1 },
            function (err, docs) {
                if (err) {
                    message = 'Error: Server error '
                }
                else {
                    success = true
                    message = 'Added Like for post'
                }
            }).then(() => {
                User.findByIdAndUpdate(userId, { likedPosts: [...likedPosts, likedPost] },
                    function (err, docs) {
                        if (err) {
                            success = false
                            message = message + ('- Error: Server error')

                        }
                        else {
                            success = true && success
                            message = message + ('- Like added for user!')
                        }
                        sendOff(res, message, success)
                    });
            })
    } else {
        Post.findByIdAndUpdate(likedPost, { likes: likeCount - 1 },
            function (err, docs) {
                if (err) {
                    message = 'Error: Server error '
                }
                else {
                    success = true
                    message = 'like revoked for post '
                }
            }).then(() => {
                let newArray = likedPosts.filter(val => val !== likedPost)
                User.findByIdAndUpdate(userId, { likedPosts: newArray },
                    function (err, docs) {
                        if (err) {
                            success = false
                            message = message + ('Error: Server error')
                        }
                        else {
                            success = true && success
                            message = message + ('Like revoked for user!')
                        }
                        sendOff(res, message, success)
                    });
            })

    }
}

router.route('/dislike/:id').patch((req, res) => {
    //Making sure user has session token
    let verified = verifyUser(req.body.token)
    if (!verified) {
        return res.send({
            success: false,
            message: 'Invalid Token'
        })
    }

    let dislikedPost = req.params.id

    //Finding the users dislikes
    let dislikedPosts = []
    User.findById(req.body.userId)
        .then(user => {
            dislikedPosts = user.dislikedPosts

            //Finding dislike count for the post and then calling updateForDislikes
            let dislikeCount = 0
            Post.findById(dislikedPost)
                .then(post => {
                    dislikeCount = post.dislikes
                    updateForDislikes(dislikedPosts, dislikedPost, req.body.userId, dislikeCount, req, res)
                })
        })

})

//Updating values in Post and User database
const updateForDislikes = (dislikedPosts, dislikedPost, userId, dislikeCount, req, res) => {
    let success = false
    let message = ''
    let index = dislikedPosts.indexOf(dislikedPost)
    if (index < 0) {
        Post.findByIdAndUpdate(dislikedPost, { dislikes: dislikeCount + 1 },
            function (err, docs) {
                if (err) {
                    message = 'Error: Server error '
                }
                else {
                    success = true
                    message = 'Added Dislike for post'
                }
            }).then(() => {
                User.findByIdAndUpdate(userId, { dislikedPosts: [...dislikedPosts, dislikedPost] },
                    function (err, docs) {
                        if (err) {
                            success = false
                            message = message + ('- Error: Server error')

                        }
                        else {
                            success = true && success
                            message = message + ('- Dislike added for user!')
                        }
                        sendOff(res, message, success)
                    });
            })
    } else {
        Post.findByIdAndUpdate(dislikedPost, { dislikes: dislikeCount - 1 },
            function (err, docs) {
                if (err) {
                    message = 'Error: Server error '
                }
                else {
                    success = true
                    message = 'dislike revoked for post '
                }
            }).then(() => {
                let newArray = dislikedPosts.filter(val => val !== dislikedPost)
                User.findByIdAndUpdate(userId, { dislikedPosts: newArray },
                    function (err, docs) {
                        if (err) {
                            success = false
                            message = message + ('Error: Server error')
                        }
                        else {
                            success = true && success
                            message = message + ('Dislike revoked for user!')
                        }
                        sendOff(res, message, success)
                    });
            })

    }
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

const sendOff = (res, message, success) => {
    return res.send({
        success: success,
        message: message
    })
}

const verifyUser = (token) => {
    return UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            return false
        }
        if (sessions.length != 1) {
            return false
        } else {
            return true
        }
    })
}


module.exports = router;