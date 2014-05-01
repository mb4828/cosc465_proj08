function average(arr) {
    var l = arr.length;
    var sum = 0;
    for (var i=0; i<l; i++) {
        sum += arr[i];
    }    
    return sum/l;
};

function make_table(data) {
    console.log("making table");
    var resdiv = $('#results');
    resdiv.html("<p><i>One moment please...</i></p>");

    if (data.latency_results[0] == undefined) {
        resdiv.text("No data. Try running some tests!");
    } else {
        // this code is hideous... I'm so sorry.... but it works
        var arr = data.latency_results;
        var avg = average(arr).toFixed(3);
        var output = "<table><tr><td><b>Sample #</b></td>"

        var l = arr.length;
        for (var i=0; i<l; i++) {
            output += "<td><b>" + i + "</b></td>";
        }
        output += "</tr><tr><td>RTT (milliseconds)</td>"

        for (var i=0; i<l; i++) {
            output += "<td>" + arr[i] + "</td>";
        }
        output += "</tr><tr><td colspan='" + (l+1) + "'><b><i>Average RTT: " + avg + " ms</i></b></td></tr></table>";
        output += "<br /><p>Note: I know this is really lame but I don't have the time to put in more effort unless you want to write my paper for me...</p>";

        resdiv.html(output);
    }
    
}

var get_results = function() {
    socket.emit('getres', '');
    socket.on('dta', function(data) {
        console.log("got data");
        make_table(data.raw);
    });
};

var clear_data = function() {
    console.log("clearing server data");
    socket.emit('clear','');
};

var resapp = (function(){

    return {
        init: function() {
            socket = io.connect();

            console.log("Result app starting");
            //$('#results').ready(get_results);
            jQuery("#res").click(get_results);
            jQuery("#cleardata").click(clear_data);
        }
    }
})();

jQuery(resapp.init);
