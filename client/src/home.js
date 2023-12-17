import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    return (
        <Carousel interval={1000}>
          <Carousel.Item >
            <img
              className="d-block w-50"
              src="https://img.freepik.com/premium-vector/social-media-concept-smart-phone-with-carousel-messenger-chat-screen-sms-template-bubbles-compose-dialogues-modern-illustration-style_172533-527.jpg"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item >
            <img
              className="d-block w-50"
              src="https://img.freepik.com/premium-vector/smartphone-chatting-sms-template-bubbles_349999-249.jpg"
              alt="Second slide"
            />
          </Carousel.Item>
          
        </Carousel>
      );
}

export default Home;
