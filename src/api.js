export const API_HOST = "https://soap.nikscorp.com";
export const MIN_SEARCH_LEN = 4;

var apiCalls = [];

const onApiCall = (path, resp_ip) => {
  console.log("App has just known that api call was made", path, resp_ip);
  apiCalls = [...apiCalls, {path: path, resp_ip: resp_ip}];
};

export const getApiCalls = () => {
  return apiCalls;
}; 


export function searchSeries(search_str){
  let path = `/search/${search_str}`
  let resp_ip = "127.0.0.1";
  // onApiCall(path, resp_ip);
  // let resp = await callApi(path);
  // console.log("search resp", resp);
  // if (resp == null) {
  //   return {
  //     items: [],
  //     err: "Ошибочка (тип 500)",
  //   }
  // }
  // return {
  //   items: resp,
  //   err: null,
  // }
  
  return getExampleSeriesData(search_str);
}

export const getEpisodes = (series_imdb_id) => {
  let path = `/id/${series_imdb_id}`
  let resp_ip = "127.0.0.1";
  onApiCall(path, resp_ip);

  return getExampleEpisodesData(series_imdb_id);
}

export async function callApi(path) {
  try {
    let response = await fetch(API_HOST + path, {});

    if (response.status === 200) {
      let json = await response.json();
      console.log(json);
      return { json };
    } else {
      return { errors: { message: 'Ошибка сервера' } }
    }
  } catch (errors) {
    return { errors };
  }
}

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