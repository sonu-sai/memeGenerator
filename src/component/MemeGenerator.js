import React, { Component } from "react";

class MemeGenerator extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      randomImage: "https://i.imgflip.com/30b1gx.jpg",
      allMemeImage: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => response.json())
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allMemeImage: memes });
      });
  }
  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    const randomNo = Math.floor(Math.random() * this.state.allMemeImage.length);
    const randomMeme = this.state.allMemeImage[randomNo].url;
    this.setState({
      randomImage: randomMeme,
    });
  }
  render() {
    return (
      <div className="classMeme ">
        <form className="memeForm" onSubmit={this.handleSubmit}>
          <input
            className="input"
            type="text"
            name="topText"
            placeholder="Top Text"
            value={this.state.topText}
            onChange={this.handleChange}
          />

          <input
            className="input"
            type="text"
            name="bottomText"
            placeholder="Bottom Text"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />
          <br />
          <button className="button">GEN</button>
        </form>
        <div className="container">
          <img className="meme" src={this.state.randomImage} alt="random" />
          <h2 className="topText">{this.state.topText}</h2>
          <h2 className="bottomText">{this.state.bottomText}</h2>
          {console.log(this.state.bottomText)}
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
