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

  const [data, setData] = useState({});

  const [query, setQuery] = useState('');

  const getData = (data) => {
    setData(data);
    console.log("passed to partent", data);
  }

  useEffect(()=> {
    console.log(data);

  },[data])


  return (
    <div className="App content-area">
        <h1>Welcome to Shakespear Search</h1>
        <SearchForm getData={getData} />
        <div className="content-area">
          {data.error && <h1>Messages: {data.error.message}</h1>}
          {!data.isLoaded && <h3>Is loading data... </h3>}
          {data.isLoaded && data.items.length === 0 && 
            <h3>
              No results found. Please try again.
            </h3>}
            {data.items.length === 1 && data.items[0].errorCode === 101 && <h3>{data.items[0].text}</h3>}
            {data.items.length > 0  && data.items[0].errorCode === 0 &&
              <div className="output-area">
                <h3>Total number of results found {data.items.length}</h3>
                <div className="results">
                    {data.items.map((item) => 
                      <Card >
                        <Card.Body>
                          <Card.Title>number of {query} found: {item.occurrenceCount}</Card.Title>
                          <Card.Text>
                          {item.text}
                          </Card.Text>
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
