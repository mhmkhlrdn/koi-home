import React, { useEffect, useState } from 'react';

const AddressSelect = ({ data, setData, errors }) => {
  const [countryCities, setCountryCities] = useState([]);
  const [countryStates, setCountryStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries')
      .then((response) => response.json())
      .then((result) => setCountryCities(result.data || []))
      .catch((error) => console.error('error fetching countries/cities', error));

    fetch('https://countriesnow.space/api/v0.1/countries/states')
      .then((response) => response.json())
      .then((result) => setCountryStates(result.data || []))
      .catch((error) => console.error('error fetching states', error));
  }, []);

  // Update cities and states when country changes
  useEffect(() => {
    if (!data.country) {
      setCities([]);
      setStates([]);
      return;
    }

    const countryCity = countryCities.find((c) => c.country === data.country);
    setCities(countryCity?.cities || []);

    const countryState = countryStates.find((c) => c.name === data.country);
    setStates(countryState?.states || []);
  }, [data.country, countryCities, countryStates]);

  return (
    <>
      {/* Country */}
      <div className="mt-1">
        <label className="block text-sm font-medium text-white">Country:</label>
        <select
          className="mt-1 w-full rounded border bg-gray-800 p-2"
          value={data.country}
          onChange={(e) => {
            setData('country', e.target.value);
            setData('city', '');
            setData('province', '');
          }}
        >
          <option value="">Select a country</option>
          {countryCities.map((country) => (
            <option key={country.country} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>
        {errors?.country && <p className="text-sm text-red-500">{errors.country}</p>}
      </div>



      {/* Province/State */}
      <div className="mt-1">
        <label className="block text-sm font-medium">Province/State:</label>
        <select
          className="mt-1 w-full rounded border bg-gray-800 p-2"
          value={data.province}
          onChange={(e) => setData('province', e.target.value)}
          disabled={!states.length}
        >
          <option value="">Select a province/state</option>
          {states.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>
        {errors?.province && <p className="text-sm text-red-500">{errors.province}</p>}
      </div>

       {/* City */}
      <div className="mt-1">
        <label className="block text-sm font-medium">City:</label>
        <select
          className="mt-1 w-full rounded border bg-gray-800 p-2"
          value={data.city}
          onChange={(e) => setData('city', e.target.value)}
          disabled={!cities.length}
        >
          <option value="">Select a city</option>
          {cities.map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
        {errors?.city && <p className="text-sm text-red-500">{errors.city}</p>}
      </div>
    </>
  );
};

export default AddressSelect;
