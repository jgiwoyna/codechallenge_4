$(document).ready(function () {

  // get treats on load
  getTreats();

  $('button').on('click', '.delete u-full-width', deleteTreat);
  $('button').on('click', '.edit u-full-width', editTreat);

  /**---------- Event Handling ----------**/
  $('#searchButton').on('click', function (event) {
    event.preventDefault();

    var queryString = $('#search').val();

    searchTreats(queryString);
  });

  $('#saveNewButton').on('click', function(event) {
    event.preventDefault();

    var treateName = $('#treatNameInput').val();
    var treatDescription = $('#treatDescriptionInput').val();
    var treateURL = $('#treatUrlInput').val();

    var newTreat = {
      name: treateName,
      description: treatDescription,
      url: treateURL
    };

    postTreat(newTreat);
  });

  /**---------- AJAX Functions ----------**/

  // GET /treats
  function getTreats() {
    $.ajax({
      method: 'GET',
      url: '/treats',
    })
    .done(function (treatArray) {
      console.log('GET /treats returned ', treatArray);

      $.each(treatArray, function (index, treat) {
        appendTreat(treat);
      });
    });
  }

  // Search GET /treats/thing
  function searchTreats(query) {
    $.ajax({
      method: 'GET',
      url: '/treats/' + query,
    })
    .done(function (treatArray) {
      console.log('GET /treats/', query, 'returned ', treatArray);

      clearDom();

      $.each(treatArray, function (index, treat) {
        // add this treat to the DOM
        appendTreat(treat);
      });
    });
  }

  // POST /treats
  function postTreat(treat) {
    $.ajax({
      method: 'POST',
      url: '/treats',
      data: treat,
    })
    .done(function () {
      console.log('POST /treats sent ', treat);
      clearDom();
      getTreats();
    });
  }

  /** ---------- DOM Functions ----------**/
  function deleteTreat() {

  var id = $(this).parent().data('id');
  console.log(id);

  $.ajax({
    type: 'DELETE',
    url: '/treats/' + id,
    success: function(result) {
      getTreats();
    },
    error: function(result) {
      console.log('could not delete treat.');
    }
  });
}

function editTreat() {
  var id = $(this).parent().data('id');
  console.log(id);

  var treat = {};
  var fields = $(this).parent().children().serializeArray();
  fields.forEach(function(field) {
    treat[field.name] = field.value;
  });
  console.log(treat);

  $.ajax({
    type: 'PUT',
    url: '/treats/' + id,
    data: treats,
    success: function(result) {
      console.log('updated!');
      getTreats();
    },
    error: function(result) {
      console.log('could not edit treat!');
    }
  });

}

  function clearDom() {
    var $treats = $('#treat-display');
    $treats.empty();
  }

  function appendTreat(treat) {
    // append a treat to the DOM and add data attributes
    // treat-display -> treat row -> treat
    var $treats = $('#treat-display');

    var treatCount = $treats.children().children().length;

    if (treatCount % 2 === 0) {
      // add a treat row every 2 treats
      $treats.append('<div class="treat row"></div>');
    }

    var $treat = $('<div class="six columns individual-treat">' +
                  '<div class="image-wrap">' +
                  '<img src="' + treat.pic + '" class="u-max-full-width" />' +
                  '<div class="toggle row">' +
                  '<div class="six columns">' +
                  '<button class="edit u-full-width">Edit</button>' +
                  '</div>' +
                  '<div class="six columns">' +
                  '<button class="delete u-full-width">Delete</button>' +
                  '</div>' +
                  '</div>' +
                  '</div>' +
                  '<h3>' + treat.name + '</h3>' +
                  '<p>' + treat.description + '</p>' +
                  '</div>');

    $treat.data('id', treat.id);

    $('.treat:last-of-type').append($treat);
  }
});
