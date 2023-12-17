import React from "react";
import { Container, Row, Col } from "react-bootstrap";


const About = () => {
  return (
    <>
      <Container style={{ marginTop: "20px",  minHeight: "50px"}}>
        <h1>About Us</h1>
        <p>
        Welcome to [Chat App], where meaningful connections and seamless communication come together. 
        Our chat app was born out of a passion for bringing people closer, 
        regardless of the miles that separate them. We believe in the power of conversation and the bonds it creates.
        </p>
        <h1>Our Speciality</h1>
        <Row>
          <Col md={6}>
            <p>
            Our Mission
            we are on a mission to make connecting with friends, family, and colleagues an enriching experience.
            Our goal is to provide you with a platform that's not just easy to use but also fosters genuine connections.
            We want to be the bridge that brings people together in a world that often feels divided.
            </p>
          </Col>
          <Col md={6}>
            <p>
            Get in Touch

           Have a question, suggestion, or just want to say hello? We're all ears.
           Reach out to us anytime, and we'll be more than happy to connect with you.
           Join us on chat app and start making memories, sharing experiences,
           and staying close to the people who matter most.
           Thank you for choosing us as your chat app of choice!
            </p>
          </Col>
        </Row>
        
      </Container>
    </>
  );
};

export default About;

