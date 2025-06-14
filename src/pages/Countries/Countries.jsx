import { gql, useQuery } from '@apollo/client'
import './Countries.scss'

const GET_COUNTRIES = gql`
query {
  countries {
    code
    name
    emoji
  }
}`;

function Countries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='countries'>
      <div className="container">
        <ul>
          {data.countries.slice(0, 10).map((country) => (
            <li key={country.code}>
              {country.emoji} {country.name} ({country.code})
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Countries