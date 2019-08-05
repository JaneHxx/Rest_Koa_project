var i  = 1;
var pid = 0;
var tmp;
function countTime(){
    i+=1;
    postMessage(i);
};
//add event listener to handle the different message
self.addEventListener('message', function(e){
    //if message  == 1 start count
    tmp = e.data["textinput"];
    if(1 == e.data["moustevent"]){
        if(tmp <= 0) tmp = 1000;
        pid = setInterval(countTime, tmp);
    }
    //if message == 0 stop count
    else{
        clearInterval(pid);
    }
});