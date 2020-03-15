
export const searchSeries = (search_str) => {
  // TODO
  if (search_str === "Как") {
    return {
      items:[
        {
          imdb_id: 1234,
          title: "Как я встретил вашу маму?",
          started: 1998,
          finished: 2010,
          avg_rating: 8.7,
        },
        {
          imdb_id: 1237,
          title: "Как я встретил вашего папу?",
          started: 1999,
          finished: 2001,
          avg_rating: 8.4,
        },
        {
          imdb_id: 1238,
          title: "Как быть?",
          started: 2020,
          finished: -1,
          avg_rating: 8.3,
        },
      ],
      err: null,
    };
  } else if (search_str === "Говно") {
      return {items: [], err: "Вы ввели говно а мы не нашли его"}
  }
  return {items: [], err: null};
}

export const getEpisodes = (series_imdb_id) => {
  if (series_imdb_id === 1234) {
    return {
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
  } else if (series_imdb_id === 1237) {
    return {
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
}