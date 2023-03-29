import Card from 'react-bootstrap/Card';
// import { useEffect } from 'react'; 

function Results(props) {

  // useEffect (() => {
  //   console.log(props);
  // },[props])

  return (
    <>
    <div className="content-area">
          {props.error && <h3>{props.error.message}</h3>}
          {!props.isLoaded && <h3>Put something in the search bar to begin </h3>}
          {props.isLoaded && props.items?.length === 0 && 
            <h3>
              No results found. Please try again.
            </h3>}
            {props.items?.length === 1 && props.items[0].errorCode > 0 && <h3>{props.items[0].text}</h3>}
            {props.items?.length > 0  && props.items[0].errorCode === 0 &&
              <div className="output-area">
                <h3>Total number of results found {props.items.length}</h3>
                <div className="results">
                    {props.items.map((item) => 
                      <Card >
                        <Card.Body>
                          <Card.Title>number of {props.query} found: {item.occurrenceCount}</Card.Title>
                          <Card.Text>
                          {item.text}
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    )}
                </div>
              </div>}
          </div>
          
      </>
  )
}

export default Results;