var database = firebase.database();

// Adding journal entry after clicking button

$(document).on('click','#add-journal-btn', function(event) {
  event.preventDefault();

  var user = firebase.auth().currentUser;

  if (user) {
    var html = $('#summernote').summernote('code');

    var date = moment($("#calendar").datepicker("getDate")).format('YYYYMMDD');

    database.ref(user.uid + '/' + date).push(html);
    displayEntries(date);

    // reset and place focus on summernote

    $('#summernote').summernote('reset');
    $('#summernote').summernote('focus');
  }
});

function displayEntries(date) {

  var user = firebase.auth().currentUser;

  if (user) {
    $('#posts').empty();

    var ref = firebase.database().ref(user.uid + '/' + moment(date, 'MM/DD/YYYY').format('YYYYMMDD'));

    ref.orderByKey().on("child_added", function(snapshot) {
      var panel = $('<div class="panel panel-default">');
      var panelBody = $('<div class="panel-body post">').html(snapshot.val());
      panel.append(panelBody);
      $('#posts').append(panel);
      console.log(snapshot.val());

    });
  }
}
  