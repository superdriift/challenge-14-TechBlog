const router = require('express').Router();
const db = require('../models')
const withAuth = require('../utils/auth')
const Post = require('../models/Post');
const User = require('../models/User')
// const { Post, User } = require('../models')



router.get('/', async (req, res) => {
    res.render('homepage')
})

router.get('/login', async (req, res) => {
    res.render('login')
})

router.get('/posts', withAuth, async (req, res) => {

    const dbPosts = await db.Post.findAll({
        include: 'user',
        order: [['id', 'DESC']]
    });

    console.log(dbPosts);


    const postData = dbPosts.map(post => post.get({ plain: true }));

    res.render('posts', {
        username: req.session.username,
        postData
    })
})

router.post('/signup', async (req, res) => {
    const newUser = await db.User.create(req.body);
    const simpleUser = newUser.get({ plain: true });

    req.session.save(() => {
        req.session.loggedIn = true;
        req.session.username = req.body.username;
        req.session.user_id = simpleUser.id;
        res.json(newUser);
    })
})

router.post('/login', async (req, res) => {
    try {
        // we search the DB for a user with the provided email
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            // the error message shouldn't specify if the login failed because of wrong email or password
            res.status(404).json({ message: 'Login failed. Please try again!' });
            return;
        }
        // use `bcrypt.compare()` to compare the provided password and the hashed password
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        );
        // if they do not match, return error message
        if (!validPassword) {
            res.status(400).json({ message: 'Login failed. Please try again!' });
            return;
        }
        // if they do match, return success message
        res.status(200).json({ message: 'You are now logged in!' });
        req.session.save(() => {
            req.session.loggedIn = true
            req.session.username = req.body.username;
            req.session.user_id = simpleUser.id;
        });
        res.render('posts')
    } catch (err) {
        res.status(500).json({ message: 'This one?'});
    }
})

router.post('/posts', withAuth, async (req, res) => {
    const newPost = await db.Post.create({
        user_id: req.session.user_id,
        body: req.body.body
    });

    res.json(newPost);
})



module.exports = router;