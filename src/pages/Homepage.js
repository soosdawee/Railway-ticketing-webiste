import React from 'react'
import useFetch from '../hooks/useFetch'

export default function HomePage() {
    const {loading, error, data} = useFetch('http://localhost:1337/api/cities')
    if (loading) return <p>Loading...</p>
    if (error.length > 0) return <p>Error</p>

    console.log(data)

    return (
      <div>
          {data.map(city => (
              <div key={city.id} className='city-card'>
                  <h2>{city.attributes.name}</h2>
                  <p>{city.attributes.body}</p>
              </div>
          ))}
      </div>
    )
}
