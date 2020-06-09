const React = require('react');

const searchHistory = ({state, returnHome}) => {
  return (
    <div>
      <h1>Search History</h1>
      {
        state.history.map(search => {
          return (
          <div>
            <h3>{`${search.city}, ${search.country}`}</h3>
          <h4>{`Flight Departure Date: ${search.date} for ${search.city}`}</h4>
            <a href={search.link} target="_blank">See Flight Prices</a>
          </div>
          )
        })
      }
      <br/>
      <br/>
      <button onClick={returnHome}>Return</button>
    </div>
  )
}

export default searchHistory;
