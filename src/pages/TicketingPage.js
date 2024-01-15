import React, { useState } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useQuery, useLazyQuery, useMutation, gql } from '@apollo/client';
import SiteHeader from "../components/SiteHeader.js";
import Navbar from "../components/Navbar";
import { userData } from '../helper.js';
import { toast} from 'react-toastify';

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
    connections(
      filters: { departure: { eq: $departure }, arrival: { eq: $arrival } }
      ) {
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

const CREATETICKET = gql`
mutation CreateTicket($date: Date!, $seat: Int!, $holder: ID!, $connection: ID!) {
  createTicket(
      data: {
        date: $date
        seat: $seat
        holder: $holder
        connection: $connection
      }
  ) {
    data {
      id
    }
  }
}
`;

const GETCARDINFO = gql`
query GetCardInfo ($date: Date!, $connection: ID!){
  tickets (filters: { date: { eq: $date}, connection: { id: {in: [$connection]}}} ) {
    data {
      attributes {
        seat
      }
    }
},
connections (filters: { id: {in: [$connection]}}) {
  data {
    attributes {
      numberOfSeats
    }
  }
}
}
`

const ReadMore = ({ connectionId, date }) => {
  const [isReadMore, setIsReadMore] = useState(true);
  const [selectedSeat, setSelectedSeat] = useState('');
  const [availableSeats, setAvailableSeats] = useState([]);
  const [getCardInfo, { loading: cardInfoLoading, error: cardInfoError, data: cardInfoData }] = useLazyQuery(GETCARDINFO);
  const [createTicket, { loading: createLoading, error: createError, data: createData }] = useMutation(CREATETICKET);

  const toggleReadMore = async () => {
    setIsReadMore(!isReadMore);
    const {data} = await getCardInfo({ variables: { date: date.toISOString().slice(0, 10), connection: connectionId } });
   
    const maxNumber = data.connections.data[0].attributes.numberOfSeats;
    const seatsTaken = data.tickets.data.map(ticket => ticket.attributes.seat);

    const availableSeats = Array.from({ length: maxNumber }, (_, index) => index + 1).filter(seat => !seatsTaken.includes(seat));
    setAvailableSeats(availableSeats);
  };

  const handleSeatChange = (e) => {
    setSelectedSeat(e.target.value);
  };

  const handleShowSeatsClick = async () => {
    try {
      // Make sure a seat is selected
      if (!selectedSeat) {
        toast.error('Please select a seat before buying a ticket.', {hideProgressBar: true});
        console.error('Please select a seat before buying a ticket.');
        return;
      }
  
      // Perform the mutation

      const { data } = await createTicket({
        variables: {
          date: date.toISOString().slice(0, 10),
          seat: parseInt(selectedSeat),
          holder: userData().id,
          connection: connectionId,
        },
      });
  
      // Check if the mutation was successful
      if (data && data.createTicket && data.createTicket.data && data.createTicket.data.id) {
        console.log('Ticket created successfully:', data.createTicket.data.id);
        toast.success("Ticket successfully bought!", {
          hideProgressBar: true
        });
      } else {
        toast.error("An error has occured during the election process!", {
          hideProgressBar: true
        })
      }
    } catch (error) {
      console.error('An error occurred during the mutation:', error);
    }
  };
  

  console.log(date);

  return (
    <div>
      <p className="text">
        {isReadMore ? '' : ''}
      </p>
      {isReadMore ? (
        <span onClick={toggleReadMore} className="read-or-hide" style={{ color: 'blue' }}>
          Check for avaialable seats!
        </span>
      ) : (
        <div>
          <Form.Select aria-label="select-seats" onChange={handleSeatChange} value={selectedSeat} className="mb-3 custom-select">
            <option>Select a seat</option>
            {availableSeats.map((seat) => (
                  <option key={seat} value={seat}>
                    {seat}
                  </option>
                ))}
          </Form.Select>
          <Button variant="primary" onClick={handleShowSeatsClick} className="buy-ticket-button">
            Buy Ticket
          </Button>
        </div>
      )}
    </div>
  );
};

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
    getConnections({ variables: { departure: selectedDeparture, arrival: selectedArrival } });
  };

  if (citiesLoading || connectionsLoading) return <p>Loading...</p>;
  if (citiesError || connectionsError) return <div><SiteHeader /><Navbar /><p>Error</p></div>;

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
                <ReadMore connectionId={connection.id} date={selectedDate} />
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
      </div>
      </div>
  );
}

export default TicketingForm;
