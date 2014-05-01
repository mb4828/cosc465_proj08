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
    
    stat.html("<p>Sending pings...</p>");
    // send pings
    for (var x=0; x<5; x++) { 
        console.log("sending ping " + x);
        socket.emit('ping', {timestamp: Date.now(), seq : x});
    }

    stat.html("<p>Waiting for response from server...</p>");
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
    stat.html("<p>Computing average RTT...</p>");
    var avg=-1;
    socket.on('done', function(data) {
        if (data.seq == dseq) {
            avg = average(arr);
            console.log("received done (dseq=" + dseq + ")");
            console.log("average RTT (ms): " + avg);

            // update page
            stat.html("<p>Average RTT is " + avg + " milliseconds</p>");

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
            stat = $("#status");

            // say hello to server
            socket.emit('hello', '');

            jQuery("#startping").click(start_ping);

        }
    }
})();

jQuery(myapp.init);

