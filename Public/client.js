$(document).ready(function() {
  var socket = io(); // our socket io connection

  // event listeners

  // listen for code sent from server
  socket.on("sendBack", function (code) {
    // append code to posts
    $("#posts").append("<pre class = \"post\">"+ code +"</pre>");
  });

  // when a user joins
  socket.on('join', function (codeList) {
    // populate their posts using codeList from server
    codeList.forEach(function (block) {
      $("#posts").append("<pre class = \"post\">"+ block +"</pre>");
    });
    socket.emit('addUser', prompt("Enter your student ID"));
  });

  // when posts are to be cleared
  socket.on('cleared',function functionName() {
    // remove all posts
    $('#posts').children().remove();
  });

  // click events

  // when you click on a post
  $(document).on("click", ".post", function(event) {
    event.preventDefault();
    // display post content in the main view
    $('#displayCode').html($(this).html());
  });

  // when code is submitted
  $('#submitCode').click(function(event) {
    event.preventDefault();
    // get content from text area
    var code = $('#txtArea').val();
    // send content to server
    socket.emit('sendCode',code);
    // empty text area
    $('#txtArea').val("");
  });

  // when clear submissions is clicked
  $('#clear').click(function(event) {
    event.preventDefault();
    // confirm
    if(confirm("Are you sure you want to delete all submissions?")){
      // tell server to clear codeList, and notify other users
      socket.emit('clear');
    }
  });

});
