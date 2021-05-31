// App.js
import React from 'react';
import './App.css';
import RestCountriesAutosuggest from './components/restCountries.autosuggest';

function App() {
  return (
    <div className="App">

      <h1>REST Countries Search Bar</h1>
      <RestCountriesAutosuggest />
      
    </div>
  );
}

export default App;