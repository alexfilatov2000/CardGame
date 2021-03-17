const http = require('http');
const Koa = require('koa');
const serve =  require ('koa-static');
const bodyParser = require('koa-bodyparser');
const cors = require ('@koa/cors')
const session = require('koa-session');
const render = require('koa-ejs');
const path = require('path');
const { restRouter } = require('./src/routes/users');

const app = new Koa();
const server = http.createServer(app.callback());
const io = require('socket.io')(server);
global.io = io; //todo: - delete global variable
const PORT = 3000;

render(app, {
    root: path.join(__dirname, '/src/views'),
    layout: false,
    viewExt: 'html',
    cache: false,
});

app.keys = ['Shh, its a secret!'];
app.use(bodyParser());
app.use(serve(path.join(__dirname, '/src/public')));
app.use(session(app));
app.use(cors());
app.use(restRouter.routes());

app.use(async(ctx, next) => {
    try {
        await next()
        const status = ctx.status || 404
        if (status === 404) {
            ctx.throw(404)
        }
    } catch (err) {
        ctx.status = err.status || 500
        if (ctx.status === 404) {
            await ctx.render('404')
        } else {
            await ctx.render('other_error')
        }
    }
})

io.on('connection', socket => {
    socket.removeAllListeners();

    socket.on('create', (room) => {
        socket.join(room);
    })

    socket.on('move', (room, data) => {
        socket.to(room).emit('moveall',data);
    })

    socket.on('setRandCard', (room, data) => {
        io.to(room).emit('getRandCard', data);
    })

    socket.on('setStartThreeCards', (room, data) => {
        io.to(room).emit('getStartThreeCards', data);
    })

})


server.listen(PORT, () => {
    console.log(`Koa started on PORT ${PORT}`);
});
