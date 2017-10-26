//npm i socket.io     VVVV
const io = require('socket.io')();

io.on('connection', (client)=>{
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            var d = new Date();
            var n = d.toString();
            client.emit('timer', n);
        }, interval);
      });
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);