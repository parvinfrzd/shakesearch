import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { useState, useEffect } from 'react'; 

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';


import SearchForm from './components/SearchForm';

function App() {
  const [error, setError] = useState(null); 
  const [isLoaded, setIsLoaded] = useState(false); 
  const [items, setItems] = useState([]);

  const [query, setQuery] = useState('');
  const endpoint = 'http://localhost:3001/search'
  const getData = (data) => {
    setError(data.error); 
    setIsLoaded(data.isLoaded); 
    setItems(data.items);
  }

  return (
    <div className="App content-area">
        <h1>Welcome to Shakespear Search</h1>
        <SearchForm getData={getData} />
        <div className="content-area">
          {error && <h1>Messages: {error.message}</h1>}
          {!isLoaded && <h3>Is loading data... </h3>}
          {isLoaded && items.length === 0 && 
            <h3>
              No results found. Please try again.
            </h3>}
            {items.length === 1 && items[0].errorCode === 101 && <h3>{items[0].text}</h3>}
            {items.length > 0  && items[0].errorCode === 0 &&
              <div className="output-area">
                <h3>Total number of results found {items.length}</h3>
                <div className="results">
                    {items.map((item) => 
                      <Card >
                        <Card.Body>
                          <Card.Title>number of {query} found: {item.occurrenceCount}</Card.Title>
                          <Card.Text>
                          {item.text}
                          </Card.Text>
                          <Button variant="primary">Share this queute</Button>
                        </Card.Body>
                      </Card>
                    )}
                </div>
              </div>}
          </div>
        </div>
  );
}

export default App;
