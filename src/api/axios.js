import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_MOVIE_DB_API_KEY, //api_key는 숨겨주어야 함.
    language: "ko-KR",
  },
});

export default instance;