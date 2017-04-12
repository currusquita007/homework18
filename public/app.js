
// When you click the scrappe articles, grab the articles as a json
$(document).on("click", "#scrape", function() {
$.getJSON("/articles", function(data) {
  console.log("we are here");
  // For each one
  // for (var i = 0; i < data.length; i++) {
    for (var i = 0; i < 10; i++) {
    // Display the apropos information on the page
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    // A button to add a note, with the id of the article saved to it
    $("#articles").append("<button data-id='" + data[i]._id + "' id='savedArticles'>Save Article</button>");
  }
})
});


// When you click the save articles buttom, save the article selected (using its id)
$(document).on("click", "#savedArticles", function() {
  // Save the id from the article selected
  var thisId = $(this).attr("data-id");
  console.log(thisId);

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
    // Display the apropos information on the page
    $("#selectedArticles").append("<p data-id='" + data._id + "'>" + data.title + "<br />" + data.link + "</p>");
    // A button to add a note, with the id of the article saved to it
    $("#selectedArticles").append("<button data-id='" + data._id + "' id='addNote'>Add a Note</button>");
    // A button to delete the saved article, with the id of the article saved to it
    $("#selectedArticles").append("<button data-id='" + data._id + "' id='deleteArticle'>Delete Article</button>");

  })
});


// When you click delete articles buttom, remove this article from "Selected Articles" list
$(document).on("click", "#deleteArticle", function() {
  // Save the id from the article selected
  var thisId = $(this).attr("data-id");
  console.log(thisId);



    // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
    // Display the apropos information on the page
    $("#selectedArticles").remove("#data._id");
    // // A button to add a note, with the id of the article saved to it
    // $("#selectedArticles").children("<button>").remove();
    // // A button to delete the saved article, with the id of the article saved to it
    // $("#selectedArticles").children("<button>").remove();

  })

});




// Whenever someone clicks on the "Add a Note" buttom
$(document).on("click", "addNote", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .done(function(data) {
      console.log(data);
      // The title of the article
      $("#notes").append("<h2>" + data.title + "</h2>");
      // An input to enter a new title
      $("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .done(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});
