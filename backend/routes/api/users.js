const router = require('express').Router()
let User = require('../../models/user')
const UserSession = require('../../models/userSession')

//Get a list of all users
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/info').post((req, res) => {
    User.findById(req.body.userId)
        .then(user => {
            return res.send({
                success: true,
                user: user
            })
        })
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
            return res.send({
                success: false,
                message: 'Error: server error'
            })
        } else if (previousUsers.length > 0) {
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
})

//login a user
router.route('/login').post((req, res) => {
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
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Server error'
            })
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Invalid Username or Password'
            })
        }

        const user = users[0]
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Invalid Username or Password'
            })
        }

        const userSession = new UserSession()
        userSession.userId = user._id
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Server error'
                })
            }

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
    logout(req, res)
})

const logout = (req, res) => {
    const { query } = req
    const { token } = query
    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: {
            isDeleted: true
        }
    }, null, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error'
            })
        }
        return res.send({
            success: true,
            message: 'Good'
        })

    })
}

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
                message: 'Server error...'
            })
        }
        if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Invalid Username or Password'
            })
        }

        const user = users[0]
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Invalid Username or Password'
            })
        }

        const newUser = new User()
        newUser._id = user._id
        newUser.deleteOne((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Server error...'
                })
            }

            return res.send({
                success: true,
                message: 'Account Deleted.',
            })
        })
    })
})

module.exports = router  