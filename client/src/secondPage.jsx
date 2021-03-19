const React = require('react');

const SecondPage = ({handleChange, handleSubmit, state, changeDate, getHistory}) => {
  return (
    <div>
      <h1>Take Me Away</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Destination
          <br/>
          <select value={state.value} onChange={handleChange} required>
            <option></option>
            {state.cities.map(city => {
              return <option value={[city.code, city.city, city.country]} key={city.city}>{city.city}</option>
            })}
          </select>
        </label>
        <br/>
        <br/>
        <label>Departure Date</label>
        <br/>
        <input type="date" min="2020-06-09" onChange={changeDate} pattern="dd-mm-yyyy" required/>
        <br/>
        <br/>
        <input type="submit" value="Submit" />
      </form>
      <br/>
      <button onClick={getHistory}>Search History</button>
    </div>
  )
}

export default SecondPage;


