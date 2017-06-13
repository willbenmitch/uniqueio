import React, {Component} from 'react';
import {Link} from 'react-router';
import GridList from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import FilteredImage from './FilteredImage';
import RaisedButton from 'material-ui/RaisedButton';

class Portfolio extends Component {
    render() {
        if(this.props.images.length === 0) {
            return (
                <div className="section-container center">
                    <Link to="/selfie"><RaisedButton primary={true} label="Take a selfie!"/></Link>
                </div>
            )} else {
                let filteredImagesJSX = this.props.images.map((image) => {
                                            return (<FilteredImage  image={image} handleLike={this.props.handleLike}/>)
                                        }) 
                return (
                        <div className="section-container">
                            <Subheader style={{textAlign: "center"}}><h2>Portfolio of filtered images</h2></Subheader>
                            <GridList   cols={4}
                                        cellHeight='auto'
                                        padding={20}
                                        children={filteredImagesJSX} />
                        </div>
                )
            }
    }
}

export default Portfolio;