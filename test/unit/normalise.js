function normalise(a) {
    return a.map(function(a1) {
        var b1 = jQuery.extend({}, a1);
        b1._distance_real = (b1._revolutionsEnded - b1._revolutionsStarted) * (0.3 * 2 * 3.14);
        b1._rnd = (Math.random() * 0.100);
        b1._distance = (b1._distance_real + b1._rnd);
        b1._count = (b1._revolutionsEnded - b1._revolutionsStarted);
        return b1;
    }).filter(function (a2) {
        return !isNaN(a2._distance);
    }).sort(function (a3, b) {
        return (a3._distance - b._distance) * -1
    });
}