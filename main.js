'use strict'

$(function(init){
  console.log('init');
  $('#movieSubmit').click(sendRequest);
});

function sendRequest() {
  console.log('clicked');
  var $movieInput = $('#movieInput').val();
  var $yearInput = $('#yearInput').val();
  var $typeInput = $('#typeInput').val();
  $.ajax({
    method: 'GET',
    url: 'http://www.omdbapi.com/?t='+ $movieInput + '&y=' + $yearInput + '&plot=short&r=json&type=' + $typeInput,
    success: function(data) {
      $('#movieContainer').append(addMovieInfo(data));
    },
    error: function(error) {
      console.error('error: ', error);
    }
  });
}

function addMovieInfo(data) {
  var $movie = $('#movieTemplate').clone();
  var $imdbLocation = data.imdbID;
  $('#movieTemplate').remove();
  $movie.find('.movieTitle').text(data.Title);
  $movie.find('.movieType').text(data.Type);
  $movie.find('.runtime').text(data.Runtime);
  $movie.find('.year').text(data.Year);
  $movie.find('.imdbLink').attr('href', function() {
    return 'http://www.imdb.com/title/' + $imdbLocation;
  }).text('IMDB: ' + data.imdbRating);
  $movie.find('.moviePoster').attr('src', function() {
    return data.Poster;
  });
  return $movie;
}
