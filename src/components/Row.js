import React, { useState, useEffect } from 'react'
import axios from '../api/axios';
import MovieModal from './MovieModal';
import "./Row.css"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation, Pagination, Scrollbar } from 'swiper';

export default function Row({title, id, fetchUrl, isLargeRow}) {

  const [movies, setmovies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState({});

  useEffect(() => {
    fetchMovieData();
  }, [fetchUrl]);

  const fetchMovieData = async() => {
    const request = await axios.get(fetchUrl);
    setmovies(request.data.results);
  };

  const handleClick = (movie) => {
    setModalOpen(true);
    setMovieSelected(movie);
  };
  
  return (
    <section className="row">
      <h2>{title}</h2> {/*title은 props로 가지고 왔다.*/}
      <div className='slider'>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          navigation
          pagination={{clickable: true}}
          loop={true}
          breakpoints={{
            1378: {
              slidesPerView: 6,
              slidesPerGroup: 6,
            },
            998: {
              slidesPerView: 5,
              slidesPerGroup: 5,
            },
            625: {
              slidesPerView: 4,
              slidesPerGroup: 4,
            },
            0: {
              slidesPerView: 3,
              slidesPerGroup: 3,
            },
          }}
        >
          <div id= {id} className = "row__posters">
            {movies.map((movie) => (
              <SwiperSlide>
                <img
                  key={movie.id}
                  onClick={()=> handleClick(movie)} 
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`https://image.tmdb.org/t/p/original/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.name}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
    </div>
    {
      modalOpen && (<MovieModal {...movieSelected} setModalOpen={setModalOpen}/>) /* modalOpen이 true일 떄, 선택한 movie 객체를 props로 내려준다.. */
    }
    </section>
  );
}
