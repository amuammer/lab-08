function Movie(data){
  this.title=data.title;
  this.overview=data.overview;
  this.average_votes=data.average_votes;
  this.total_votes=data.vote_count;
  this.image_url= `https://image.tmdb.org/t/p/w500${data.poster_path}`;
  this.popularity=data.popularity;
  this.released_on=data.release_date;
}
exports.default = Movie;
