// thx: https://www.digitalocean.com/community/tutorials/how-to-integrate-the-google-maps-api-into-react-applications
import React from 'react'
import { Map, GoogleApiWrapper } from 'google-maps-react'

const mapStyles = {
    maxWidth: '518px',
    maxHeight: '336px',
    width: '90%',
    height: '90%',
    borderRadius: "8px"
}

// --------------
// --------------
// --------------
const MapContainer = (props) => {
    // --------------
    return (
        <Map
            visible={props.getterShowMap()}
            google={props.google}
            zoom={14}
            style={mapStyles}
            center={props.locationCoordinates}
            zoomControl={false}
            mapTypeControl={false}
            streetViewControl={false}
            fullscreenControl={false}
        />
    )
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
})(MapContainer)