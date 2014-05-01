function average(arr) {
    var l = arr.length;
    var sum = 0;
    for (var i=0; i<l; i++) {
        sum += arr[i];
    }    
    return sum/l;
};

var start_ping = function() {
    var pongseq=0;
    
    // send pings
    for (var x=0; x<5; x++) { 
        console.log("sending ping " + x);
        socket.emit('ping', {timestamp: Date.now(), seq : x});
    }

    // receive and log pongs
    socket.on('pong', function(data) {
        var rtt = Date.now() - data.timestamp;

        if (data.seq == pongseq) {
            console.log("received pong " + pongseq + ": rTT=" + rtt);
            arr[pongseq] = rtt;
            pongseq++;
        }
    });

    // calculate average
    var avg=-1;
    socket.on('done', function(data) {
        if (data.seq == dseq) {
            avg = average(arr);
            console.log("received done (dseq=" + dseq + ")");
            console.log("average RTT (ms): " + avg);

            // update page
            $("#status").html("<p><i>Average RTT is " + avg + " milliseconds</i></p>");

            // send result to server
            dseq++;
            console.log("sending result (dseq=" + dseq + ")");
            socket.emit('result', {average : avg, seq : dseq});
            dseq++;
        }
    });
};

var myapp = (function(){

    return {
        init: function() {
            console.log("Client-side app starting up");

            // global variables :O
            socket = io.connect();
            dseq=0;
            arr=[0,0,0,0,0];

            // say hello to server
            socket.emit('hello', '');

            jQuery("#startping").click(start_ping);

        }
    }
})();

jQuery(myapp.init);

