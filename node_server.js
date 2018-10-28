let app = require('express')();
let http = require('http').Server(app);
let ws = require('socket.io')(http);
var fs = require('fs');

var user=0;
ws.on('connection', (socket) => {
  user++;
  console.log(user+' USER CONNECTED');

  socket.on('disconnect', function(){
    user--;
    console.log('USER DISCONNECTED '+user+"-USER STILL CONNETED");
  });

  socket.on('data', (message) => {
    try{
        console.log(message);
        ws.emit('message', {type:'data', data: message});
        if(message.type=="add")
          {jsonData.data.push(message.value);}
          else{
            for(var index=0;index<jsonData.data.length;index++){
              if(message.value.Id==jsonData.data[index].Id){
                jsonData.data[index]=message.value;
                  break;
              }
            }
          }
    }
    catch (err) {
            console.log(err.stack)
    }
  });

});

http.listen(9000, () => {
  console.log('started on port 9000');
});


const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.get('/GetFirstOrders', function (req, res) {
  try{       
      res.send(jsonData);
    }
    catch (err) {
            console.log(err.stack)
    }
   
});
app.get('/GetAllDish', function (req, res) {
try{
     res.send(jsonDish);
    }
    catch (err) {
            console.log(err.stack)
    }
 });
 var jsonDish={
  "data":[
  {"Id":"100",
  "Name":"Jumbo Chicken Wrap"},
 {"Id":"101",
 "Name":"Vegetarian Lasagne"},
  {"Id":"102",
  "Name":"Chicken Rice Feast"},
  {"Id":"103",
  "Name":"Grilled Chicken Breast"}
  ]
 };
var jsonData={
  "data":[
    {
      "Id":"100",
      "Name":"Jumbo Chicken Wrap",
  "Quantity":"1",
  "CTN":"14",
  "Predicted":11,
  "Status":"Done"},

  {
    "Id":"101",
    "Name":"Vegetarian Lasagne",
  "Quantity":"2",
  "CTN":"23",
  "Predicted":76,
  "Status":"Pending"},
  ],
};