var userhash = { };  // session ID -> user data
var next_anonymous = 1; 

var add_user = function(id, user) {
    if (userhash[id] === undefined) {
        if (!user) {
            user = "anonymous" + next_anonymous;
            next_anonymous += 1;
        }
        userhash[id] = {
            'id': id,
            'user': user,
            'latency_results': [],
            'seq': 0
        };
    }
    return userhash[id];
};
exports.add_user = add_user;

exports.get_user_name = function(id) {
    if (userhash[id] === undefined) {
        add_user(id, undefined);
    }
    return userhash[id].user;
};

exports.set_latency = function(id, rtt) {
    if (userhash[id] === undefined) {
        return -1;
    }

    var user = userhash[id];
    var idx = user.latency_results.length;
    user.latency_results[idx] = rtt;

    return 0;
};

exports.get_seq = function(id) {
    return userhash[id].seq;
}

exports.set_seq = function(id, num) {
    if (userhash[id] === undefined) {
        return -1;
    }
    userhash[id].seq = num;
    return 1;
};

exports.add_seq = function(id) {
    var seq = userhash[id].seq;
    userhash[id].seq++;
    return seq;
};

exports.get_results = function(id) {
    return userhash[id];
}

exports.print_results = function(id) {
    var resultstbl = userhash[id].latency_results;
    var len = resultstbl.length;

    console.log("Result list for user " + userdb.get_user_name(id) + ":");
    for (var i=0; i<len; i++) {
        console.log(" " + resultstbl[i]);
    }
};

exports.clear = function(id) {
    userhash[id].latency_results = [];
}
