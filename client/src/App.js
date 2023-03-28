import './App.css';
import { useState } from 'react'; 
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function App() {
  const [error, setError] = useState(null); // error message 
  const [isLoaded, setIsLoaded] = useState(false); //check if data is loaded fro dynamic rendering
  const [items, setItems] = useState([]); // data 

  const [query, setQuery] = useState('');

  const endpoint = 'http://localhost:3001/search'

  var handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Hello")
    fetch(`${endpoint}?q=${query}`, {
      mode:'cors',
      method: 'get',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }})
    .then((res) => { 
      return res.json()
    })
    .then((data) => {
      setIsLoaded(true); 
      console.log(data);
      setItems(data);})
    .catch((error) => {
      console.log(error); 
      setError(error);
    })
  };

  return (
    <div className="App content-area">
        <h1>Welcome to Shakespear Search</h1>
        <Form onSubmit={handleSubmit} >
        <Form.Group className="mb-3" controlId="formBasic">
          <Form.Control type="text" id="q" name="q" placeholder="Jot something here"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
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
