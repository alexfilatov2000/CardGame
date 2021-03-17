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
            let card = new Card();
            let firstThreeCardsForFirstPlayer = await card.getFirstThreeCardsForFirstPlayer();

            await ctx.render('gameByCode', {
                login: ctx.session.userId,
                code: code,
                card1: firstThreeCardsForFirstPlayer,
            })
        }
    }

    static async getRandCard(ctx) {
        let card = new Card();
        let randCard = await card.getRandomCard(1, 20);
        randCard.img = `/assets/images/${randCard.id}.png`
        ctx.body = randCard;
    }

    static async startThreeCards(ctx) {
        let card = new Card();
        let firstThreeCardsForFirstPlayer = await card.getFirstThreeCardsForFirstPlayer(1, 20);
        for (let i = 0; i < 3; i++){
            firstThreeCardsForFirstPlayer[i].img = `/assets/images/${firstThreeCardsForFirstPlayer[i].id}.png`
        }
        ctx.body = firstThreeCardsForFirstPlayer;
    }
}