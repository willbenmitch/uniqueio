import React, {Component} from 'react';
import GridTile from 'material-ui/GridList/GridTile';
import './image.css';

class Properties extends Component {
    render() {
        let emotionPrediction = "face not filtered";
        let hairColour = "face not filtered";
        let age = "face not filtered";
        
        if (this.props.image.data !== undefined) {
           this.props.image.data[0].faceAttributes.hair.hairColor.sort((a, b) => {
                return b - a;
            });
            let emotions = this.props.image.data[0].faceAttributes.emotion;
            emotionPrediction = Object.keys(emotions).reduce((a,b) => {return (emotions[a] > emotions[b] ? a : b)});
            hairColour = this.props.image.data[0].faceAttributes.hair.hairColor.length === 0 ? "bald" : this.props.image.data[0].faceAttributes.hair.hairColor[0].color;
            age = Math.floor(this.props.image.data[0].faceAttributes.age);
        }
        return (
            <GridTile >
                <div className="compare_paragraph-container">
                    <ul>
                        <li>Hair colour appears to be {hairColour}</li>
                        <li>This person's age appears to be {age}</li>
                        <li>I'd say this person's emotion is {emotionPrediction}</li>
                        <br/>
                        <li>Custom CSS Filter: {this.props.image.cssFilter.join(", ")}</li>
                    </ul>
                </div>
            </GridTile>
        )
    }
}

export default Properties;



