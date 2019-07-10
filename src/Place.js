import React from 'react';
import PropTypes from 'prop-types';
import './Place.css';

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
            <div id="{key}" className="list_wrap">
                <dl className="list_box">
                    <dt className="title">{place_name}</dt>
                    <dd className="tel">{phone}</dd>
                    <dd className="addr">도로명 : {road_address}</dd>
                    <dd className="addr">지번명 : {address}</dd>
                </dl>
            </div>
        </div>
    )
}
export default Place
