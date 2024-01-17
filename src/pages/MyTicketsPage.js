import React from 'react';
import SiteHeader from "../components/SiteHeader.js";
import Navbar from "../components/Navbar";
import { useQuery, gql } from '@apollo/client';
import { userData } from '../helper';
import { Form, Card, Button } from 'react-bootstrap';


const TICKETS = gql`
  query GetTickets($id: ID!){
    tickets(filters: { holder: { id: { eq: $id } } }
      sort: "date:asc,connection.departureTime:asc"
      ) {
      data {
        attributes {
          connection {
            data {
              id,
              attributes {
                departure,
                arrival,
                departureTime,
                arrivalTime,
                price
              }
            }
          },
          date,
          seat
        }
      }
    }
  }
`;

export default function MyTickets() {
  const { loading: loadingAttr, error: errorAttr, data: ticketData } = useQuery(TICKETS, {variables: {id : userData().id}});

  console.log(ticketData?.tickets.data[0]);

  return (
    <div>
      <SiteHeader /><Navbar />
      <div className='home-page'>
      <div className="ticket-cards">
      {ticketData?.tickets?.data?.length > 0 ? (
  ticketData.tickets.data.map((connection) => (
    <Card key={connection.id} className="ticket-card mb-3">
      <div className="price-badge">
        PURCHASED
      </div>
      <Card.Body>
        <div className="connection-details">
          <div className="arrival-time">
            {connection?.attributes?.date.slice(0, 10)}
          </div>
          <div className="departure">
            From: {connection?.attributes?.connection?.data?.attributes?.departure}
          </div>
          <div className="arrival">
            To: {connection?.attributes?.connection?.data?.attributes?.arrival}
          </div>
          <div className="departure-time">
            Departure Time: {connection?.attributes?.connection?.data?.attributes?.departureTime.slice(0, 5)}
          </div>
          <div className="arrival-time">
            Arrival Time: {connection?.attributes?.connection?.data?.attributes?.arrivalTime.slice(0, 5)}
          </div>
        </div>
      </Card.Body>
    </Card>
  ))
) : (
  <p>No tickets purchased</p>
)}

        </div>
    </div>
    </div>
  );
}
