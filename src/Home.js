import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

class Home extends Component {
    render() {
        return (
            <div className="home_paragraph-container box-shadow">
                <p>
                    Hi! This is a proof-of-concept application that dynamically changes photos based on facial attributes.
                </p>
                <p>
                    After a picture is saved, Microsoft's Face API is queried to return facial attributes for that picture. 
                    These attributes are fed into a customized filter algorithm that changes filter properties. The attributes include 
                    emotion, hair colour, mouth position, and eye position. It also uses photo-specific properties 
                    such as exposure and blur to adjust the picture.
                </p>
                <p>
                    Feel free to start your journey by taking a picture of yourself. <em><strong>Enjoy!</strong></em>
                </p>
                <div className="center">
                    <Link to="/selfie"><RaisedButton primary={true} label="Take a selfie!"/></Link>
                </div>
            </div>
        )
    }
}

export default Home;