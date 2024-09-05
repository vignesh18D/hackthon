import React from 'react'
import './Benefit.css'
import img1 from '../../assets/assets/icons/carbon_notebook-reference.svg'
import img2 from '../../assets/assets/icons/Vector.svg'
import img3 from '../../assets/assets/icons/Robot.svg'
import img4 from '../../assets/assets/icons/IdentificationCard.svg'



const Benefit = () => {
  return (
    <div className='benefit'>
      <h1>Why participate in AI Challenges ?</h1>
      <div className="box">
          <div className="img">
            <img src={img1} alt='img1'/>
            <div className="layer">
            <h2>Prove your Skills</h2>
            <p>Gain substantial experience by solving real-world problems and pit against others to come up with innovative solutions</p>
            </div></div>
      </div>
      <div className="box">
          <div className="img">
          <img src={img2} alt='img2'/>
            <div className="layer">
            <h2>Learn from community</h2>
            <p>One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from them.</p>
            </div></div>
      </div>
      <div className="box">
          <div className="img">
          <img src={img3} alt='img3'/>
            <div className="layer">
            <h2>Challenge yourself</h2>
            <p>There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire experience and bounce back harder.</p>
            </div></div>
      </div>
      <div className="box">
          <div className="img">
          <img src={img4} alt='img4'/>
            <div className="layer">
            <h2>Earn recognition</h2>
            <p>You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community but also earns rewards.</p>
            </div></div>
      </div>
    </div>
  )
}

export default Benefit
