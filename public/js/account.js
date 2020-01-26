
//listener for signup button
$('#signUp').on("click", event => {
  event.preventDefault();
  console.log("hello");
  // let email = $("#recipient-email");
  let firstName = $("#recipient-firstName");
  let lastName = $("#recipient-lastName");
  let userName = $("#recipient-UserName");
  let passWord = $("#recipient-password");
  // if (email.val().trim().length < 1) {
  //   email.focus();
  // } 
  if (firstName.val().trim().length < 1) {
    firstName.focus();
  } else if (lastName.val().trim().length < 1) {
    lastName.focus();
  } else if (userName.val().trim().length < 1) {
    userName.focus();
  } else if (passWord.val().trim().length < 1) {
    passWord.focus();
  } 
    let user = {
      first_name: firstName.val().trim(),
      last_name: lastName.val().trim(),
      user_name: userName.val().trim(),
      password: passWord.val().trim()
    }
    $.ajax({
      url: "/api/users",
      type: "POST",
      data: user
    }).then(res => {
      console.log(res);
      if (res) {
        // user successfully created account, so do the following
        window.localStorage.setItem("user", res.id)
        $("#exampleModal2").empty();
        window.location.reload();
      } else {
        // user failed to registered, so do the following
        console.log("registration failed")
        $("#recipient-UserName").val("");
      }
    })
  
})

// event listener for login button
$(document).on("click", "#login", event => {
  event.preventDefault();
  let email = $("#recipient-UserName");
  let pw = $("#recipient-password");
  if (email.val().trim().length < 1) {
    email.focus();
  } else if (pw.val().trim().length < 1) {
    pw.focus();
  } else {
    // set user data to send to server
    let user = {
      user_name: $("#recipient-UserName").val(),
      password: $("#recipient-password").val(),
    }
    // make a PUT request to server for validating user credentials
    $.ajax({
      url: "/api/user",
      type: "PUT",
      data: user,
    }).then(res => {
      if (res) {
        // user validated, so do the following
        console.log("logged in")
        window.localStorage.setItem("user", res)
        $("#exampleModal1").empty();
        window.location.reload();
      } else {
        // server validation failed, so do the following
        console.log("login failed")
        $("#recipient-password").val("");
      }
    })
  }
})