const router = require('express').Router();
const db = require('../models')
const withAuth = require('../utils/auth')
const Post = require('../models/Post');
const User = require('../models/User')
// const { Post, User } = require('../models')
const { traceDeprecation } = require('process');


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

router.post('/posts', withAuth, async (req, res) => {
    const newPost = await db.Post.create({
        user_id: req.session.user_id,
        body: req.body.body
    });

    res.json(newPost);
})



module.exports = router;