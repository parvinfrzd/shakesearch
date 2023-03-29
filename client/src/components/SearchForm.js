import { useState, useEffect } from 'react'; 

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SearchForm({getData}) {
  const [query, setQuery] = useState('');
  const [parentData, setParentData] = useState({});

  const endpoint = 'http://localhost:3001/search'

  var handleSubmit = (e) => {
    e.preventDefault();
    if(query.length < 3) {
      setParentData({isLoaded: true, items: null, error: {message: "Cannot search query less than 3 characters"}, query: query});
      return;
    } 
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
      setParentData({isLoaded: true, items: data, error: null, query: query}) 
      console.log(parentData);
    })
    .catch((error) => {
      setParentData({isLoaded: true, items: null, error: error, query: query}) 
      getData(parentData);
    })
  };

  useEffect(()=> {
    if(parentData) {
      getData(parentData);
    }
  },[parentData])


  return (
    <Form onSubmit={handleSubmit} className="form">
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