const router = require('express').Router()
let User = require('../../models/user')
const UserSession = require('../../models/UserSession')

//Get a list of all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

//sign up a user
router.route('/create').post((req, res) => {
    const { body } = req
    const {
        username,
        password
    } = body
    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank'
        })
    }

    User.find({
        username: username
    }, (err, previousUsers) => {
        if (err) {
            console.log('46 err', err)
            return res.send({
                success: false,
                message: 'Error: server error'
            })
        } else if (previousUsers.length > 0) {
            console.log('username already in use')
            return res.send({
                success: false,
                message: 'Error: account already exists'
            })
        }

        //save new user
        const newUser = new User()
        newUser.username = username
        newUser.password = newUser.generateHash(password)
        newUser.save((err, user) => {
            if (err) {
                console.log('err line 52', err)
                return res.send({
                    success: false,
                    message: 'Error: server error'
                })
            }
            console.log('successful creation of user')
            return res.send({
                success: true,
                message: 'Signed up'
            })

        })
    })
})

//login a user
router.route('/login').post((req, res) => {
    const { body } = req
    const {
        username,
        password
    } = body
    console.log(username, password)

    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank'
        })
    }

    User.find({
        username: username
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server error 1'
            })
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Invalid Username'
            })
        }

        const user = users[0]
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Invalid Password'
            })
        }

        const userSession = new UserSession()
        userSession.userId = user._id
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Server error 2:'
                })
            }

            console.log(doc)
            return res.send({
                success: true,
                message: 'Valid sign in',
                token: doc._id,
                userId: doc.userId,
            })
        })
    })
})

//logout a user
router.route('/logout').get((req, res) => {
    const { query } = req
    const { token } = query
    console.log('logout')
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: {
            isDeleted: true
        }
    }, null, (err, sessions) => {
        if (err) {
            console.log('err', err)
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        console.log('good')
        // localStorage.clear()
        return res.send({
            success: true,
            message: 'Good'
        })

    })
})

//Verify user
router.route('/verify').get((req, res) => {
    //get token and verify is unique
    const { query } = req
    const { token } = query
    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Invalid Session'
            })
        } else {
            return res.send({
                success: true,
                message: 'Good'
            })
        }
    })
})

//delete a user
router.route('/delete').post((req, res) => {
    const { body } = req
    const {
        username,
        password,
    } = body

    if (!username) {
        return res.send({
            success: false,
            message: 'Error: Username cannot be blank'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Password cannot be blank'
        })
    }

    User.find({
        username: username
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server error 1'
            })
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Invalid Username'
            })
        }

        const user = users[0]
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Invalid Password'
            })
        }

        const newUser = new User()
        newUser._id = user._id
        newUser.deleteOne((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Server error 2:'
                })
            }

            return res.send({
                success: true,
                message: 'User Removed',
            })
        })
    })
})

module.exports = router  