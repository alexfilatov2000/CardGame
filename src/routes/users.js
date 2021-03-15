const Router = require('koa-router');
const userController = require('../controllers/users');
const homeController = require('../controllers/home');
const restRouter = new Router();
module.exports.restRouter = restRouter;

restRouter.post('/register', userController.redirectHome, userController.registerPost);
restRouter.post('/login', userController.redirectHome, userController.loginPost);
restRouter.post('/logout', userController.logoutPost);
restRouter.post('/remindPsw', userController.redirectHome, userController.remindPswPost);
restRouter.get('/register', userController.redirectHome, userController.registerGet);
restRouter.get('/login', userController.redirectHome, userController.loginGet);
restRouter.get('/remindPsw', userController.redirectHome, userController.remindPswGet);

restRouter.post('/createNewGame', userController.redirectLogin, homeController.createNewGame);
restRouter.post('/joinGame', userController.redirectLogin, homeController.joinGame);
restRouter.get('/', userController.redirectLogin, homeController.homeGet);
restRouter.get('/game', userController.redirectLogin, homeController.game);
restRouter.get('/game/:code', userController.redirectLogin, homeController.gameByCode);


