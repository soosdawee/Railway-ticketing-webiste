import React, { useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import SiteHeader from "../components/SiteHeader.js";
import Navbar from "../components/Navbar";

const CITIES = gql`
  query GetCities {
    cities {
      data {
        id
        attributes {
          name
        }
      }
    }
  }
`;

const CONNECTIONS = gql`
  query GetConnections($departure: String!, $arrival: String!) {
    connections(filters: { departure: { eq: $departure }, arrival: { eq: $arrival } }) {
      data {
        id
        attributes {
          departureTime,
          arrivalTime,
          price
        }
      }
    }
  }
`;

function TicketingForm() {
  const [selectedDeparture, setSelectedDeparture] = useState(null);
  const [selectedArrival, setSelectedArrival] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const { loading: citiesLoading, error: citiesError, data: citiesData } = useQuery(CITIES);
  const [getConnections, { loading: connectionsLoading, error: connectionsError, data: connectionsData }] = useLazyQuery(CONNECTIONS);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSearchClick = () => {
    // Call the getConnections query with the selected departure and arrival
    getConnections({ variables: { departure: selectedDeparture, arrival: selectedArrival } });
  };

  if (citiesLoading || connectionsLoading) return <p>Loading...</p>;
  if (citiesError || connectionsError) return <p>Error</p>;

  console.log(citiesData);
  console.log(connectionsData);

  return (
    <div> <SiteHeader /><Navbar />
    <div className="whole-page">
      
      <Form className="form-control">
    <div className="ticketing-form">
      <div className="select-container">
        <Form.Select
          aria-label="select-departure"
          className="mb-3 custom-select"
          style={{ width: '200px' }}
          onChange={(e) => setSelectedDeparture(e.target.value)}
          value={selectedDeparture || ''}
        >
          <option>Choose departure</option>
          {citiesData.cities.data.map((city) => (
            <option key={city.id} value={city.attributes.name}>
              {city.attributes.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          aria-label="select-arrival"
          className="mb-3 custom-select"
          style={{ width: '200px' }}
          onChange={(e) => setSelectedArrival(e.target.value)}
          value={selectedArrival || ''}
        >
          <option>Choose arrival</option>
          {citiesData.cities.data.map((city) => (
            <option key={city.id} value={city.attributes.name}>
              {city.attributes.name}
            </option>
          ))}
        </Form.Select>
      </div>

      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        dateFormat="dd/MM/yyyy"
        placeholderText="Select a date"
        className="mb-3 date-picker custom-select"
        minDate={new Date()}
      />

      <Form.Control
              type="text"
              placeholder="Number of tickets"  
              className='number-of-tickets'
              required
        />

      <Button type="submit" className="search-button" onClick={handleSearchClick}>
        Search for trains!
      </Button> 
    </div>
    </Form>

    {connectionsData && connectionsData.connections.data.length > 0 && (
  <div className="ticket-cards">
    {connectionsData.connections.data.map((connection) => (
      <Card key={connection.id} className="ticket-card mb-3">
        <div className="price-badge">
          {connection.attributes.price} RON
        </div>
        <Card.Body>
          <div className="connection-details">
            <div className="departure-time">
              Departure Time: {connection.attributes.departureTime.slice(0, 5)}
            </div>
            <div className="arrival-time">
              Arrival Time: {connection.attributes.arrivalTime.slice(0, 5)}
            </div>
          </div>
        </Card.Body>
      </Card>
    ))}
  </div>
)}
    </div></div>
  );
}

export default TicketingForm;
