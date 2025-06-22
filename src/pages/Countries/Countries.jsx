import { useQuery } from '@apollo/client'
import './Countries.scss'
import { GET_COUNTRIES } from '../../app/query';

function Countries() {
  const { loading, error, data } = useQuery(GET_COUNTRIES)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='countries'>
      <div className="container">
        <ul className='countries-list'>
          {data.countries.slice(0, 50).map((country) => (
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