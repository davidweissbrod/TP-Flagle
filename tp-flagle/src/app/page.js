"use client";
import { Spinner } from "react-bootstrap";
import Image from "next/image";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [score, setScore] = useState(0);
  const [countries, setCountries] = useState([]);
  const [randomCountry, setRandomCountry] = useState(null);
  const [guess, setGuess] = useState('');
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const url = "https://countriesnow.space/api/v0.1/countries/flag/images";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setCountries(data.data)
        selectRandomCountry(data.data);
      } catch (e) {
        console.error('Error consiguiendo los paises:', e);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (timerActive) {
      if (timeLeft === 0) {

        setScore(prevScore => prevScore - 10);
        selectRandomCountry(countries);
        setTimeLeft(15); 
        setTimerActive(true); 
      }
      
      const interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval); 
    }
  }, [timeLeft, timerActive]);

  const selectRandomCountry = (countriesList) => {
    if (countriesList && countriesList.length > 0) {
      const randomIndex = Math.floor(Math.random() * countriesList.length);
      setRandomCountry(countriesList[randomIndex]);
      setTimeLeft(15); 
      setTimerActive(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (randomCountry && guess.toLowerCase() === randomCountry.name.toLowerCase()) {
      setScore(score + 10);
      setTimeLeft(15); 
      setTimerActive(true); 
    } else {
      setScore(score - 1);
      setTimeLeft(15); 
      setTimerActive(true); 
    }
    selectRandomCountry(countries);
    setGuess('');
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: "whitesmoke" }}>
      <b><h1>Adivina el país!</h1></b>
      <h4>Tiempo restante: {timeLeft} segundos</h4>
      <br/>
      {randomCountry ? (
        <div>
          <Image 
            src={randomCountry.flag} 
            width={500} 
            height={300} 
          />
          <br/>
          <br/>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicGuess">
              <Form.Control 
                type="text" 
                value={guess} 
                onChange={(e) => setGuess(e.target.value)} 
                placeholder="Nombre del país" 
              />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg">
              Adivinar
            </Button>
          </Form>
          <br/>
          <h2>Puntuación: {score}</h2>
        </div>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}
