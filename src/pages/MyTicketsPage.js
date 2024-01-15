import React from 'react';
import SiteHeader from "../components/SiteHeader.js";
import Navbar from "../components/Navbar";
import { useQuery, gql } from '@apollo/client';
import { userData } from '../helper';
import { Form, Card, Button } from 'react-bootstrap';


const TICKETS = gql`
  query GetTickets($id: ID!){
    tickets(filters: { holder: { id: { eq: $id } } }) {
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
      <h3>Dear {userData().username}, you have purchased these tickets through our website:</h3>
      <div className="ticket-cards">
          {ticketData?.tickets?.data?.map((connection) => (
            <Card key={connection.id} className="ticket-card mb-3">
                <div className="price-badge">
                {connection?.attributes?.connection?.data?.attributes?.price} RON
              </div>
              <Card.Body>
                <div className="connection-details">
                  <div className="departure-time">
                    Departure Time: {connection?.attributes?.connection?.data?.attributes?.departureTime.slice(0, 5)}
                  </div>
                  <div className="arrival-time">
                    Arrival Time: {connection?.attributes?.connection?.data?.attributes?.arrivalTime.slice(0, 5)}
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
    </div>
  );
}
