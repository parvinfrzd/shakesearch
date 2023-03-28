import { useState, useEffect } from 'react'; 

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SearchForm({getData}) {
  // const [error, setError] = useState(null); // error message 
  // const [isLoaded, setIsLoaded] = useState(false); //check if data is loaded fro dynamic rendering
  // const [items, setItems] = useState([]); // data 

  const [query, setQuery] = useState('');

  const [parentData, setParentData] = useState({});

  const endpoint = 'http://localhost:3001/search'

  var handleSubmit = (e) => {
    e.preventDefault();
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
      setParentData({isLoaded: true, items: data, error: null}) 
      console.log(parentData);
    }).then (() => {
      getData(parentData);

    })
    .catch((error) => {
      setParentData({isLoaded: true, items: null, error: error}) 
      getData(parentData);
    })
  };

  useEffect(()=> {
    console.log(parentData);
    getData(parentData);
  },[parentData])


  return (
    <Form onSubmit={handleSubmit} >
      <Form.Group className="mb-3">
        <Form.Control type="text" id="q" name="q" placeholder="Jot something here"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
    </Form>
  )
}

export default SearchForm;