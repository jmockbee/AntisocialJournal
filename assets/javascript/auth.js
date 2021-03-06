$(document).ready(function() {

  //Initialize an instance of the Google provider object:
  var provider = new firebase.auth.GoogleAuthProvider();

  // To apply the default browser preference instead of explicitly setting it.
  firebase.auth().useDeviceLanguage();

  // On click event for button, will either log you in or log you out depending on the state

  $(document).on('click','#login', function(event) {
    event.preventDefault();

    var user = firebase.auth().currentUser;

    if (user) {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    }
    else {
      //To sign in with a pop-up window, call signInWithPopup:
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
  });

  // Event to track when user logs in or out and performs certain actions depending on what happened

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User just logged in, so display their stuff

      $('#summernote').summernote('enable');
      $('#login-logout').text('Logout');
      var img = $('<img class="img-circle" width="32" height="32">');
      img.attr('src', user.photoURL);
      $('#profile-pic').append(img);
      renderSections();
      
    } else {

      // User just logged out, so clear sections and disable summernote
      $('#summernote').summernote('disable');
      $('#login-logout').text('Login');
      $('#profile-pic').empty();
      $('#posts').empty();
      renderSections();
    }
  });

});