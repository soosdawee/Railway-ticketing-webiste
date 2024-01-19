import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { useParams } from 'react-router-dom';

const PIC = gql`
query GetCities ($id : ID!) {
    cities (filters: {id : {eq: $id}}){
      data {
        id
        attributes {
          image {
            data {
              attributes {
                url
              }
            }
          }
          
        }
      }
    }
  }
`

export default function PhotoPage() {
    const { id } = useParams();
    const { loading, error, data } = useQuery(PIC, {
        variables: {id : id}
    });
    console.log(data?.cities.data[0]?.attributes.image.data.attributes.url);
  return (
    <div className='photo-page'>
      <img
  src={`http://localhost:1337${data?.cities.data[0]?.attributes.image.data.attributes.url}`}
  alt="City Image"
/>

    </div>
  )
}
