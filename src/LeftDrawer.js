import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

class LeftDrawer extends Component {
    render() {
        return (
            <Drawer open={this.props.open}
                    width={200}>
                <RaisedButton label="close" className="header_link-left" secondary={true} onTouchTap={this.props.handleTechStack}/>
                <MenuItem disabled={true}/>
                <a href="https://facebook.github.io/react/" target="_blank" rel="noopener noreferrer"><MenuItem primaryText= "React" /></a>
                <a href="https://expressjs.com/" target="_blank" rel="noopener noreferrer"><MenuItem primaryText= "Express" /></a>
                <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer"><MenuItem primaryText= "Node" /></a>
                <a href="https://www.mongodb.com/" target="_blank" rel="noopener noreferrer"><MenuItem primaryText= "MongoDB" /></a>
                <a href="https://azure.microsoft.com/en-us/services/cognitive-services/face/" target="_blank" rel="noopener noreferrer"><MenuItem primaryText= "MS Face API" /></a> 
                <a href="http://www.material-ui.com" target="_blank" rel="noopener noreferrer"><MenuItem primaryText= "Material-UI" /></a>
                <a href="https://github.com/mozmorris/react-webcam" target="_blank" rel="noopener noreferrer"><MenuItem primaryText= "React-Webcam" /></a>
            </Drawer>
        )
    }
}

export default LeftDrawer;