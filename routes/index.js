const express = require('express');
const router = express.Router();

const postsRouter = require('./post');
const commentsRouter = require('./comment');
const usersRouter = require('./user');
const googleAuthRouter = require('./googleAuth');

const ExpressError = require('../utils/ExpressError')

router.use('/explore', postsRouter);
router.use('/explore/:id/comments', commentsRouter);
router.use('/users', usersRouter);
router.use('/', googleAuthRouter);

router.get('/', (req, res) => {
    res.redirect('/explore');
});

router.all("*", (req, res, next) => {
    next(new ExpressError(404, "This page does not exist."));
});

module.exports = router;