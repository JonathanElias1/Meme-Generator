import React from "react";
import memesData from "../memesData";

function Meme() {
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
    // Put a link inside random image because otherwise it gives an error if u just put an empty string
  });
  // const [allMemes, setAllMemes] = React.useState(memesData);
  const [allMemes, setAllMemes] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  // TO get a random url from our memesData.js we first make an array to make it easier to go through it
  // where memesArray is just the memesData.data.memes which allows us to access memes from the data easier. Then we need to randomize it so we do Math.floor and Math.random * the length of the array to give us our random number variable. Then we make url equal to memesArray with an index of random number .url so we sort through all the random numbers urls.

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          placeholder="top text"
          className="form--input"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        ></input>
        <input
          type="text"
          placeholder="bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        ></input>
        <button className="form--button" onClick={getMemeImage}>
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="meme--image" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}

export default Meme;
