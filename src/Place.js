import React from 'react';
import PropTypes from 'prop-types';

Place.propTypes ={
    place_name: PropTypes.string,
    key: PropTypes.string,
    phone: PropTypes.string,
    road_address: PropTypes.string,
    address: PropTypes.string,
    x: PropTypes.string,
    y: PropTypes.string,
    place_url: PropTypes.string
}
function Place({place_name, key, phone, road_address, address, x, y, place_url}){
    return (
        <div className="Place">
            <div className="Place__Columns">
                {/* <MoviePoster poster={poster} alt={title}/> */}
            </div>
            <div className="Place__Columns">
                <h1>{place_name}</h1>
                <h1>{key}</h1>
                <h1>{phone}</h1>
                <h1>{road_address}</h1>
                <h1>{address}</h1>
                <h1>{x}</h1>
                <h1>{y}</h1>
                <h1>{place_url}</h1>

               
            </div>
        </div>
    )
}
export default Place
