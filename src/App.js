import React from "react";
import "./App.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      music: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        "/search?redirect_uri=http%253A%252F%252Fguardian.mashape.com%252Fcallback&q=eminem&index=25"
      )
      .then((response) => {
        this.setState({ music: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        {this.state.music.map((music) => (
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
}

export default App;
