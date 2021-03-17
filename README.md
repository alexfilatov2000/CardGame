<h1 align="center">
  Marvel Battlefield
</h1>

<h4 align="center">What is Marvel Battlefield</h4>
<div>
  <p style="text-align: center">It's simple online card game with marvel cards for two players. You will have 3 pages for registration(register, login, remindPsw) and 2 pages for game(one for creating code and start the game by this code or find opponent by already existed game code. And second one it's a main page for battle which include 2 players.</p>
</div>


## Technologies

- ### Back end

  - [Koa](https://koajs.com/)- Nodejs framwork for building the REST Apis
  - [Koa-router](https://www.npmjs.com/package/koa-router)- for routing
  - [Nodemailer](https://nodemailer.com)- for mail
  - [Koa-bodyparser](https://koajs.com)- for post routes
  - [MySQL](https://www.mysql.com)- SQL database
  - [Shortid](https://github.com/dylang/shortid#readme)- for code game
  - [Argon2](https://github.com/ranisalt/node-argon2#readme)- hash password
  - [@hapi/joi](https://github.com/hapijs/joi#readme)- user validation
  - [koa-session](https://github.com/koajs/session)- to identify user
  - [koa-ejs](https://www.npmjs.com/package/koa-ejs)- for dynamic HTML
  - [socket.io](https://socket.io)- for multiplayer game
  

- ### Front end

  - [HTML]
  - [CSS](https://getbootstrap.com/)


## ☑ TODO

- [X] custom design
- [X] User authorization. Primarily about registration, so I'll use "@hapi/joi" module for validation email and password, and "argon2" module to hash password, if everything correct I'll sent all data to database. Now about logIn, here we will use the same validation as in registration and verify password hash with "argon2"
- [x] Drop and down.
- [ ] Fight battle


## License

MIT
