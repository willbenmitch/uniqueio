import React, {Component} from 'react';
import GridTile from 'material-ui/GridList/GridTile';
import IconButton from 'material-ui/IconButton';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import './image.css';

const extPort =   process.env.PUBLIC_URL ||
                  'http://localhost:80';

class FilteredImage extends Component {
    render() {
        return(
            <GridTile   title={typeof this.props.image.likes === "undefined" ? " " : (this.props.image.likes === 0 ? " " : (this.props.image.likes === 1 ? this.props.image.likes+" like" : this.props.image.likes+" likes"))}
                        actionIcon={<IconButton onTouchTap={() => {this.props.handleLike(this.props.image._id)}}><ActionFavoriteBorder color="white" /></IconButton>}
                        actionPosition='left'
                        children={<img  className="img"
                                        src={extPort+this.props.image.src}
                                        style={typeof this.props.image.cssFilter === "undefined" ? {visibility: "hidden"} : {filter: this.props.image.cssFilter.join(" ")}}
                                        cols={1}
                                        rows={1}/>}
            />
        )
    }
}

export default FilteredImage;