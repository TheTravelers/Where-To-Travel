const bcrypt = require('bcryptjs')
module.exports = {
    login: async (req, res) => {
        const {email, password} = req.body
        const db = req.app.get('db')
        let [user] = await db.auth.find_user(email)

        if(!user){
            return res.status(401).send('Email or Password Incorrect. Please try again or register.')
        }
        let isAuthenticated = bcrypt.compareSync(password, user.hash)
        if(!isAuthenticated){
            return res.status(401).send('Email or Password Incorrect. Please try again or register.')
        }
        delete user.hash
        req.session.user = user
        res.status(200).send(req.session.user)
    },
    register: async (req, res) => {
        const {email, password, name} = req.body
        const db = req.app.get('db')
        let [user] = await db.auth.find_user(email)
        if(user){
            return res.status(400).send('Email already in use. Please sign-in')
        }
        let salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync(password, salt)
        let [newUser] = await db.auth.create_user(email, hash, name)
        delete newUser.hash
        req.session.user = newUser
        res.status(200).send(req.session.user)
    },
    logout: ( req, res ) => {
        req.session.destroy()
        return res.sendStatus(200)
    },
    // getUser: async(req, res) => {
    //     let user = req.session.user
    //     const db = req.app.get('db')
    //     if(user){
    //         await db.auth.find_user(email)
    //     }
    // }
}