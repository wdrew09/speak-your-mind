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
    console.log('like/:id')
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

    //Finding like count for the post and then calling updateForLikes
    let likeCount = 0
    Post.findById(likedPost)
        .then(post => {
            console.log('title', post.title)
            likeCount = post.likes
            updateForLikes(likedPosts, likedPost, req.body.userId, likeCount, req, res)
        })


})

//Updating values in Post and User database
const updateForLikes = (likedPosts, likedPost, userId, likeCount, req, res) => {
    console.log('update for likes')
    let success = false
    let message = ''
    let index = likedPosts.indexOf(likedPost)
    if (index < 0) {
        console.log('index less than 0')
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
        console.log('index greater than 0')
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
                let newArray = likedPosts.splice(index, 1)
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
                        console.log('send off 2')
                        sendOff(res, message, success)
                    });
            })

    }


    // if (message.length > 0) {
    //     return res.send({
    //         success: success,
    //         message: message
    //     })
    // }
}

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