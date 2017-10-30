const io = require('socket.io')();
var total = 0;

function getApiAndEmit () {
    return true
  }
  function addClient(){
    total+=1;
  }
  function removeClient(){
      total-=1;
  }

io.on('connection', (client)=>{
    console.log("Client connected");
    addClient();
    console.log("Total clients: " + total);
    client.on('getList', (interval)=>{
        console.log("client subbed to getList")
        setInterval(()=>{
            client.emit('checkList', getApiAndEmit());
        }, interval);
    });
    client.on('subscribeToTimer', (interval) => {
        console.log('client is subscribing to timer with interval ' + interval);
        setInterval(() => {
            var d = new Date();
            var c = d.toString();
            client.emit('timer', c);
        }, interval);
    });
    client.on('disconnect', ()=>{
        removeClient();
        console.log("Client disconnected");
        console.log("Total clients: " + total);
    });
});


const port = 8000;
io.listen(port);
console.log('listening on port ', port);