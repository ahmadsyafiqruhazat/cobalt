var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var dateFormat = require("dateformat");

app.set("port", process.env.PORT || 3000);
app.use(express.static("app"));

server.listen(app.get("port"), function() {
  console.log("Node app is running on port ", app.get("port"));
});

var messages = [];
var users = [];

io.on("connection", function(socket) {
  //users.push(socket.id);

  socket.emit("init-chat", messages);
  socket.emit("update-users", users);

  socket.on("createMessage", function(data) {
    messages.push(data);
    io.emit("newMessage", data);
  });

  socket.on("add-user", function(user) {
    users.push({ id: socket.id, name: user });
    io.emit("update-users", users);
  });

  socket.on("disconnect", function() {
    users = users.filter(function(user) {
      return user.id != socket.id;
    });
    io.emit("update-users", users);
  });
});
