const express = require('express');
const socket = require('socket.io');

//app setup
app = express();
const server = app.listen(4000,function(){
    console.log('Listening to port 4000');
});

//static file
app.use(express.static('/public'));

//socket setup
const io = socket(server);

io.on('connection',function(socket){
    console.log('made socket connection',socket.id);

    //handle chat events
    socket.on('chat',function(data){
        io.sockets.emit('chat',data)
    });

    socket.on('typing', function(data){
        socket.broadcast.emit('typing',data)
    });

});

