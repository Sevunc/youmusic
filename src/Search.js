import React from "react";
import axios from "axios";
import "./Search.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      results: {},
      loading: false,
      message: "",
    };
    this.cancel = "";
  }

  searchResults = (indexNumber = "", query) => {
    const indexNum = indexNumber ? `&index=25${indexNumber}` : "";
    const url = `/search?redirect_uri=http%253A%252F%252Fguardian.mashape.com%252Fcallback&q=${query}${indexNum}`;

    if (this.cancel) {
      this.cancel.cancel();
    }
    this.cancel = axios.CancelToken.source();

    axios
      .get(url, {
        cancelToken: this.cancel.token,
      })
      .then((res) => {
        const resultNotFoundMsg = !res.data.data.length
          ? "No more serch results, please try a new search"
          : "";
        console.log(resultNotFoundMsg);

        this.setState({
          results: res.data.data,
          message: resultNotFoundMsg,
          loading: false,
        });
      })
      .catch((error) => {
        if (axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: "Network error",
          });
        }
      });
  };

  renderSearchResults = () => {
    const { results } = this.state;
    if (Object.keys(results).length && results.length) {
      return (
        <div>
          {results.map((music) => (
            <ul key={music.id}>
              <li>
                <AudioPlayer
                  //autoPlay
                  src={music.preview}
                  //onPlay={(e) => console.log("onPlay")}
                />
              </li>
            </ul>
          ))}
        </div>
      );
    }
  };

  onInputChange = (event) => {
    const query = event.target.value;
    this.setState({ query: query, loading: true, message: "" }, () => {
      this.searchResults(1, query);
    });
  };

  render() {
    const query = this.state.query;
    const message = this.state.message;
    return (
      <div className="Search">
        <h1>Find your music</h1>
        <label>
          <input
            className="label"
            type="text"
            value={query}
            placeholder="Searh..."
            onChange={this.onInputChange}
          />
        </label>
        {message && <p className="p">{message}</p>}
        {this.renderSearchResults()}
      </div>
    );
  }
}

export default Search;
