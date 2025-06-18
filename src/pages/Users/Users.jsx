import { useQuery } from '@apollo/client'
import './Users.scss'
import { GET_CHARACTERS } from '../../app/query';

function Users() {
  const { loading, error, data } = useQuery(GET_CHARACTERS)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className='users'>
      <div className="container">
        <h2>Rick and Morty Characters</h2>
        <ul className='user-list'>
          {data.characters.results.slice(0, 10).map((char) => (
            <li key={char.id}>
              <img src={char.image} alt={char.name} />
              <p>{char.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Users