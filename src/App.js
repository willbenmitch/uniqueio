import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import Header from './Header';
import LeftDrawer from './LeftDrawer';
import RightDrawer from './RightDrawer';
import CircularProgress from 'material-ui/CircularProgress';
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

const extPort = process.env.PORT || 'http://localhost:80';

class App extends Component {
  constructor() {
    super();
    this.state =  {
                    images: [],
                    circularDisplay: "none",
                    leftOpen: false,
                    rightOpen:false,
                    index: 0
                  };
    this.handleNewImage = this.handleNewImage.bind(this);
    this.handleFilterRequest = this.handleFilterRequest.bind(this);
    this.handleTechStack = this.handleTechStack.bind(this);
    this.handleHighlights = this.handleHighlights.bind(this);
    this.handlePrevImage = this.handlePrevImage.bind(this);
    this.handleNextImage = this.handleNextImage.bind(this);
    this.indexLast = this.indexLast.bind(this);
    this.indexFirst = this.indexFirst.bind(this);
    this.handleLike = this.handleLike.bind(this);
  }

  componentDidMount() {
    axios.get(extPort+'/loadImages')
    .then((res) => {
      console.log(res);
      this.setState({images: res.data});
    })
  }

  handleNewImage(src) {
        this.setState({circularDisplay: "initial"});
        axios.post(extPort+'/newImage', src)
        .then((res) => {
          console.log('new image');
          this.handleFilterRequest(res);
        })
        .catch((err) => {
            console.log(err);
        });
  }

  handlePrevImage() {
    console.log("reached");
    if (this.state.index === 0) {
      this.setState({index: this.state.images.length-1});
    } else {
      this.setState({index: this.state.index-1});
    }
  }

  handleNextImage() {
    if (this.state.index === (this.state.images.length - 1)) {
      this.setState({index: 0});
    } else {
      this.setState({index: this.state.index+1});
    }
  }

  handleLike(id) {
    axios.get(extPort+'/like/'+id)
    .then((update) => {
      let images = this.state.images.map((image, i) => {
        if (image._id === id) {
          image.likes = update.data.likes
          return image;
        } else {
          return image;
        }
      })
      this.setState({images:images});
    })
  }

  indexLast() {
    this.setState({index:(this.state.images.length-1)});
  }

  indexFirst() {
    this.setState({index: 0});
  }

  handleFilterRequest(imgObj) {
    let imageArray = this.state.images.slice();
    axios.get(extPort+'/filteredImage/'+imgObj.data._id)
    .then(updatedImage => {
      if (typeof updatedImage.data === "string") {
        window.alert(updatedImage.data);
        this.setState({circularDisplay: "none"})
      } else {
        imageArray.unshift(updatedImage.data);
        console.log('reached');
        this.setState({images: imageArray, circularDisplay: "none"});
        console.log(this.state);
      }
    })
    .catch(err => {console.log(err)});
  }
  
  handleTechStack() {
    this.setState({leftOpen: !this.state.leftOpen})
  }

  handleHighlights() {
    this.setState({rightOpen: !this.state.rightOpen})
  }

  render() {
        return (
          <MuiThemeProvider>
            <div>
              <LeftDrawer open={this.state.leftOpen} handleTechStack={this.handleTechStack}/>
              <Header handleTechStack={this.handleTechStack}
                      handleHighlights={this.handleHighlights}/>
              {React.cloneElement(this.props.children, {images:this.state.images,
                                                        handleNewImage:this.handleNewImage,
                                                        circularProgress:this.state.circularProgress,
                                                        circularDisplay:this.state.circularDisplay,
                                                        index:this.state.index,
                                                        handlePrevImage:this.handlePrevImage,
                                                        handleNextImage:this.handleNextImage,
                                                        handleLike:this.handleLike,
                                                        indexLast:this.indexLast,
                                                        indexFirst:this.indexFirst})}
            <RightDrawer open={this.state.rightOpen} handleHighlights={this.handleHighlights} images={this.state.images}/>
            </div>
          </MuiThemeProvider>
        )
  }
}

export default App;
