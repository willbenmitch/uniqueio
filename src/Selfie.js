import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import GridList from 'material-ui/GridList';
import Webcam from 'react-webcam';

class Selfie extends Component {
    constructor() {
        super();
        this.state = {imageSrc: null, imageData: null, buttonDisplay: {display: "none"}};
    }

    ComponentWillUnmount() {
        this.setState({imageSrc: null, imageData: null, buttonDisplay: {display: "none"}})
    }

    setRef = (webcam) => {
        this.webcam = webcam;
    }
 
    capture = () => {
        const imageSrc = {data: this.webcam.getScreenshot()};
        this.setState({imageSrc, imageData: imageSrc.data, buttonDisplay: {display: "initial"}});
    };

    render() {
        return(
            <div className="section-container">
                <GridList   cols={2}
                            padding={20}>
                    <div>
                        <Webcam 
                        audio={false}
                        width={640}
                        height={480}
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"/>
                        <div>
                            <RaisedButton onTouchTap={this.capture} label="Capture Photo"/>
                        </div>
                    </div>
                    <div>
                        <img src={this.state.imageData} className="capturedImage"/>
                        <div>
                            <RaisedButton label="Save Image" primary={true} buttonStyle={this.state.buttonDisplay} onTouchTap={()=> {this.props.handleNewImage(this.state.imageSrc)}}/>
                            <div>
                                <CircularProgress   mode="indeterminate"
                                                    style={{display:this.props.circularDisplay}}/>
                            </div>
                        </div>  
                    </div>
                </GridList>
            </div>
        )
    }
}

export default Selfie;