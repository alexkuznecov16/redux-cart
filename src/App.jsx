import Footer from './Components/Footer/Footer'
import Header from './Components/Header/Header'
import Products from './pages/Products/Products'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Contacts from './pages/Contacts/Contacts'
import NotFound from './pages/NotFound/NotFound'
import Countries from './pages/Countries/Countries'

function App() {

  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <main className="content">
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/products' element={<Products />} />
            <Route path='/contacts' element={<Contacts />} />
            <Route path='/countries' element={<Countries />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
     </div>
    </BrowserRouter>
  )
}

export default App