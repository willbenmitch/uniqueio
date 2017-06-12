import React, {Component} from 'react';
import GridList from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import Image from './Image';
import FilteredImage from './FilteredImage';
import Properties from './Properties';

class CompareOld extends Component {
    render() {
        let imagesJSX = this.props.images.map((image, i) => {
            return (
                    <Image  image={image}
                        key={i}/>
            )
        })
        let filteredImagesJSX = this.props.images.map((image) => {
            return (<FilteredImage image={image} />)
        })

        let propertiesJSX = this.props.images.map((image) => {
            return (<Properties image={image} />)
        })
        return (
            <div className="section-container">
                <div style={{float: "left", width: "33.33%", textAlign: "center"}}>
                    <Subheader><h2>Original</h2></Subheader>
                    <GridList   style={{display: "inline-block", width: "90%", textAlign: "left"}}
                                cols={1}
                                cellHeight='auto'
                                padding={20}
                                children={imagesJSX} />
                </div>
                <div style={{float: "left", width: "33.33%", textAlign: "center"}}>
                    <Subheader><h2>Filtered</h2></Subheader>
                    <GridList   style={{display: "inline-block", width: "90%", textAlign: "left"}}
                                cols={1}
                                cellHeight='auto'
                                padding={20}
                                children={filteredImagesJSX} />
                </div>
                <div style={{float: "left", width: "33.33%", textAlign: "center"}}>
                    <Subheader><h2>Properties</h2></Subheader>
                    <GridList   style={{display: "inline-block", width: "90%", textAlign: "left"}}
                                cols={1}
                                cellHeight='auto'
                                padding={20}
                                children={propertiesJSX} />
                </div>
            </div>
        )
    }
}

export default CompareOld;