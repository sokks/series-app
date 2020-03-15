import React from 'react';
import ReactDOM from 'react-dom';

import {
  searchSeries,
  getEpisodes,
} from './api';

import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import './index.css';

import {
  MDBInput, 
} from 'mdbreact';

class SeriesSearch extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      search_input: "",
      found_series: [],
      search_err: null,
      show_on_flow: false,
      
      found_series_commited: [],
      search_err_commited: null,
      show_final: false,
    };
    this.handleEscPress = this.handleEscPress.bind(this);
  }

  handleSearchInputChange = (e) => {
    // this.setState({search_input: e.target.value}); /* TODO: no last letter :( */
    // console.log("this.state.search_input changed to ", this.state.search_input);
    console.log(e.target.value);
    let res = searchSeries(e.target.value);
    if (res.err == null) {
      this.setState({
        search_input: e.target.value,
        found_series: res.items,
        show_on_flow: (res.items.length > 0),
        search_err: null,
      });
    } else {
      this.setState({
        search_input: e.target.value,
        found_series: [],
        show_on_flow: false,
        search_err: res.err,
      });
    }
  }

  doFinalSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log("doFinalSearch of ", this.state.search_input);
      this.setState({
        show_final: true, 
        show_on_flow: false,
        found_series_commited: this.state.found_series,
        search_err_commited: this.state.search_err,
        found_series: [],
        search_input: "",
      });
    }
  }

  handleOnTheFlowSelection = (e) => {
    if (e.keyCode === 40) { // down
      console.log("down arrow pressed");
      // this.goToNextDropdownItem();
    } else if (e.keyCode === 38) { // up
      console.log("up arrow pressed");
    }
  }

  handleSeriesSelect = (e) => {
    let selected_series = this.state.found_series[e.target.dataset.idx];
    console.log("selected series ", selected_series.title, " with imdb_id ", selected_series.imdb_id);
    this.setState({
      search_input: "",
      show_final: true, 
      show_on_flow: false,
      found_series_commited: [selected_series],
      search_err_commited: null,
    });
    this.props.onSeriesSelect(selected_series.imdb_id);
  }

  handleSeriesCommitedSelect = (e) => {
    let selected_series = this.state.found_series_commited[e.target.dataset.idx];
    console.log("selected series ", selected_series.title, " with imdb_id ", selected_series.imdb_id);
    this.setState({
      show_final: true, 
      show_on_flow: false,
      found_series_commited: [selected_series],
      search_err_commited: null,
    });
    this.props.onSeriesSelect(selected_series.imdb_id);
  }

  handleEscPress = (e) => {
    if (e.keyCode === 27) { // esc
      console.log("esc pressed")
      this.setState({
        show_on_flow: false,
      });
    }
  }

  // -------------------------------------

  componentDidMount(){
    document.addEventListener("keydown", this.handleEscPress, false);
  }

  render() {
    return (
      <div>
        <div className="search-form dropdown">
          <form>
            <p className="h5 text-left">Какой сериал вы ищете?</p>
            <div className="grey-text larger-text">
              <MDBInput icon="search" group type="text" size="lg" validate 
                value={this.state.search_input}
                onChange={this.handleSearchInputChange} 
                onKeyPress={this.doFinalSearch} onKeyDown={this.handleOnTheFlowSelection}
                />
            </div>
          </form>
          <div className={"search-res-on-the-flow dropdown-content" + (this.state.show_on_flow ? " show" : "")}>
            {this.state.found_series && this.state.found_series.length > 0 && this.state.found_series.map((series_item, idx) => (
              <div key={idx} data-idx={idx} className="series-item" onClick={this.handleSeriesSelect}>
                {series_item.title}
              </div>))}
          </div>
        </div>
        {this.state.show_final && <div className="search-res">
          {this.state.found_series_commited && this.state.found_series_commited.length > 0 ? this.state.found_series_commited.map((series_item, idx) => (
            <div key={idx} data-idx={idx} className="series-item" onClick={this.handleSeriesCommitedSelect}>
              {series_item.title}
            </div>)) : <div className="empty-search-res">
              {this.state.search_err_commited ? <p> Что-то пошло не так :( <br/> {this.state.search_err_commited} </p> : <p> Ничего не найдено </p>}
            </div>}
        </div>}
      </div>
    );
  }
}

class Episodes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      err: null,
    };
    this.cur_res = {
      episodes: [],
      err: null,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    let res = getEpisodes(nextProps.imdbId);
    return {
      episodes: (res.err == null ? res.episodes : prevState.episodes),
      err: res.err,
    };
  }
 
  render() {
    return (
      <div className="best-episodes-list">
        {this.err != null ? <div className="episodes-err"> 
          Что-то пошло не так :( <br/>
          {this.state.err}
        </div> : <div className="episodes-ok">
          {this.state.episodes && this.state.episodes.length > 0 && this.state.episodes.map((episode, idx) => (
            <div className="episode-item"> 
              {idx} {episode.title}
            </div>
          ))}
        </div>}
      </div>
    );
  }
}

class ApiReqs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reqs: [],
    }
  }

  render() {
    return (<div>
      
    </div>);
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active_imdb_id: 0,
      show_api_reqs: true,
    }
  }

  onSeriesSelect = (series_imdb_id) => {
    console.log("App has just known that you selected imdb_id ", series_imdb_id);
    this.setState({
      active_imdb_id: series_imdb_id,
    });
  }

  render() {
    return (
      <div className="app-area">
        <div className="content">
          <div className="header">
            <h1>HEADER</h1>
          </div>
          <div className="search-series-area">
            <SeriesSearch onSeriesSelect={this.onSeriesSelect}/>
          </div>
          <div className="best-episodes-area">
            <Episodes imdbId={this.state.active_imdb_id}/>
          </div>
        </div>
        {this.state.show_api_reqs && 
        <div className="reqs-area">
          <ApiReqs/>
        </div>}
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

  