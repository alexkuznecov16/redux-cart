import './Contacts.scss'

function Contacts() {

  return (
    <div className="contacts">
      <div className="container">
        <h1 className="contacts__title">Contact Us</h1>
        <p className="contacts__info">
          If you have any questions, feel free to reach out to us:
        </p>
        <ul className="contacts__list">
          <li>Email: example@email.com</li>
          <li>Phone: +371 12345678</li>
          <li>Address: Riga, Latvia</li>
        </ul>
      </div>
    </div>
  )
}

export default Contacts
