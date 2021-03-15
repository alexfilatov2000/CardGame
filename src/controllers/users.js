const argon2 = require('argon2');
const shortid = require('shortid');
const {User} = require('../models/user');
const {registerSchema, loginSchema, remindPswSchema} = require('../validateUser');
const nodemailer = require('nodemailer')
const {myInfo} = require('../../config');
const {resetPasswordTemplate} = require('../mailer');

module.exports = class UserController {

    static redirectLogin = async (ctx, next) => {
        if (!ctx.session.userId){
            ctx.redirect('/login')
        } else {
            await next();
        }
    }

    static redirectHome = async (ctx, next) => {
        if (ctx.session.userId){
            ctx.redirect('/')
        } else {
            await next();
        }
    }
    static async registerPost(ctx) {
        const user = new User();
        const { error } = registerSchema.validate(ctx.request.body);
        if (error) {
            ctx.session.error = error.message;
            ctx.redirect('/register');
        } else if (await user.findByEmail(ctx.request.body.email)){
            // Checking if the user is already in the database
            ctx.session.error = 'Email is already exist';
            ctx.redirect('/register');
        } else if (await user.findByLogin(ctx.request.body.login)) {
            ctx.session.error = 'Login is already exist';
            ctx.redirect('/register');
        } else {
            // Hash password
            const hash = await argon2.hash(ctx.request.body.password);
            // Create a new user
            const newUser = {};
            newUser.name = ctx.request.body.name;
            newUser.login = ctx.request.body.login;
            newUser.email = ctx.request.body.email
            newUser.password = hash

            await user.save(newUser);
            ctx.session.error = '';
            ctx.session.loginErr = ''
            ctx.redirect('/login')
        }
    }
    static async loginPost(ctx) {
        const user = new User();
        const { error } = loginSchema.validate(ctx.request.body);
        if (error) {
            ctx.session.loginErr = error.message;
            return ctx.redirect('/login');
        }
        // Checking if the email exists
        const userByLogin = await user.findByLogin(ctx.request.body.login);
        if (!userByLogin){
            ctx.session.loginErr = 'Login is not found';
            return ctx.redirect('/login');
        }
        // Password is correct
        const validPass = await argon2.verify(
            userByLogin.password,
            ctx.request.body.password,
        );
        if (!validPass){
            ctx.session.loginErr = 'Invalid password';
            return ctx.redirect('/login');
        }

        await user.setActiveStatusByLogin(ctx.request.body.login);
        ctx.session.loginErr = '';
        ctx.session.userId = ctx.request.body.login;
        ctx.redirect('/');
    }

    static async logoutPost(ctx) {
        const user = new User();
        await user.setInactiveStatusByLogin(ctx.session.userId)
        ctx.session.userId = null;
        ctx.redirect('/login');
    }

    static async remindPswPost(ctx){
        const user = new User();
        const { error } = remindPswSchema.validate(ctx.request.body);
        if (error) {
            ctx.session.remindErr = error.message;
            return ctx.redirect('/remindPsw');
        }
        const userByEmail = await user.findByEmail(ctx.request.body.email);
        if (!userByEmail){
            ctx.session.remindErr = 'Email is not found';
            return ctx.redirect('/remindPsw');
        }
        const newPsw = shortid.generate();
        const hash = await argon2.hash(newPsw);
        await user.updatePswByEmail(ctx.request.body.email, hash);

        let userToReset = await user.findByEmail(ctx.request.body.email);
        let emailTemplate = resetPasswordTemplate(userToReset, newPsw);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: myInfo.email,
                pass: myInfo.password,
            },
        });
        const info = await transporter.sendMail(emailTemplate);

        ctx.redirect('/login');
    }

    static async registerGet(ctx) {
        if (typeof ctx.session.error === 'undefined') {
            ctx.session.error = '';
        }
        await ctx.render('register',{
            error: ctx.session.error
        });
    }

    static async loginGet(ctx) {
        if (typeof ctx.session.loginErr === 'undefined') {
            ctx.session.loginErr = '';
        }
        await ctx.render('login',{
            error: ctx.session.loginErr
        });
    }


    static async remindPswGet(ctx) {
        if (typeof ctx.session.remindErr === 'undefined') {
            ctx.session.remindErr = '';
        }
        await ctx.render('remindPsw',{
            error: ctx.session.remindErr
        });
    }
}