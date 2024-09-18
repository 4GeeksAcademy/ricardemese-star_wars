import React, { useState, useEffect } from 'react';

const quotes = [
  "May the Force be with you.",
  "I've got a bad feeling about this.",
  "Do or do not. There is no try.",
  "The Force will be with you, always.",
  "I find your lack of faith disturbing.",
  "In my experience, there is no such thing as luck.",
  "You are on this council, but we do not grant you the rank of Master.",
  "Fear is the path to the dark side.",
  "The dark side of the Force is a pathway to many abilities some consider to be unnatural.",
  "It’s not my fault."
];

export const Footer = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  return (
    <footer className="footer mt-auto py-3 text-center">
      <p>
        {quote}
      </p>
      <p>
        Made with <i className="fa fa-heart text-danger" /> by Ricard :)
      </p>
    </footer>
  );
};