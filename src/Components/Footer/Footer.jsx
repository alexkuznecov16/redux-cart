import './Footer.scss'

const Footer = () => {
  return (
    <footer className='Footer'>
      <div className="container">
        <div className="Footer__inner">
          &copy; Alexander Kuznecov {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  )
}

export default Footer