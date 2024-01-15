import React from 'react'
import { Home, Mail, Phone } from 'react-feather'

function Contact() {
  return (
    <div className='contact-container'>
      <div className='contact-poster'>
        <img src='./assets/contact.png' width='100%'/>
      </div>
      <div className='contact-form'>
        <div className='glassmorphism'>
          <div className='glass-item'>
            <div className='circle'><Phone/></div>
            <h3>+94712176827</h3>
          </div>
          <div className='glass-item'>
            <div className='circle'><Home/></div>
            <h3>No.210/B, Samupakara mawatha,hello Address</h3>
          </div>
          <div className='glass-item'>
            <div className='circle'><Mail/></div>
            <h3>sample@gmail.com</h3>
          </div>
        </div>
        <div className='map-component'>
        <iframe
          title='Google Map'
          width='90%'
          height='300px'
          frameBorder='0'
          style={{ borderRadius: 20 }}
          src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15885887.525251564!2d-99.3403835723229!3d37.21959831006585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d9b01195435d3d%3A0x953e468ea7899e30!2sEarth!5e0!3m2!1sen!2sus!4v1624919438446!5m2!1sen!2sus'
          allowFullScreen
        ></iframe>

        </div>
      </div>
    </div>
  )
}

export default Contact