const Joi = require('joi');

module.exports.registerSchema = Joi.object({
    name: Joi.string().min(3).required(),
    login: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
    password2: Joi.ref('password'),
});

module.exports.loginSchema = Joi.object({
    login: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
});

module.exports.remindPswSchema = Joi.object({
    email: Joi.string().min(6).required().email()
});