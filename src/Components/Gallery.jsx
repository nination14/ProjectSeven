import React, { Component } from 'react';
import Photo from './Photo';


class Gallery extends Component {
     
    //Handler to search based on the changing pathname, ex: art=[2].
    handleHeader(){
        const title= this.props.query; //this.props.location.pathname.split('/')[2]
        return title;
    }

    render() { 
        let title = this.handleHeader()
        let results = this.props.pictures.map(photo => { 
            let photos = (<Photo key={photo.id} url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />);
        return (photos);
        });
        
        if(results.length > 0){
            return(
                <div className="photo-container">
                    <h2>{title}</h2>
                    <ul>
                        {results}
                    </ul>
                </div>
            );
        } else {
            return(
                <div className="photo-container">
                    <h2>No search results.</h2>
                </div>
            );
        }
    }
}
export default Gallery;