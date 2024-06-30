const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.js');
const passport = require('passport');
const multer = require('multer');
const { storage_profile } = require('../cloudeConfig.js');
const wrapAsync = require('../utils/wrapAsync.js');
const pic_upload = multer({ storage: storage_profile });

const { authMiddleware, commentMiddleware, postMiddleware, userMiddleware, errorHandler } = require('../middlewares/index.js')

// Signup and Login routes
router.route('/signup')
    .get(userController.getSignupForm)
    .post(userController.signup);

router.route('/login')
    .get(userController.getLoginForm)
    .post(
        authMiddleware.saveRedirectUrl,
        passport.authenticate('local', {
            failureRedirect: '/users/login',
            failureFlash: true
        }),
        userController.login
    );

router.get('/logout', userController.logout);

// Google OAuth routes
router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/users/login',
        failureFlash: true
    }), (req, res) => {
        req.flash("success", `Welcome ${req.user.username}`);
        res.redirect('/explore');
    }
);

// Profile setup routes
router.route('/setup-profile')
    .get(
        authMiddleware.isLoggedIn,
        userController.getProfileSetupForm
    )
    .post(
        authMiddleware.isLoggedIn,
        pic_upload.single('post[image]'),
        userController.setupProfile
    );

// User profile routes
router.get('/:userId/profile',
    userController.showUser
);

router.route('/:userId/profile/edit')
    .get(
        authMiddleware.isLoggedIn,
        userController.renderEditProfileForm
    )
    .put(
        authMiddleware.isLoggedIn,
        pic_upload.single('post[image]'),
        wrapAsync(userController.editProfile)
    );

module.exports = router;