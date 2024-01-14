import React, {useState} from 'react'
import {useQuery, gql} from '@apollo/client'
import SiteHeader from "../components/SiteHeader.js";
import Navbar from "../components/Navbar";
import { userData } from '../helper';

const CITIES = gql`
query GetCities {
    cities{
      data {
        id
        attributes {
          name
          body
        }
      }
    }
  }
  
`

const ReadMore = ({children}) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
        setIsReadMore(!isReadMore);
    };

    return (
        <p className="text">
            {isReadMore ? text.slice(0, 150) : text}
            <span
                onClick={toggleReadMore}
                className="read-or-hide"
                style={{ color: "blue" }}
            >
                {isReadMore ? " ... Read more" : " Show less"}
            </span>
        </p>
    );
};

export default function HomePage() {
    const { loading, error, data } = useQuery(CITIES);
    const username = userData().username;

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error</p>

    console.log(data.cities.data)

    return (
      <div>
            <SiteHeader /><Navbar /><h2>Welcome, {username} </h2>
          {data.cities.data.map(city => (
              <div key={city.id} className='city-card'>
                  <h2>{city.attributes.name}</h2>
                  <ReadMore>{city.attributes.body}</ReadMore>
                  
              </div>
          ))}
      </div>
    )
}
