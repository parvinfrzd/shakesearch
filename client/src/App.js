import './App.css';
import { useState } from 'react'; 


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
    <div className="App">
        <div className="form-wrapper">
        <h1>Welcome to Shakespear Search</h1>
        <form id="form" className="mb-3" onSubmit={handleSubmit}>
            <input type="text" id="q" name="q" className="form-control" 
              placeholder="Jot something here!"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              />
            <button type="submit" 
              className="btn btn-primary"
              >Search</button>
        </form>
        </div> 
    </div>
  );
}

export default App;
