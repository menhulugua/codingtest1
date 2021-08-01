import React, { useState, useEffect, useReducer } from 'react';
import data from './properties.json';
import axios from 'axios';

import './styles/App.scss';
import Card from './components/Card';
import OverlayButton from './components/OverlayButton';

const SavedContext = React.createContext();

const App = () => {
  const [results, setResults] = useState([]);
  const [loadingState, setLoadingState] = useState(0); // 0 for loading, 1 for loaded, 2 for error
  const savedReducer = (state, action) => {
    switch(action.type) {
      case 'initialise':
        return action.payload;
      case 'add':
        if (!state.includes(action.payload))
          return [action.payload, ...state];
        else
          return state;
      case 'remove':
        return state.filter(item => item.id !== action.payload);
      default:
        return state;
    }
  }
  const [saved, setSaved] = useReducer(savedReducer, []); 

  useEffect(() => {
    // axios.get("/b/X8H0").then(({data}) => {
    //   setResults(data.results);
    //   setSaved({type: 'initialise', payload:data.saved});
    //   setLoadingState(1);
    // }).catch(error => {
    //   setLoadingState(2);
    // });

    /* If the link doesn't work, use the code below to load local json file */

    const fetchData = () => {
      return new Promise((resolved, rejected) => {
        setTimeout(() => {
          if (data.results && data.saved)
            resolved(data);
          else
            rejected();
        }, 500);
      });
    }

    fetchData().then(data => {
      setResults(data.results);
      setSaved({type: 'initialise', payload:data.saved});
      setLoadingState(1);
    }).catch(error => {
      setLoadingState(2);
    });
  }, []);

  return (
    <SavedContext.Provider value={{saved, setSaved}}>
      <main>
        {loadingState === 0 && <div className="loading">loading</div>}
        {loadingState === 2 && <div className="error">There's an error loading properties</div>}
        {loadingState === 1 && <><div className="results">
          <h2>Results</h2>
          <div className="list">
            {results.map(result => <Card key={result.id} details={result}><OverlayButton type="add" property={result} /></Card>)}
          </div>
        </div>
        <div className="saved">
          <h2>Saved Properties</h2>
          <div className="list">
            {saved.map(result => <Card key={result.id} details={result}><OverlayButton type="remove" property={result} /></Card>)}
          </div>
        </div></>}
      </main>
    </SavedContext.Provider>
  );
}

export { App as default, SavedContext };