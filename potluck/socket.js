const io = require('socket.io')();

function getApiAndEmit () {
    return true
  }

io.on('connection', (client)=>{
    console.log("Client connected");
    client.on('getList', (interval)=>{
        console.log("client subbed to getList")
        setInterval(()=>{
            client.emit('checkList', getApiAndEmit());
        }, interval);
    });
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ', interval);
        setInterval(() => {
            var d = new Date();
            var c = d.toString();
            client.emit('timer', c);
        }, interval);
    });
    client.on('disconnect', ()=>{console.log("Client disconnected")});
});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);