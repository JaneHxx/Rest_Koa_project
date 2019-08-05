var start;
onmessage = getStart;
function getStart(event) {
  start = event.data;
  onmessage = getEnd;
}

var end;
function getEnd (event) {
  end = event.data;
  onmessage = null;
  work();
}

function work () {
  var result = start;
  console.log('start = ' + start, '   end = ' + end);
  for (var i = start; i < end; i += 1) {
    // perform some complex calculation here
    result += 1;
  }
  console.log('result = ' + result);
  postMessage(result);
  close();
}