

import { Autocomplete, GoogleApiWrapper } from 'google-maps-react';
import React, { useState } from "react";

const AddressAutocomplete = (props) => {
    const [address, setAddress] = useState('');

    const onPlaceChanged = (place) => {
        const { formatted_address } = place;
        setAddress(formatted_address);
    }

    return (
        <Autocomplete
            onPlaceSelected={onPlaceChanged}
            types={['geocode']}
            componentRestrictions={{ country: 'us' }}
        >
            <input
                type="text"
                className="form-control"
                id="title-117"
                name="title"
                placeholder="Where? e.g. Moe's Tavern"
                autoComplete="off"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
            />
        </Autocomplete>
    );
};

export default GoogleApiWrapper({
    apiKey: 'N/A - This does not work'
})(AddressAutocomplete);
