import React from 'react'
import './Second.css'
import ai from '../../assets/assets/icons/Group 1000002515.svg'
import contact from '../../assets/assets/icons/Group 1000002516.svg'
import heart from '../../assets/assets/icons/Group 1000002518.svg'

const Second = () => {
  return (
    <div className='second-main'>
      <div className="layer-1">
        <img src={ai} alt='ai'/>
        <div className="number">
            <h1>100k+</h1>
            <h2>AI model submissions</h2>
        </div>
      </div>
      <div className="second-line"></div>
      <div className="layer-1">
        <img src={contact} alt='ai'/>
        <div className="number">
            <h1>50k+</h1>
            <h2>Data Scientists</h2>
        </div>
         </div>
         <div className="second-line"></div>
      <div className="layer-1">
        <img src={heart} alt='ai'/>
        <div className="number">
            <h1>100+</h1>
            <h2>AI Challenges hosted</h2>
        </div>
      </div>
    </div>
  )
}

export default Second
