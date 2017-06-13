import React, {Component} from 'react';
import {Link} from 'react-router';
import GridList from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Image from './Image';
import FilteredImage from './FilteredImage';
import Properties from './Properties';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import LastPage from 'material-ui/svg-icons/navigation/last-page';
import FirstPage from 'material-ui/svg-icons/navigation/first-page';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';

class Compare extends Component {
    render() {
         if(this.props.images.length === 0) {
      return (
        <div className="section-container center">
                    <Link to="/selfie"><RaisedButton primary={true} label="Take a selfie!"/></Link>
        </div>
      )} else {
            let images = this.props.images;
            let index = this.props.index;
            return (
                <div>
                    <div className="section-container">
                        <FloatingActionButton style={{float:"left"}} children={<FirstPage/>} onTouchTap={this.props.indexFirst}/>
                        <FloatingActionButton style={{float:"left"}} children={<ChevronLeft/>} onTouchTap={this.props.handlePrevImage}/>
                        <div style={{float: "left", width: "25%", textAlign: "center"}}>
                            <Subheader><h2>Original</h2></Subheader>
                            <GridList   style={{display: "inline-block", width: "100%", textAlign: "left"}}
                                        cols={1}
                                        cellHeight='auto'
                                        padding={20}
                                        children={<Image    image={images[index]}/>} />
                        </div>
                        <div style={{float: "left", width: "25%", textAlign: "center"}}>
                            <Subheader><h2>Filtered</h2></Subheader>
                            <GridList   style={{display: "inline-block", width: "100%", textAlign: "left"}}
                                        cols={1}
                                        cellHeight='auto'
                                        padding={20}
                                        children={<FilteredImage image={images[index]} handleLike={this.props.handleLike}/>} />
                        </div>
                        <div style={{float: "left", width: "35%", textAlign: "center"}}>
                            <Subheader><h2>Properties</h2></Subheader>
                            <GridList   style={{display: "inline-block", width: "90%", textAlign: "left"}}
                                        cols={1}
                                        cellHeight='auto'
                                        padding={20}
                                        children={<Properties image={images[index]} />} />
                        </div>
                    </div>
                    <FloatingActionButton children={<ChevronRight/>} onTouchTap={this.props.handleNextImage}/>
                    <FloatingActionButton children={<LastPage/>} onTouchTap={this.props.indexLast}/>
                </div>
            )
        }
    }
}

export default Compare;