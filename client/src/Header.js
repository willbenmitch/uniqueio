import React, {Component} from 'react';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="center">
                <h1>Photo Filter using Facial Analysis</h1>
                <Link className="header_link-left"><RaisedButton    label="Tech Stack"
                                                                    secondary={true}
                                                                    onTouchTap={this.props.handleTechStack}/></Link>
                <Link to="/"><FlatButton primary={true} label="about"/></Link>
                <Link to="/compare"><FlatButton primary={true} label="compare"/></Link>
                <Link to="/portfolio"><FlatButton primary={true} label="portfolio"/></Link>
                <Link to="/selfie"><FlatButton label="Take a selfie"
                            secondary={true}/></Link>
                <Link className="header_link-right"><RaisedButton   label="Highlights"
                                                                    secondary={true}
                                                                    onTouchTap={this.props.handleHighlights}/></Link>
            </div>
        )
    }
}

export default Header;