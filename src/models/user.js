const pool = require('../db/db');

class User{
    constructor() {
        this.pool = pool;
        this.table = 'userInfo';
    }
    async findByEmail(email){
        let x = await this.pool.query(`SELECT * FROM userInfo WHERE email="${email}" LIMIT 1`);
        return x[0];
    }
    async findByLogin(login){
        let x = await this.pool.query(`SELECT * FROM userInfo WHERE login="${login}" LIMIT 1`);
        return x[0];
    }
    async findByCode(code){
        let x = await this.pool.query(`SELECT * FROM userInfo WHERE code="${code}" LIMIT 1`);
        return x[0];
    }

    async setActiveStatusByLogin(login){
        await this.pool.query(`UPDATE ${this.table} SET status=1 WHERE login="${login}"`);
    }
    async setInactiveStatusByLogin(login){
        await this.pool.query(`UPDATE ${this.table} SET status=0 WHERE login="${login}"`);
    }
    async updatePswByEmail(email, psw){
        await this.pool.query(`UPDATE ${this.table} SET password="${psw}" WHERE email="${email}"`);
    }

    async setGameCodeByLogin(login, code){
        await this.pool.query(`UPDATE ${this.table} SET code="${code}" WHERE login="${login}"`);
    }

    async save(obj){
        await this.pool.query(`INSERT INTO ${this.table} (name, login, email, password) 
            VALUES("${obj.name}", "${obj.login}", "${obj.email}", "${obj.password}")`);
    }
}

module.exports.User = User;