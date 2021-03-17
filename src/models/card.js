const pool = require('../db/db');

class Card {
    constructor() {
        this.pool = pool;
        this.table = 'cardInfo';
    }
    async getRandomCard(min, max){
        let rand = min + Math.random() * (max + 1 - min);
        let id = Math.floor(rand);
        let x = await this.pool.query(`SELECT * FROM ${this.table} WHERE id="${id}" LIMIT 1`);
        return x[0];
    }

    async getFirstThreeCardsForFirstPlayer(min, max){
        let rand = min + Math.random() * (max + 1 - min);
        let id = Math.floor(rand);
        let x = await this.pool.query(`SELECT * FROM ${this.table} WHERE id="${id}" LIMIT 1`);

        let rand2 = min + Math.random() * (max + 1 - min);
        let id2 = Math.floor(rand2);
        let y = await this.pool.query(`SELECT * FROM ${this.table} WHERE id="${id2}" LIMIT 1`);

        let rand3 = min + Math.random() * (max + 1 - min);
        let id3 = Math.floor(rand3);
        let z = await this.pool.query(`SELECT * FROM ${this.table} WHERE id="${id3}" LIMIT 1`);
        return [x[0], y[0], z[0]];
    }

    async getFirstThreeCardsForSecondPlayer(){
        let x = await this.pool.query(`SELECT * FROM ${this.table} WHERE id="${19}" LIMIT 1`);
        let y = await this.pool.query(`SELECT * FROM ${this.table} WHERE id="${7}" LIMIT 1`);
        let z = await this.pool.query(`SELECT * FROM ${this.table} WHERE id="${9}" LIMIT 1`);
        return [x[0], y[0], z[0]];
    }
}

module.exports.Card = Card;