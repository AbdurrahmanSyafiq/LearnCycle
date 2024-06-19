import React, { useState } from 'react';

// Fungsi untuk memeriksa apakah sebuah bilangan adalah bilangan prima
function isPrime(num) {
  if (num <= 1) return false;
  if (num === 2) return true;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function PrimeApp() {
  // State untuk menyimpan nilai bilangan awal, bilangan akhir, dan daftar bilangan prima
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [primes, setPrimes] = useState([]);

  // Fungsi untuk menghandle submit
  const handleSubmit = () => {
    const startNum = parseInt(start, 10);
    const endNum = parseInt(end, 10);
    const primeNumbers = [];
    for (let i = startNum; i <= endNum; i++) {
      if (isPrime(i)) {
        primeNumbers.push(i);
      }
    }
    setPrimes(primeNumbers);
  };

  return (
    <div>
      <h1>Pencari Bilangan Prima</h1>
      <div>
        <label>
          Bilangan Awal:
          <input 
            type="number" 
            value={start} 
            onChange={(e) => setStart(e.target.value)} 
          />
        </label>
      </div>
      <div>
        <label>
          Bilangan Akhir:
          <input 
            type="number" 
            value={end} 
            onChange={(e) => setEnd(e.target.value)} 
          />
        </label>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      <div>
        <h2>Bilangan Prima antara {start} dan {end}:</h2>
        <ul>
          {primes.map((prime) => (
            <li key={prime}>{prime}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PrimeApp;
