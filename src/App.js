import React, { useState, useEffect } from 'react';
import data from './properties.json';
import './styles/App.scss';
import Card from './components/Card';

const App = () => {
  const [results, setResults] = useState([]);
  const [saved, setSaved] = useState([]); 

  const fetchData = () => {
    return new Promise((resolved, rejected) => {
      setTimeout(() => {
        if (data.results && data.saved)
          resolved(data);
        else
          rejected('Could fetch properties data');
      }, 500);
    });
  }

  useEffect(() => {
    fetchData().then(data => {
      setResults(data.results);
      setSaved(data.saved);
    }).catch(error => {

    });
  }, []);

  return (
    <main>
      <div className="results">
        <h2>Results</h2>
        <div className="list">
          {results.map(result => <Card key={result.id} details={result} />)}
        </div>
      </div>
      <div className="saved">
        <h2>Saved Properties</h2>
        <div className="list">
          {saved.map(result => <Card key={result.id} details={result} />)}
        </div>
      </div>
    </main>
  );
}

export default App;