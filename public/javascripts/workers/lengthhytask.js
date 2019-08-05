
addEventListener("message", function(evt){
    var date = new Date();
    var currentDate = null;
    do {
    currentDate = new Date();
    }while(currentDate - date < evt.data);
    postMessage(currentDate);
    }, false);
    