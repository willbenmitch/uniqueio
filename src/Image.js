import React, {Component} from 'react';
import GridTile from 'material-ui/GridList/GridTile';
import IconButton from 'material-ui/IconButton';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import './image.css';

const extPort =   process.env.PUBLIC_URL ||
                  'http://localhost:80';

class Image extends Component {
    render() {
        return(
            <GridTile   children={<img className="img" src={extPort+this.props.image.src}/>}
            />
        )
    }
}

export default Image;