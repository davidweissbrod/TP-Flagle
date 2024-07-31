"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useState } from "react";

export default function Home() {
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState(null);
  const [randomCountry, setRandomCountry] = useState(null);

  const url = "https://countriesnow.space/api/v0.1/countries/flag/images"

  useEffect(() => {
    const fetchData = async () => {
      fetch(url)
        .then(res => res.json())
        .then(data => setUsers(data.results))
      .catch(e => console.log(e))
    };
    fetchData();
  }, []);
  
  const selectRandomCountry = (countries) => {
    if (countries.length > 0) {
      const randomIndex = Math.floor(Math.random() * countries.length);
      setRandomCountry(countries[randomIndex]);
    }
  };
  return (
    <div style={styles.container}>
        <h2>Guess the country!</h2>
        <Image
          src={randomCountry.flag}
          style={{ width: '200px' }}
        />
  </div>
  );
}
