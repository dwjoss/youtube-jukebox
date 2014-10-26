parseTime = function(secs) {
    var secs = parseInt(secs)
    
    var mm = (secs/60).toString()
    var ss = (sec % 60).toString()

    if (mm.length === 1) {
        mm = '0' + mm;
    }
    if (ss.length === 1) {
        ss = '0' + ss;
    }

    return mm + ':' + ss;
}
