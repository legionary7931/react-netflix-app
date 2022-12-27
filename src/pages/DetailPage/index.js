import axios from '../../api/axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useState } from 'react';

export default function DetailPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    async function fetchData(){
      const request = await axios.get(
        `/movie/${movieId}`
      );
      setMovie(request.data);
    }
    

    fetchData();
  }, [movieId]);
  
  if(!movie) return <div>...loading</div>;

  return (
    <section>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt="poster"
      />
    </section>
  )
}
