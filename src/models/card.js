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
}

module.exports.Card = Card;