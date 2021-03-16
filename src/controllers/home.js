const shortid = require('shortid');
const {User} = require('../models/user');
const {Card} = require('../models/card');

module.exports = class HomeController {
    static async homeGet(ctx) {
        let user = new User();
        await user.setGameCodeByLogin(ctx.session.userId, '0');
        await ctx.render('home', {
            login: ctx.session.userId
        })
    }
    static async createNewGame(ctx) {
        let user = new User();
        ctx.session.gameCode = shortid.generate();
        await user.setGameCodeByLogin(ctx.session.userId, ctx.session.gameCode);
        return ctx.redirect('/game');
    }

    static async joinGame(ctx) {
        let user = new User();
        const {code} = ctx.request.body;
        const userData = await user.findByCode(code);
        if (userData){
            return ctx.redirect(`/game/${userData.code}`);
        } else {
            return ctx.redirect('/');
        }
    }

    static async game(ctx) {
        await ctx.render('game', {
            gameCode: ctx.session.gameCode
        })
    }

    static async gameByCode(ctx) {
        let user = new User();
        const code = ctx.params.code;
        const userData = await user.findByCode(code);
        if (!userData){
            return ctx.render('404');
        } else {

            io.on('connection', socket => {
                socket.removeAllListeners();

                socket.on('create', (room, data) => {
                    socket.join(room);
                    socket.to(room).emit('startCards',data);
                })

                socket.on('move',function(room, data){
                    socket.to(room).emit('moveall',data);
                    console.log(222);
                })

            })
            let card = new Card();
            let firstCard = await card.getRandomCard(1, 20);
            let secondCard = await card.getRandomCard(1, 20);
            let thirdCard = await card.getRandomCard(1, 20);
            console.log(firstCard);

            await ctx.render('gameByCode', {
                login: ctx.session.userId,
                code: code,
                card1: firstCard,
                card2: secondCard,
                card3: thirdCard,
            })
        }
    }
}