const io = require('socket.io')();
const axios = require('axios');

function getApiAndEmit () {
    // try {
    //   axios.get('localhost:5000/houses').then(function(data){
    //       console.log(data)
    //       return res.json
    //   }, function(err){
    //       console.log(err)
    //   })
    //   console.log(res.data);
    //   return res.json
    // } catch (error) {
    //   console.error(`Error: ${error.code}`);
    // }
    return true
  }

io.on('connection', (client)=>{
    console.log("Client connected");
    client.on('getList', (interval)=>{
        console.log("client subbed to getList")
        setInterval(()=>{
            console.log(getApiAndEmit());
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

// io.on("connection", socket => {
//   console.log("New client connected");

//   socket.on('subscribeToTimer', (interval) => {
//     console.log('client is subscribing to timer with interval ', interval);
//     var d = new Date();
//     var c = d.toString();
//     setInterval(() => {
//         socket.emit('timer', c);
//     }, interval);
//   });

//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

const port = 8000;
io.listen(port);
console.log('listening on port ', port);