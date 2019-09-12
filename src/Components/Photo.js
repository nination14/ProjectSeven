import React, { Component } from 'react';

class Photo extends Component {
    render() {
        return (
            <li>
                <a href={this.props.url} target="_blank" rel="noopener noreferrer"><img src={ this.props.url } alt="flickr img" /></a>
            </li>
         );
    }
}
 
export default Photo;