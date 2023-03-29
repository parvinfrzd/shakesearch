import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import { useState, useEffect } from 'react'; 

import SearchForm from './components/SearchForm';
import Results from './components/Results';

function App() {
  const [data, setData] = useState(null);

  const getData = (data) => {
    setData(data);
    console.log("passed to partent", data);
  }

  useEffect(()=> {
    console.log(data);
    getData(data);
  },[data])


  return (
    <div className="App content-area">
        <h1>Welcome to Shakespear Search</h1>
        <SearchForm getData={getData} />
        {
          data && 
        <Results items={data.items} error={data.error} isLoaded={data.isLoaded} query={data.query} />

        }
        
    </div>
  );
}

export default App;
