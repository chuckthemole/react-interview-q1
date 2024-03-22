import React from 'react';
import { isNameValid } from './mock-api/apis';
import { getLocations } from './mock-api/apis';
import './form.css';

export function Form() {

    const [locations, setLocations] = React.useState([]); // list of locations
    const [location, setLocation] = React.useState(''); // user input for location
    const [name, setName] = React.useState(''); // user input for name
    const [nameWarning, setNameWarning] = React.useState(''); // warning message for name
    const [nameLocationPairs, setNameLocationPairs] = React.useState([]); // list of name-location pairs

    // api call for locations
    React.useEffect(() => {
        getLocations().then((locations) => {
            setLocations(locations);
        });
    }, []);

    // useEffect for isNameValid api call. This should be called whenever name changes
    React.useEffect(() => {
        isNameValid(name).then((isValid) => {
            if (!isValid) {
                setNameWarning('this name has already been taken');
            } else {
                setNameWarning('');
            }
        });
    }, [name]);

    // onSubmit function for the form
    const onSubmit = () => {
        if (nameWarning === '' && name !== '' && location !== '') {
            const nameLocation = {name: name, location: location};
            setNameLocationPairs([...nameLocationPairs, nameLocation]);
        } else {
            console.log('invalid name or location');
        }
    };

    const onClear = () => { // clears out the nameLocationPairs array
        setNameLocationPairs([]);
    };

    return (
        <div>
            <div>
                <div><span>Name </span><input type="text" placeholder="Chuck Thomas" onChange={e => setName(e.target.value)}/></div>
                <div><span>{nameWarning}</span></div>
            </div>

            {/* create a location dropdown input using locations */}
            <div>
                <span>Location </span>
                <select defaultValue={'default'} onChange={e => setLocation(e.target.value)}>
                    <option disabled value='default'></option>
                    {locations.map((location) => (
                        <option key={location} value={location}>{location}</option>
                    ))}
                </select>
            </div>

            {/* create a table to display nameLocationPairs */}
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {/* loop through nameLocationPair and render each pair in a row */}
                    {nameLocationPairs.map((nameLocation, i) => (
                        <tr key={i}>
                            <td>{nameLocation.name}</td>
                            <td>{nameLocation.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={onClear}>clear</button>
            <button onClick={onSubmit}>add</button>
        </div>
    );
}