"use strict";

function writePermanentCache(key, val) {

    try {
        localStorage.setItem(key, val);
    }
    catch (ex) {
        console.log('Error encoutered in cache.js', ex);
        throw ex;
    }

}

function readPermanentCache(key) {

    return localStorage.getItem(key);
}

function removePermanentCache(key) {

    localStorage.removeItem(key);

}

function clearPermanentCache() {

    localStorage.clear();

}

function fillPermanentCache(key, counter) {

//    var deferred = Q.defer();

    var deferred = $.Deferred();


    var kiloByteCounter = 1024;
    var megabyteCounter = kiloByteCounter * 1024; // = 1MB
    var string = '';


    console.log('Starting a long running thing.');


    // Build the string to the desired length
    for (var i = 0; i < counter; i++) {

        if (i === 0) {
            string = '0';
//                deferred.notify(string.length);
        }
        else {

            string = string + '0';
//                deferred.notify(string.length);

        }


        deferred.notify(string.length);


    }

    deferred.resolve(string);

    console.log('Ending a long running thing.');


    return deferred.promise();


}

function cacheFillerCaller(){

    return new CacheFiller();
}

function CacheFiller(){

}

CacheFiller.prototype.saySomething = function(){
  return 'WOOF WOOF!';
};

CacheFiller.prototype.fillCache = function(key, kilobytes){

    var string = '';

    try {
        // Build the string to the desired length
        for (var i = 0; i < kilobytes; i++) {

            if (i === 0) {
                string = '0';
//                deferred.notify(string.length);
            }
            else {

                string += string + '0';
//                deferred.notify(string.length);

            }


//            deferred.notify(string.length);


        }

        localStorage.setItem(key, val);
    }
    catch (ex) {
        console.log('Error encoutered in cache.js', ex);
        throw ex;
    }

    return string;
};