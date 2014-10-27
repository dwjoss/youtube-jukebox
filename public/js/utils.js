var utils = {}

/*
    Convert a string of a number of seconds into the format
    mm:ss
*/
utils.parseTime = function(secs) {
    var secs = parseInt(secs);
    
    var mm = Math.floor(secs/60).toString();
    var ss = (secs % 60).toString();

    if (mm.length === 1) {
        mm = '0' + mm;
    }
    if (ss.length === 1) {
        ss = '0' + ss;
    }

    return mm + ':' + ss;
}