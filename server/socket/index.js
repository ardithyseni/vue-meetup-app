module.exports = function (io) {

    io.on('connection', function(socket) { 
        
        console.log('a user connected') 

        // This is coming from our client
        socket.on('meetup/postSave', function(post) {
            // This is going to our client
            io.emit('meetup/postPublished', post)
        })

    });

}