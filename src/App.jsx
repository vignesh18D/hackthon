
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Benefit from './Components/Benefit/Benefit'
import Explore from './Components/Explore/Explore'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import Second from './Components/Second/Second'
import Create from './Components/Create/Create';
import Display from './Components/display/Display';
import Provider from './Components/Provider';
import Hack from './Components/Hackthon/Hack';



function App() {

  return (
    <Provider>
      <BrowserRouter>
      <>
      <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
               
                <Home />
                <Second />
                <Benefit />
                <Explore />
                <Display/>
              </>
            }
          />
          <Route path="/create" element={<Create />} />
          <Route path="/challenge/:id" element={<Hack />} />
          
        </Routes>
      </>
    </BrowserRouter>
    </Provider>
  )
}

export default App
