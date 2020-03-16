export var API_HOST = "";
if (process.env.NODE_ENV !== 'production') {
  API_HOST = "https://soap.nikscorp.com";
}
export const MIN_SEARCH_LEN = 4;


export const onApiCall = (path, resp_ip) => {
  console.log("API CALL", path, resp_ip);
};



const getExampleSeriesData = (search_str) => {
  if (search_str === "Как") {
    return {
      items:[
        {
          imdb_id: "1234",
          title: "Как я встретил вашу маму?",
          year: "1998-2010",
          imdb_rating: 8.7,
        },
        {
          imdb_id: "tt1237",
          title: "Как я встретил вашего папу?",
          year: "1999-2001",
          imdb_rating: 8.4,
        },
        {
          imdb_id: "1238",
          title: "Как быть?",
          year: "2020-",
          imdb_rating: 8.3,
        },
      ],
      err: null,
    };
  } else if (search_str === "Как я встретил вашего папу?") {
    return {
      items:[
        {
          imdb_id: "tt1237",
          title: "Как я встретил вашего папу?",
          year: "1999-2001",
          imdb_rating: 8.4,
        },
      ],
      err: null,
    };
  } else if (search_str === "Говно") {
    return {items: [], err: "Вы ввели говно а мы не нашли его"}
  }
  return {items: [], err: null};
};

const getExampleEpisodesData = (series_imdb_id) => {
  if (series_imdb_id === "1234") {
    return {
      title: "Как я встретил вашу маму?",
      episodes: [
        {
          season: 1,
          episode: 3,
          title: "Вечная боль",
          rating: 8.97,
        },
        {
          season: 4,
          episode: 1,
          title: "Решение на всю жизнь",
          rating: 8.93,
        },
        {
          season: 1,
          episode: 4,
          title: "Боли больше нет",
          rating: 8.73,
        },
      ],
      err: null,
    }
  } else if (series_imdb_id === "tt1237") {
    return {
      title: "Как я встретил вашего папу?",
      episodes: [
        {
          season: 1,
          episode: 3,
          title: "Сиюминутная боль",
          rating: 8.97,
        },
        {
          season: 4,
          episode: 1,
          title: "Нерешительность пополам",
          rating: 8.93,
        },
        {
          season: 1,
          episode: 4,
          title: "Боли больше нет",
          rating: 8.73,
        },
        {
          season: 1,
          episode: 3,
          title: "Какой пирог вкуснее???",
          rating: 8.23,
        },
        {
          season: 4,
          episode: 1,
          title: "Драный кот снова жрет",
          rating: 7.9,
        },
        {
          season: 4,
          episode: 2,
          title: "Драный кот снова жрет 2",
          rating: 7.9,
        },
      ],
      err: null,
    }
  }
  return {
    episodes: [],
    err: null,
  }
};