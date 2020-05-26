import React from "react";
import "./App.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

function App() {
  const playlist = [
    {
      name: "A",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/zhiya.mp3",
    },
    {
      name: "B",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/ziyounvshen.mp3",
    },
    {
      name: "C",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/wuyuwuqing.mp3",
    },
    {
      name: "D",
      src: "https://hanzluo.s3-us-west-1.amazonaws.com/music/suipian.mp3",
    },
    {
      name: "E",
      src:
        "https://hanzluo.s3-us-west-1.amazonaws.com/music/yonghengdegangwan.mp3",
    },
  ];

  return (
    <div className="App">
      {playlist.map((music) => (
        <ul key={music.name}>
          <li>
            <AudioPlayer
              //autoPlay
              src={music.src}
              //onPlay={(e) => console.log("onPlay")}
            />
          </li>
        </ul>
      ))}
    </div>
  );
}

export default App;
