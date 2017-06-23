$(document).ready(function() {
  let socket = io(); // our socket io connection

  /* event listeners */

  // when a user joins
  socket.on('join', function (roomList) {
    // populate their problem room choices
    console.log(roomList);
    roomList.forEach(function(room){
      $("#probs").append('<option id=\'' + room + '\' >' + room + '</option>')
    });
    // get their user ID
    do{
      console.log("in loop");
      var entered = prompt("Enter your student ID");
    }while(entered == null || entered == "");
    // send their user ID to the server to add it to the database
    socket.emit('addUser', entered);
  });

  /* post logic */

  // when you click on a post
  $(document).on("click", ".post", function(event) {
    event.preventDefault();
    // display post content in the main view
    $('#displayCode').html($(this).html());
  });

  /* add post */

  // when a new post is submitted
  $('#submitCode').click(function(event) {
    event.preventDefault();
    // get content from text area
    let code = $('#txtArea').val();
    // send content to server
    socket.emit('sendCode',code);
    // empty text area
    $('#txtArea').val("");
  });

  // listen for new post entry sent back from server
  socket.on("sendBack", function (code) {
    console.log('received: ' + code);
    // append code to posts
    $("#posts").append("<pre class = \"post\">"+ code +"</pre>");
  });

  /* delete posts */

  // when clear submissions is clicked
  $('#clear').click(function(event) {
    event.preventDefault();
    // confirm
    if(confirm("Are you sure you want to delete submissions for this problem?")){
      // tell server to clear codeList, and notify other users
      socket.emit('clear');
    }
  });

  // when posts are to be cleared
  socket.on('cleared',function functionName() {
    // remove all posts
    $('#posts').children().remove();
  });

  /* room (selected problem) logic */

  /* new room */

  // adds new problem room
  $('#createProblem').click(function (event) {
    event.preventDefault();
    // get problem name from user
    let newProb = prompt("Enter Problem name.");
    // if name is given
    if (newProb != null && newProb != ""){
      // notify server to create room
      socket.emit('new room', newProb);
    }
  });

  // add new room for new problem
  socket.on('add room',function (newRoom) {
    $("#probs").append('<option id=\'' + newRoom + '\' >' + newRoom + '</option>')
  });

  /* select room */

  // room is selected
  $('#selectProblem').click(function(event) {
    event.preventDefault();
    // problem category
    let problem = $('#probs option:selected').text();

    $('#postsTitle').html(problem);
    // send content to server
    socket.emit('join room', problem);
  });

  // display posts from a particular room
  socket.on('display room', function (codeList) {
    console.log("displaying new set of posts");
    // remove old content
    $('#posts').children().remove();
    // display posts
    codeList.forEach(function (block) {
      $("#posts").append("<pre class = \"post\">"+ block +"</pre>");
    });
  });

  // no room category selected
  socket.on('no room',function () {
    // give error message
    $('#selectProblem').css('border-color', 'red');
    setTimeout(function(){
      alert("Please select a problem to post to before submitting code.");
      $('#selectProblem').css('border-color', 'inherit');
    }, 100);

  });

  /* delete room */

  // admin deletes a room
  $('#deleteProblem').click(function(event) {
    event.preventDefault();
    console.log('delete problem');
    // problem category
    let problem = $('#probs option:selected').text();
    // emit delete event
    socket.emit('delete room', problem);
  });

  // delete room from dropdown
  socket.on('room deleted', function (room) {
    console.log('delete room: ' + room);
    $('#'+ room).remove();
    $('#'+ room).remove();
  });


  /* admin */

  // when the user is an administrator
  socket.on('admin', function () {
    console.log('admin');
    // display and enable admin buttons
    $('.admin').prop('disabled',false).css('display','inherit');
  });

  /* error alerts */



});
