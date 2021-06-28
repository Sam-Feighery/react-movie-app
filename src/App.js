import React, { useState, useEffect} from 'react';
import Movie from './components/movie.component';

const FEATURED_API = 'https://api.themoviedb.org/3/movie/popular?api_key=b97a46406247237b9cae026efaf5dd86';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=b97a46406247237b9cae026efaf5dd86&language=en-US&page=1&include_adult=false';

function App() {
    const [movies, setMovies] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');

    useEffect(() => {
      getMovies(FEATURED_API);
    }, []);

    const getMovies = (API) => {
      fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
    }

    const handleOnSubmit = (e) => {
      e.preventDefault();

      if(searchTitle) {
        getMovies(SEARCH_API + searchTitle);
        setSearchTitle('');
        }
    };

    const handleOnChange = (e) => {
      setSearchTitle(e.target.value);
    };
  
    return (
      <>
        <header>
          <form onSubmit={handleOnSubmit}>
            <input 
              className='search-bar' 
              type='search' 
              placeholder='Search...' 
              value={searchTitle}
              onChange={handleOnChange}
            />
          </form>
        </header> 
        <div className='movie-container'>
            {movies.length > 0 && 
              movies.map((movie) => <Movie 
              key={movie.id} 
              {...movie} />)}
        </div>
      </>
    );
}

export default App;
