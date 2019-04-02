var webSocket = require('ws');

var server = new webSocket.Server({port:9095});

var allclientsockets = [];
var nickNames = [];

console.log("Server Initialized...");

server.on('connection',f1);
function f1(socket){
    console.log("One Client Connected...");
    allclientsockets.push(socket);
    console.log("No. Of Clients Connected : "+ allclientsockets.length);
    socket.on("message",f2);
    //socket.send("welcome....you are connected to server now");
}
function f2(message){
    var action = message.substr(0,4);
    console.log("action: "+action);
    var result = message.toUpperCase();
    var parsedInput = JSON.parse(message.substr(5));
    console.log("parsdinpu: "+parsedInput);
    if(action == 'join'){
    if(parsedInput.name && parsedInput.timeOfLogin){
        nickNames.push(parsedInput.name);
        console.log(parsedInput.timeOfLogin);
    }
    }
    console.log("sending to clients : "+ result);
    for(i=0;i<allclientsockets.length;i++){
        if(action == 'join'){
            var obj = {"currentusers":nickNames};
            var userliststr = JSON.stringify(obj);
            console.log("USERLIST: "+ userliststr);
            allclientsockets[i].send(userliststr);
        }
        if(action == 'Chat'){
            var replyObj=parsedInput;
            console.log(replyObj);
            var resultObj={"nick":replyObj.nickName,"replymsg":replyObj.chatData}
            console.log(resultObj);
            var resultStr=JSON.stringify(resultObj);
            console.log(resultStr);
            allclientsockets[i].send(resultStr);
        }
        //allclientsockets[i].send(result);
    }
}
function ChatUser(n){
    this.name = n;
    this.timeOfLogin = new Date();
}
function ChatMessage(n,m){
    this.nickName = n;
    this.chatData = m;
    this.timeOfMessage = new Date();
}

