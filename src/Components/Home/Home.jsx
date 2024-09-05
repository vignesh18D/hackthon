import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css'
import homeimage from '../../assets/assets/icons/PicsArt_04-14-04.42 1.svg'

const Home = () => {
  const navigate = useNavigate(); 
  const handleCreate = () => {
    navigate('/create'); 
  };
  return (
    <div className='create'>
      <div className="home-cont">
      <div className="content">
      <div className="line">
        <div className="small"></div>
      <h1 className="let">Accelerate Innovation With Global AI Challenge</h1></div>
        <p>Ai Challenges at DE Tech simulate real-world problems. it is a great place to put your Ai/Data Science skills to test o diverse datasets allowing you to faster learning through competitions.</p>
        <button  onClick={handleCreate}>Create Challenge</button>
      
        
      </div>
      </div>
      <div className="home-right">
        <img src={homeimage}/>
      </div>
    </div>
  )
}

export default Home
