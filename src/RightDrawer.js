import React, {Component} from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';

class RightDrawer extends Component {
    render() {
        return (
            <Drawer open={this.props.open}
                    openSecondary={true}
                    width={200}>
                <RaisedButton label="close" className="header_link-right" secondary={true} onTouchTap={this.props.handleHighlights}/>
                <MenuItem disabled={true}/>
                <MenuItem primaryText={"Total images: "+this.props.images.length} />
                <MenuItem primaryText={"Total Likes: "+this.props.images.reduce((acc, cur) => {return acc + cur.likes},0)}/>
            </Drawer>
        )
    }
}

export default RightDrawer;